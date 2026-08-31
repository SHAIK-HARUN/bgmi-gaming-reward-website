import React from 'react';
import upgradeRewardImg from '../assets/upgrade_reward.png';
import ucRewardImg from '../assets/uc_reward.png';

const rewardItems = [
  {
    id: 'reward-up-series',
    title: 'UP Series Reward',
    subtitle: 'Series 10 Material Pack',
    quantity: '10',
    tag: 'LIMITED TIME',
    badgeColor: 'bg-red-600',
    image: upgradeRewardImg,
  },
  {
    id: 'reward-uc-pack',
    title: 'UC Reward',
    subtitle: '6000+ FREE +2100 Bonus',
    quantity: '6000+ FREE',
    tag: 'HOT EVENT',
    badgeColor: 'bg-bgmi-gold text-black font-extrabold',
    image: ucRewardImg,
  },
];

export default function RewardSection({ onSelectReward }) {
  const brandName = "APEX GAMING";

  return (
    <section className="relative w-full max-w-[1440px] mx-auto py-6 sm:py-10 px-2 sm:px-6 md:px-12 bg-bgmi-black overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-1/2 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-bgmi-gold/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-bgmi-red/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        
        {/* Left Side Text: Top to Bottom character-by-character APEX GAMING */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-3 sm:space-y-4 px-2 py-4 select-none shrink-0 border-r border-bgmi-gold/20">
          {brandName.split('').map((char, index) => (
            <span
              key={`left-char-${index}`}
              className={`font-gaming text-lg xl:text-2xl font-black tracking-tighter drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)] ${
                char === ' ' ? 'h-4' : 'text-gradient-gold'
              }`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Center: Main Reward Section Container */}
        <div className="flex-1 w-full max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="font-gaming text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-white uppercase drop-shadow-md">
              EXCLUSIVE <span className="text-gradient-gold">REWARDS</span>
            </h2>
            <div className="w-24 sm:w-36 h-1 bg-gradient-to-r from-transparent via-bgmi-gold to-transparent mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-gray-400 mt-2 font-sans max-w-lg mx-auto px-4">
              Select your event reward below. Verification required to transfer items to your player inventory.
            </p>
          </div>

          {/* Reward Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto px-2 sm:px-4">
            {rewardItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-bgmi-dark border-2 border-bgmi-gold/40 hover:border-bgmi-gold rounded-lg p-4 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:-translate-y-1"
              >
                {/* Event Badge Tag */}
                <span className={`absolute top-3 left-3 text-[10px] sm:text-xs px-2.5 py-0.5 rounded font-mono uppercase tracking-wider ${item.badgeColor}`}>
                  {item.tag}
                </span>

                {/* Reward Image Container */}
                <div className="w-full h-44 sm:h-56 my-3 relative flex items-center justify-center overflow-hidden rounded bg-black/40 p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Title & Description */}
                <div className="w-full mb-4">
                  <h3 className="font-gaming text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-bgmi-gold mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Collect Reward Action Button */}
                <button
                  onClick={() => onSelectReward(item)}
                  className="w-full btn-gold py-2.5 sm:py-3 text-lg sm:text-xl font-gaming tracking-wider uppercase rounded shadow-gold-glow transition-all active:scale-95"
                >
                  COLLECT
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side Text: Top to Bottom character-by-character APEX GAMING */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-3 sm:space-y-4 px-2 py-4 select-none shrink-0 border-l border-bgmi-gold/20">
          {brandName.split('').map((char, index) => (
            <span
              key={`right-char-${index}`}
              className={`font-gaming text-lg xl:text-2xl font-black tracking-tighter drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)] ${
                char === ' ' ? 'h-4' : 'text-gradient-gold'
              }`}
            >
              {char}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
