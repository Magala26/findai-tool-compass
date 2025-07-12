import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  return <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#305CDE] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900">FindAI</span>
        </div>
        
        
        
        
      </div>
    </header>;
};
export default Header;