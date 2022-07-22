const bcrypt = require("bcrypt");
const { User, Note } = require("../models/models");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  if (await User.find({ email })) {
    res.render("register", {
      title: "Register",
      options: {},
      loggedIn: false,
      error: true,
    });
  } else {
    const user = await User.create({
      name: name,
      email: email,
      password: hashPass,
    });
    res.send("Registered sucessfully");
  }
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
