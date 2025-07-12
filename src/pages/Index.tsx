
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import QuestionnaireModal from "@/components/QuestionnaireModal";
import ToolDetailModal from "@/components/ToolDetailModal";

const Index = () => {
  const navigate = useNavigate();
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);

  // Mock popular tools data
  const popularTools = [
    {
      id: "1",
      name: "ChatGPT",
      description: "Advanced AI assistant for content creation and automation",
      category: "Chatbot",
      rating: 4.5,
      price: "Starting at $20/month",
      complexity: 2,
      logo: "C"
    },
    {
      id: "2",
      name: "Midjourney", 
      description: "AI-powered image generation for creative professionals",
      category: "Image Generation",
      rating: 4.3,
      price: "Starting at $10/month",
      complexity: 2,
      logo: "M"
    },
    {
      id: "3",
      name: "Notion AI",
      description: "AI-powered workspace for productivity and collaboration", 
      category: "Productivity",
      rating: 4.4,
      price: "Starting at $8/month",
      complexity: 2,
      logo: "N"
    },
    {
      id: "4",
      name: "Jasper",
      description: "AI writing assistant for marketing and content creation",
      category: "Writing",
      rating: 4.2,
      price: "Starting at $39/month", 
      complexity: 3,
      logo: "J"
    },
    {
      id: "5",
      name: "Canva AI",
      description: "Design platform with AI-powered creative tools",
      category: "Design",
      rating: 4.1,
      price: "Starting at $12/month",
      complexity: 1,
      logo: "C"
    },
    {
      id: "6", 
      name: "Grammarly",
      description: "AI writing assistant for grammar and style improvements",
      category: "Writing",
      rating: 4.6,
      price: "Starting at $12/month",
      complexity: 1,
      logo: "G"
    },
    {
      id: "7",
      name: "Zapier",
      description: "Automation platform connecting different apps and services",
      category: "Automation", 
      rating: 4.3,
      price: "Starting at $20/month",
      complexity: 3,
      logo: "Z"
    },
    {
      id: "8",
      name: "Claude",
      description: "Advanced AI assistant for analysis and conversation",
      category: "AI Assistant",
      rating: 4.4,
      price: "Starting at $20/month",
      complexity: 2,
      logo: "C"
    },
    {
      id: "9",
      name: "Runway ML",
      description: "AI-powered video editing and generation platform",
      category: "Video",
      rating: 4.0,
      price: "Starting at $12/month",
      complexity: 3,
      logo: "R"
    },
    {
      id: "10",
      name: "Synthesia",
      description: "AI video generation platform with virtual presenters",
      category: "Video",
      rating: 4.2,
      price: "Starting at $30/month",
      complexity: 2,
      logo: "S"
    },
    {
      id: "11", 
      name: "Copy.ai",
      description: "AI copywriting tool for marketing and sales content",
      category: "Writing",
      rating: 4.1,
      price: "Starting at $36/month",
      complexity: 2,
      logo: "C"
    },
    {
      id: "12",
      name: "Loom AI",
      description: "Screen recording with AI-powered features and transcription",
      category: "Productivity",
      rating: 4.5,
      price: "Starting at $8/month", 
      complexity: 1,
      logo: "L"
    }
  ];

  const handleFindTool = () => {
    setIsQuestionnaireOpen(true);
  };

  const handleQuestionnaireComplete = (answers: any) => {
    console.log("Questionnaire answers:", answers);
    navigate("/recommendations", { state: { answers } });
  };

  const handleLearnMore = (tool: any) => {
    setSelectedTool(tool);
    setIsToolModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover AI Tools for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized AI tool recommendations based on your specific needs and requirements
          </p>
          <Button 
            size="lg" 
            className="bg-[#305CDE] hover:bg-[#2847b8] text-lg px-8 py-3"
            onClick={handleFindTool}
          >
            Find Perfect Tool
          </Button>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="w-6 h-6 text-[#305CDE]" />
            <h2 className="text-3xl font-bold text-gray-900">Popular AI Tools</h2>
          </div>
          <p className="text-gray-600 mb-8">Top-rated tools across all categories</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <ToolCard 
                key={tool.id}
                {...tool}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        </div>
      </section>

      <QuestionnaireModal 
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onComplete={handleQuestionnaireComplete}
      />

      <ToolDetailModal 
        tool={selectedTool}
        isOpen={isToolModalOpen}
        onClose={() => setIsToolModalOpen(false)}
      />
    </div>
  );
};

export default Index;
