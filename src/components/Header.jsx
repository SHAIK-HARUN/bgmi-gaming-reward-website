import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Menu, X, ShieldCheck, LogIn, LogOut, UserCheck } from 'lucide-react';

export default function Header({ onAdminClick, onLoginClick, loggedInPlayer, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-bgmi-black border-b border-bgmi-gray sticky top-0 z-40 w-full shadow-lg">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-8 py-2 flex items-center justify-between">
        
        {/* Left: BGMI Logo */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="leading-tight">
            <h1 className="font-gaming text-lg sm:text-2xl md:text-3xl font-bold tracking-wider text-white uppercase flex items-center gap-1">
              BATTLEGROUNDS
            </h1>
            <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-bgmi-gold uppercase tracking-widest -mt-0.5 sm:-mt-1">
              MOBILE INDIA
            </p>
          </div>
        </div>

        {/* Center: Social Icons (Desktop & Tablet: 768px, 1024px, 1440px) */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-gray-300 hover:text-bgmi-gold transition-colors duration-200"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-gray-300 hover:text-bgmi-gold transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="text-gray-300 hover:text-bgmi-gold transition-colors duration-200"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        {/* Right: User Credentials / Login & Admin Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          
          {loggedInPlayer ? (
            /* Logged in Player Badge displaying Real OAuth User Details */
            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-bgmi-dark border border-bgmi-gold/60 px-2 sm:px-2.5 py-1 rounded">
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0" />
              <div className="text-left font-mono leading-none">
                <div className="text-[10px] sm:text-xs font-bold text-bgmi-gold truncate max-w-[120px] sm:max-w-[160px]">
                  {loggedInPlayer.displayName || `ID: ${loggedInPlayer.playerId}`}
                </div>
                <div className="text-[9px] sm:text-[10px] text-gray-300 font-sans truncate max-w-[120px] sm:max-w-[160px]">
                  {loggedInPlayer.email ? loggedInPlayer.email : `Lvl ${loggedInPlayer.accountLevel}`}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="ml-0.5 text-xs text-red-400 hover:text-red-300 p-0.5"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* LOGIN Button beside Admin Panel button */
            <button
              onClick={onLoginClick}
              className="btn-gold text-[11px] sm:text-xs md:text-sm font-gaming tracking-wider px-2.5 sm:px-4 py-1.5 rounded flex items-center gap-1 shadow-gold-glow shrink-0"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>LOGIN</span>
            </button>
          )}

          {/* ADMIN PANEL Button */}
          <button
            onClick={onAdminClick}
            className="text-[11px] sm:text-xs font-gaming tracking-wider px-2.5 sm:px-3 py-1.5 rounded bg-bgmi-dark border border-bgmi-gold/40 text-bgmi-gold hover:bg-bgmi-gold hover:text-black transition-all flex items-center gap-1 shrink-0"
          >
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">ADMIN PANEL</span>
            <span className="sm:hidden">ADMIN</span>
          </button>

          {/* Gold Hamburger Button for Mobile (360px - 767px) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-bgmi-gold hover:bg-bgmi-yellow text-black p-1.5 sm:p-2 rounded focus:outline-none transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="bg-bgmi-dark border-t border-bgmi-lightGray py-4 px-6 flex flex-col space-y-3 md:hidden">
          {loggedInPlayer ? (
            <div className="w-full text-center py-2 bg-bgmi-black border border-bgmi-gold text-white font-mono text-xs sm:text-sm rounded">
              Logged in: <span className="text-bgmi-gold font-bold">{loggedInPlayer.displayName || loggedInPlayer.playerId}</span>
            </div>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setMenuOpen(false);
              }}
              className="w-full text-center py-2 bg-bgmi-gold text-black font-gaming font-bold text-base sm:text-lg rounded shadow-gold-glow"
            >
              LOGIN TO ACCOUNT
            </button>
          )}
          
          <button
            onClick={() => {
              onAdminClick();
              setMenuOpen(false);
            }}
            className="w-full text-center py-2 bg-bgmi-dark border border-bgmi-gold text-bgmi-gold font-gaming font-bold text-base sm:text-lg rounded"
          >
            ADMIN PANEL ACCESS
          </button>
        </div>
      )}
    </header>
  );
}
