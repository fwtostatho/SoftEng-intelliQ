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
            return res.status(500).json({"status":"failed", "reason":error});
        }
    }),
            // adminModel.deleteMany({}, (error) => {
            //     if (error) {
            //         return res.status(500).json({"status":"failed", "reason":error});
            //     }
            // }),
            questionnaireModel.deleteMany({}, (error) => {
                if (error) {
                   return  res.status(500).json({"status":"failed", "reason":error});
                }
                else {
                    return res.status(200).json({"status":"OK"});
                }
    })
}

exports.questionnaire_upd = async (req, res) => {          //find fields
    const file= req.file;
    const fileData = fs.readFileSync(file.path);
    try {
        const data = JSON.parse(fileData);
        const questionnaire = new questionnaireModel(data);
        try {
            await questionnaire.save();
            res.status(201).send(questionnaire);
        }catch(error) {
            res.status(500).send(error);
            return
        }
    }catch (error) {
        res.status(400).json({message: 'Bad request'});
        return
    }
}


exports.resetq = (req, res) => {
    const id = req.params.id;
    answerModel.deleteMany({  questionnaireID: id  }, (error) => {
        if (error) {
            res.status(500).json({"status":"failed", "reason":error});
            return
        } else {
            res.status(200).json({"status":"OK"});
        }
    });


}
