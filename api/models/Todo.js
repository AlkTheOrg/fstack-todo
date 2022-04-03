const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// name, due, color, pageId
const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, "A name must be provided"],
    minlength: [2, "Cant be less than 2 characters"],
  },
  due: {
    type: Date,
    required: [true, "A date must be provided"],
    default: Date.now()
  },
  color: {
    type: String,
    default: "#000",
  },
  completed: {
    type: Boolean,
    enum: [true, false],
    default: false
  }
});

TodoSchema.plugin(uniqueValidator);

module.exports = model("todo", TodoSchema);
