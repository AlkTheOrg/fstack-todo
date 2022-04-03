const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const TodoPageSchema = new Schema({
  name: {
    type: String,
    minlength: [1, "page title can not be less than a character long"],
    required: [true, "A name must be provided"],
  },
  sortKey: {
    type: String,
    enum: ["name", "due"],
    default: "due"
  },
  sortOrder: {
    type: String,
    enum: ["asc", "desc"],
    default: "asc"
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "todo"
    }
  ]
});

TodoPageSchema.plugin(uniqueValidator);

module.exports = mongoose.model("todoPage", TodoPageSchema);
