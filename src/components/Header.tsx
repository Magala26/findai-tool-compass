
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#305CDE] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900">FindAI</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-[#305CDE] transition-colors">Tools</a>
          <a href="#" className="text-gray-600 hover:text-[#305CDE] transition-colors">Categories</a>
          <a href="#" className="text-gray-600 hover:text-[#305CDE] transition-colors">About</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm" className="bg-[#305CDE] hover:bg-[#2847b8]">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
