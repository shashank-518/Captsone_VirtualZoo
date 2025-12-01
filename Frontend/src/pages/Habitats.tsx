import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trees, Waves, Sun, Snowflake } from "lucide-react";
import animalsData from "@/data/animals.json";
import forestImg from "@/assets/tiger.jpg";
import oceanImg from "@/assets/ocean-habitat.jpg";
import desertImg from "@/assets/desert-habitat.jpg";
import arcticImg from "@/assets/arctic-habitat.jpg";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const Habitats = () => {
  const navigate = useNavigate();

  const habitats: Array<{
    name: HabitatType;
    icon: React.ReactNode;
    gradient: string;
    image: string;
    description: string;
  }> = [
    {
      name: "Forest",
      icon: <Trees className="w-6 h-6" />,
      gradient: "bg-gradient-forest",
      image: forestImg,
      description: "Explore tropical rainforests and discover amazing wildlife"
    },
    {
      name: "Ocean",
      icon: <Waves className="w-6 h-6" />,
      gradient: "bg-gradient-ocean",
      image: oceanImg,
      description: "Dive into the deep blue and meet marine creatures"
    },
    {
      name: "Desert",
      icon: <Sun className="w-6 h-6" />,
      gradient: "bg-gradient-desert",
      image: desertImg,
      description: "Journey through arid landscapes and desert dwellers"
    },
    {
      name: "Arctic",
      icon: <Snowflake className="w-6 h-6" />,
      gradient: "bg-gradient-arctic",
      image: arcticImg,
      description: "Venture into icy terrain and arctic wildlife"
    }
  ];

  const handleHabitatClick = (habitat: HabitatType) => {
    const animals = animalsData[habitat];
    if (animals && animals.length > 0) {
      navigate(`/animal/${habitat}/${animals[0].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/home")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Habitat</h1>
            <p className="text-lg text-muted-foreground">
              Select an ecosystem to begin your wildlife adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {habitats.map((habitat) => (
              <Card 
                key={habitat.name}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                onClick={() => handleHabitatClick(habitat.name)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={habitat.image} 
                    alt={habitat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${habitat.gradient} opacity-60`} />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    {habitat.icon}
                    {habitat.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {habitat.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {animalsData[habitat.name].length} animals to discover
                    </span>
                    <Button className={habitat.gradient}>
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habitats;
