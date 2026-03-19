import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Smartphone,
  Camera,
  MapPin,
  AlertTriangle,
  Users,
  Building2,
  Truck,
  Radio,
  Shield,
  Activity,
  ArrowRight,
} from "lucide-react";

const citizenFeatures = [
  {
    icon: <Camera className="h-5 w-5" />,
    text: "Report emergencies with photos",
  },
  { icon: <MapPin className="h-5 w-5" />, text: "Share precise location data" },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    text: "Receive emergency alerts",
  },
  { icon: <Activity className="h-5 w-5" />, text: "Track response status" },
];

const rescuerFeatures = [
  { icon: <Radio className="h-5 w-5" />, text: "Secure team communication" },
  { icon: <MapPin className="h-5 w-5" />, text: "Real-time incident mapping" },
  { icon: <Users className="h-5 w-5" />, text: "Coordinate with other teams" },
  {
    icon: <Activity className="h-5 w-5" />,
    text: "Live operational dashboard",
  },
];

const lguFeatures = [
  {
    icon: <Building2 className="h-5 w-5" />,
    text: "Multi-agency coordination",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    text: "Resource allocation management",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    text: "Emergency response oversight",
  },
  { icon: <Activity className="h-5 w-5" />, text: "Analytics and reporting" },
];

interface PortalCardProps {
  title: string;
  description: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  primaryColor: string;
  bgGradient: string;
  icon: React.ReactNode;
  userType: string;
}

function PortalCard({
  title,
  description,
  features,
  primaryColor,
  bgGradient,
  icon,
  userType,
}: PortalCardProps) {
  return (
    <Card
      className={`relative overflow-hidden border border-[#e0eaff]/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 rounded-xl backdrop-blur-md ${bgGradient}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="absolute top-4 right-4 transform scale-150">{icon}</div>
      </div>

      <CardHeader className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`${primaryColor} p-3 rounded-xl text-white shadow-lg`}
          >
            {icon}
          </div>
          <Badge
            variant="secondary"
            className="text-xs bg-[#fefdf5]/20 text-[#fefdf5] border-[#fefdf5]/30"
          >
            {userType}
          </Badge>
        </div>
        <CardTitle className="text-[#fefdf5] text-xl mb-2">{title}</CardTitle>
        <p className="text-[#fefdf5]/80 text-sm leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-[#fefdf5]/90"
            >
              <div className="text-[#fefdf5]/70">{feature.icon}</div>
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        <Button className="w-full bg-[#fefdf5]/20 hover:bg-[#fefdf5]/30 text-[#fefdf5] border border-[#fefdf5]/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
          Access Portal
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function UserPortals() {
  return (
    <section className="py-20 bg-linear-to-br from-[#0a0a08] via-[#161613] to-[#1f1f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#fefdf5] mb-6 tracking-tight">
            Tailored Solutions for Every Stakeholder
          </h2>
          <p className="text-xl text-[#e0eaff]/80 max-w-3xl mx-auto leading-relaxed">
            ResQLink provides specialized interfaces and tools designed for the
            unique needs of citizens, rescue teams, and government agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PortalCard
            title="Citizen Portal"
            description="Empower citizens to report emergencies and stay informed during disasters"
            features={citizenFeatures}
            primaryColor="bg-gradient-to-br from-blue-500 to-blue-600"
            bgGradient="bg-gradient-to-br from-blue-600/80 to-blue-800/60"
            icon={<Smartphone className="h-8 w-8" />}
            userType="General Public"
          />

          <PortalCard
            title="Rescuer Dashboard"
            description="Advanced tools for first responders and rescue teams in the field"
            features={rescuerFeatures}
            primaryColor="bg-gradient-to-br from-green-500 to-green-600"
            bgGradient="bg-gradient-to-br from-green-600/80 to-green-800/60"
            icon={<Shield className="h-8 w-8" />}
            userType="First Responders"
          />

          <PortalCard
            title="LGU Command Center"
            description="Comprehensive oversight and coordination platform for government agencies"
            features={lguFeatures}
            primaryColor="bg-gradient-to-br from-purple-500 to-purple-600"
            bgGradient="bg-gradient-to-br from-purple-600/80 to-purple-800/60"
            icon={<Building2 className="h-8 w-8" />}
            userType="Government Units"
          />
        </div>

        <div className="text-center mt-16">
          <div className="bg-linear-to-r from-red-500/80 to-red-700/60 backdrop-blur-md border border-[#e0eaff]/20 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4 text-[#fefdf5]">
              Ready to Transform Disaster Response?
            </h3>
            <p className="text-[#fefdf5]/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Join the network of communities, responders, and agencies using
              ResQLink to save lives and build resilient disaster response
              capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#fefdf5] text-red-600 hover:bg-[#fefdf5]/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8"
              >
                Request Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-[#fefdf5] border-[#fefdf5]/30 hover:bg-[#fefdf5]/10 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
