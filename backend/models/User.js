import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
