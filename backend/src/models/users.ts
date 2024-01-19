export type UserType = {
  _id: string;
  email: string;
  password: string;
  firsName: string;
  lastName: string;
};

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model<UserType>("User", userSchema);
