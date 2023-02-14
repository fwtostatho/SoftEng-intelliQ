const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const surveyModel = require('../models/questionnaire');

exports.getSurvey = async (req, res, next) => {
    res.send(await surveyModel.find({}));
}
exports.postSurvey = async (req, res, next) => {
    const survey = new surveyModel(req.body);
    try {
        await survey.save();
        res.status(201).send(survey);
    }catch(error){
        res.status(500).send(error);
    }
}