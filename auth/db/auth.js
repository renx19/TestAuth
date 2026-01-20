// db/auth.js
import User from '../models/user.js'; // User model

export const auth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    // Fetch user from DB
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });

    req.user = user; // Laravel-style Auth::user()
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
