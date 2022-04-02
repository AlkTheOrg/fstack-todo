const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoPageSchema = new Schema({
  name: {
    type: String,
    minlength: [1, "page title can not be less than a character long"],
    required: true,
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
});

module.exports = mongoose.model("todoPage", TodoPageSchema);
