const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const answerModel = require('../models/answer');

exports.getAnswer = async (req, res, next) => {
    try {
        const answers = await answerModel.find();
        res.status(200).json(answers);
    } catch (error) {
        next(error);
    }
}
exports.postAnswer = async (req, res, next) => {
    const answer = new answerModel(req.body);
    try {
        await answer.save();
        res.status(201).send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
}