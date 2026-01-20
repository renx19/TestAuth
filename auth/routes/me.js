import express from 'express';
import { auth } from '../db/auth.js';

const router = express.Router();

router.get('/me', auth, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

export default router;
