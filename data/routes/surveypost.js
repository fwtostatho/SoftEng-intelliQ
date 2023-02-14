const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const surveyModel = require('../models/survey');
const app = express.Router();

//get request
app.get('/', async (req, res) => {
    res.send(await surveyModel.find({})); 
});

  module.exports = app;
// post request
app.post('/', async (req, res) => {
  const survey = new surveyModel(req.body);
  try {
    await survey.save();
    res.status(201).send(survey);
  }catch(error){
    res.status(500).send(error);
  }
});