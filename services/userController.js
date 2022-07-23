//Bcrypt for salting and hashing the password
const bcrypt = require("bcrypt");
const { User } = require("../models/models");

const register = async (req, res) => {
  //Destructuring the fields from the request's body
  const { email, password, name } = req.body;

  //Check for any empty fields
  if (!email || !password || !name) {
    //If empty then re-render the page with error message
    res.render("register", {
      title: "Register",
      loggedIn: false,
      error: {
        status: true,
        message: "Mandatory fields are empty!!",
        info: "Please enter all the required details",
      },
    });
  }
  //Else check if the user's email already exists
  else {
    if (await User.findOne({ email })) {
      //re-render the page with error message
      res.render("register", {
        title: "Register",
        loggedIn: false,
        error: {
          status: true,
          message: "Email already exists!!",
          info: "Try logging in if you already have an account",
        },
      });
    }
    //If everything is fine then hash the password and save the user in database
    else {
      const hashPass = await bcrypt.hash(password, 10);
      const user = await User.create({
        name: name,
        email: email,
        password: hashPass,
      });
      //Setting the session variable
      req.session.user = { name: user.name, _id: user._id };

      //After saving the user, then redirect to the notes page
      res.redirect("/notes");
    }
  }
};

const login = async (req, res) => {
  //Destructuring the fields from the request's body
  const { email, password } = req.body;

  //Check for any empty fields
  if (!email || !password) {
    //If empty then re-render the page with error message
    res.render("login", {
      title: "Login",
      loggedIn: false,
      error: {
        status: true,
        message: "Invalid credentials!!",
        info: "Please check you email and password!",
      },
    });
  }
  //Else proceed to check the credentials
  else {
    //Get the user's info from the database using the email
    const user = await User.findOne({ email });

    //Compare with the hashed password using bcrypt...
    if (user && (await bcrypt.compare(password, user.password))) {
      //Set the session variable and redirect to '/notes'
      req.session.user = { name: user.name, _id: user._id };
      res.redirect("notes");
    }
    //If the passwords don't match the re-render the login page with error
    else
      res.render("login", {
        title: "Login",
        loggedIn: false,
        error: {
          status: true,
          message: "Invalid credentials!!",
          info: "Please check you email and password!",
        },
      });
  }
};

const logout = (req, res) => {
  //End the current session by setting the variable to null then redirect to '/login'
  req.session.user = null;
  res.redirect("login");
};

//Export the functions
module.exports = { register, login, logout };
