import React from 'react';
import { X } from 'lucide-react';

export default function RewardModal({ reward, onClose, onConfirm }) {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#242528] border border-gray-700 rounded-sm shadow-2xl overflow-hidden text-gray-200">
        
        {/* Header Bar matching Image 4 1:1 */}
        <div className="relative bg-[#1e1f22] border-b border-gray-600 px-6 py-4 flex items-center justify-between overflow-hidden">
          <h2 className="font-gaming text-3xl sm:text-4xl font-bold tracking-wide text-white mx-auto">
            Reward Confirmation
          </h2>

          {/* Close button & Parachutes graphic in top right */}
          <div className="absolute right-3 top-2 flex items-center space-x-2">
            <span className="opacity-40 text-[10px] font-mono">𝪂 🪂</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600" />

        {/* Modal Body Content matching Image 4 1:1 */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6 bg-[#2a2b2e]">
          
          {/* Confirmation Question matching Image 4 */}
          <h3 className="font-gaming text-2xl sm:text-3xl font-bold text-gray-200 tracking-wide">
            Are you sure to collect this reward?
          </h3>

          {/* Reward Item Preview Box matching Image 4 */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-black border-2 border-red-600 rounded overflow-hidden p-2 shadow-xl flex items-center justify-center">
            <img
              src={reward.image}
              alt={reward.title}
              className="w-full h-full object-contain"
            />
            {/* Quantity Badge */}
            <div className="absolute bottom-1.5 right-2 font-gaming font-extrabold text-white text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {reward.id === 'up-10' ? '10' : '6000+ FREE 2100'}
            </div>
          </div>

          {/* Bottom Yellow/Gold Collect Button matching Image 4 1:1 */}
          <div className="pt-2 w-full flex justify-center">
            <button
              onClick={onConfirm}
              className="bg-[#f0c420] hover:bg-[#e0b410] text-black font-gaming font-extrabold text-2xl sm:text-3xl px-12 py-2 rounded shadow-lg transition-transform active:scale-95 border border-yellow-300 uppercase tracking-wider"
            >
              Collect
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
