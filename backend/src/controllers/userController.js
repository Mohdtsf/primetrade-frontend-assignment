const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;

    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    next(error);
  }
};
