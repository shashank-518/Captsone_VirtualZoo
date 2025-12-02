import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const Quiz = () => {
  const navigate = useNavigate();
  const { habitat, animalId } = useParams<{ habitat: HabitatType; animalId: string }>();

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // ---------------- FETCH QUIZ FROM BACKEND -----------------
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch("https://captsone-virtualzoo.onrender.com/api/ai/animal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animal: animalId })
        });

        const data = await res.json();

        // ❗ FIX: Convert correct answer STRING → INDEX
        const fixedQuiz = data.quiz.map((q: any) => ({
          ...q,
          answer: q.options.indexOf(q.answer)
        }));

        setQuestions(fixedQuiz);

      } catch (error) {
        console.error("Quiz Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [animalId]);
  // -----------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading quiz…</p>
      </div>
    );
  }

  if (!questions.length || !habitat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No quiz available</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.answer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (!showFeedback) setSelectedAnswer(index);
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
      // FINAL SCORE
      const score =
        answers.reduce((acc, answer, index) => {
          return acc + (answer === questions[index].answer ? 1 : 0);
        }, 0) +
        (selectedAnswer === question.answer ? 1 : 0);

      localStorage.setItem(
        "lastQuizScore",
        JSON.stringify({
          habitat,
          animal: animalId,
          score,
          total: questions.length,
          date: new Date().toISOString(),
        })
      );

      navigate("/results");
    }
  };

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

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {habitat} Habitat
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{question.question}</CardTitle>
            <CardDescription>Select the correct answer</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {question.options.map((option: string, index: number) => (
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
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />

                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option}
                  </Label>

                  {showFeedback &&
                    (index === question.answer ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : selectedAnswer === index ? (
                      <X className="w-5 h-5 text-destructive" />
                    ) : null)}
                </div>
              ))}
            </RadioGroup>

            {/* Feedback */}
            {showFeedback && (
              <Card
                className={
                  isCorrect
                    ? "bg-primary/5 border-primary"
                    : "bg-destructive/5 border-destructive"
                }
              >
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">
                    {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                  <p className="text-sm">
                    {isCorrect
                      ? "Great job!"
                      : `Correct Answer: ${question.options[question.answer]}`}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Next / Submit */}
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
                <Button className="w-full" size="lg" onClick={handleNext}>
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "View Results"}
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
