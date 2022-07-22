const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { login, register } = require("./services/controller");
mongoose.connect(process.env.MONGO_URL);

app.post("/login", login);
app.post("/register", register);

app.get("/", (_, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    options: {},
    loggedIn: false,
    error: false,
  });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register", options: {}, loggedIn: false });
});

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
