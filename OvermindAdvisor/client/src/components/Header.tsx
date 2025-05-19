import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolling to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">Portfolio</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-150">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-150">
              About
            </a>
            <a href="#skills" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-150">
              Skills
            </a>
            <a href="#projects" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-150">
              Projects
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition duration-150">
              Contact
            </a>
          </nav>
          
          {/* CTA Button for Desktop */}
          <div className="hidden md:block">
            <Button variant="default" size="sm" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3">
            <div className="space-y-1 px-2 pb-3">
              <a 
                href="#home" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#projects" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Button className="w-full" onClick={() => setIsMenuOpen(false)} asChild>
                  <a href="#contact">Get in Touch</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
