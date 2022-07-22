const mongoose = require("mongoose");

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
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    note: {
      type: String,
      required: [true, "please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = { User, Note };
