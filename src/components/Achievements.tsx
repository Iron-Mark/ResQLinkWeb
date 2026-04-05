import photo1 from "../assets/20251013_172614.jpg";
import photo2 from "../assets/photo_2025-10-14_07-26-26.jpg";
import infoTechLogo from "../assets/infotechlogo.png";

export default function AchievementSection() {
  return (
    <div className="relative bg-black overflow-hidden" style={{ height: 'clamp(14rem, 22vw, 32rem)' }}>
      {/* Background photos — side by side, 50% each */}
      <div className="absolute inset-0 flex">
        <img className="w-1/2 h-full object-cover" style={{ objectPosition: 'center 67%' }} src={photo1} alt="" />
        <img className="w-1/2 h-full object-cover object-center" src={photo2} alt="" />
      </div>
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 px-4">
        <img
          src={infoTechLogo}
          className="max-w-[160px] sm:max-w-[220px] md:max-w-[280px] w-full h-auto object-contain object-center"
          alt="InfoTech logo"
        />
        <span className="bg-linear-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg text-center max-w-xs sm:max-w-sm md:max-w-none">
          Android App Development: Productivity Champion
        </span>
      </div>
    </div>
  );
}
