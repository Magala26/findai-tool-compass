
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: string;
  complexity: number;
  logo: string;
  onLearnMore: (tool: any) => void;
}

const ToolCard = ({ id, name, description, category, rating, price, complexity, logo, onLearnMore }: ToolCardProps) => {
  const tool = { id, name, description, category, rating, price, complexity, logo };
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-xl font-bold text-[#305CDE]">{logo}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#305CDE] transition-colors">{name}</h3>
              <p className="text-sm text-gray-500">{category}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">({rating})</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${i < complexity ? 'bg-[#305CDE]' : 'bg-gray-200'}`} 
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">{price}</span>
          <Button 
            size="sm" 
            className="bg-[#305CDE] hover:bg-[#2847b8]"
            onClick={() => onLearnMore(tool)}
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
