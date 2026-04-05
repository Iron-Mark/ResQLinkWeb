import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  AlertTriangle,
  MapPin,
  Clock,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  FlaskConical,
  X,
  ShieldAlert,
  TrendingUp,
  Megaphone,
  Radio,
  UserCheck,
  Building2,
} from "lucide-react";
import { useDemoMode } from "../context/DemoModeContext";
import {
  useScenarioPlayback,
  formatAgeLabel,
  type IncidentSeverity,
  type IncidentStatus,
} from "../hooks/useScenarioPlayback";

type ActiveTab = "command" | "team" | "alerts";

// ── Static mock data ──────────────────────────────────────────────────────────

const MOCK_RESPONDERS = [
  { id: "R-001", name: "Dela Cruz, J.", role: "Rescue", status: "On Mission", assignment: "INC-001" },
  { id: "R-002", name: "Santos, M.",    role: "Medical", status: "Available",  assignment: null },
  { id: "R-003", name: "Reyes, A.",     role: "Rescue", status: "On Mission", assignment: "INC-002" },
  { id: "R-004", name: "Garcia, L.",    role: "Rescue", status: "On Break",   assignment: null },
  { id: "R-005", name: "Bautista, C.", role: "Medical", status: "On Mission", assignment: "INC-006" },
  { id: "R-006", name: "Torres, R.",    role: "Rescue", status: "Available",  assignment: null },
  { id: "R-007", name: "Flores, P.",    role: "Rescue", status: "Off Duty",   assignment: null },
  { id: "R-008", name: "Mendoza, E.",  role: "Medical", status: "Available",  assignment: null },
  { id: "R-009", name: "Ramos, B.",     role: "Rescue", status: "On Mission", assignment: "INC-004" },
  { id: "R-010", name: "Cruz, V.",      role: "Rescue", status: "Available",  assignment: null },
  { id: "R-011", name: "Villanueva, K.", role: "Medical", status: "On Break", assignment: null },
  { id: "R-012", name: "Aquino, D.",    role: "Rescue", status: "On Mission", assignment: "INC-009" },
];

const MOCK_BROADCASTS = [
  {
    id: "BC-001",
    title: "Typhoon Preparedness Alert",
    message: "All LGU units on full standby. Typhoon Signal No. 2 raised in Metro Manila. Avoid low-lying areas near riverbanks and esteros.",
    urgency: "Critical",
    sentAt: "14:30",
    recipients: 847,
    safe: 412,
    sentBy: "UMak KALASAG DRRM",
  },
  {
    id: "BC-002",
    title: "Mandatory Evacuation — Barangay 104",
    message: "Mandatory evacuation for all flood-prone zones in Bgry. 104 and 105. Proceed to the nearest designated evacuation center.",
    urgency: "High",
    sentAt: "13:15",
    recipients: 312,
    safe: 201,
    sentBy: "City Mayor's Office",
  },
  {
    id: "BC-003",
    title: "Medical Team Deployment Notice",
    message: "All medical personnel report to Rizal Park Evacuation Center by 16:00 for deployment briefing.",
    urgency: "Normal",
    sentAt: "12:00",
    recipients: 24,
    safe: 24,
    sentBy: "Health Department",
  },
];

