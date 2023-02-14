//create mongo database
require('./api-backend/models/connect.js')
const admin = require('./api-backend/routes/admin.js')
const answer = require('./api-backend/routes/answer.js')
const survey = require('./api-backend/routes/questionnaire.js')
const adminServer = require('./api-backend/routes/adminServer.js')
const basic = require('./api-backend/routes/basic.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const router = express.Router();
require('custom-env').env('localhost');
const app= express();

//middleware
app.use(bodyParser.json());
app.use(cors())


//run post and get responses
app.use('/intelliq_api/questionnaire',survey);
app.use('/intelliq_api/adminpage',admin);
app.use('/intelliq_api/answer',answer);
app.use('/intelliq_api/admin',adminServer);
app.use('/intelliq_api',basic);
app.get('/hello', (req, res) => {
    res.send('Hello');
});
app.use((req, res, next) => { res.status(400).json({message: 'Bad request'}); })

module.exports = app;
