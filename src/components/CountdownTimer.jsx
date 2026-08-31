import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  // Set initial countdown to 23 hours 59 mins 59 seconds
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 59 * 60 + 59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className="w-full bg-bgmi-black border-y border-bgmi-gold/30 py-3 sm:py-4 px-2 sm:px-6 shadow-inner">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Title Badge */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-bgmi-gold animate-pulse shrink-0" />
          <span className="font-gaming text-xs sm:text-sm md:text-base font-extrabold tracking-wider text-gray-200 uppercase">
            Rewards will be available until
          </span>
        </div>

        {/* Live Timer Boxes */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 font-mono">
          
          {/* Hours */}
          <div className="bg-bgmi-dark border border-bgmi-gold/50 px-2.5 sm:px-3 py-1 rounded text-center">
            <span className="font-gaming text-base sm:text-xl font-black text-bgmi-gold">
              {pad(hours)}
            </span>
            <span className="block text-[9px] text-gray-400 font-sans uppercase">
              Hours
            </span>
          </div>

          <span className="font-gaming text-base sm:text-xl font-bold text-bgmi-gold">:</span>

          {/* Minutes */}
          <div className="bg-bgmi-dark border border-bgmi-gold/50 px-2.5 sm:px-3 py-1 rounded text-center">
            <span className="font-gaming text-base sm:text-xl font-black text-bgmi-gold">
              {pad(minutes)}
            </span>
            <span className="block text-[9px] text-gray-400 font-sans uppercase">
              Mins
            </span>
          </div>

          <span className="font-gaming text-base sm:text-xl font-bold text-bgmi-gold">:</span>

          {/* Seconds */}
          <div className="bg-bgmi-dark border border-bgmi-gold/50 px-2.5 sm:px-3 py-1 rounded text-center min-w-[42px] sm:min-w-[48px]">
            <span className="font-gaming text-base sm:text-xl font-black text-bgmi-red">
              {pad(seconds)}
            </span>
            <span className="block text-[9px] text-gray-400 font-sans uppercase">
              Secs
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
