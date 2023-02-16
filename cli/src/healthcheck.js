const constructURL = require('../lib/constructURL');
const errorHandler = require('../lib/errorHandler');
const chalk = require('chalk');
const axios = require('axios');
const https = require('https');

module.exports = function(o) {
    var url = constructURL('/healthcheck/');
    var config = {
        method: 'get',
        url: url,
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    axios(config)
        .then(res => {
            console.dir(res.data,{depth:null})
    })
        .catch(err => {
            errorHandler(err);
    })

//console.log(chalk.green(url));
}