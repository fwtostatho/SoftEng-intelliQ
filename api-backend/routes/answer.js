const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const answerModel = require('../models/answer');
const app = express.Router();
const answerController = require('../controllers/answer');
//get request
app.get('/', answerController.getAnswer);

module.exports = app;
// post request
app.post('/',answerController.postAnswer );