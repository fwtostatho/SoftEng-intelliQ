const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const answerModel = require('../models/answer');
const app = express.Router();

//get request
app.get('/', async (req, res) => {
    res.send(await answerModel.find({}));
});

module.exports = app;
// post request
app.post('/', async (req, res) => {
    const answer = new answerModel(req.body);
    try {
        await answer.save();
        res.status(201).send(answer);
    }catch(error){
        res.status(500).send(error);
    }
});