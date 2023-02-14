const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema({
  choice: {
    type: Number,
    min: 0,
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }}, {
    versionKey: false
});
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
const surveySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    questions: [questionSchema],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
    answers: [answerSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }}, {
      versionKey: false
  });
  const Survey = mongoose.model('Survey', surveySchema);
  module.exports = Survey;