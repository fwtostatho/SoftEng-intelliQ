const { json } = require("express");
const express = require("express");
const multer = require('multer');
const questionnaireModel = require('../models/questionnaire');
const { default: mongoose } = require("mongoose");
require('../../app.js');
const answerModel = require('../models/answer');
const adminModel = require('../models/admin');

const fs = require('fs');




exports.healthCheck = (req, res) => {
    try {
        const url = 'mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority';
        const db = Number(mongoose.connection.readyState);
        if (db === 1) {
            res.status(200).json({"status": "OK", "dbconnection": [url]});
        } else {
            res.status(500).json({"status": "failed", "dbconnection": [url]});
        }
    }catch (error) {
        res.status(500).send();
    }
}
exports.resetAll = (req, res) => {
    answerModel.deleteMany({}, (error) => {
        if (error) {
            res.status(500).json({"status":"failed", "reason":error});
        } else {
            res.status(200).json({"status":"OK"});
        }
    }),
            adminModel.deleteMany({}, (error) => {
                if (error) {
                    res.status(500).json({"status":"failed", "reason":error});
                } else {
                    res.status(200).json({"status":"OK"});
                }
            }),
            questionnaireModel.deleteMany({}, (error) => {
                if (error) {
                    res.status(500).json({"status":"failed", "reason":error});
                } else {
                    res.status(200).json({"status":"OK"});
                }
    })
}

exports.questionnaire_upd = async (req, res) => {          //find fields
    const file= req.file;
    const fileData = fs.readFileSync(file.path);
    const data = JSON.parse(fileData);

    const questionnaire = new questionnaireModel(data);
    try {
        await questionnaire.save();
        res.status(201).send(questionnaire);
    }catch(error) {
        res.status(500).send(error);
    }
}


exports.resetq = (req, res) => {
    const id = req.params.id;
    answerModel.deleteMany({  questionnaireID: id  }, (error) => {
        if (error) {
            res.status(500).json({"status":"failed", "reason":error});
        } else {
            res.status(200).json({"status":"OK"});
        }
    });


}
