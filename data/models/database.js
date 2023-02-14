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
  }
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
  }]
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
  }
});

const UserSchema = new Schema({
  name: String
  });

const AdminSchema = new Schema({
  name: String
});

const InstitutionSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Institution = mongoose.model('Institution', InstitutionSchema);
const Survey = mongoose.model('Survey', surveySchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Admin
module.exports = Institution
module.exports = Survey
module.exports = Question
module.exports = Answer