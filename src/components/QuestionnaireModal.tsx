
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: any) => void;
}

const questions = [
  {
    id: 1,
    title: "Who needs the tool?",
    type: "multiple-choice",
    options: [
      "CFO / Finance Director",
      "Finance Manager",
      "Financial Analyst",
      "Accounting Manager",
      "Treasury Manager",
      "Budget & Planning Manager",
      "Entire Finance Team"
    ]
  },
  {
    id: 2,
    title: "What are we trying to achieve with this tool?",
    type: "text",
    placeholder: "Please describe your goals, challenges, and what you hope to accomplish..."
  },
  {
    id: 3,
    title: "What is your budget?",
    type: "slider",
    min: 0,
    max: 500,
    step: 10
  }
];

const QuestionnaireModal = ({ isOpen, onClose, onComplete }: QuestionnaireModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetResults = () => {
    onComplete(answers);
    onClose();
  };

  const formatBudget = (value: number) => {
    if (value === 0) return "Free tools only";
    return `$${value}/month`;
  };

  const currentQuestion = questions.find(q => q.id === currentStep);
  const isAnswered = answers[currentStep] !== undefined && answers[currentStep] !== null && answers[currentStep] !== "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-2xl rounded-[20px] shadow-2xl border-0">
            <DialogHeader className="p-8 pb-4">
              <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                Find Your Perfect AI Tool
              </DialogTitle>
              <p className="text-center text-gray-600 mt-2">
                Tailored for Financial Teams
              </p>
            </DialogHeader>
            
            <CardContent className="p-8 pt-4">
              {/* Progress bar */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep 
                          ? 'bg-[#305CDE] text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div 
                        className={`w-16 h-1 mx-2 ${
                          step < currentStep ? 'bg-[#305CDE]' : 'bg-gray-200'
                        }`} 
                      />
                    )}
                  </div>
                ))}
              </div>

              {currentStep <= 3 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center mb-6">
                    {currentQuestion?.title}
                  </h3>
                  
                  {/* Question 1: Multiple Choice */}
                  {currentQuestion?.type === "multiple-choice" && (
                    <div className="space-y-3">
                      {currentQuestion?.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(currentStep, option)}
                          className={`w-full p-4 text-left rounded-lg border transition-all ${
                            answers[currentStep] === option
                              ? 'border-[#305CDE] bg-blue-50 text-[#305CDE]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Question 2: Text Area */}
                  {currentQuestion?.type === "text" && (
                    <div className="space-y-4">
                      <Textarea
                        placeholder={currentQuestion?.placeholder}
                        value={answers[currentStep] || ""}
                        onChange={(e) => handleAnswer(currentStep, e.target.value)}
                        className="min-h-[150px] resize-none focus:ring-2 focus:ring-[#305CDE] focus:border-[#305CDE]"
                      />
                    </div>
                  )}

                  {/* Question 3: Budget Slider */}
                  {currentQuestion?.type === "slider" && (
                    <div className="space-y-6">
                      <div className="px-4">
                        <Slider
                          value={[answers[currentStep] || 0]}
                          onValueChange={(value) => handleAnswer(currentStep, value[0])}
                          max={currentQuestion?.max}
                          min={currentQuestion?.min}
                          step={currentQuestion?.step}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>Free</span>
                          <span>$500/month</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#305CDE] mb-2">
                          {formatBudget(answers[currentStep] || 0)}
                        </div>
                        <p className="text-gray-600">Selected budget range</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center mb-6">
                    Review Your Answers
                  </h3>
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div key={question.id} className="border-b pb-4">
                        <p className="font-medium text-gray-900 mb-2">{question.title}</p>
                        <p className="text-[#305CDE]">
                          {question.type === "slider" 
                            ? formatBudget(answers[question.id] || 0)
                            : answers[question.id] || 'Not answered'
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-[#305CDE] text-[#305CDE] hover:bg-[#305CDE] hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="bg-[#305CDE] hover:bg-[#2847b8]"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGetResults}
                    className="bg-[#305CDE] hover:bg-[#2847b8]"
                  >
                    Get Results
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;
