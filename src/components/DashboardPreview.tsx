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
} from "lucide-react";

const mockIncidents = [
  {
    id: "INC-001",
    type: "Flood",
    severity: "Critical",
    location: "Marikina City",
    time: "2 min ago",
    status: "Active",
    responders: 8,
  },
  {
    id: "INC-002",
    type: "Landslide",
    severity: "High",
    location: "Baguio City",
    time: "15 min ago",
    status: "Responding",
    responders: 12,
  },
  {
    id: "INC-003",
    type: "Fire",
    severity: "Medium",
    location: "Quezon City",
    time: "1 hour ago",
    status: "Contained",
    responders: 6,
  },
];

const resources = [
  { name: "Rescue Teams", available: 24, deployed: 16, total: 40 },
  { name: "Medical Units", available: 8, deployed: 4, total: 12 },
  { name: "Supply Trucks", available: 15, deployed: 9, total: 24 },
  { name: "Evacuation Centers", available: 12, deployed: 8, total: 20 },
];

const getSeverityColor = (severity: string) => {
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Active":
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case "Responding":
      return <Activity className="h-4 w-4 text-orange-600" />;
    case "Contained":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export function DashboardPreview() {
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Incidents */}
          <div className="lg:col-span-2">
            <Card className="bg-[#161613]/80 backdrop-blur-md border border-[#e0eaff]/20 shadow-2xl rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#fefdf5] flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    Active Incidents
                  </CardTitle>
                  <Badge className="bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg">
                    {mockIncidents.filter((i) => i.status === "Active").length}{" "}
                    Critical
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockIncidents.map((incident, index) => (
                  <div
                    key={index}
                    className="bg-[#0a0a08]/60 backdrop-blur-sm border border-[#e0eaff]/10 rounded-xl p-4 hover:border-[#e0eaff]/30 hover:bg-[#0a0a08]/80 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(incident.status)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#fefdf5] font-medium">
                              {incident.id}
                            </span>
                            <Badge
                              className={getSeverityColor(incident.severity)}
                            >
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
                          {incident.time}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {incident.responders} responders
                      </span>
                    </div>
                  </div>
                ))}

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
                      Analyzing Situation...
                    </span>
                  </div>
                  <p className="text-[#e0eaff]/70 text-sm leading-relaxed">
                    Processing satellite data, weather patterns, and social
                    media reports for predictive insights.
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
