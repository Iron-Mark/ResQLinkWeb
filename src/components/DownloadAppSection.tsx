import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Download,
  Smartphone,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "AI-Powered Triage",
    description: "Smart disaster assessment and response coordination",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Offline-First",
    description: "Works even without an internet connection",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Real-Time Coordination",
    description: "Seamless multi-agency collaboration tools",
  },
];

export function DownloadAppSection() {
  return (
    <section
      id="download"
      className="py-32 bg-gradient-to-br from-[#0a0a08] via-[#161613] to-[#1a1a17] relative"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-[#e0eaff] border-[#e0eaff]/30 backdrop-blur-sm px-6 py-3">
            <Download className="h-4 w-4 mr-2" />
            Download the App
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-[#fefdf5] mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
              Get ResQLink Now
            </span>
          </h2>
          <p className="text-xl text-[#e0eaff]/70 max-w-3xl mx-auto leading-relaxed">
            Download ResQLink and be prepared for when disaster strikes.
            Available on Android devices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Download CTA */}
          <div className="text-center lg:text-left flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {/* Download APK button */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none"></div>
                <Button
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/open?id=1-dKhWDNAa9fW0pK6UyLdinbitGvq-Px3&usp=drive_fs",
                      "_blank"
                    )
                  }
                  className="relative w-full bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 hover:from-red-600 hover:via-blue-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:shadow-red-500/25 transition-all duration-500 px-12 py-8 text-2xl rounded-xl group-hover:scale-105 transform font-bold tracking-wide overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <Smartphone className="h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Download for Android</span>
                    <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Button>
              </div>

              {/* Web app button */}
              <Button
                onClick={() => window.open("https://web.resqlink.org/", "_blank")}
                className="w-full bg-[#e0eaff]/10 hover:bg-[#e0eaff]/20 text-[#e0eaff] border border-[#e0eaff]/30 hover:border-[#e0eaff]/60 shadow-xl transition-all duration-300 px-12 py-6 text-lg rounded-xl font-semibold backdrop-blur-sm"
              >
                <Monitor className="h-6 w-6 mr-3" />
                Open Web App
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </div>

            {/* Supporting text */}
            <p className="text-[#e0eaff]/80 text-lg leading-relaxed text-center">
              Free to download. By installing, you agree to our{" "}
              <a
                href="https://docs.google.com/document/d/1bHPoCklvACR09gyAlMIzFnG7lGe79Iw53ui-Lj3SV4g/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold decoration-white"
              >
                Terms &amp; Services.
              </a>
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#fefdf5] mb-6">
                <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
                  What You Get
                </span>
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-6 bg-gradient-to-br from-[#e0eaff]/10 to-[#e0eaff]/5 backdrop-blur-sm border border-[#e0eaff]/20 rounded-2xl hover:border-[#e0eaff]/40 transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg flex-shrink-0">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#fefdf5] mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-[#e0eaff]/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-[#161613]/60 to-[#0a0a08]/40 backdrop-blur-sm border border-[#e0eaff]/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#fefdf5] mb-4 text-center">
                Our partners
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">2</div>
                  <div className="text-[#e0eaff]/70 text-sm">
                    Local Gov't Units
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    2
                  </div>
                  <div className="text-[#e0eaff]/70 text-sm">Academic Orgs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    1
                  </div>
                  <div className="text-[#e0eaff]/70 text-sm">Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
