import React from 'react';
import heroBannerImg from '../assets/hero_banner.png';

export default function HeroBanner() {
  return (
    <div className="relative w-full bg-bgmi-dark border-b-2 border-bgmi-gold/40 overflow-hidden shadow-2xl">
      
      {/* Version Tag matching screenshot */}
      <div className="absolute top-2 left-3 z-20 bg-black/80 border border-gray-700/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-xs text-gray-200 font-mono rounded shadow">
        Version 4.5.0.21355
      </div>

      {/* Team Apex Gaming Badge Tag */}
      <div className="absolute top-2 right-3 z-20 bg-gradient-to-r from-yellow-600 to-bgmi-gold backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-xs text-black font-gaming font-extrabold tracking-wider rounded uppercase shadow">
        TEAM APEX GAMING OFFICIAL
      </div>

      {/* Widescreen Fluid Responsive Banner Container */}
      <div className="relative w-full max-w-[1440px] mx-auto flex items-center justify-center overflow-hidden">
        <img
          src={heroBannerImg}
          alt="Team Apex Gaming Play Bold Rise Above BGMI Banner"
          className="w-full h-auto object-contain sm:object-cover object-center shadow-2xl transition-all duration-300 min-h-[160px] sm:min-h-[260px] md:min-h-[360px] max-h-[520px]"
        />
        
        {/* Subtle Vignette Overlay connecting banner seamlessly to dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-bgmi-black via-transparent to-black/20 pointer-events-none" />
      </div>
    </div>
  );
}
