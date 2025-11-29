import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Info } from "lucide-react";
import heroImage from "@/assets/hero-animals.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Interactive Holographic Learning
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Virtual Zoo Using Hologram
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore wildlife from around the world through stunning 3D holographic projections. 
              Learn, discover, and test your knowledge!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-gradient-hero hover:opacity-90 transition-opacity"
                onClick={() => navigate("/habitats")}
              >
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Info className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose a Habitat</h3>
              <p className="text-muted-foreground">
                Select from Forest, Ocean, Desert, or Arctic environments to explore different ecosystems.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">View Holograms</h3>
              <p className="text-muted-foreground">
                Experience animals in 3D using a transparent pyramid (Pepper's Ghost effect) with your device.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Test Your Knowledge</h3>
              <p className="text-muted-foreground">
                Take interactive quizzes about the animals you've learned about and track your progress.
              </p>
            </Card>
          </div>

          <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-dashed">
            <h3 className="text-lg font-semibold mb-2">💡 Pro Tip: Holographic Pyramid</h3>
            <p className="text-muted-foreground text-sm">
              For the best holographic experience, use a transparent plastic pyramid placed on your screen. 
              You can easily make one at home using clear plastic sheets cut into triangular pieces. 
              The pyramid reflects the four-view display to create a stunning 3D effect!
            </p>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-forest flex-shrink-0 flex items-center justify-center text-white text-xl">
                🌲
              </div>
              <div>
                <h4 className="font-semibold mb-1">Forest Habitat</h4>
                <p className="text-sm text-muted-foreground">Discover tigers, elephants, and red pandas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-ocean flex-shrink-0 flex items-center justify-center text-white text-xl">
                🌊
              </div>
              <div>
                <h4 className="font-semibold mb-1">Ocean Habitat</h4>
                <p className="text-sm text-muted-foreground">Explore dolphins, sea turtles, and sharks</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-desert flex-shrink-0 flex items-center justify-center text-white text-xl">
                🏜️
              </div>
              <div>
                <h4 className="font-semibold mb-1">Desert Habitat</h4>
                <p className="text-sm text-muted-foreground">Meet camels, fennec foxes, and meerkats</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-arctic flex-shrink-0 flex items-center justify-center text-white text-xl">
                ❄️
              </div>
              <div>
                <h4 className="font-semibold mb-1">Arctic Habitat</h4>
                <p className="text-sm text-muted-foreground">Visit polar bears, arctic foxes, and penguins</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
