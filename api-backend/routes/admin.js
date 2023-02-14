const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const adminModel = require('../models/admin');
const app = express.Router();
const adminController = require('../controllers/admin');
//get request
app.get('/', adminController.getAdmin);

  module.exports = app;
// post request
app.post('/',adminController.postAdmin);