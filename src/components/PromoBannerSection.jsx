import React from 'react';
import promoBannerImg from '../assets/promo_banner.png';
import { Flame, Sparkles, ChevronDown } from 'lucide-react';

export default function PromoBannerSection() {
  const scrollToRewards = () => {
    const rewardElem = document.getElementById('reward-section');
    if (rewardElem) {
      rewardElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-bgmi-black via-bgmi-dark to-bgmi-black py-4 px-4 border-b border-bgmi-gold/20">
      <div className="max-w-3xl mx-auto">
        
        {/* Banner Section Header */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Flame className="w-4 h-4 text-bgmi-orange animate-bounce" />
          <h2 className="font-gaming text-lg sm:text-xl font-bold tracking-widest text-bgmi-gold uppercase text-center">
            OFFICIAL BGMI EVENT ANNOUNCEMENT
          </h2>
          <Sparkles className="w-4 h-4 text-bgmi-yellow animate-pulse" />
        </div>

        {/* Compact Promotional Banner Card */}
        <div className="relative rounded border border-bgmi-gold/40 shadow-xl bg-bgmi-card group overflow-hidden">
          
          {/* Decreased Banner Image Height */}
          <div className="relative w-full h-[120px] sm:h-[160px] md:h-[200px] overflow-hidden">
            <img
              src={promoBannerImg}
              alt="BGMI Event Promotion Banner"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bgmi-black via-bgmi-black/30 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-2 left-2 flex items-center space-x-1.5">
              <span className="bg-red-600 text-white font-gaming text-[10px] sm:text-xs px-2 py-0.5 rounded uppercase font-bold tracking-wider shadow">
                HOT EVENT
              </span>
              <span className="bg-bgmi-gold text-black font-gaming text-[10px] sm:text-xs px-2 py-0.5 rounded uppercase font-bold tracking-wider shadow">
                FREE BONUS
              </span>
            </div>
          </div>

          {/* Compact Banner Content & CTA Bar */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-bgmi-dark via-bgmi-black to-bgmi-dark border-t border-bgmi-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left space-y-0.5">
              <h3 className="font-gaming text-xl sm:text-2xl font-extrabold text-white tracking-wider uppercase">
                EXCLUSIVE ROYALE REWARD DROP
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-300 max-w-md">
                Claim up to <span className="text-bgmi-yellow font-bold">6000+ FREE UC</span> & <span className="text-bgmi-gold font-bold">10 Gun Upgrade Materials</span>.
              </p>
            </div>

            <button
              onClick={scrollToRewards}
              className="btn-gold py-1.5 px-4 text-lg tracking-widest rounded shadow-gold-glow shrink-0 flex items-center space-x-1.5"
            >
              <span>CLAIM NOW</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
