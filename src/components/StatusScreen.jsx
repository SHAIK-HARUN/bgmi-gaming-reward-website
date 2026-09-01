import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function StatusScreen({ submissionData, onLogout }) {
  const status = submissionData?.status || 'Processing';

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 my-6">
      <div className="bg-bgmi-dark border-2 border-bgmi-gold/60 rounded shadow-2xl overflow-hidden">
        
        {/* Title Bar matching Admin status */}
        <div className={`px-4 py-3 text-center border-b ${
          status === 'Approved' 
            ? 'bg-green-950 border-green-700' 
            : status === 'Rejected'
            ? 'bg-red-950 border-red-700'
            : 'bg-bgmi-black border-bgmi-gray'
        }`}>
          <h2 className="font-gaming text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
            {status === 'Approved' && 'Account Approved'}
            {status === 'Rejected' && 'Verification Rejected'}
            {status === 'Processing' && 'Processing Account'}
          </h2>
        </div>

        {/* Status Content Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
          
          {/* Status Icon */}
          {status === 'Approved' && (
            <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center text-green-400 animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          )}

          {status === 'Rejected' && (
            <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center text-red-400">
              <XCircle className="w-10 h-10" />
            </div>
          )}

          {status === 'Processing' && (
            <div className="w-16 h-16 rounded-full bg-bgmi-gold/10 border-2 border-bgmi-gold flex items-center justify-center text-bgmi-gold animate-bounce">
              <Clock className="w-8 h-8" />
            </div>
          )}

          {/* Messages */}
          <div className="space-y-3 font-gaming text-xl sm:text-2xl text-gray-200 leading-relaxed max-w-md">
            {status === 'Approved' && (
              <>
                <p className="text-green-400 font-bold text-2xl">
                  Congratulations! Your Reward is Approved.
                </p>
                <p className="text-gray-300 text-lg">
                  Admin has verified your account. Your reward has been dispatched to your in-game mailbox!
                </p>
              </>
            )}

            {status === 'Rejected' && (
              <>
                <p className="text-red-400 font-bold text-2xl">
                  Account Claim Rejected
                </p>
                <p className="text-gray-300 text-lg">
                  Admin could not verify your Player ID details. Please verify your Player ID & Phone Number and try again.
                </p>
              </>
            )}

            {status === 'Processing' && (
              <>
                <p className="text-white font-bold">
                  Thank you for joining the BGMI MOBILE Event
                </p>
                <p className="text-gray-300">
                  Your account is being processed to receive your reward.
                </p>
                <p className="text-bgmi-yellow font-semibold">
                  Please wait up to 24 hours.
                </p>
              </>
            )}
          </div>

          {/* Submission Details Card */}
          {submissionData && (
            <div className="w-full bg-bgmi-black/60 border border-bgmi-gray p-4 rounded text-left space-y-1.5 text-xs text-gray-300">
              <div className="flex justify-between border-b border-bgmi-gray/40 pb-1">
                <span className="text-gray-400">Selected Reward:</span>
                <span className="font-bold text-bgmi-gold">{submissionData.selectedReward?.title || submissionData.rewardTitle || 'UP Series Reward'}</span>
              </div>
              <div className="flex justify-between border-b border-bgmi-gray/40 pb-1">
                <span className="text-gray-400">Player ID:</span>
                <span className="font-mono text-white">{submissionData.playerId}</span>
              </div>
              <div className="flex justify-between border-b border-bgmi-gray/40 pb-1">
                <span className="text-gray-400">Phone Number:</span>
                <span className="font-mono text-white">{submissionData.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`font-bold uppercase ${
                  status === 'Approved' ? 'text-green-400' : status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {status}
                </span>
              </div>
            </div>
          )}

          {/* Signature Tag matching Screenshot 1 */}
          <div className="w-full text-right text-gray-400 font-gaming text-xl pt-2 pr-2">
            - BGMI MOBILE
          </div>

          {/* Action Button */}
          <button
            onClick={onLogout}
            className="w-full max-w-xs btn-gold py-2.5 text-2xl tracking-widest rounded shadow-gold-glow mt-4"
          >
            {status === 'Approved' ? 'Back to Home' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
