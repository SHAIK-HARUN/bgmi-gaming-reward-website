import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-bgmi-black border-t border-bgmi-gray py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-3 text-center">
        
        {/* Logos matching bottom of screenshots */}
        <div className="flex items-center space-x-4 font-gaming text-xl sm:text-2xl font-bold tracking-widest text-gray-300 select-none">
          <span>BATTLEGROUNDS</span>
          <span className="text-gray-600">|</span>
          <span className="text-white font-extrabold tracking-widest">KRAFTON</span>
        </div>

        <p className="text-[11px] text-gray-500 max-w-md">
          © 2026 KRAFTON, Inc. All Rights Reserved. BATTLEGROUNDS MOBILE INDIA is a registered trademark of KRAFTON, Inc.
        </p>

        <div className="flex space-x-4 text-[10px] text-gray-400">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:underline">Rules of Conduct</a>
        </div>
      </div>
    </footer>
  );
}
