import photo1 from "../assets/20251013_172614.jpg";
import photo2 from "../assets/photo_2025-10-14_07-26-26.jpg";
import infoTechLogo from "../assets/infotechlogo.png";

export default function AchievementSection() {
  return (
    <div className="relative h-80 bg-black overflow-hidden">
      {/* Background photos */}
      <img
        className="absolute left-1/2 -translate-x-1/2 -top-40 -rotate-3 opacity-60"
        src={photo1}
        alt=""
      />
      <img
        className="absolute bottom-80 scale-90 left-[60%] rotate-3 opacity-60"
        src={photo2}
        alt=""
      />
      <img
        className="absolute bottom-20 right-[25%] scale-50 -rotate-3 opacity-60"
        src={photo1}
        alt=""
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        <img
          src={infoTechLogo}
          className="max-w-[280px] w-full h-auto object-contain object-center"
          style={{ imageRendering: "auto" }}
          alt="InfoTech logo"
        />
        <span className="bg-linear-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent font-bold text-lg text-center px-4">
          Android App Development: Productivity Champion
        </span>
      </div>
    </div>
  );
}
