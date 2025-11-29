import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import animalsData from "@/data/animals.json";
import { useState, useEffect } from "react";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const AnimalDetail = () => {
  const navigate = useNavigate();
  const { habitat, animalId } = useParams<{ habitat: HabitatType; animalId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const animals = habitat ? animalsData[habitat] : [];
  const animal = animals.find(a => a.id === animalId);

  useEffect(() => {
    if (animal) {
      const index = animals.findIndex(a => a.id === animal.id);
      setCurrentIndex(index);
    }
  }, [animal, animals]);

  if (!animal || !habitat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Animal not found</p>
      </div>
    );
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/animal/${habitat}/${animals[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < animals.length - 1) {
      navigate(`/animal/${habitat}/${animals[currentIndex + 1].id}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "endangered": return "bg-destructive text-destructive-foreground";
      case "vulnerable": return "bg-accent text-accent-foreground";
      case "near threatened": return "bg-secondary text-secondary-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/habitats")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Habitats
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === animals.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{animal.name}</CardTitle>
                <p className="text-muted-foreground italic">{animal.scientific}</p>
              </div>
              <Badge className={getStatusColor(animal.status)}>
                {animal.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{animal.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Diet</h4>
                <p className="text-sm text-muted-foreground">{animal.diet}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Habitat</h4>
                <p className="text-sm text-muted-foreground">{animal.habitat}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Lifespan</h4>
                <p className="text-sm text-muted-foreground">{animal.lifespan}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Conservation</h4>
                <p className="text-sm text-muted-foreground">{animal.status}</p>
              </div>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">🎯 Fun Fact</h4>
                <p className="text-sm">{animal.funFact}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="flex-1 text-lg"
                size="lg"
                onClick={() => navigate(`/hologram/${habitat}/${animal.id}`)}
              >
                <Eye className="w-5 h-5 mr-2" />
                View Hologram
              </Button>
              <Button 
                variant="outline"
                className="flex-1 text-lg"
                size="lg"
                onClick={() => navigate(`/quiz/${habitat}`)}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Take Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Animal {currentIndex + 1} of {animals.length} in {habitat}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
