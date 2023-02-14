const adminModel = require('../models/admin');
const { json } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");

exports.getAdmin = async (req, res) => {
    res.send(await adminModel.find({}));
}
exports.postAdmin = async (req, res) => {
        const admin = new adminModel(req.body);
        try {
            await admin.save();
            res.status(200).send('Success');
        }catch(error){
            res.status(500).send(error);
        }
}