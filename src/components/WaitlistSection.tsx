import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Mail,
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
  Globe,
} from "lucide-react";

const benefits = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Early Access",
    description: "Be among the first to experience ResQLink's features",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Beta Testing",
    description: "Help shape the platform with your feedback and insights",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Priority Support",
    description: "Dedicated onboarding and training for early adopters",
  },
];

export function WaitlistSection() {
  const [isLoading, setIsLoading] = useState(false);

  // called on native form submit to show loading state while allowing
  // the browser to submit the form to the external action URL
  const onFormSubmit = (_e: FormEvent) => {
    // do not call preventDefault() so the browser performs the native submit
    setIsLoading(true);
  };

  return (
    <section
      id="waitlist"
      className="py-32 bg-gradient-to-br from-[#0a0a08] via-[#161613] to-[#1a1a17] relative"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-[#e0eaff] border-[#e0eaff]/30 backdrop-blur-sm px-6 py-3">
            <Mail className="h-4 w-4 mr-2" />
            Join the Waitlist
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-[#fefdf5] mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
              Be First to Experience ResQLink
            </span>
          </h2>
          <p className="text-xl text-[#e0eaff]/70 max-w-3xl mx-auto leading-relaxed">
            Help our team shape the future of disaster response technology in
            the Philippines!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero CTA */}
          <div className="text-center lg:text-left flex flex-col gap-4">
            <form
              method="post"
              action="https://listmonk.resqlink.org/subscription/form"
              onSubmit={onFormSubmit}
            >
              <div className="flex flex-col gap-3">
                <input type="hidden" name="nonce" />
                <div className="w-full border-2 border-white flex flex-row items-center gap-4 px-4 rounded-lg">
                  <Mail className="w-8 h-8 text-white " />
                  <input
                    className=" w-full rounded-lg p-4 text-white focus:outline-0 "
                    type="email"
                    name="email"
                    placeholder="E-mail"
                  />
                </div>

                <p className="text-white">
                  <input
                    hidden
                    id="041d9"
                    type="checkbox"
                    name="l"
                    defaultChecked
                    value="041d992e-ee4a-4e3b-894f-fabfa506bc8c"
                  />
                </p>

                <div className="w-full border-2 border-white flex flex-row items-center gap-4 px-4 rounded-lg">
                  <Mail className="w-8 h-8 text-white " />
                  <input
                    className=" w-full rounded-lg p-4 text-white focus:outline-0 "
                    type="text"
                    name="name"
                    placeholder="Name (Optional)"
                  />
                </div>

                {/* removed duplicate native submit - the styled Button below is the primary submit */}
              </div>

              <div className="relative group mt-4">
                {/* Animated background glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none"></div>

                {/* Main button */}
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="relative w-full bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 hover:from-red-600 hover:via-blue-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:shadow-red-500/25 transition-all duration-500 px-12 py-8 text-2xl rounded-xl group-hover:scale-105 transform font-bold tracking-wide overflow-hidden"
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Joining Waitlist...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Join the Waitlist</span>
                        <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>

            {/* Supporting text */}
            <p className="text-[#e0eaff]/80 text-lg leading-relaxed text-center">
              By joining, you agree to our{" "}
              <a
                href="https://docs.google.com/document/d/1bHPoCklvACR09gyAlMIzFnG7lGe79Iw53ui-Lj3SV4g/edit?usp=sharing"
                target="_blank"
                className="underline font-bold decoration-white"
              >
                Terms & Services.
              </a>{" "}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#fefdf5] mb-6">
                <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
                  Early Access Benefits
                </span>
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-6 bg-gradient-to-br from-[#e0eaff]/10 to-[#e0eaff]/5 backdrop-blur-sm border border-[#e0eaff]/20 rounded-2xl hover:border-[#e0eaff]/40 transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg flex-shrink-0">
                      <div className="text-white">{benefit.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#fefdf5] mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-[#e0eaff]/70 leading-relaxed">
                        {benefit.description}
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
