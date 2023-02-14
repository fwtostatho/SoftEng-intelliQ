const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const institutionModel = require('../models/institution');
const app = express.Router();

//get request
app.get('/', async (req, res) => {
    res.send(await institutionModel.find({}));
});

module.exports = app;
// post request
app.post('/', async (req, res) => {
    const institution = new institutionModel(req.body);
    try {
        await institution.save();
        res.status(201).send(institution);
    }catch(error){
        res.status(500).send(error);
    }
});