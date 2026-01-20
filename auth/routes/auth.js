import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js"; // Note .js extension in ESM

const router = express.Router();

/**
 * Register
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 12);

    // Create user with name
    const user = await User.create({ name, email, password: hash });

    // Store userId in session
    req.session.userId = user._id;

    // Respond with user info (excluding password)
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Login (Laravel Auth::attempt)
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    // Regenerate session to prevent fixation
    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ message: "Session error" });

      req.session.userId = user._id;

      // Respond with full user info
      res.json({ id: user._id, name: user.name, email: user.email });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Logout
 */
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid", {
      // domain: '.example.com', // remove for localhost
      // secure: true,           // set false for localhost
      // sameSite: 'none'        // cross-site cookie
      secure: false, // must be false for localhost
      sameSite: "lax", // works for local cross-origin dev
    });
    res.json({ ok: true });
  });
});

export default router;
