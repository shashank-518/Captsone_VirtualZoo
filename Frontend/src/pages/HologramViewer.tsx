import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import animalsData from "@/data/animals.json";
import tigerHologramMp4 from "@/assets/bengal tiger  hologram video.mp4";
import pandaMp4 from "@/assets/panda.mp4";
import Hologram3D from "../components/ui/Hologram3D";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const HologramViewer = () => {
  const navigate = useNavigate();
  const { habitat, animalId } = useParams<{ habitat: HabitatType; animalId: string }>();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [hologramData, setHologramData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const animals = habitat ? animalsData[habitat] : [];
  const animal = animals.find(a => a.id === animalId);

  // Resolve local bundled MP4 overrides
  const resolvedVideoUrl: string | undefined =
    animal?.id === "tiger" ? (tigerHologramMp4 as unknown as string) :
    animal?.id === "redpanda" ? (pandaMp4 as unknown as string) :
    (animal as any)?.videoUrl;

  // ---- FETCH AI HOLOGRAM IF NEEDED ----
  useEffect(() => {
    if (resolvedVideoUrl) return; // video exists → no need for AI
    if (!animal) return;

    const fetchHologram = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://captsone-virtualzoo.onrender.com/api/3d/generate3d", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: `3D hologram of a Bengal Tiger standing and roaring` }),
        });

        const json = await res.json();
        setHologramData(json);
      } catch (err) {
        console.error("Hologram AI error:", err);
      }
      setLoading(false);
    };

    fetchHologram();
  }, [animal]);

  const handleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  if (!animal || !habitat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Animal not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/animal/${habitat}/${animalId}`)}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {animal.name}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{animal.name} Hologram</h1>
          </div>

          {/* ---------- DISPLAY VIDEO OR 3D HOLOGRAM OR EMOJI ---------- */}
          <div
            ref={videoContainerRef}
            className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
            onClick={handleFullscreen}
          >
            {resolvedVideoUrl ? (
              <video
                className="w-full h-full object-cover"
                src={resolvedVideoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : loading ? (
              <div className="flex items-center justify-center h-full text-xl">
                Generating 3D hologram...
              </div>
            ) : hologramData?.pointCloud ? (
              <Hologram3D pointCloud={hologramData.pointCloud} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {getAnimalEmoji(animal.name)}
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Fullscreen"
            >
              <Maximize2 className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex gap-4">
            <Button 
              className="flex-1"
              variant="secondary"
              onClick={() => navigate(`/animal/${habitat}/${animalId}`)}
            >
              Learn More About {animal.name}
            </Button>
            <Button 
              className="flex-1 bg-gradient-hero"
              onClick={() => navigate(`/quiz/${habitat}`)}
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get animal emoji
const getAnimalEmoji = (name: string): string => {
  const emojiMap: Record<string, string> = {
    "Bengal Tiger": "🐅",
    "Asian Elephant": "🐘",
    "Red Panda": "🐼",
    "Bottlenose Dolphin": "🐬",
    "Green Sea Turtle": "🐢",
    "Great White Shark": "🦈",
    "Dromedary Camel": "🐪",
    "Fennec Fox": "🦊",
    "Meerkat": "🦦",
    "Polar Bear": "🐻‍❄️",
    "Arctic Fox": "🦊",
    "Emperor Penguin": "🐧"
  };
  return emojiMap[name] || "🦁";
};

export default HologramViewer;
