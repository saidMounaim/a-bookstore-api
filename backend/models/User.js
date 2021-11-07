import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
