import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, RotateCcw, Trophy, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface QuizResult {
  habitat: string;
  score: number;
  total: number;
  date: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('lastQuizScore');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">No quiz results found. Take a quiz first!</p>
            <Button className="w-full mt-4" onClick={() => navigate("/habitats")}>
              Browse Habitats
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.total) * 100);
  const isPerfect = percentage === 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  const getMessage = () => {
    if (isPerfect) return "Perfect Score! 🎉";
    if (isExcellent) return "Excellent Work! 🌟";
    if (isGood) return "Good Job! 👍";
    return "Keep Learning! 📚";
  };

  const getEncouragement = () => {
    if (isPerfect) return "You're a wildlife expert!";
    if (isExcellent) return "You really know your animals!";
    if (isGood) return "You're learning fast!";
    return "Practice makes perfect!";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            {isPerfect ? (
              <Trophy className="w-10 h-10 text-primary" />
            ) : (
              <Star className="w-10 h-10 text-primary" />
            )}
          </div>
          <h1 className="text-4xl font-bold mb-2">{getMessage()}</h1>
          <p className="text-lg text-muted-foreground">{getEncouragement()}</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Your Score</CardTitle>
            <CardDescription>{result.habitat} Habitat Quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                {percentage}%
              </div>
              <p className="text-xl text-muted-foreground">
                {result.score} out of {result.total} correct
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {Array.from({ length: result.total }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-full h-3 rounded-full ${
                    index < result.score ? "bg-primary" : "bg-muted"
                  }`} />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Q{index + 1}
                  </span>
                </div>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Performance Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Correct Answers:</span>
                    <span className="font-semibold text-primary">{result.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incorrect Answers:</span>
                    <span className="font-semibold text-destructive">{result.total - result.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-semibold">{percentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          
          <Button 
            size="lg" 
            variant="outline"
            className="w-full"
            onClick={() => navigate("/habitats")}
          >
            Explore Other Habitats
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/home")}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
