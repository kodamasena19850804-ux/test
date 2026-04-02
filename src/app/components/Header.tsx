import { Button } from "./ui/button";
import { Menu, Heart } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-100 to-purple-100 border-b border-pink-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="size-6 text-pink-500 fill-pink-500" />
            <div className="text-2xl font-bold text-pink-600">パパ自慢サイト</div>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-6">
              <a href="#about" className="text-pink-700 hover:text-pink-900 transition-colors font-medium">
                パパについて
              </a>
              <a href="#features" className="text-pink-700 hover:text-pink-900 transition-colors font-medium">
                できること
              </a>
              <a href="#gallery" className="text-pink-700 hover:text-pink-900 transition-colors font-medium">
                思い出
              </a>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden text-pink-600">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}