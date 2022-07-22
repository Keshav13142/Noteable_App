const bcrypt = require("bcrypt");
const { User, Note } = require("../models/models");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name,
    email: email,
    password: hashPass,
  });
  res.send("Logged in");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password)))
    res.send("Nouce");
  else
    res.render("login", {
      title: "Login",
      options: {},
      loggedIn: false,
      error: true,
    });
};
module.exports = { register, login };
