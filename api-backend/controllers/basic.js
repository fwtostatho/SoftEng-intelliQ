const { json } = require("express");
const express = require("express");
const multer = require('multer');
const questionnaireModel = require('../models/questionnaire');
const { default: mongoose } = require("mongoose");
require('../../app.js');
const answerModel = require('../models/answer');
const surveyModel = require("../models/questionnaire");
const _ = require("lodash");
const json2csv = require("json2csv").parse;

exports.getQuestionnaire = async (req, res) => {
    try {
        const id = req.params.questionnaireID;
        if(!id) {res.status(400).json({message: 'Bad request'}); return;}
        const data = await questionnaireModel.find({questionnaireID: id}, {
            'questions._id': 0,
            'questions.options._id': 0
        }).select('-_id');
        if(data.length==0){
            res.status(402).json({message: 'No data'});
            return;
        }
        const format = req.query.format;
        if (format === 'csv') {
            const data1 = data.map(item => item._doc);
            //const fields = ['questionnaireID', 'quetionnaireTitle', 'keywords', 'questions.qID', 'questions.qtext', 'questions.required', 'questions.type', 'questions.options.optID', 'questions.options.opttxt', 'questions.options.nextqID','creator'];
            //const opts = { fields };
            const csvdata = json2csv(data1);
            res.setHeader("Content-Type", "text/csv");
            res.status(200).send(csvdata);
        } else {
            res.status(200).json(data);
        }
    }catch(error){
        res.status(500).json({message: 'Internal server error'});
        return;
    }

}
exports.getQuestionnaireQuestion = async (req, res) => {
    try {
        const id1 = req.params.questionnaireID;
        const id2 = req.params.questionID;
        if(!id1 || !id2) {return res.status(400).json({message: 'Bad request'});}
        const format = req.query.format;
        const results = await questionnaireModel.find({questionnaireID: id1,"questions.qID":id2}, {"questions": {"$elemMatch": {"qID": id2}}}).exec();
        const question = results.map(function (result) {
            return {
                qtext: result.questions[0].qtext,
                required: result.questions[0].required,
                type: result.questions[0].type,
                options: result.questions[0].options,
            };
        });
        if(question.length==0){
            res.status(402).json({message: 'No data'});
            return;
        }
        const data = {"questionnaireID": id1, "qID": id2, question};
        if (format === 'csv') {
            const csvdata = json2csv(data);
            res.setHeader("Content-Type", "text/csv");
            res.status(200).send(csvdata);
        } else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(500).json({message: 'Internal server error'});
        return;
    }
        //const question2 = question.find({ },{'questions.options._id':0}).exec();


}
//,'questions._id':0,'questions.options._id':0
exports.postQuestionnaire =  async (req, res) => {
    try {
        const questionnaireID = req.params.questionnaireID;
        const questionID = req.params.questionID;
        const session = req.params.session;
        const optionID = req.params.optionID;
        if(!questionnaireID||!questionID||!session||!optionID) {
            res.status(400).json({message: 'Bad request'});
        return;
        }
        await answerModel.find({
            session: session, questionnaireID: questionnaireID
        }).then(result => {
            if (result.length == 0) {
                const answer = new answerModel({
                    questionnaireID: questionnaireID,
                    session: session,
                    answers: [{ans: optionID, qID: questionID}]
                });
                answer.save();
                res.status(200).send();
            }
            else { try{
                const answer =   answerModel.findOneAndUpdate({
                    session: session,
                    questionnaireID: questionnaireID
                }, {$push: {answers: {ans: optionID, qID: questionID}}}, {new: true}).exec();
                res.status(200).send();
            } catch (err) {

            }}
        })

    } catch (err) {res.status(500).json({message: 'Internal server error'});
        return;}
}
exports.getSessionAnswers = async (req, res) => {
 try {
     const id = req.params.questionnaireID;
     const ses = req.params.session;
     if(!id || !ses){ res.status(400).json({message: 'Bad request'});
         return;}
     const data = await answerModel.find({questionnaireID: id, session: ses}, {'answers._id': 0}).select('-_id');
     const format = req.query.format;
     if(data.length==0){
         res.status(402).json({message: 'No data'});
         return;
     }
     if (format === 'csv') {
         const data1 = data.map(item => item._doc);
         const csvdata = json2csv(data1);
         res.setHeader("Content-Type", "text/csv");
         res.status(200).send(csvdata);
     } else {
         res.status(200).json(data);
     }
 }
 catch (error) {
     res.status(500).json({message: 'Internal server error'});
     return;
 }
}

exports.getQuestionAnswers = async (req, res) => {
    try {
        const id1 = req.params.questionnaireID;
        const id2 = req.params.questionID;
        if(!id1 || !id2) {res.status(400).json({message: 'Bad request'}); return;}
        const results = await answerModel.find({
            questionnaireID: id1,
            "answers.qID": id2
        }, {"answers": {"$elemMatch": {"qID": id2}}, "session": 1}).exec();
        const answer = results.map(function (result) {

            return {
                ans: result.answers[0].ans,
                session: result.session
            };

        });

        const data = {"questionnaireID": id1, "qID": id2, answer};
        const format = req.query.format;
        if(data.length==0){
            res.status(402).json({message: 'No data'});
            return;
        }
        if (format === 'csv') {
            const csvdata = json2csv(data);
            res.setHeader("Content-Type", "text/csv");
            res.status(200).send(csvdata);
        } else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(500).json({message: 'Internal server error'});
        return;
    }
}
