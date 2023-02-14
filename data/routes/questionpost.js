const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const questionModel = require('../models/question');
const app = express.Router();

//get request
app.get('/', async (req, res) => {
    res.send(await questionModel.find({})); 
});

  module.exports = app;
// post request
app.post('/', async (req, res) => {
  const question = new questionModel(req.body);
  try {
    await question.save();
    res.status(201).send(question);
  }catch(error){
    res.status(500).send(error);
  }
});
