const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const signInJWTToken = require("../utils/jwt");

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check if username already exists
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists, please choose another username" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = signInJWTToken(newUser._id, newUser.email);

    res
      .status(201)
      .json({ message: "User registered successfully", token, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if the person has an account in the database
    const user = await userModel.findOne({ email });

    // if the person does not have an account, we send an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // if the passwords do not match, we send an error
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signInJWTToken(user._id, user.email);

    res.json({ message: "User logged in successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getCurrentUser = async (req, res) => {
  const id = req.user;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const userController = {
  register,
  login,
  getCurrentUser,
};

module.exports = userController;
