const { Note } = require("../models/models");

const getNotes = async (req, res) => {
  //Getting the session data from request
  const user = req.session.user;

  //Checking if user is logged in  and fetching the data from database
  if (user) {
    const notes = await Note.find({ user_id: req.session.user._id });
    res.render("notes", {
      name: user.name,
      title: "My notes",
      loggedIn: true,
      error: {},
      notes: notes,
    });
  }
  //If user is not logged in the redirecting to the login page
  else {
    res.redirect("login");
  }
};

const saveNote = async (req, res) => {
  //Getting the title and content of the note from the request's body
  var { title, content } = req.body;

  //Getting rid of excess whitespace
  title = title.trim();
  content = content.trim();

  //Checking if user is active (if not then logout)
  if (!req.session.user) {
    res.redirect("/logout");
  }
  //If user is active then save the note in the database
  else {
    //Setting the default  title in case it's empty
    if (title.length == 0) {
      title = "Untitled";
    }
    const note = await Note.create({
      user_id: req.session.user._id,
      title: title,
      content: content,
    });

    //After saving then redirect to '/notes' to fetch new data
    res.redirect("/notes");
  }
};

const deleteNote = async (req, res) => {
  //Checking if the user is active (if not then logout)
  if (!req.session.user) {
    res.redirect("/logout");
  } else {
    //Checking to see if the delete request is valid (if not then logout)
    if (req.session.user._id != req.body.uid) res.redirect("/logout");
    //Else delete the note and redirect to '/notes' to update data
    else {
      await Note.deleteOne({ _id: req.body.id });
      res.redirect("/notes");
    }
  }
};

//Exporting all the functions
module.exports = { getNotes, saveNote, deleteNote };
