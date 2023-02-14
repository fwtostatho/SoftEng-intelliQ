const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  choices: [String],
  nextQuestions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]}, {
    versionKey: false
});
  const Question = mongoose.model('Question', questionSchema);
  module.exports = Question