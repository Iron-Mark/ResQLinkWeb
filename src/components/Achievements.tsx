import photo1 from '../assets/20251013_172614.jpg';
import photo2 from '../assets/photo_2025-10-14_07-26-26.jpg';
import infoTechLogo from '../assets/infotechlogo.png';

export default function AchievementSection() {
  return (
    <div className="h-66 bg-black">
      <div className="absolute overflow-hidden w-full h-full p-0">
        <img
          className="absolute left-1/2 -translate-x-1/2 -top-40 -rotate-3 "
          src={photo1}
          alt=""
        />
        <img
          className="absolute bottom-80 scale-90 left-[60%] rotate-3"
          src={photo2}
          alt=""
        />
        <img
          className="absolute bottom-20 right-[25%] scale-50 -rotate-3 "
          src={photo1}
          alt=""
        />

        <div className="bg-black/50 absolute w-full h-full flex flex-col items-center justify-center"></div>
      </div>

      <div className="w-full h-66 absolute flex flex-col items-center justify-center">
        <img src={infoTechLogo} className="w-50 h-50" alt="" />

        <span className="bg-gradient-to-r from-[#fefdf5] to-[#e0eaff] bg-clip-text text-transparent font-bold">
          Android App Development: Productivity Champion
        </span>
      </div>
    </div>
  );
}
