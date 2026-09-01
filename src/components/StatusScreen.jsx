import React from 'react';

export default function StatusScreen({ submissionData, onLogout }) {
  const status = submissionData?.status || 'Processing';

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 my-6">
      <div className="bg-[#242528] border border-gray-700 rounded-sm shadow-2xl overflow-hidden text-gray-200">
        
        {/* Header Bar matching Screenshot 1:1 */}
        <div className="relative bg-[#1e1f22] border-b border-gray-600 px-6 py-4 flex items-center justify-between overflow-hidden">
          <h2 className="font-gaming text-3xl sm:text-4xl font-bold tracking-wide text-white mx-auto">
            {status === 'Approved' && 'Account Approved'}
            {status === 'Rejected' && 'Verification Rejected'}
            {status === 'Processing' && 'Processing Account'}
          </h2>

          {/* Parachutes graphic in top right */}
          <div className="absolute right-3 top-1 opacity-40 pointer-events-none select-none text-[10px] font-mono">
            🪂 🪂
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600" />

        {/* Content Body matching Screenshot 1:1 */}
        <div className="p-6 sm:p-10 flex flex-col space-y-8 bg-[#2a2b2e]">
          
          {/* Main Processing / Status Message */}
          <div className="space-y-3 font-gaming text-2xl sm:text-3xl text-gray-200 leading-snug tracking-wide">
            {status === 'Approved' && (
              <>
                <p className="text-green-400 font-bold">
                  Congratulations! Your Reward is Approved.
                </p>
                <p className="text-gray-300 text-xl">
                  Your reward has been dispatched to your in-game mailbox!
                </p>
              </>
            )}

            {status === 'Rejected' && (
              <>
                <p className="text-red-400 font-bold">
                  Account Claim Rejected
                </p>
                <p className="text-gray-300 text-xl">
                  Unable to verify Player ID details. Please try again.
                </p>
              </>
            )}

            {status === 'Processing' && (
              <>
                <p>Thank you for joining the BGMI MOBILE Event</p>
                <p>Your account is being processed to receive your reward.</p>
                <p>Please wait up to 24 hours.</p>
              </>
            )}
          </div>

          {/* Player Submission Details summary */}
          {submissionData && (
            <div className="w-full bg-[#1c1d20] border border-gray-700/60 p-3.5 rounded text-left space-y-1.5 text-xs text-gray-300 font-mono">
              <div className="flex justify-between border-b border-gray-700/40 pb-1">
                <span className="text-gray-400">Selected Reward:</span>
                <span className="font-bold text-bgmi-gold">{submissionData.selectedReward?.title || submissionData.rewardTitle || 'UP Series Reward'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700/40 pb-1">
                <span className="text-gray-400">Player ID:</span>
                <span className="font-bold text-white">{submissionData.playerId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700/40 pb-1">
                <span className="text-gray-400">Phone Number:</span>
                <span className="font-bold text-white">{submissionData.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Level:</span>
                <span className="font-bold text-bgmi-gold">Level {submissionData.accountLevel}</span>
              </div>
            </div>
          )}

          {/* Right Signature Tag matching Screenshot 1:1 */}
          <div className="w-full text-right text-gray-300 font-gaming text-2xl sm:text-3xl tracking-wider">
            - BGMI MOBILE
          </div>

          {/* Bottom Logout Action Button matching Screenshot 1:1 */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onLogout}
              className="bg-[#f0c420] hover:bg-[#e0b410] text-black font-gaming font-extrabold text-2xl sm:text-3xl px-12 py-2.5 rounded shadow-lg transition-transform active:scale-95 border border-yellow-300 uppercase tracking-wider"
            >
              Logout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
