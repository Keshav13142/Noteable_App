const mongoose = require("mongoose");

//Defining the User Schema using mongoose
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a name"],
    },
  },
  {
    //Telling mongoose to automatically generate timestamps while saving a record
    timestamps: true,
  }
);
//Create the User model
const User = mongoose.model("User", userSchema);

//Defining the Notes Schema using mongoose
const noteSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Untitled",
    },
    content: {
      type: String,
      required: [true, "please add a text value"],
    },
  },
  {
    //Telling mongoose to automatically generate timestamps while saving a record
    timestamps: true,
  }
);
//Create the Note model
const Note = mongoose.model("Note", noteSchema);

//Exporting both the models
module.exports = { User, Note };
