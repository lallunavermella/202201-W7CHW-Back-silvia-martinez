const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  friend: [{ type: Schema.Types.ObjectId, ref: "User" }],
  enemie: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model("User", UserSchema, "users");

module.exports = User;
