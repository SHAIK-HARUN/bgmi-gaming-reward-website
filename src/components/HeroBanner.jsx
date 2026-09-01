import React, { useState, useEffect } from 'react';
import defaultHeroBannerImg from '../assets/hero_banner.png';

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(defaultHeroBannerImg);

  useEffect(() => {
    // Check if admin has set a custom hero banner image
    const customBanner = localStorage.getItem('bgmi_custom_hero_banner');
    if (customBanner) {
      setCurrentBanner(customBanner);
    }

    // Listen for custom event when admin updates hero banner
    const handleBannerUpdate = () => {
      const updated = localStorage.getItem('bgmi_custom_hero_banner');
      if (updated) setCurrentBanner(updated);
      else setCurrentBanner(defaultHeroBannerImg);
    };

    window.addEventListener('hero_banner_updated', handleBannerUpdate);
    return () => window.removeEventListener('hero_banner_updated', handleBannerUpdate);
  }, []);

  return (
    <div className="relative w-full bg-bgmi-dark border-b-2 border-bgmi-gold/40 overflow-hidden shadow-2xl">
      
      {/* Version Tag */}
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
          src={currentBanner}
          alt="Team Apex Gaming Play Bold Rise Above BGMI Banner"
          className="w-full h-auto object-contain object-top shadow-2xl transition-all duration-300 max-h-[580px] select-none"
        />
        
        {/* Subtle Vignette Overlay connecting banner seamlessly to dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-bgmi-black via-transparent to-black/10 pointer-events-none" />
      </div>
    </div>
  );
}
