const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// Register a user
router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        username,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Login Failed" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Username or Password Is Incorrect!" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, userID: user._id, role: user.role });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get current user (must be BEFORE /:id)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a user
router.put(
  "/:id",
  auth,
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;

    const { username, password, role } = req.body;

    try {
      let user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { username, password: hashPassword, role },
        { new: true }
      );

      return res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all users (admin only)
router.get("/", auth, authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// Get user by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// Delete a user (admin only)
router.delete("/:id", auth, authorize(["admin"]), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error deleting user");
  }
});

module.exports = router;
