
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Globe, CheckCircle } from "lucide-react";

interface ToolDetailModalProps {
  tool: any;
  isOpen: boolean;
  onClose: () => void;
}

const ToolDetailModal = ({ tool, isOpen, onClose }: ToolDetailModalProps) => {
  if (!tool) return null;

  const features = [
    "Content Generation",
    "Data Analysis", 
    "Code Assistance",
    "Customer Support"
  ];

  const integrations = [
    "Slack",
    "Microsoft Teams",
    "Zapier",
    "API"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#305CDE]">{tool.logo}</span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{tool.name}</DialogTitle>
                <p className="text-gray-600">{tool.category}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#305CDE] mb-1">{tool.price}</div>
              <div className="text-sm text-gray-500">Starting price</div>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About {tool.name}</h3>
            <p className="text-gray-600 leading-relaxed">
              {tool.description} This comprehensive AI solution is designed to help businesses streamline their 
              processes and achieve better results through advanced artificial intelligence capabilities.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < Math.floor(tool.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 font-semibold">({tool.rating})</span>
              </div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full ${i < tool.complexity ? 'bg-[#305CDE]' : 'bg-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600">Complexity</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-[#305CDE] mb-2">All team sizes</div>
              <div className="text-sm text-gray-600">Best for</div>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Integrations</h3>
            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>{integration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div>
            <h3 className="text-xl font-semibold mb-4">AI Analysis for Your Business</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-medium">Implementation Complexity</div>
                  <div className="text-gray-600">Good fit</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-medium">Estimated ROI</div>
                  <div className="text-gray-600">+90% efficiency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4 border-t">
            <Button className="bg-[#305CDE] hover:bg-[#2847b8]">
              <Globe className="w-4 h-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDetailModal;
