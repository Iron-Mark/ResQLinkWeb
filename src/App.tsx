import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FeaturesShowcase } from "./components/FeaturesShowcase";
import { AITriageFlow } from "./components/AITriageFlow";
import { PlatformOverview } from "./components/PlatformOverview";
import { SDGSection } from "./components/SDGSection";
import { DownloadAppSection } from "./components/DownloadAppSection";
import AchievementSection from "./components/Achievements";
import { DashboardPreview } from "./components/DashboardPreview";
import { useEffect } from "react";
import { updateSEO, DEFAULT_SEO } from "./utils/seo";
import { DemoModeProvider } from "./context/DemoModeContext";

export default function App() {
  useEffect(() => {
    // Update SEO for home page
    updateSEO(DEFAULT_SEO.home);
  }, []);
  return (
    <DemoModeProvider>
    <div className="w-screen overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      <AchievementSection />

      {/* Features Section */}
      <FeaturesShowcase />

      {/* AI Triage Flow */}
      <AITriageFlow />

      {/* LGU Command Dashboard Preview with Demo Mode */}
      <DashboardPreview />

      {/* Platform Overview */}
      <section id="platforms">
        <PlatformOverview />
      </section>

      {/* SDG Section */}
      <section id="sdg">
        <SDGSection />
      </section>

      {/* Download App Section */}
      <DownloadAppSection />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 bg-linear-to-br from-[#0a0a08] via-[#161613] to-[#1a1a17] relative"
      >
        {/* Background decorations */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-linear-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-[#fefdf5] mb-8 tracking-tight">
            <span className="bg-linear-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
              Get Started Today
            </span>
          </h2>
          <p className="text-xl text-[#e0eaff]/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            Partner with us to build resilient disaster response capabilities
            for your community
          </p>

          <div className="bg-linear-to-br from-[#161613]/80 to-[#0a0a08]/60 backdrop-blur-md border border-[#e0eaff]/20 rounded-3xl shadow-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="group">
                <div className="bg-linear-to-r from-red-500 to-red-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#fefdf5] mb-3 group-hover:text-[#e0eaff] transition-colors duration-300">
                  Emergency Hotline
                </h3>
                <p className="text-4xl font-bold text-red-400 mb-2">911</p>
                <p className="text-[#e0eaff]/60">Available 24/7</p>
              </div>

              <div className="group">
                <div className="bg-linear-to-r from-blue-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#fefdf5] mb-3 group-hover:text-[#e0eaff] transition-colors duration-300">
                  Technical Support
                </h3>
                <p className="text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer font-medium">
                  jvillarosa.a12240987@umak.edu.ph
                </p>
                <p className="text-[#e0eaff]/60">Project Manager</p>
              </div>

              <div className="group">
                <div className="bg-linear-to-r from-purple-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#fefdf5] mb-3 group-hover:text-[#e0eaff] transition-colors duration-300">
                  Partnership Inquiries
                </h3>
                <p className="text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer font-medium">
                  mcuizon.a12241782@umak.edu.ph
                </p>
                <p className="text-[#e0eaff]/60">For LGUs and organizations</p>
              </div>
            </div>

            <div className="border-t border-[#e0eaff]/20 pt-8">
              <p className="text-[#e0eaff]/70 mb-6 leading-relaxed text-lg">
                ResQLink is developed for our Undergraduate Thesis, under the
                <a
                  target="_blank"
                  href="https://www.umak.edu.ph/academics/college/ccis/"
                  className="text-green-400 font-bold"
                >
                  {" "}
                  College of Computing and Information Sciences
                </a>
                , at the University of Makati. In partnership with{" "}
                <strong>UMak KALASAG DRRM</strong>.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-[#e0eaff]/50">
                <span>© 2026 ResQLink Platform</span>
                <span className="hover:text-[#e0eaff]/70 transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </span>
                <span className="hover:text-[#e0eaff]/70 transition-colors duration-300 cursor-pointer">
                  Terms and Conditions
                </span>
                <span className="hover:text-[#e0eaff]/70 transition-colors duration-300 cursor-pointer">
                  Data Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </DemoModeProvider>
  );
}
