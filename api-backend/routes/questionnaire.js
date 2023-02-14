const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const surveyModel = require('../models/questionnaire');
const app = express.Router();
const surveyController = require('../controllers/questionnaire');
//get request
app.get('/',surveyController.getSurvey);

  module.exports = app;
// post request
app.post('/postQuestionnaire', surveyController.postSurvey);