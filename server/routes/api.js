import express from 'express';

const router = express.Router();

// In-memory submissions store for API fallback
let submissions = [];

// GET /api/submissions - Retrieve all submissions
router.get('/submissions', (req, res) => {
  res.json({ success: true, data: submissions });
});

// POST /api/submissions - Add new submission
router.post('/submissions', (req, res) => {
  const { playerId, phoneNumber, accountLevel, rewardTitle } = req.body;
  if (!playerId || !phoneNumber) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const newSubmission = {
    id: `sub_${Date.now()}`,
    playerId,
    phoneNumber,
    accountLevel: parseInt(accountLevel, 10) || 50,
    rewardTitle: rewardTitle || 'UP Series Reward',
    createdDate: new Date().toLocaleString(),
    status: 'Processing',
  };

  submissions.unshift(newSubmission);
  res.json({ success: true, data: newSubmission });
});

// POST /api/admin/login - Authenticate admin passcode ('apex2026')
router.post('/admin/login', (req, res) => {
  const { passcode } = req.body;
  if (passcode === 'apex2026') {
    res.json({ success: true, message: 'Admin authenticated successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Passcode' });
  }
});

export default router;
