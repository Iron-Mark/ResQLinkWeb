import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Menu,
  X,
  FacebookIcon,
  Phone,
  Monitor,
} from "lucide-react";
import { useState, useEffect } from "react";
import resqLinkLogo from '../assets/logos/resqlink-android-icon-adaptive.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "platforms", "sdg", "waitlist"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Home", id: "hero" },
    { href: "#features", label: "Features", id: "features" },
    { href: "#platforms", label: "Platforms", id: "platforms" },
    { href: "#sdg", label: "SDG Impact", id: "sdg" },
    { href: "#waitlist", label: "Join Waitlist", id: "waitlist" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a08]/80 backdrop-blur-xl border-b border-[#e0eaff]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:bg-blue-500/40 transition-all duration-500"></div>
              <img
                src={resqLinkLogo}
                alt=""
                className="h-8 w-8 relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#fefdf5] font-bold text-xl tracking-tight leading-none">
                ResQLink
              </span>
              <span className="text-[10px] text-[#e0eaff]/50 font-medium tracking-[0.2em] uppercase mt-1">
                Emergency Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#hero"
              className="text-[#fefdf5] hover:text-[#e0eaff] transition-all duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0eaff] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#features"
              className="text-[#fefdf5] hover:text-[#e0eaff] transition-all duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0eaff] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#platforms"
              className="text-[#fefdf5] hover:text-[#e0eaff] transition-all duration-300 relative group"
            >
              Platforms
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0eaff] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#sdg"
              className="text-[#fefdf5] hover:text-[#e0eaff] transition-all duration-300 relative group"
            >
              SDG Impact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0eaff] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#download"
              className="text-[#fefdf5] hover:text-[#e0eaff] transition-all duration-300 relative group"
            >
              Download App
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0eaff] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              size="sm"
              className="bg-transparent text-[#e0eaff]/70 border border-[#e0eaff]/20 hover:text-[#e0eaff] hover:border-[#e0eaff]/50 hover:bg-transparent rounded-full px-5 shadow-none cursor-pointer"
              onClick={() => window.open("https://web.resqlink.org/", "_blank")}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Open Web App
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-[#fefdf5] bg-transparent border-[#e0eaff]/20 hover:border-[#e0eaff]/50 hover:bg-[#e0eaff]/5 rounded-full px-6"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/resqlink.umak",
                  "_blank"
                )
              }
            >
              <FacebookIcon className="h-4 w-4 mr-2 text-blue-400" />
              Community
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#fefdf5] border-[#e0eaff]/30 hover:bg-[#e0eaff]/10"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#161613]/98 backdrop-blur-md border-t border-[#e0eaff]/10">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#hero"
              className="block text-[#fefdf5] hover:text-[#e0eaff] py-2 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#features"
              className="block text-[#fefdf5] hover:text-[#e0eaff] py-2 transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#platforms"
              className="block text-[#fefdf5] hover:text-[#e0eaff] py-2 transition-colors duration-300"
            >
              Platforms
            </a>
            <a
              href="#sdg"
              className="block text-[#fefdf5] hover:text-[#e0eaff] py-2 transition-colors duration-300"
            >
              SDG Impact
            </a>
            <a
              href="#download"
              className="block text-[#fefdf5] hover:text-[#e0eaff] py-2 transition-colors duration-300"
            >
              Download App
            </a>

            <div className="pt-4 border-t border-[#e0eaff]/10 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-[#e0eaff] bg-[#e0eaff]/10 border-[#e0eaff]/30 hover:bg-[#e0eaff]/20 cursor-pointer"
                onClick={() => window.open("https://web.resqlink.org/", "_blank")}
              >
                <Monitor className="h-4 w-4 mr-1" />
                Open Web App
              </Button>
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg cursor-pointer">
                <Phone className="h-4 w-4 mr-1" />
                Emergency Hotline
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
