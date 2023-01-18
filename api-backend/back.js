const express = require('express');
const router = express.Router();

// define routes
router.get('/', (req, res) => {
  // handle GET request
});

router.post('/', (req, res) => {
  // handle POST request
});

router.put('/:id', (req, res) => {
  // handle PUT request
});

router.delete('/:id', (req, res) => {
  // handle DELETE request
});

//////////////////////////////////////////////////////////////////

// Controllers

const Survey = require('../models/survey');

exports.getSurveys = (req, res) => {
  Survey.find({}, (err, surveys) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json({ surveys });
  });
};

exports.createSurvey = (req, res) => {
  const survey = new Survey(req.body);
  survey.save((err, survey) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(201).json({ survey });
  });
};

exports.updateSurvey = (req, res) => {
  Survey.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, survey) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json({ survey });
  });
};

exports.deleteSurvey = (req, res) => {
  Survey.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json({ message: 'Survey deleted successfully' });
  });
};


/////////////////////////////////////////////////////////

//Link the controllers

const surveyController = require('./controllers/survey');

router.get('/', surveyController.getSurveys);
router.post('/', surveyController.createSurvey);
router.put('/:id', surveyController.updateSur
