
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
  },
  {
    id: 4,
    title: "Which integrations do you need? (Optional)",
    type: "multiple-select",
    options: [
      "QuickBooks",
      "Xero",
      "SAP",
      "Oracle",
      "Excel/Google Sheets",
      "Salesforce",
      "HubSpot",
      "Slack",
      "Microsoft Teams",
      "Zapier"
    ],
    maxSelections: 2,
    optional: true
  }
];

const QUESTIONNAIRE_WEBHOOK_URL = 'https://primeoo.app.n8n.cloud/webhook-test/d5261785-726e-41b0-aa78-6a9951168631';

const QuestionnaireModal = ({ isOpen, onClose, onComplete }: QuestionnaireModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleMultipleSelect = (questionId: number, option: string) => {
    const currentSelections = answers[questionId] || [];
    const isSelected = currentSelections.includes(option);
    const maxSelections = questions.find(q => q.id === questionId)?.maxSelections || 10;

    if (isSelected) {
      // Remove selection
      const newSelections = currentSelections.filter((item: string) => item !== option);
      handleAnswer(questionId, newSelections);
    } else if (currentSelections.length < maxSelections) {
      // Add selection
      const newSelections = [...currentSelections, option];
      handleAnswer(questionId, newSelections);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sendToWebhook = async (data: any) => {
    try {
      const response = await fetch(QUESTIONNAIRE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...data
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to webhook');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      throw error;
    }
  };

  const handleGetResults = async () => {
    setIsLoading(true);
    
    // Format the answers for the webhook
    const formattedAnswers = {
      whoNeedsTool: answers[1] || null,
      goals: answers[2] || null,
      budget: answers[3] || 0,
      integrations: answers[4] || [],
    };

    try {
      // Send data to webhook
      await sendToWebhook(formattedAnswers);
      
      // Simulate processing time (3.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      // Complete the questionnaire
      onComplete(answers);
      onClose();
    } catch (error) {
      // Handle error (you might want to show an error message to the user)
      console.error('Error processing results:', error);
      // Still continue to show results even if webhook fails
      onComplete(answers);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const formatBudget = (value: number) => {
    if (value === 0) return "Free tools only";
    return `$${value}/month`;
  };

  const currentQuestion = questions.find(q => q.id === currentStep);
  const isAnswered = () => {
    if (currentQuestion?.optional) return true;
    const answer = answers[currentStep];
    return answer !== undefined && answer !== null && answer !== "" && (Array.isArray(answer) ? answer.length > 0 : true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none">
        <div className="flex items-center justify-center min-h-screen py-6">
          <Card className="w-full max-w-2xl rounded-[20px] shadow-2xl border-0 my-6">
            <DialogHeader className="p-8 pb-4">
              <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                Find Your Perfect AI Tool
              </DialogTitle>
              <p className="text-center text-gray-600 mt-2">
                Tailored for Financial Teams
              </p>
            </DialogHeader>
            
            <CardContent className="px-8 pb-8 pt-4">
              {/* Progress bar */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4, 5].map((step) => (
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
                    {step < 5 && (
                      <div 
                        className={`w-16 h-1 mx-2 ${
                          step < currentStep ? 'bg-[#305CDE]' : 'bg-gray-200'
                        }`} 
                      />
                    )}
                  </div>
                ))}
              </div>

              {currentStep <= 4 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-center mb-6">
                    {currentQuestion?.title}
                  </h3>
                  
                  {/* Question 1: Multiple Choice with Pills */}
                  {currentQuestion?.type === "multiple-choice" && (
                    <div className="flex flex-wrap gap-3 justify-center">
                      {currentQuestion?.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(currentStep, option)}
                          className={`px-6 py-3 rounded-full border-2 transition-all font-medium ${
                            answers[currentStep] === option
                              ? 'border-[#305CDE] bg-[#305CDE] text-white shadow-lg'
                              : 'border-gray-200 hover:border-[#305CDE] hover:bg-blue-50 text-gray-700'
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
                        className="min-h-[150px] resize-none focus:ring-2 focus:ring-[#305CDE] focus:border-[#305CDE] rounded-xl"
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
                          className="w-full [&_[role=slider]]:bg-[#305CDE] [&_[role=slider]]:border-[#305CDE]"
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

                  {/* Question 4: Multiple Select Integrations */}
                  {currentQuestion?.type === "multiple-select" && (
                    <div className="space-y-4">
                      <p className="text-center text-gray-600 mb-4">
                        Select up to {currentQuestion?.maxSelections} integrations (optional)
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {currentQuestion?.options?.map((option, index) => {
                          const currentSelections = answers[currentStep] || [];
                          const isSelected = currentSelections.includes(option);
                          const maxReached = currentSelections.length >= (currentQuestion?.maxSelections || 10);
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleMultipleSelect(currentStep, option)}
                              disabled={!isSelected && maxReached}
                              className={`px-6 py-3 rounded-full border-2 transition-all font-medium ${
                                isSelected
                                  ? 'border-[#305CDE] bg-[#305CDE] text-white shadow-lg'
                                  : maxReached
                                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'border-gray-200 hover:border-[#305CDE] hover:bg-blue-50 text-gray-700'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-center text-sm text-gray-500">
                        {(answers[currentStep] || []).length} / {currentQuestion?.maxSelections} selected
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
                            : question.type === "multiple-select"
                            ? (answers[question.id] || []).length > 0 ? (answers[question.id] || []).join(", ") : "None selected"
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
                
                {currentStep < 5 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!isAnswered()}
                    className="bg-[#305CDE] hover:bg-[#2847b8]"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGetResults}
                    disabled={isLoading}
                    className="bg-[#305CDE] hover:bg-[#2847b8] min-w-[120px]"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : 'Get Results'}
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
