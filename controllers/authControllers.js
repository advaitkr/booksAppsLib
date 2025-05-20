const User = require("../models/User");
const generateToken = require(".././utils/genrateToken");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ token: generateToken(user._id) });
};
