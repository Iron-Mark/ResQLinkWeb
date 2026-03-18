import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Menu,
  X,
  AlertTriangle,
  Users,
  Building2,
  Phone,
  Facebook,
  FacebookIcon,
} from "lucide-react";
import { useState } from "react";
import resqLinkLogo from '../assets/logos/resqlink-android-icon-adaptive.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={resqLinkLogo}
              alt=""
              className="h-6 w-6 text-white"
            />
            <span className="text-[#fefdf5] font-bold text-xl tracking-tight">
              ResQLink
            </span>
            <Badge
              variant="secondary"
              className="text-xs bg-[#e0eaff]/20 text-[#e0eaff] border-[#e0eaff]/30"
            >
              BETA
            </Badge>
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

          {/* User Type Selector & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[#fefdf5] bg-black border-[#e0eaff]/30 hover:border-[#e0eaff]/50 transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/resqlink.umak",
                    "_blank"
                  )
                }
              >
                <FacebookIcon className="h-4 w-4 mr-1" />
                Facebook Page
              </Button>
            </div>
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

            <div className="pt-4 border-t border-[#e0eaff]/10">
              <div className="space-y-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[#fefdf5] border-[#e0eaff]/30 hover:bg-[#e0eaff]/10"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Citizen Portal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[#fefdf5] border-[#e0eaff]/30 hover:bg-[#e0eaff]/10"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Rescuer Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[#fefdf5] border-[#e0eaff]/30 hover:bg-[#e0eaff]/10"
                >
                  <Building2 className="h-4 w-4 mr-1" />
                  LGU Command Center
                </Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg">
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
