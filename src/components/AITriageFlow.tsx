import { Brain, FileText, BarChart3, MapPin, Camera, Clock, Zap, AlertTriangle, ChevronRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Report Submission",
    description:
      "Citizens submit emergency reports with location, photos, and description via one-tap mobile interface.",
    icon: <FileText className="h-8 w-8" />,
    gradient: "from-blue-500 to-cyan-500",
    details: [
      { icon: <MapPin className="h-3.5 w-3.5" />, text: "Auto GPS location" },
      { icon: <Camera className="h-3.5 w-3.5" />, text: "Photo documentation" },
      { icon: <Clock className="h-3.5 w-3.5" />, text: "Timestamp capture" },
    ],
    longText:
      "One-tap reporting captures critical incident data including precise location coordinates, visual evidence, and initial severity indicators for immediate processing.",
  },
  {
    id: "02",
    title: "AI Summarization",
    description:
      "Machine learning processes and summarizes incident data for quick understanding and risk assessment.",
    icon: <Brain className="h-8 w-8" />,
    gradient: "from-purple-500 to-pink-500",
    details: [
      { icon: <Zap className="h-3.5 w-3.5" />, text: "Instant analysis" },
      { icon: <FileText className="h-3.5 w-3.5" />, text: "Key facts extraction" },
      { icon: <BarChart3 className="h-3.5 w-3.5" />, text: "Risk assessment" },
    ],
    longText:
      "Advanced AI algorithms analyze text descriptions, interpret images, and cross-reference historical data to generate comprehensive incident summaries and risk profiles.",
  },
  {
    id: "03",
    title: "Smart Reranking",
    description:
      "Dynamic priority assignment based on severity, resources, and real-time conditions for optimal dispatch.",
    icon: <BarChart3 className="h-8 w-8" />,
    gradient: "from-red-500 to-orange-500",
    details: [
      { icon: <AlertTriangle className="h-3.5 w-3.5" />, text: "Priority scoring" },
      { icon: <MapPin className="h-3.5 w-3.5" />, text: "Resource proximity" },
      { icon: <Clock className="h-3.5 w-3.5" />, text: "Time-sensitive factors" },
    ],
    longText:
      "Intelligent ranking considers injury severity, resource availability, weather conditions, and rescue team locations to optimize response efficiency across all active incidents.",
  },
];

export function AITriageFlow() {
  return (
    <section className="py-32 bg-gradient-to-br from-[#161613] via-[#1a1a17] to-[#0a0a08] relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-[#e0eaff]/20 backdrop-blur-sm text-[#e0eaff] text-sm font-medium px-5 py-2.5 rounded-full">
            <Brain className="h-4 w-4" />
            AI-Powered Intelligence
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#fefdf5] mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
              Actionable Intelligence
            </span>
          </h2>
          <p className="text-xl text-[#e0eaff]/70 max-w-3xl mx-auto leading-relaxed">
            Three-step AI process that transforms emergency reports into actionable intelligence for optimal response coordination
          </p>
        </div>

        {/* ── Flow connector (desktop) ── */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-10 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2.5">
                <div className={`bg-gradient-to-r ${step.gradient} w-8 h-8 rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-xs font-bold">{step.id}</span>
                </div>
                <span className="text-sm font-medium text-[#e0eaff]/60 whitespace-nowrap">{step.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center mx-4">
                  <div className="w-12 h-px bg-gradient-to-r from-[#e0eaff]/20 to-[#e0eaff]/10" />
                  <ChevronRight className="h-4 w-4 text-[#e0eaff]/20 -ml-1 shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Step cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="cursor-pointer group relative bg-gradient-to-br from-[#161613]/60 to-[#0a0a08]/40 backdrop-blur-sm border border-[#e0eaff]/10 rounded-3xl p-8 hover:border-[#e0eaff]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e0eaff]/5 overflow-hidden"
            >
              {/* Step number watermark */}
              <div className="absolute top-5 right-6 text-7xl font-black text-[#fefdf5]/[0.03] select-none pointer-events-none leading-none tracking-tighter">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`bg-gradient-to-r ${step.gradient} p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <div className="text-white">{step.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#fefdf5] mb-3 group-hover:text-[#e0eaff] transition-colors duration-300 relative z-10">
                {step.title}
              </h3>
              <p className="text-[#e0eaff]/70 leading-relaxed mb-6 relative z-10">
                {step.description}
              </p>

              {/* Detail bullets */}
              <div className="space-y-2.5 mb-6 relative z-10">
                {step.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#e0eaff]/60 group-hover:text-[#e0eaff]/80 transition-colors duration-300">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} shadow-lg shrink-0`} />
                    <span className="text-sm font-medium">{detail.text}</span>
                  </div>
                ))}
              </div>

              {/* Long description */}
              <p className="text-[#e0eaff]/45 text-sm leading-relaxed relative z-10">
                {step.longText}
              </p>

              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
              <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500 -z-10`} />
            </div>
          ))}
        </div>

        {/* ── Bottom callout ── */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-[#e0eaff]/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <Brain className="h-10 w-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#fefdf5] mb-3">
              Continuous Learning &amp; Optimization
            </h3>
            <p className="text-[#e0eaff]/65 leading-relaxed max-w-2xl mx-auto">
              Our AI pipeline continuously learns from response outcomes — improving triage accuracy,
              reducing dispatch latency, and adapting to local disaster patterns over time.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
