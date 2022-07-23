//Importing all the necessary dependencies and packages
const express = require("express");
const app = express();
const sessions = require("express-session");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
require("dotenv").config();

//config for ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

//Telling express to use json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Importing the services for users and notes
const { login, register, logout } = require("./services/userController");
const {
  getNotes,
  saveNote,
  deleteNote,
} = require("./services/notesController");

//connecting to the mongo cluster
mongoose.connect(process.env.MONGO_URL);

//session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

//Redirecting the '/' route to the login page
app.get("/", (_, res) => {
  res.redirect("/login");
});

//Config for the '/login' route (Both GET and POST requests)
app
  .route("/login")
  .post(login)
  .get((req, res) => {
    res.render("login", {
      loggedIn: false,
      error: {},
    });
  });

//Config for the '/register' route (Both GET and POST requests)
app
  .route("/register")
  .get((req, res) => {
    res.render("register", {
      loggedIn: false,
      error: {},
    });
  })
  .post(register);

//Config for the '/notes' route (Both GET and POST requests)
app.route("/notes").get(getNotes).post(saveNote);

//Config for the '/logout' route (GET)
app.get("/logout", logout);

//Config fot the '/delete' route (POST)
app.post("/delete", deleteNote);

//Telling the app to listen on PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
