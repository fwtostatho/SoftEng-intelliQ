const express = require("express");
const userModel = require('./user');
const app = express.Router();
app.post('/', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  if(!req.body.email) {
    // ...
  }
  let model = new userModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
  module.exports = app;
  