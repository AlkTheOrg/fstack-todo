const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "A username must be provided"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      unique: true,
      minLength: [3, "username must be at least 3 characters"],
    },
    password: {
      type: String,
      required: [true, "A password must be provided"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "An email must be provided"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    todoPages: [
      {
        type: Schema.Types.ObjectId,
        ref: "todoPage"
      }
    ]
    // signUpDate: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

UserSchema.methods.toAuthJSON = function (token) {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    token
  };
};

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", async function (next) {
  console.log("beforeHash:", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("afterHash:", this);
  return next();
});

module.exports = mongoose.model("user", UserSchema);
