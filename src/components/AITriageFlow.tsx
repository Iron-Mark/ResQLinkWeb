import React from "react";
import {
  Brain,
  FileText,
  BarChart3,
  MapPin,
  Camera,
  Clock,
  Zap,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

/* ─── Step data ──────────────────────────────────────────────── */

const steps = [
  {
    id: "01",
    title: "Report Submission",
    description:
      "Citizens submit emergency reports with location, photos, and description via one-tap mobile interface.",
    Icon: FileText,
    accent: "blue" as const,
    tags: [
      { Icon: MapPin, label: "Auto GPS" },
      { Icon: Camera, label: "Photo docs" },
      { Icon: Clock, label: "Timestamped" },
    ],
    terminal: {
      filename: "report.json",
      rows: [
        { key: "lat", value: "14.5547° N", tone: "default" as const },
        { key: "lng", value: "121.0244° E", tone: "default" as const },
        { key: "type", value: "FIRE · SEVERE", tone: "danger" as const },
        { key: "media", value: "3 photos · verified", tone: "muted" as const },
        { key: "status", value: "→ submitted", tone: "success" as const },
      ],
    },
  },
  {
    id: "02",
    title: "AI Summarization",
    description:
      "Machine learning analyzes text, interprets images, and cross-references history to generate risk profiles.",
    Icon: Brain,
    accent: "violet" as const,
    tags: [
      { Icon: Zap, label: "Instant analysis" },
      { Icon: FileText, label: "Key facts" },
      { Icon: BarChart3, label: "Risk score" },
    ],
    terminal: {
      filename: "ai_output.json",
      rows: [
        { key: "risk", value: "CRITICAL", tone: "danger" as const },
        { key: "conf", value: "97.3%", tone: "default" as const },
        { key: "victims", value: "~12 estimated", tone: "warn" as const },
        { key: "responders", value: "4 units required", tone: "default" as const },
        { key: "summary", value: '"Structure fire, 3rd floor…"', tone: "muted" as const },
      ],
    },
  },
  {
    id: "03",
    title: "Smart Reranking",
    description:
      "Intelligent ranking weighs severity, resource proximity, and real-time conditions to dispatch optimally.",
    Icon: BarChart3,
    accent: "red" as const,
    tags: [
      { Icon: AlertTriangle, label: "Priority score" },
      { Icon: MapPin, label: "Proximity" },
      { Icon: Clock, label: "Time-critical" },
    ],
    queue: [
      { label: "Fire — Brgy. Poblacion", score: 94, color: "bg-red-500" },
      { label: "Flood — Brgy. Sta. Ana", score: 71, color: "bg-amber-500" },
      { label: "Medical — Brgy. Tejeros", score: 58, color: "bg-blue-500" },
    ],
  },
];

/* ─── Token maps ─────────────────────────────────────────────── */

const accentTokens = {
  blue: {
    border: "border-blue-500/25",
    hoverBorder: "hover:border-blue-500/50",
    hoverShadow: "hover:shadow-blue-500/[0.08]",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/25",
    iconText: "text-blue-400",
    pill: "text-blue-400 bg-blue-500/[0.08] border-blue-500/20",
    bar: "bg-blue-500",
    termKey: "text-blue-400/50",
    topBar: "from-blue-500/60 via-blue-500/30 to-transparent",
  },
  violet: {
    border: "border-violet-500/25",
    hoverBorder: "hover:border-violet-500/50",
    hoverShadow: "hover:shadow-violet-500/[0.08]",
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/25",
    iconText: "text-violet-400",
    pill: "text-violet-400 bg-violet-500/[0.08] border-violet-500/20",
    bar: "bg-violet-500",
    termKey: "text-violet-400/50",
    topBar: "from-violet-500/60 via-violet-500/30 to-transparent",
  },
  red: {
    border: "border-red-500/25",
    hoverBorder: "hover:border-red-500/50",
    hoverShadow: "hover:shadow-red-500/[0.08]",
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/25",
    iconText: "text-red-400",
    pill: "text-red-400 bg-red-500/[0.08] border-red-500/20",
    bar: "bg-red-500",
    termKey: "text-red-400/50",
    topBar: "from-red-500/60 via-red-500/30 to-transparent",
  },
} as const;

const toneCls = {
  default: "text-[#fefdf5]/80",
  muted: "text-[#e0eaff]/45",
  danger: "text-red-400 font-semibold",
  warn: "text-amber-400",
  success: "text-emerald-400",
};

/* ─── Component ──────────────────────────────────────────────── */

export function AITriageFlow() {
  return (
    <section className="py-28 bg-[#0d0d0b] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-violet-500/[0.04] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 bg-violet-500/[0.08] border border-violet-500/20 px-3.5 py-1.5 rounded-full mb-5">
            <Brain className="h-3.5 w-3.5" />
            AI-Powered Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#fefdf5] tracking-tight leading-[1.1] mb-4">
            Actionable Intelligence
          </h2>
          <p className="text-base text-[#e0eaff]/55 leading-relaxed max-w-xl">
            Three-step AI pipeline that transforms raw emergency reports into
            prioritized, dispatch-ready intelligence — in seconds.
          </p>
        </div>

        {/* ── Flow indicator ── */}
        <div className="hidden lg:flex items-center gap-0 mb-8 px-1">
          {steps.map((step, i) => {
            const t = accentTokens[step.accent];
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full ${t.iconBg} border ${t.iconBorder} flex items-center justify-center`}>
                    <span className={`text-[10px] font-mono font-bold ${t.iconText}`}>{step.id}</span>
                  </div>
                  <span className="text-sm font-medium text-[#fefdf5]/70">{step.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 flex items-center gap-1 mx-4">
                    <div className="flex-1 h-px bg-[#e0eaff]/[0.06]" />
                    <ChevronRight className="h-3.5 w-3.5 text-[#e0eaff]/20 shrink-0" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => {
            const t = accentTokens[step.accent];
            return (
              <div
                key={step.id}
                className={`group relative bg-[#111110] border ${t.border} ${t.hoverBorder} ${t.hoverShadow} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`}
              >
                {/* Left accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${t.topBar}`} />

                {/* Watermark step number */}
                <div className="absolute top-3 right-5 text-[80px] font-black text-[#fefdf5]/[0.025] select-none pointer-events-none leading-none tracking-tighter">
                  {step.id}
                </div>

                <div className="relative p-7 flex flex-col h-full">

                  {/* Icon + step badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`${t.iconBg} border ${t.iconBorder} rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-105`}>
                      <step.Icon className={`h-5 w-5 ${t.iconText}`} />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold tracking-wider ${t.pill} border px-2.5 py-1 rounded-full`}>
                      STEP {step.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#fefdf5] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#e0eaff]/50 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {step.tags.map(({ Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#e0eaff]/50 bg-[#e0eaff]/[0.04] border border-[#e0eaff]/[0.07] px-2.5 py-1 rounded-full"
                      >
                        <Icon className="h-3 w-3 shrink-0" />
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Terminal / Queue preview */}
                  <div className="mt-auto bg-[#0a0a09] border border-[#e0eaff]/[0.05] rounded-xl overflow-hidden">
                    {/* Window chrome */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#e0eaff]/[0.05]">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/40" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                      {"terminal" in step && (
                        <span className="ml-2 text-[10px] font-mono text-[#e0eaff]/20">
                          {step.terminal.filename}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      {"terminal" in step ? (
                        /* Key-value terminal rows */
                        <div className="space-y-1.5">
                          {step.terminal.rows.map((row) => (
                            <div key={row.key} className="flex items-baseline gap-3 font-mono text-xs">
                              <span className={`${t.termKey} w-16 shrink-0`}>{row.key}</span>
                              <span className={toneCls[row.tone]}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Priority bar chart */
                        <div className="space-y-3">
                          {step.queue.map((item, i) => (
                            <div key={item.label} className="flex items-center gap-2.5">
                              <span className="font-mono text-[10px] text-[#e0eaff]/30 w-5 shrink-0">
                                #{i + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] text-[#fefdf5]/60 mb-1 truncate leading-none">
                                  {item.label}
                                </div>
                                <div className="h-1.5 bg-[#e0eaff]/[0.05] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                    style={{ width: `${item.score}%` }}
                                  />
                                </div>
                              </div>
                              <span className="font-mono text-[11px] text-[#e0eaff]/40 shrink-0 w-6 text-right">
                                {item.score}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer callout ── */}
        <div className="mt-10 flex items-start gap-4 bg-[#111110] border border-[#e0eaff]/[0.07] rounded-2xl px-7 py-5">
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-2.5 shrink-0 mt-0.5">
            <Brain className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#fefdf5] mb-1">
              Continuous Learning &amp; Optimization
            </p>
            <p className="text-sm text-[#e0eaff]/45 leading-relaxed max-w-3xl">
              The AI pipeline continuously learns from response outcomes — improving
              triage accuracy, reducing dispatch latency, and adapting to local
              disaster patterns over time.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
