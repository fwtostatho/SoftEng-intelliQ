const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express.Router();
const basicController = require('../controllers/basic.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/'});

app.get('/questionnaire/:questionnaireID', basicController.getQuestionnaire);
app.get('/question/:questionnaireID/:questionID', basicController.getQuestionnaireQuestion);
app.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', basicController.postQuestionnaire);
app.get('/getsessionanswers/:questionnaireID/:session', basicController.getSessionAnswers);
app.get('/getquestionanswers/:questionnaireID/:questionID', basicController.getQuestionAnswers);


module.exports = app;