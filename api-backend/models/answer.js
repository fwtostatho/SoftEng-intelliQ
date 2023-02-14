const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema({
            questionnaireID: { type: String, required: true },
    answers: [{
    ans: {
        //ans=optId
      type: String
    },
    qID: {
      type: String
    }}],
    session: {
      type: String ,required: true, maxLength: 4
    }}
        //session =name tou user
    , {
      versionKey: false
  });
  const Answer = mongoose.model('Answer', answerSchema);
  module.exports = Answer;