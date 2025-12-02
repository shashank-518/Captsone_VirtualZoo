import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trees, Waves, Sun, Snowflake, Search } from "lucide-react";
import animalsData from "@/data/animals.json";
import forestImg from "@/assets/tiger.jpg";
import oceanImg from "@/assets/ocean-habitat.jpg";
import desertImg from "@/assets/desert-habitat.jpg";
import arcticImg from "@/assets/arctic-habitat.jpg";
import { useState } from "react";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const Habitats = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [animalInput, setAnimalInput] = useState("");

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

  const handleSearchSubmit = () => {
    if (!animalInput.trim()) return;
    navigate(`/animal/custom/${animalInput.toLowerCase()}`);
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
              Select an ecosystem or search for any animal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Normal habitats */}
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

            {/* NEW — SEARCH ANY ANIMAL */}
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
              onClick={() => setShowSearch(true)}
            >
              <div className="relative h-48 flex items-center justify-center bg-black/20">
                <Search className="w-14 h-14 opacity-90" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  Search Any Animal
                </CardTitle>
                <CardDescription className="text-base text-white/80">
                  Type any animal name to explore details & quiz
                </CardDescription>
              </CardHeader>
            </Card>

          </div>

          {/* Modal – Ask for animal name */}
          {showSearch && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h2 className="text-xl font-bold mb-4">Search Animal</h2>

                <input
                  type="text"
                  className="w-full border p-2 rounded mb-4"
                  placeholder="Enter animal name..."
                  value={animalInput}
                  onChange={(e) => setAnimalInput(e.target.value)}
                />

                <div className="flex gap-3">
                  <Button className="w-full" onClick={handleSearchSubmit}>
                    Search
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    onClick={() => setShowSearch(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Habitats;
