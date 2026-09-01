import React, { useState } from 'react';
import { X } from 'lucide-react';
import loginBg from '../assets/login_bg.png';
import SocialAuthPopupModal from './SocialAuthPopupModal';

export default function GameLoginModal({ onClose, onAuthSuccess }) {
  const [activeProvider, setActiveProvider] = useState(null);

  const handleProviderClick = (providerName) => {
    setActiveProvider(providerName);
  };

  const handlePopupSuccess = (user) => {
    setActiveProvider(null);
    onAuthSuccess(user);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xs animate-fadeIn">
        <div className="relative w-full max-w-xl bg-bgmi-dark border-2 border-bgmi-gold/70 rounded-md overflow-hidden shadow-2xl">
          
          {/* Top Header Bar with Close Button */}
          <div className="bg-bgmi-black border-b border-bgmi-gray px-4 py-2 flex items-center justify-between z-10 relative">
            <span className="font-mono text-[10px] text-gray-400">
              Version 4.5.0.21355
            </span>
            <h3 className="font-gaming text-xl font-bold tracking-wider text-bgmi-gold uppercase">
              BGMI ACCOUNT LOGIN
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Artwork Container matching Screenshot 4 */}
          <div className="relative w-full h-[300px] sm:h-[360px] flex flex-col justify-between p-4 overflow-hidden bg-black">
            
            {/* Background Game Image */}
            <img
              src={loginBg}
              alt="BGMI Login Background Artwork"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
            />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 pointer-events-none" />

            {/* Top Version Tag overlay inside artwork */}
            <div className="relative z-10 self-start bg-black/60 px-2 py-0.5 text-[9px] text-gray-300 font-mono rounded">
              Version 4.5.0.21355
            </div>

            {/* Center Logo */}
            <div className="relative z-10 self-center text-center my-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
              <h1 className="font-gaming text-3xl sm:text-5xl font-extrabold text-white tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                BATTLEGROUNDS
              </h1>
              <p className="font-gaming text-xl sm:text-3xl font-extrabold text-green-500 uppercase tracking-widest -mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                MOBILE INDIA
              </p>
            </div>

            {/* Bottom Social Buttons Bar matching Screenshot 4 */}
            <div className="relative z-10 w-full space-y-3">
              
              {/* 3 Buttons Grid: Twitter, Facebook, Gplay */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                
                {/* X / Twitter Button */}
                <button
                  onClick={() => handleProviderClick('twitter')}
                  className="bg-white hover:bg-gray-100 text-black font-gaming font-extrabold text-sm sm:text-lg py-2 px-1 sm:px-3 rounded shadow-lg flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
                >
                  <span className="font-extrabold text-base sm:text-xl leading-none">𝕏</span>
                  <span>Twitter</span>
                </button>

                {/* Facebook Button */}
                <button
                  onClick={() => handleProviderClick('facebook')}
                  className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-gaming font-extrabold text-sm sm:text-lg py-2 px-1 sm:px-3 rounded shadow-lg flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
                >
                  <span className="font-extrabold text-base sm:text-xl leading-none">f</span>
                  <span>Facebook</span>
                </button>

                {/* Gplay Button */}
                <button
                  onClick={() => handleProviderClick('google')}
                  className="bg-bgmi-gold hover:bg-bgmi-yellow text-black font-gaming font-extrabold text-sm sm:text-lg py-2 px-1 sm:px-3 rounded shadow-lg flex items-center justify-center space-x-1.5 transition-transform active:scale-95"
                >
                  <span className="font-extrabold text-xs sm:text-sm leading-none">▶</span>
                  <span>Gplay</span>
                </button>
              </div>

              {/* Bottom Checkbox & Terms Notice matching Screenshot 4 */}
              <div className="bg-black/70 backdrop-blur-xs p-1.5 rounded text-[9px] sm:text-xs text-gray-300 flex items-center justify-center space-x-1.5 text-center">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="accent-bgmi-gold w-3 h-3 rounded shrink-0 cursor-pointer"
                />
                <span>
                  I have read and acknowledge the <span className="underline text-bgmi-gold cursor-pointer">PRIVACY POLICY</span> | I have read and agree to the <span className="underline text-bgmi-gold cursor-pointer">TERMS OF SERVICE</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Provider Login Popup Modal matching user screenshot */}
      {activeProvider && (
        <SocialAuthPopupModal
          provider={activeProvider}
          onClose={() => setActiveProvider(null)}
          onLoginSuccess={handlePopupSuccess}
        />
      )}
    </>
  );
}
