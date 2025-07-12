import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import ToolDetailModal from "@/components/ToolDetailModal";
const Recommendations = () => {
  const location = useLocation();
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock recommended tools based on answers
  const recommendedTools = [{
    id: "1",
    name: "ChatGPT",
    description: "Advanced AI assistant for content creation and automation",
    category: "AI Assistant",
    rating: 4.5,
    price: "Starting at $20/month",
    complexity: 2,
    logo: "C",
    match: 95
  }, {
    id: "2",
    name: "Midjourney",
    description: "AI-powered image generation for creative professionals",
    category: "Image Generation",
    rating: 4.3,
    price: "Starting at $10/month",
    complexity: 2,
    logo: "M",
    match: 87
  }, {
    id: "3",
    name: "Notion AI",
    description: "AI-powered workspace for productivity and collaboration",
    category: "Productivity",
    rating: 4.4,
    price: "Starting at $8/month",
    complexity: 2,
    logo: "N",
    match: 82
  }];
  const handleLearnMore = (tool: any) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Tool Recommendations</h1>
          <p className="text-gray-600">Found 3 tools matching your criteria</p>
        </div>

        <div className="space-y-6">
          {recommendedTools.map((tool, index) => <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-6 flex-1">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#305CDE]">{tool.logo}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {tool.match}% match
                        </Badge>
                        {index === 0 && <Badge className="bg-red-100 text-red-800">❤️ Recommended</Badge>}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{tool.description}</p>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Rating:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.floor(tool.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />)}
                            <span className="text-sm text-gray-600">({tool.rating})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Complexity:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < tool.complexity ? 'bg-[#305CDE]' : 'bg-gray-200'}`} />)}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <span className="text-gray-500">Starting at</span>
                          <span className="font-medium text-gray-900 ml-1">{tool.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-[#305CDE] hover:bg-[#2847b8]" onClick={() => handleLearnMore(tool)}>
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>

      <ToolDetailModal tool={selectedTool} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>;
};
export default Recommendations;