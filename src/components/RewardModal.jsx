import React from 'react';
import { X } from 'lucide-react';

export default function RewardModal({ reward, onClose, onConfirm }) {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-bgmi-dark border-2 border-bgmi-gold/60 rounded shadow-2xl overflow-hidden">
        
        {/* Header Bar matching Screenshot 5 */}
        <div className="bg-bgmi-black border-b border-bgmi-gray px-4 py-3 flex items-center justify-between">
          <h3 className="font-gaming text-2xl font-bold tracking-wider text-white uppercase text-center w-full pl-6">
            Reward Confirmation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-6">
          <p className="font-gaming text-xl sm:text-2xl text-gray-200 tracking-wide">
            Are you sure to collect this reward?
          </p>

          {/* Reward Graphic Preview Container matching Screenshot 5 */}
          <div className="relative w-36 h-36 bg-gradient-to-b from-red-950 to-red-900 border-2 border-red-700/80 rounded p-3 flex items-center justify-center shadow-lg">
            <img
              src={reward.image}
              alt={reward.title}
              className="w-full h-full object-contain"
            />
            <span className="absolute bottom-1 right-2 font-gaming font-bold text-base text-gray-200">
              {reward.amount}
            </span>
          </div>

          {/* Collect Action Button */}
          <button
            onClick={onConfirm}
            className="w-full max-w-xs btn-gold py-2.5 text-2xl tracking-widest rounded shadow-gold-glow"
          >
            COLLECT
          </button>
        </div>
      </div>
    </div>
  );
}
