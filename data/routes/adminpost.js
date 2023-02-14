const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const adminModel = require('../models/admin');
const app = express.Router();

//get request
app.get('/', async (req, res) => {
    res.send(await adminModel.find({})); 
});

  module.exports = app;
// post request
app.post('/', async (req, res) => {
  const admin = new adminModel(req.body);
  try {
    await admin.save();
    res.status(201).send(admin);
  }catch(error){
    res.status(500).send(error);
  }
});