const MOCK_EVAC_CENTERS = [
  { name: "Rizal Park Gymnasium",  capacity: 500, current: 342, status: "Open"      },
  { name: "Barangay 109 Hall",     capacity: 200, current: 198, status: "Near Full"  },
  { name: "UMak Main Gymnasium",   capacity: 800, current: 120, status: "Open"       },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

/** Status shape indicator matching the real app's WCAG 1.4.1 shape system */
const StatusShape = ({ status }: { status: string }) => {
  if (status === "Available")
    return <div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />;
  if (status === "On Mission")
    return (
      <div
        className="w-2.5 h-2.5 bg-blue-400 shrink-0"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      />
    );
  if (status === "On Break")
    return (
      <div
        className="w-2.5 h-2.5 bg-amber-400 shrink-0"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
      />
    );
  // Off Duty — square
  return <div className="w-2.5 h-2.5 rounded-sm bg-[#e0eaff]/25 shrink-0" />;
};

const getSeverityColor = (severity: IncidentSeverity | string) => {
  switch (severity) {
    case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "High":     return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "Medium":   return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:         return "bg-[#e0eaff]/10 text-[#e0eaff]/50 border-[#e0eaff]/20";
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "High":     return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:         return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  }
};

const getStatusIcon = (status: IncidentStatus | string) => {
  switch (status) {
    case "Active":     return <AlertTriangle className="h-4 w-4 text-red-400" />;
    case "Responding": return <Activity className="h-4 w-4 text-orange-400" />;
    case "Contained":  return <CheckCircle className="h-4 w-4 text-green-400" />;
    case "Resolved":   return <CheckCircle className="h-4 w-4 text-blue-400" />;
    default:           return <AlertCircle className="h-4 w-4 text-[#e0eaff]/40" />;
  }
};

// ── Main component ──────────────────────────────────────────────────────────────

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("command");
  const [expandedIncidentId, setExpandedIncidentId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { isDemoActive, toggleDemo } = useDemoMode();

  // Scroll section into view and switch to Command tab when demo activates
  useEffect(() => {
    if (isDemoActive) {
      setActiveTab("command");
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isDemoActive]);
  const { incidents, kpis, elapsedSeconds } = useScenarioPlayback(isDemoActive);

  const criticalCount = incidents.filter(
    (i) => i.severity === "Critical" && i.status !== "Resolved"
  ).length;

  // Sort by severity then age (mirrors the real app's AI triage reranking)
  const severityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const visibleIncidents = [...incidents]
    .filter((i) => i.status !== "Resolved")
    .sort((a, b) => {
      const sd = (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3);
      return sd !== 0 ? sd : a.ageSeconds - b.ageSeconds;
    })
    .slice(0, 5);

  const progressSeconds = isDemoActive ? elapsedSeconds % 300 : 0;

  const responderCounts = {
    available: MOCK_RESPONDERS.filter((r) => r.status === "Available").length,
    onMission: MOCK_RESPONDERS.filter((r) => r.status === "On Mission").length,
    onBreak:   MOCK_RESPONDERS.filter((r) => r.status === "On Break").length,
    offDuty:   MOCK_RESPONDERS.filter((r) => r.status === "Off Duty").length,
  };

  const tabs = [
    { id: "command" as const, label: "Command", icon: ShieldAlert },
    { id: "team"    as const, label: "Team",    icon: Users },
    { id: "alerts"  as const, label: "Alerts",  icon: Megaphone },
  ];

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      className="py-20 bg-linear-to-br from-[#0a0a08] via-[#161613] to-[#1f1f1c]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6 bg-[#e0eaff]/5 border border-[#e0eaff]/20 backdrop-blur-sm text-[#e0eaff] text-sm font-medium px-5 py-2.5 rounded-full">
            <ShieldAlert className="h-4 w-4 text-red-400" />
            LGU Command Center
          </div>
          <h2 className="text-5xl font-bold text-[#fefdf5] mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent">
              Unified Command Dashboard
            </span>
          </h2>
          <p className="text-xl text-[#e0eaff]/70 max-w-3xl mx-auto leading-relaxed">
            Real-time operational overview for Local Government Units to
            coordinate multi-agency disaster response efforts effectively.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={toggleDemo}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
                isDemoActive
                  ? "border-green-400/60 bg-green-400/10 text-green-300 hover:bg-green-400/20"
                  : "border-[#e0eaff]/20 bg-[#e0eaff]/5 text-[#e0eaff]/70 hover:bg-[#e0eaff]/10 hover:border-[#e0eaff]/40"
              }`}
            >
              <FlaskConical className="h-4 w-4" />
              {isDemoActive ? "Exit Demo Simulation" : "Try Live Demo Simulation"}
            </button>
          </div>
        </div>

        {/* ── Demo mode banner ── */}
        {isDemoActive && (
          <div className="mb-6 relative overflow-hidden rounded-xl border border-green-400/30 bg-green-400/5 backdrop-blur-md px-5 py-3 flex items-center justify-between">
            {/* Scan-line progress */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 h-full bg-green-400/25"
                style={{
                  left: `${(progressSeconds / 300) * 100}%`,
                  width: "2px",
                  transition: "left 1s linear",
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-green-300 font-semibold text-sm tracking-wide uppercase">
                Demo Mode Active
              </span>
              <span className="text-[#e0eaff]/40 text-xs hidden sm:inline">
                — Typhoon Luzon Response Simulation
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#e0eaff]/40 text-xs tabular-nums">
                T+{Math.floor(progressSeconds / 60).toString().padStart(2, "0")}:
                {(progressSeconds % 60).toString().padStart(2, "0")}
              </span>
              <button
                onClick={toggleDemo}
                className="text-[#e0eaff]/40 hover:text-[#e0eaff]/80 transition-colors cursor-pointer"
                aria-label="Exit demo mode"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── KPI strip — always visible, highlights when live ── */}
        <div className={`mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl transition-all duration-500 ${isDemoActive ? "p-2 bg-green-400/5 ring-1 ring-green-400/20" : ""}`}>
          {[
            { label: "Ongoing Missions",  value: kpis.ongoingMissions,  icon: <ShieldAlert className="h-4 w-4 text-orange-400" />, color: "text-orange-400" },
            { label: "Active Responders", value: kpis.activeResponders, icon: <Users className="h-4 w-4 text-blue-400" />,        color: "text-blue-400"   },
            { label: "Pending Cases",     value: kpis.pendingCases,     icon: <AlertTriangle className="h-4 w-4 text-red-400" />, color: "text-red-400"    },
            { label: "Resolved Today",    value: kpis.resolvedToday,    icon: <TrendingUp className="h-4 w-4 text-green-400" />, color: "text-green-400"  },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`backdrop-blur-md border rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-500 ${
                isDemoActive
                  ? "bg-[#161613]/90 border-green-400/20"
                  : "bg-[#161613]/80 border-[#e0eaff]/10"
              }`}
            >
              {kpi.icon}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className={`text-2xl font-bold tabular-nums ${kpi.color}`}>
                    {kpi.value}
                  </div>
                  {isDemoActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                  )}
                </div>
                <div className="text-[#e0eaff]/40 text-xs">{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tab bar ── */}
        <div className="mb-6 flex gap-1 bg-[#0a0a08]/60 border border-[#e0eaff]/10 rounded-2xl p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#161613] text-[#fefdf5] shadow-sm border border-[#e0eaff]/10"
                  : "text-[#e0eaff]/50 hover:text-[#e0eaff]/70"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            COMMAND TAB
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "command" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Priority Feed */}
            <div className="lg:col-span-2">
              <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#fefdf5] flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      Priority Feed
                      {isDemoActive && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg border-0">
                      {criticalCount} Critical
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {visibleIncidents.length === 0 && isDemoActive ? (
                    <div className="text-center py-8 text-[#e0eaff]/30 text-sm">
                      Scenario starting… first incidents spawn at T+0:30
                    </div>
                  ) : (
                    visibleIncidents.map((incident, idx) => {
                      const isExpanded = expandedIncidentId === incident.id;
                      return (
                        <div
                          key={incident.id}
                          className="bg-[#0a0a08]/60 backdrop-blur-sm border border-[#e0eaff]/10 rounded-xl p-4 hover:border-[#e0eaff]/25 hover:bg-[#0a0a08]/80 transition-all duration-300 cursor-pointer select-none"
                          style={{
                            animation:
                              incident.ageSeconds < 2 && isDemoActive
                                ? "fadeInDown 0.4s ease"
                                : undefined,
                          }}
                          onClick={() =>
                            setExpandedIncidentId(isExpanded ? null : incident.id)
                          }
                        >
                          {/* Header row */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3 min-w-0">
                              {getStatusIcon(incident.status)}
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                  <span className="text-[#fefdf5] font-semibold text-sm font-mono">
                                    {incident.id}
                                  </span>
                                  <Badge className={`${getSeverityColor(incident.severity)} text-xs border`}>
                                    {incident.severity}
                                  </Badge>
                                  {idx === 0 && (
                                    <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">
                                      AI: Top Priority
                                    </span>
                                  )}
                                </div>
                                <p className="text-[#e0eaff]/80 text-sm font-medium">
                                  {incident.type}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <Badge
                                variant="outline"
                                className="text-[#e0eaff]/70 border-[#e0eaff]/25 bg-[#e0eaff]/5 text-xs"
                              >
                                {incident.status}
                              </Badge>
                              <span className="text-[#e0eaff]/25 text-xs">
                                {isExpanded ? "▲" : "▼"}
                              </span>
                            </div>
                          </div>

                          {/* Location / time / responders */}
                          <div className="flex items-center justify-between text-xs text-[#e0eaff]/50">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {incident.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {isDemoActive
                                  ? formatAgeLabel(incident.ageSeconds)
                                  : "recently"}
                              </span>
                            </div>
                            <span
                              className={`flex items-center gap-1 ${
                                incident.responders > 0
                                  ? "text-green-400"
                                  : "text-red-400/70"
                              }`}
                            >
                              <Users className="h-3 w-3" />
                              {incident.responders > 0
                                ? `${incident.responders} deployed`
                                : "Unassigned"}
                            </span>
                          </div>

                          {/* Expanded detail */}
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-[#e0eaff]/10 space-y-3">
                              {/* AI summary preview */}
                              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                  <span className="text-purple-400 text-[10px] font-semibold uppercase tracking-wider">
                                    AI Triage Summary
                                  </span>
                                </div>
                                <p className="text-[#e0eaff]/60 text-xs leading-relaxed">
                                  {incident.severity === "Critical"
                                    ? `High-priority ${incident.type.toLowerCase()} incident. Immediate response required. ${incident.responders > 0 ? `${incident.responders} responders currently deployed.` : "Awaiting responder assignment."}`
                                    : `${incident.type} reported at ${incident.location}. ${incident.status === "Responding" ? "Response team en route." : "Awaiting field assessment."}`}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-[#e0eaff]/5 rounded-lg px-3 py-2">
                                  <div className="text-[#e0eaff]/40 mb-0.5">Priority Score</div>
                                  <div
                                    className={`font-bold ${
                                      incident.severity === "Critical"
                                        ? "text-red-400"
                                        : incident.severity === "High"
                                        ? "text-orange-400"
                                        : "text-yellow-400"
                                    }`}
                                  >
                                    {incident.severity === "Critical"
                                      ? "9.8 / 10"
                                      : incident.severity === "High"
                                      ? "7.2 / 10"
                                      : "4.5 / 10"}
                                  </div>
                                </div>
                                <div className="bg-[#e0eaff]/5 rounded-lg px-3 py-2">
                                  <div className="text-[#e0eaff]/40 mb-0.5">Assigned</div>
                                  <div
                                    className={
                                      incident.responders > 0
                                        ? "text-green-400 font-bold"
                                        : "text-red-400/70"
                                    }
                                  >
                                    {incident.responders > 0
                                      ? `${incident.responders} responders`
                                      : "None yet"}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  className="flex-1 py-1.5 rounded-lg bg-[#e0eaff]/5 border border-[#e0eaff]/15 text-[#e0eaff]/50 hover:bg-[#e0eaff]/10 hover:text-[#e0eaff]/80 transition-colors text-xs cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  View on Map
                                </button>
                                <button
                                  className="flex-1 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors text-xs cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Assign Responder
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}

                  <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white mt-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                    View All Reports
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right column: Responder Status + Evacuation Centers */}
            <div className="space-y-6">

              {/* Responder Status */}
              <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2 text-base">
                    <Users className="h-5 w-5 text-blue-400" />
                    Responder Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Available",  count: responderCounts.available,  color: "text-green-400"       },
                    { label: "On Mission", count: responderCounts.onMission,  color: "text-blue-400"        },
                    { label: "On Break",   count: responderCounts.onBreak,    color: "text-amber-400"       },
                    { label: "Off Duty",   count: responderCounts.offDuty,    color: "text-[#e0eaff]/30"    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <StatusShape status={item.label} />
                        <span className="text-[#e0eaff]/70 text-sm">{item.label}</span>
                      </div>
                      <span className={`font-bold tabular-nums ${item.color}`}>
                        {item.count}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#e0eaff]/10 flex justify-between text-xs text-[#e0eaff]/40">
                    <span>Total Roster</span>
                    <span className="text-[#fefdf5] font-semibold">{MOCK_RESPONDERS.length}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("team")}
                    className="w-full py-2 rounded-lg bg-[#e0eaff]/5 border border-[#e0eaff]/15 text-[#e0eaff]/50 hover:bg-[#e0eaff]/10 hover:text-[#e0eaff]/80 transition-colors text-xs cursor-pointer"
                  >
                    View Full Roster →
                  </button>
                </CardContent>
              </Card>

              {/* Evacuation Centers */}
              <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2 text-base">
                    <Building2 className="h-5 w-5 text-purple-400" />
                    Evacuation Centers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MOCK_EVAC_CENTERS.map((center) => {
                    const pct = Math.round((center.current / center.capacity) * 100);
                    return (
                      <div key={center.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#fefdf5] font-medium truncate max-w-[60%]">
                            {center.name}
                          </span>
                          <span
                            className={`font-semibold tabular-nums ${
                              pct >= 90
                                ? "text-red-400"
                                : pct >= 70
                                ? "text-amber-400"
                                : "text-green-400"
                            }`}
                          >
                            {center.current}/{center.capacity}
                          </span>
                        </div>
                        <Progress value={pct} className="h-1.5 bg-[#0a0a08]/60" />
                        <div className="flex justify-between text-[10px] text-[#e0eaff]/40">
                          <span>{pct}% capacity</span>
                          <span
                            className={
                              pct >= 90
                                ? "text-red-400"
                                : pct >= 70
                                ? "text-amber-400"
                                : "text-green-400"
                            }
                          >
                            {center.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TEAM TAB
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "team" && (
          <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-[#fefdf5] flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Field Responders
                </CardTitle>
                {/* Shape legend */}
                <div className="flex items-center gap-4 text-xs text-[#e0eaff]/40">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    Available
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 bg-blue-400"
                      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                    />
                    On Mission
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 bg-amber-400"
                      style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                    />
                    On Break
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-[#e0eaff]/25" />
                    Off Duty
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MOCK_RESPONDERS.map((r) => (
                  <div
                    key={r.id}
                    className="bg-[#0a0a08]/60 border border-[#e0eaff]/10 rounded-xl p-4 hover:border-[#e0eaff]/25 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <StatusShape status={r.status} />
                        <div>
                          <div className="text-[#fefdf5] font-semibold text-sm">
                            {r.name}
                          </div>
                          <div className="text-[#e0eaff]/30 text-xs font-mono">{r.id}</div>
                        </div>
                      </div>
                      <Badge
                        className={`text-[10px] border ${
                          r.role === "Rescue"
                            ? "bg-red-500/15 text-red-400 border-red-500/25"
                            : "bg-blue-500/15 text-blue-400 border-blue-500/25"
                        }`}
                      >
                        {r.role}
                      </Badge>
                    </div>

                    <div
                      className={`text-xs rounded-lg px-2.5 py-1.5 ${
                        r.status === "Available"
                          ? "bg-green-400/5 text-green-400/80 border border-green-400/15"
                          : r.status === "On Mission"
                          ? "bg-blue-400/5 text-blue-400/80 border border-blue-400/15"
                          : r.status === "On Break"
                          ? "bg-amber-400/5 text-amber-400/80 border border-amber-400/15"
                          : "bg-[#e0eaff]/5 text-[#e0eaff]/30 border border-[#e0eaff]/10"
                      }`}
                    >
                      {r.status === "On Mission" && r.assignment
                        ? `Mission: ${r.assignment}`
                        : r.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            ALERTS TAB
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "alerts" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Broadcast list */}
            <div className="lg:col-span-2">
              <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-orange-400" />
                    LGU Broadcasts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MOCK_BROADCASTS.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#0a0a08]/60 border border-[#e0eaff]/10 rounded-xl p-4 hover:border-[#e0eaff]/25 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <span className="text-[#fefdf5] font-semibold text-sm">
                            {b.title}
                          </span>
                          <Badge
                            className={`text-xs border shrink-0 ${getUrgencyColor(b.urgency)}`}
                          >
                            {b.urgency}
                          </Badge>
                        </div>
                        <span className="text-[#e0eaff]/30 text-xs shrink-0 ml-3">
                          {b.sentAt}
                        </span>
                      </div>

                      <p className="text-[#e0eaff]/60 text-xs leading-relaxed mb-3">
                        {b.message}
                      </p>

                      <div className="flex items-center justify-between text-xs text-[#e0eaff]/40 mb-3">
                        <span>
                          Sent by:{" "}
                          <span className="text-[#e0eaff]/60">{b.sentBy}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <span>{b.recipients.toLocaleString()} recipients</span>
                          <span className="text-green-400 font-medium">
                            ✓ {b.safe} safe
                          </span>
                        </div>
                      </div>

                      {/* I Am Safe response bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[#e0eaff]/30">
                          <span>I Am Safe responses</span>
                          <span>
                            {Math.round((b.safe / b.recipients) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(b.safe / b.recipients) * 100}
                          className="h-1 bg-[#0a0a08]/60"
                        />
                      </div>
                    </div>
                  ))}

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mt-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                    Send New Broadcast
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right column: I Am Safe pulse + Broadcast stats */}
            <div className="space-y-6">

              {/* I Am Safe Pulse */}
              <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2 text-base">
                    <UserCheck className="h-5 w-5 text-green-400" />
                    I Am Safe Pulse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-green-400 tabular-nums">
                      {MOCK_BROADCASTS[0].safe}
                    </div>
                    <div className="text-[#e0eaff]/40 text-xs mt-1">
                      of {MOCK_BROADCASTS[0].recipients} confirmed safe
                    </div>
                    <div className="text-[#e0eaff]/25 text-[10px] mt-0.5 truncate px-2">
                      {MOCK_BROADCASTS[0].title}
                    </div>
                  </div>
                  <Progress
                    value={
                      (MOCK_BROADCASTS[0].safe / MOCK_BROADCASTS[0].recipients) * 100
                    }
                    className="h-2 bg-[#0a0a08]/60 mb-4"
                  />
                  <div className="space-y-2 text-xs text-[#e0eaff]/50">
                    <div className="flex justify-between">
                      <span>Responded safe</span>
                      <span className="text-green-400 font-medium">
                        {MOCK_BROADCASTS[0].safe}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>No response yet</span>
                      <span className="text-amber-400">
                        {MOCK_BROADCASTS[0].recipients - MOCK_BROADCASTS[0].safe}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total recipients</span>
                      <span className="text-[#e0eaff]/70">
                        {MOCK_BROADCASTS[0].recipients}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Broadcast Stats */}
              <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2 text-base">
                    <Radio className="h-5 w-5 text-blue-400" />
                    Broadcast Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Total Today</span>
                    <span className="text-[#fefdf5] font-bold">
                      {MOCK_BROADCASTS.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Total Recipients</span>
                    <span className="text-[#fefdf5] font-bold">
                      {MOCK_BROADCASTS.reduce(
                        (s, b) => s + b.recipients,
                        0
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Safe Confirmations</span>
                    <span className="text-green-400 font-bold">
                      {MOCK_BROADCASTS.reduce((s, b) => s + b.safe, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Critical Alerts</span>
                    <span className="text-red-400 font-bold">
                      {MOCK_BROADCASTS.filter((b) => b.urgency === "Critical").length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
