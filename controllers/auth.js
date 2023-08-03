const bcrypt = require("bcrypt");

const { User, joiUserSchema } = require("../models/user");
const ResultError = require("../utils/ResultError");
const ctrlWrapper = require("../utils/ctrlWrapper");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw ResultError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
