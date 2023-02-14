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






/////////////////////////////////////////////////////////

//Link the controllers

const surveyController = require('./controllers/survey');

router.get('/', surveyController.getSurveys);
router.post('/', surveyController.createSurvey);
router.put('/:id', surveyController.updateSurvey);
