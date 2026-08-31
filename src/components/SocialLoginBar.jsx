import React from 'react';

export default function SocialLoginBar({ onSocialSelect }) {
  return (
    <div className="w-full bg-bgmi-black py-3 px-4 border-b border-bgmi-gray">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-2">
        {/* 3 Quick Auth Buttons matching Screenshot 4 */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-4">
          {/* X / Twitter */}
          <button
            onClick={() => onSocialSelect('twitter')}
            className="bg-white hover:bg-gray-100 text-black font-gaming font-bold text-base sm:text-lg py-1.5 px-2 rounded shadow flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
          >
            <span className="font-bold text-lg leading-none">𝕏</span>
            <span>Twitter</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => onSocialSelect('facebook')}
            className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-gaming font-bold text-base sm:text-lg py-1.5 px-2 rounded shadow flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
          >
            <span className="font-bold text-lg leading-none">f</span>
            <span>Facebook</span>
          </button>

          {/* Gplay */}
          <button
            onClick={() => onSocialSelect('google')}
            className="bg-bgmi-gold hover:bg-bgmi-yellow text-black font-gaming font-bold text-base sm:text-lg py-1.5 px-2 rounded shadow flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
          >
            <span className="font-bold text-sm leading-none">▶</span>
            <span>Gplay</span>
          </button>
        </div>

        {/* Terms Notice matching screenshot 4 */}
        <div className="text-[10px] sm:text-xs text-gray-400 flex items-center space-x-1 mt-1 text-center">
          <input type="checkbox" checked readOnly className="accent-bgmi-gold w-3 h-3 rounded" />
          <span>
            I have read and acknowledge the <span className="underline text-gray-300">PRIVACY POLICY</span> | I have read and agree to the <span className="underline text-gray-300">TERMS OF SERVICE</span>
          </span>
        </div>
      </div>
    </div>
  );
}
