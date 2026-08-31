import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { loginWithProvider } from '../services/firebase';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleProviderLogin = async (providerName) => {
    setSelectedProvider(providerName);
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await loginWithProvider(providerName);
      if (res.success) {
        onAuthSuccess(res.user);
      } else {
        setErrorMsg("Authentication failed. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Unable to connect to authentication service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white text-black rounded-lg shadow-2xl overflow-hidden">
        
        {/* Header Bar matching Screenshot 3 */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800 text-base">
              Secure BGMI Login
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black p-1 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center space-y-5">
          <div className="text-center space-y-1">
            <h4 className="font-bold text-xl text-gray-900">
              Authenticate Your Account
            </h4>
            <p className="text-xs text-gray-600">
              Select your BGMI connected social gaming provider to verify reward eligibility via secure OAuth authorization.
            </p>
          </div>

          {errorMsg && (
            <div className="w-full p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded text-center">
              {errorMsg}
            </div>
          )}

          {/* Social Provider Buttons */}
          <div className="w-full space-y-3">
            {/* X / Twitter */}
            <button
              disabled={loading}
              onClick={() => handleProviderLogin('twitter')}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-md shadow flex items-center justify-between transition-all disabled:opacity-50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold">𝕏</span>
                <span>Continue with X (Twitter)</span>
              </div>
              {loading && selectedProvider === 'twitter' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="text-xs text-gray-400">OAuth 2.0</span>
              )}
            </button>

            {/* Facebook */}
            <button
              disabled={loading}
              onClick={() => handleProviderLogin('facebook')}
              className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-medium py-3 px-4 rounded-md shadow flex items-center justify-between transition-all disabled:opacity-50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold">f</span>
                <span>Continue with Facebook</span>
              </div>
              {loading && selectedProvider === 'facebook' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="text-xs text-blue-200">OAuth 2.0</span>
              )}
            </button>

            {/* Google Play */}
            <button
              disabled={loading}
              onClick={() => handleProviderLogin('google')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-md border border-gray-300 shadow-xs flex items-center justify-between transition-all disabled:opacity-50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">▶</span>
                <span>Continue with Google Play</span>
              </div>
              {loading && selectedProvider === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              ) : (
                <span className="text-xs text-gray-500">OAuth 2.0</span>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="pt-2 text-[11px] text-gray-500 text-center flex items-center justify-center space-x-1">
            <Lock className="w-3 h-3 text-green-600" />
            <span>Encrypted OAuth authentication token check</span>
          </div>
        </div>
      </div>
    </div>
  );
}
