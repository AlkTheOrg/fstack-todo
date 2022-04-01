const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoPageSchema = new Schema({
  name: {
    type: String,
    minlength: [1, 'page title can not be less than a character long'],
    required: true,
  },
})

module.exports = mongoose.model('todoPage', TodoPageSchema);
