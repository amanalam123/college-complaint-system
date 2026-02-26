const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ============================
   REGISTER USER
============================ */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      // : hashedPassword,
      role: role || "user", // default role
    });

    res.status(201).json({
      message: "User registered successfully",
      role: user.role,
    });

  } catch (error) {
        console.log("REGISTER ERROR:", error); 
    res.status(500).json({ error: error.message });
  }
};

/* ============================
   LOGIN USER
============================ */
exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check role matches selected login type
    if (user.role !== role) {
      // return res.status(400).json({ message: "Invalid login type selected" });
      return res.status(400).json({ message: `Role mismatch. DB role is ${user.role}, selected role is ${role}` });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

//     console.log("Entered password:", password);
// console.log("Stored hash:", user.password);
// console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // console.log(user);

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};