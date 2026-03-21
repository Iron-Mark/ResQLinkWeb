import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  AlertTriangle,
  MapPin,
  Clock,
  Users,
  Truck,
  Activity,
  CheckCircle,
  AlertCircle,
  FlaskConical,
  X,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { useDemoMode } from "../context/DemoModeContext";
import { useScenarioPlayback, formatAgeLabel, type IncidentSeverity, type IncidentStatus } from "../hooks/useScenarioPlayback";

const getSeverityColor = (severity: IncidentSeverity | string) => {
  switch (severity) {
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: IncidentStatus | string) => {
  switch (status) {
    case "Active":
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case "Responding":
      return <Activity className="h-4 w-4 text-orange-600" />;
    case "Contained":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "Resolved":
      return <CheckCircle className="h-4 w-4 text-blue-400" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export function DashboardPreview() {
  const { isDemoActive, toggleDemo } = useDemoMode();
  const { incidents, kpis, resources, elapsedSeconds } = useScenarioPlayback(isDemoActive);

  const criticalCount = incidents.filter(
    (i) => i.severity === "Critical" && i.status !== "Resolved"
  ).length;

  // Show only the most recent 5 incidents in the list (sorted newest first)
  const visibleIncidents = [...incidents]
    .filter((i) => i.status !== "Resolved")
    .sort((a, b) => a.ageSeconds - b.ageSeconds)
    .slice(0, 5);

  const progressSeconds = isDemoActive ? elapsedSeconds % 300 : 0;

  return (
    <section
      id="dashboard"
      className="py-20 bg-linear-to-br from-[#0a0a08] via-[#161613] to-[#1f1f1c]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#fefdf5] mb-6 tracking-tight">
            Unified Command Dashboard
          </h2>
          <p className="text-xl text-[#e0eaff]/80 max-w-3xl mx-auto leading-relaxed">
            Real-time operational overview for Local Government Units to
            coordinate multi-agency disaster response efforts effectively.
          </p>

          {/* Demo Mode toggle CTA */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={toggleDemo}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                isDemoActive
                  ? "border-green-400/60 bg-green-400/10 text-green-300 hover:bg-green-400/20"
                  : "border-[#e0eaff]/20 bg-[#e0eaff]/5 text-[#e0eaff]/70 hover:bg-[#e0eaff]/10 hover:border-[#e0eaff]/40"
              }`}
            >
              <FlaskConical className="h-4 w-4" />
              {isDemoActive ? "Exit Demo Mode" : "Try Live Demo Simulation"}
            </button>
          </div>
        </div>

        {/* DEMO MODE ACTIVE banner */}
        {isDemoActive && (
          <div className="mb-6 relative overflow-hidden rounded-xl border border-green-400/30 bg-green-400/5 backdrop-blur-md px-5 py-3 flex items-center justify-between">
            {/* Animated scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 left-0 h-full w-1 bg-green-400/30"
                style={{
                  transform: `translateX(${(progressSeconds / 300) * 100}%)`,
                  transition: "transform 1s linear",
                  width: "2px",
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-green-300 font-semibold text-sm tracking-wide uppercase">
                Demo Mode Active
              </span>
              <span className="text-[#e0eaff]/40 text-xs">
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
                className="text-[#e0eaff]/40 hover:text-[#e0eaff]/80 transition-colors"
                aria-label="Exit demo mode"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* KPI strip — only visible in Demo Mode */}
        {isDemoActive && (
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Ongoing Missions",
                value: kpis.ongoingMissions,
                icon: <ShieldAlert className="h-4 w-4 text-orange-400" />,
                color: "text-orange-400",
              },
              {
                label: "Active Responders",
                value: kpis.activeResponders,
                icon: <Users className="h-4 w-4 text-blue-400" />,
                color: "text-blue-400",
              },
              {
                label: "Pending Cases",
                value: kpis.pendingCases,
                icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
                color: "text-red-400",
              },
              {
                label: "Resolved Today",
                value: kpis.resolvedToday,
                icon: <TrendingUp className="h-4 w-4 text-green-400" />,
                color: "text-green-400",
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/10 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                {kpi.icon}
                <div>
                  <div className={`text-2xl font-bold tabular-nums ${kpi.color}`}>
                    {kpi.value}
                  </div>
                  <div className="text-[#e0eaff]/40 text-xs">{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Incidents */}
          <div className="lg:col-span-2">
            <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    Active Incidents
                    {isDemoActive && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </CardTitle>
                  <Badge className="bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg">
                    {criticalCount} Critical
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {visibleIncidents.length === 0 && isDemoActive ? (
                  <div className="text-center py-8 text-[#e0eaff]/30 text-sm">
                    Scenario starting… first incidents spawn at T+0:30
                  </div>
                ) : (
                  visibleIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="bg-[#0a0a08]/60 backdrop-blur-sm border border-[#e0eaff]/10 rounded-xl p-4 hover:border-[#e0eaff]/30 hover:bg-[#0a0a08]/80 transition-all duration-300"
                      style={{
                        animation: incident.ageSeconds < 2 && isDemoActive
                          ? "fadeInDown 0.4s ease"
                          : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(incident.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[#fefdf5] font-medium">
                                {incident.id}
                              </span>
                              <Badge className={getSeverityColor(incident.severity)}>
                                {incident.severity}
                              </Badge>
                            </div>
                            <p className="text-[#e0eaff]/70 text-sm">
                              {incident.type}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[#e0eaff] border-[#e0eaff]/30 bg-[#e0eaff]/10"
                        >
                          {incident.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-[#e0eaff]/60">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {incident.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {isDemoActive
                              ? formatAgeLabel(incident.ageSeconds)
                              : "recently"}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {incident.responders > 0
                            ? `${incident.responders} responders`
                            : "unassigned"}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                <Button className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white mt-4 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                  View All Incidents
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resource Status */}
          <div className="space-y-8">
            <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#fefdf5] flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-400" />
                  Resource Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources.map((resource, index) => {
                  const deployedPercentage =
                    (resource.deployed / resource.total) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#fefdf5]">{resource.name}</span>
                        <span className="text-[#e0eaff]/60">
                          {resource.deployed}/{resource.total}
                        </span>
                      </div>
                      <Progress
                        value={deployedPercentage}
                        className="h-2 bg-[#0a0a08]/60"
                      />
                      <p className="text-xs text-[#e0eaff]/50">
                        {resource.available} available
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#fefdf5]">
                  AI Analysis Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#0a0a08]/60 backdrop-blur-sm border border-[#e0eaff]/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-green-400 text-sm font-medium">
                      {isDemoActive ? "Simulation Active..." : "Analyzing Situation..."}
                    </span>
                  </div>
                  <p className="text-[#e0eaff]/70 text-sm leading-relaxed">
                    {isDemoActive
                      ? `Scenario: Typhoon Luzon Response — ${incidents.filter((i) => i.status !== "Resolved").length} active incident${incidents.length !== 1 ? "s" : ""} tracked.`
                      : "Processing satellite data, weather patterns, and social media reports for predictive insights."}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Weather Data</span>
                    <span className="text-green-400">✓ Updated</span>
                  </div>
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Satellite Imagery</span>
                    <span className="text-green-400">✓ Processing</span>
                  </div>
                  <div className="flex justify-between text-[#e0eaff]/60">
                    <span>Social Monitoring</span>
                    <span className="text-yellow-400">● Active</span>
                  </div>
                  {isDemoActive && (
                    <div className="flex justify-between text-[#e0eaff]/60">
                      <span>Demo Engine</span>
                      <span className="text-green-400 animate-pulse">● Running</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Keyframe for new incident spawn animation */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
