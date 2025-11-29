import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import quizData from "@/data/quizzes.json";
import { useState } from "react";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const Quiz = () => {
  const navigate = useNavigate();
  const { habitat } = useParams<{ habitat: HabitatType }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = habitat ? quizData[habitat] : [];
  const question = questions[currentQuestion];

  if (!question || !habitat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Quiz not found</p>
      </div>
    );
  }

  const handleAnswerSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    setAnswers([...answers, selectedAnswer]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz finished - save results and navigate
      const score = answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].answer ? 1 : 0);
      }, 0) + (selectedAnswer === question.answer ? 1 : 0);
      
      localStorage.setItem('lastQuizScore', JSON.stringify({
        habitat,
        score,
        total: questions.length,
        date: new Date().toISOString()
      }));
      
      navigate('/results');
    }
  };

  const isCorrect = selectedAnswer === question.answer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/habitats")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Exit Quiz
        </Button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-muted-foreground">{habitat} Habitat</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
            <CardDescription>Select the correct answer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
              {question.options.map((option, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    showFeedback
                      ? index === question.answer
                        ? "border-primary bg-primary/5"
                        : selectedAnswer === index
                        ? "border-destructive bg-destructive/5"
                        : "border-border"
                      : selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option}
                  </Label>
                  {showFeedback && (
                    index === question.answer ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : selectedAnswer === index ? (
                      <X className="w-5 h-5 text-destructive" />
                    ) : null
                  )}
                </div>
              ))}
            </RadioGroup>

            {showFeedback && (
              <Card className={isCorrect ? "bg-primary/5 border-primary" : "bg-destructive/5 border-destructive"}>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">
                    {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                  <p className="text-sm">
                    {isCorrect 
                      ? "Great job! You got it right." 
                      : `The correct answer is: ${question.options[question.answer]}`
                    }
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4 pt-4">
              {!showFeedback ? (
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleNext}
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
