import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Search, CheckCircle, XCircle, Clock, Trash2, RefreshCw, KeyRound, Download, Image as ImageIcon, Save, RotateCcw } from 'lucide-react';
import { updateSubmissionStatusInFirestore, deleteSubmissionFromFirestore } from '../services/firebase';
import defaultHeroImg from '../assets/hero_banner.png';

export default function AdminDashboard({ onBackToHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [submissions, setSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Hero Section Manager State
  const [heroBannerInput, setHeroBannerInput] = useState('');
  const [heroSuccessMsg, setHeroSuccessMsg] = useState('');

  // Load submissions & hero banner setting on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
      loadHeroBannerSetting();
    }
  }, [isAuthenticated]);

  const loadSubmissions = () => {
    const localSubs = JSON.parse(localStorage.getItem('bgmi_admin_submissions') || '[]');
    
    if (localSubs.length === 0) {
      const mockData = [
        {
          id: 'sub_101',
          playerId: '5129481023',
          phoneNumber: '+919876543210',
          accountLevel: 58,
          rewardTitle: 'UP Series Reward — 10',
          authProvider: 'Twitter / X',
          createdDate: new Date(Date.now() - 3600000).toLocaleString(),
          status: 'Processing',
        },
        {
          id: 'sub_102',
          playerId: '5891230491',
          phoneNumber: '+919812345678',
          accountLevel: 64,
          rewardTitle: 'UC Reward — 6000+ FREE',
          authProvider: 'Google Play',
          createdDate: new Date(Date.now() - 7200000).toLocaleString(),
          status: 'Approved',
        },
        {
          id: 'sub_103',
          playerId: '5102938475',
          phoneNumber: '+919711223344',
          accountLevel: 42,
          rewardTitle: 'UP Series Reward — 10',
          authProvider: 'Facebook',
          createdDate: new Date(Date.now() - 10800000).toLocaleString(),
          status: 'Rejected',
        },
      ];
      localStorage.setItem('bgmi_admin_submissions', JSON.stringify(mockData));
      setSubmissions(mockData);
    } else {
      setSubmissions(localSubs);
    }
  };

  const loadHeroBannerSetting = () => {
    const saved = localStorage.getItem('bgmi_custom_hero_banner');
    setHeroBannerInput(saved || defaultHeroImg);
  };

  // Save Hero Banner Image
  const handleSaveHeroBanner = (e) => {
    e.preventDefault();
    if (!heroBannerInput.trim()) return;

    localStorage.setItem('bgmi_custom_hero_banner', heroBannerInput.trim());
    window.dispatchEvent(new Event('hero_banner_updated'));
    setHeroSuccessMsg('Hero Section Banner updated successfully!');
    setTimeout(() => setHeroSuccessMsg(''), 3000);
  };

  // Reset Hero Banner Image
  const handleResetHeroBanner = () => {
    localStorage.removeItem('bgmi_custom_hero_banner');
    setHeroBannerInput(defaultHeroImg);
    window.dispatchEvent(new Event('hero_banner_updated'));
    setHeroSuccessMsg('Hero Banner reset to default official Team Apex banner!');
    setTimeout(() => setHeroSuccessMsg(''), 3000);
  };

  // Handle Passcode Auth ('apex2026')
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'apex2026') {
      setIsAuthenticated(true);
      setPassError('');
    } else {
      setPassError('Invalid Admin Passcode! Please try again.');
    }
  };

  // Toggle Submission Status: Processing -> Approved -> Rejected
  const handleStatusChange = async (id, currentStatus) => {
    let nextStatus = 'Approved';
    if (currentStatus === 'Approved') nextStatus = 'Rejected';
    else if (currentStatus === 'Rejected') nextStatus = 'Processing';

    const updated = submissions.map((sub) =>
      sub.id === id ? { ...sub, status: nextStatus } : sub
    );
    setSubmissions(updated);
    localStorage.setItem('bgmi_admin_submissions', JSON.stringify(updated));

    const targetSub = updated.find(s => s.id === id);
    if (targetSub) {
      updateSubmissionStatusInFirestore(targetSub.playerId, targetSub.phoneNumber, nextStatus);

      const activeSession = JSON.parse(localStorage.getItem('bgmi_active_submission') || '{}');
      if (activeSession.playerId === targetSub.playerId || activeSession.phoneNumber === targetSub.phoneNumber) {
        localStorage.setItem('bgmi_active_submission', JSON.stringify({ ...activeSession, status: nextStatus }));
      }
    }
  };

  // Delete Submission from LocalStorage and Live Firebase Database
  const handleDelete = async (id) => {
    const targetSub = submissions.find(s => s.id === id);
    if (targetSub) {
      deleteSubmissionFromFirestore(targetSub.playerId, targetSub.phoneNumber);

      const activeSession = JSON.parse(localStorage.getItem('bgmi_active_submission') || '{}');
      if (activeSession.playerId === targetSub.playerId || activeSession.phoneNumber === targetSub.phoneNumber) {
        localStorage.removeItem('bgmi_active_submission');
      }
    }

    const filtered = submissions.filter((sub) => sub.id !== id);
    setSubmissions(filtered);
    localStorage.setItem('bgmi_admin_submissions', JSON.stringify(filtered));
  };

  // Export Submissions as CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) return;

    const headers = ['Submission ID', 'Player ID', 'Phone Number', 'Account Level', 'Reward Title', 'Auth Provider', 'Date', 'Status'];
    const csvRows = [
      headers.join(','),
      ...submissions.map(s => [
        `"${s.id}"`,
        `"${s.playerId}"`,
        `"${s.phoneNumber}"`,
        s.accountLevel,
        `"${s.rewardTitle}"`,
        `"${s.authProvider || 'Verified Player'}"`,
        `"${s.createdDate}"`,
        `"${s.status}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BGMI_Submissions_${Date.now()}.csv`;
    a.click();
  };

  // Filter & Search Logic
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = filterStatus === 'ALL' || sub.status.toUpperCase() === filterStatus;
    const matchesSearch =
      sub.playerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.rewardTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate Stats
  const totalSubs = submissions.length;
  const approvedSubs = submissions.filter((s) => s.status === 'Approved').length;
  const processingSubs = submissions.filter((s) => s.status === 'Processing').length;
  const rejectedSubs = submissions.filter((s) => s.status === 'Rejected').length;

  // Passcode Lock View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bgmi-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-bgmi-dark border-2 border-bgmi-gold/70 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-bgmi-gold/10 border border-bgmi-gold rounded-full flex items-center justify-center mx-auto text-bgmi-gold">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="font-gaming text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
              ADMIN PANEL
            </h2>
            <p className="text-xs text-gray-400">
              Enter admin passcode to manage player verifications & hero section.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-bgmi-black border border-gray-600 focus:border-bgmi-gold text-white font-mono px-4 py-2.5 rounded outline-none pl-10"
                />
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
              {passError && (
                <p className="text-red-400 text-xs mt-1.5">{passError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 text-lg font-gaming tracking-wider uppercase rounded shadow-gold-glow"
            >
              ACCESS DASHBOARD
            </button>
          </form>

          <button
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white pt-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Event Home</span>
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Main View
  return (
    <div className="min-h-screen bg-bgmi-black text-white p-4 sm:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-bgmi-dark border border-bgmi-gold/40 rounded-lg p-4 sm:p-6 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-bgmi-gold" />
              <h1 className="font-gaming text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
                ADMIN CONTROL DASHBOARD
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Real-time Firestore sync, player status control & hero section banner management.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-initial px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-gaming text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={onBackToHome}
              className="flex-1 sm:flex-initial px-4 py-2 bg-bgmi-black border border-gray-600 hover:border-bgmi-gold text-gray-300 hover:text-white text-xs font-gaming font-bold rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>EXIT DASHBOARD</span>
            </button>
          </div>
        </div>

        {/* Hero Section Banner Manager Panel */}
        <div className="bg-bgmi-dark border-2 border-bgmi-gold/50 rounded-lg p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-bgmi-gold" />
              <h2 className="font-gaming text-xl font-bold tracking-wider text-white uppercase">
                HERO SECTION BANNER MANAGER
              </h2>
            </div>
            <span className="text-xs text-bgmi-gold font-mono">LIVE PREVIEW ACTIVE</span>
          </div>

          {heroSuccessMsg && (
            <div className="p-2.5 bg-green-950/80 border border-green-500 text-green-200 text-xs rounded flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>{heroSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Live Banner Preview Box */}
            <div className="md:col-span-1 bg-black border border-gray-700 rounded overflow-hidden p-2">
              <span className="block text-[10px] text-gray-400 font-mono mb-1">Current Banner Image:</span>
              <img
                src={heroBannerInput || defaultHeroImg}
                alt="Admin Hero Banner Preview"
                className="w-full h-28 object-contain rounded bg-black/60"
              />
            </div>

            {/* Banner Controls & URL Input */}
            <form onSubmit={handleSaveHeroBanner} className="md:col-span-2 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Hero Banner Image URL / Asset Path
                </label>
                <input
                  type="text"
                  placeholder="Enter Image URL (e.g. https://... or /assets/hero_banner.png)"
                  value={heroBannerInput}
                  onChange={(e) => setHeroBannerInput(e.target.value)}
                  className="w-full bg-bgmi-black border border-gray-700 focus:border-bgmi-gold text-white font-mono text-xs px-3 py-2.5 rounded outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  className="btn-gold px-4 py-2 text-xs font-gaming font-bold tracking-wider rounded flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>UPDATE HERO BANNER</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetHeroBanner}
                  className="px-4 py-2 bg-bgmi-black border border-gray-700 hover:border-bgmi-gold text-gray-300 hover:text-white text-xs font-gaming font-bold rounded flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-bgmi-gold" />
                  <span>RESET TO OFFICIAL BANNER</span>
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* Statistics Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-bgmi-dark border border-gray-800 rounded-lg p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-gaming font-bold text-white">
              {totalSubs}
            </span>
            <span className="text-xs text-gray-400 font-sans uppercase">Total Players</span>
          </div>

          <div className="bg-bgmi-dark border border-yellow-500/30 rounded-lg p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-gaming font-bold text-yellow-400">
              {processingSubs}
            </span>
            <span className="text-xs text-yellow-500/80 font-sans uppercase">Processing</span>
          </div>

          <div className="bg-bgmi-dark border border-green-500/30 rounded-lg p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-gaming font-bold text-green-400">
              {approvedSubs}
            </span>
            <span className="text-xs text-green-500/80 font-sans uppercase">Approved</span>
          </div>

          <div className="bg-bgmi-dark border border-red-500/30 rounded-lg p-4 text-center">
            <span className="block text-2xl sm:text-3xl font-gaming font-bold text-red-400">
              {rejectedSubs}
            </span>
            <span className="text-xs text-red-500/80 font-sans uppercase">Rejected</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-bgmi-dark border border-gray-800 rounded-lg p-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search Player ID or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bgmi-black border border-gray-700 focus:border-bgmi-gold text-white text-xs px-3 py-2 pl-9 rounded outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Filter Status Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'PROCESSING', 'APPROVED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-gaming font-bold rounded transition-colors uppercase whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-bgmi-gold text-black'
                    : 'bg-bgmi-black text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Submissions Table */}
        <div className="bg-bgmi-dark border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-bgmi-black text-bgmi-gold font-gaming uppercase tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-4">Player Details</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Reward Claimed</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500 font-sans">
                      No player submissions found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-black/30 transition-colors">
                      
                      {/* Player ID & Auth */}
                      <td className="p-4 font-mono">
                        <div className="font-bold text-white text-sm">{sub.playerId}</div>
                        <div className="text-[10px] text-gray-400">{sub.authProvider || 'Verified Player'}</div>
                      </td>

                      {/* Phone */}
                      <td className="p-4 font-mono text-gray-300">
                        {sub.phoneNumber}
                      </td>

                      {/* Level */}
                      <td className="p-4 font-mono font-bold text-bgmi-gold">
                        Lvl {sub.accountLevel}
                      </td>

                      {/* Reward */}
                      <td className="p-4 font-sans font-semibold text-white">
                        {sub.rewardTitle}
                      </td>

                      {/* Date */}
                      <td className="p-4 text-[11px] text-gray-400 font-mono">
                        {sub.createdDate}
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold font-gaming uppercase tracking-wider ${
                            sub.status === 'Approved'
                              ? 'bg-green-950/80 text-green-400 border border-green-600/50'
                              : sub.status === 'Rejected'
                              ? 'bg-red-950/80 text-red-400 border border-red-600/50'
                              : 'bg-yellow-950/80 text-yellow-400 border border-yellow-600/50'
                          }`}
                        >
                          {sub.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5" />}
                          {sub.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                          {sub.status === 'Processing' && <Clock className="w-3.5 h-3.5" />}
                          <span>{sub.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          
                          {/* Toggle Status Button */}
                          <button
                            onClick={() => handleStatusChange(sub.id, sub.status)}
                            className="px-2.5 py-1 bg-bgmi-black border border-gray-700 hover:border-bgmi-gold text-gray-300 hover:text-white rounded flex items-center gap-1 text-[11px] font-semibold transition-colors"
                            title="Toggle Status (Processing -> Approved -> Rejected)"
                          >
                            <RefreshCw className="w-3 h-3 text-bgmi-gold" />
                            <span>Toggle Status</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-950/50 rounded transition-colors"
                            title="Delete Submission from Firestore & Local Storage"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
