import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { useRef } from "react";
import animalsData from "@/data/animals.json";
import tigerHologramMp4 from "@/assets/bengal tiger  hologram video.mp4";
import pandaMp4 from "@/assets/panda.mp4";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const HologramViewer = () => {
  const navigate = useNavigate();
  const { habitat, animalId } = useParams<{ habitat: HabitatType; animalId: string }>();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const animals = habitat ? animalsData[habitat] : [];
  const animal = animals.find(a => a.id === animalId);
  // Resolve local asset overrides (e.g., Bengal Tiger has a bundled mp4 in src/assets)
  const resolvedVideoUrl: string | undefined =
    animal?.id === "tiger" ? (tigerHologramMp4 as unknown as string) : 
    animal?.id === "redpanda" ? (pandaMp4 as unknown as string) :
    (animal as any)?.videoUrl;

  const handleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Request fullscreen
        await videoContainerRef.current.requestFullscreen();
      } else {
        // Exit fullscreen
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

          {/* Simple Video Display */}
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
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {getAnimalEmoji(animal.name)}
              </div>
            )}

            {/* Fullscreen Button */}
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

// Helper function to get animal emoji for visualization
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
