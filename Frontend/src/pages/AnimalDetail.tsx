import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const AnimalDetail = () => {
  const navigate = useNavigate();
  const { habitat, animalId } = useParams<{ habitat: HabitatType; animalId: string }>();

  const [animalData, setAnimalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ------------------- FETCH FROM BACKEND -------------------
  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch("http://localhost:5000/api/ai/animal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animal: animalId }),
        });

        const data = await res.json();
        setAnimalData(data);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [animalId]);
  // ----------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading animal details...</p>
      </div>
    );
  }

  if (!animalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unable to load details</p>
      </div>
    );
  }

  const info = animalData.info;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <Button 
          variant="ghost" 
          onClick={() => navigate("/habitats")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Habitats
        </Button>

        <Card className="overflow-hidden">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{info.name}</CardTitle>
                <p className="text-muted-foreground italic">{info.scientificName}</p>
              </div>

              <Badge className="bg-accent text-accent-foreground">
                {info.conservation}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">

            <section>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="leading-relaxed text-muted-foreground">{info.about}</p>
            </section>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Diet</h4>
                <p className="text-sm text-muted-foreground">{info.diet}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Habitat</h4>
                <p className="text-sm text-muted-foreground">{info.habitat}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Lifespan</h4>
                <p className="text-sm text-muted-foreground">{info.lifespan}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Conservation Status</h4>
                <p className="text-sm text-muted-foreground">{info.conservation}</p>
              </div>
            </div>

            <Card className="bg-primary/5 p-4">
              <h4 className="font-semibold mb-2">🎯 Fun Fact</h4>
              <p className="text-sm">{info.funFact}</p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="flex-1 text-lg"
                size="lg"
                onClick={() => navigate(`/hologram/${habitat}/${animalId}`)}
              >
                <Eye className="w-5 h-5 mr-2" /> View Hologram
              </Button>

              <Button 
                variant="outline"
                className="flex-1 text-lg"
                size="lg"
                onClick={() => navigate(`/quiz/${habitat}/${animalId}`)}
              >
                <GraduationCap className="w-5 h-5 mr-2" /> Take Quiz
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimalDetail;
