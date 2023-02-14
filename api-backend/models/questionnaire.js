const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
            questionnaireID: { type: String, required: true },
            questionnaireTitle: {
      type: String,
      required: true
    },
    keywords: [{type: String}],
    questions: [{
        qID: {
            type: String,
            required: true
        },
        qtext: {
            type: String,
            required: true
        },
        required: {type: String, default: false},
        type:{type: String, required: true},
        options: [{
            optID: {
                type: String
            },
            opttxt: {type: String},
            nextqID: {
                type: String
            }
        }]
    }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    }},
        {
      versionKey: false
  });
  const Questionnaire = mongoose.model('Questionnaire', surveySchema);
  module.exports = Questionnaire;