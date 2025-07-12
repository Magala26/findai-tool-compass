import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Globe, CheckCircle, TrendingUp, Clock, Target, Zap, Shield, Users } from "lucide-react";
interface ToolDetailModalProps {
  tool: any;
  isOpen: boolean;
  onClose: () => void;
}
const ToolDetailModal = ({
  tool,
  isOpen,
  onClose
}: ToolDetailModalProps) => {
  if (!tool) return null;
  const features = ["Content Generation", "Data Analysis", "Code Assistance", "Customer Support"];
  const integrations = [{
    name: "Slack",
    icon: "💬"
  }, {
    name: "Microsoft Teams",
    icon: "👥"
  }, {
    name: "Zapier",
    icon: "⚡"
  }, {
    name: "API",
    icon: "🔌"
  }];
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {/* Header Section - Identity */}
        <DialogHeader className="border-b p-6 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg bg-white shadow-sm border flex items-center justify-center">
                <span className="text-2xl font-bold text-[#305CDE]">{tool.logo}</span>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <DialogTitle className="text-2xl font-bold">{tool.name}</DialogTitle>
                  {tool.match && <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {tool.match}% match
                    </Badge>}
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{tool.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">Complexity:</span>
                    {[...Array(5)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < tool.complexity ? 'bg-[#305CDE]' : 'bg-gray-200'}`} />)}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#305CDE] mb-1">{tool.price}</div>
              <div className="text-sm text-gray-500">Starting price</div>
            </div>
          </div>
        </DialogHeader>

        {/* Primary Content - Tabbed Interface */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="h-full">
            <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
              <TabsTrigger value="overview" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#305CDE] data-[state=active]:bg-transparent">
                Overview
              </TabsTrigger>
              <TabsTrigger value="business" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#305CDE] data-[state=active]:bg-transparent">
                Business Analysis
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#305CDE] data-[state=active]:bg-transparent">
                Technical Details
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* About/Summary */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">About {tool.name}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tool.description} This comprehensive AI solution is designed to help businesses streamline their 
                    processes and achieve better results through advanced artificial intelligence capabilities.
                  </p>
                </div>

                {/* User Rating */}
                

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>)}
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Best For</h3>
                  <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-[#305CDE]" />
                    <span className="font-medium">All team sizes</span>
                    <span className="text-gray-600">• Financial teams looking to streamline operations</span>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 2: Business Analysis */}
              <TabsContent value="business" className="mt-0 space-y-6">
                {/* Why This Fits */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Why This Fits Your Needs</h3>
                  <div className="space-y-3">
                    
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Automation Capabilities</div>
                        <div className="text-gray-600 text-sm">Streamlines repetitive tasks and reduces manual errors</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Complexity */}
                

                {/* Estimated ROI */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Expected Returns</h3>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Estimated ROI</div>
                      <div className="text-gray-600 text-sm">+90% efficiency improvement within 6 months</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: Technical Details */}
              <TabsContent value="technical" className="mt-0 space-y-6">
                {/* Integrations */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Available Integrations</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {integrations.map((integration, index) => <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        
                        <span className="font-medium">{integration.name}</span>
                      </div>)}
                  </div>
                </div>

                {/* Onboarding Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Onboarding & Support</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Dedicated onboarding specialist included</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">24/7 customer support available</span>
                    </div>
                  </div>
                </div>

                {/* Additional Specs */}
                
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer - Actions */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-center">
            <Button className="bg-[#305CDE] hover:bg-[#2847b8] px-8">
              <Globe className="w-4 h-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ToolDetailModal;