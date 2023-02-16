const constructURL = require('../lib/constructURL');
const errorHandler = require('../lib/errorHandler');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const https = require('https');

module.exports = function(o) {

    var url = constructURL('/resetall/');
    var config = {
        method: 'post',
        url: url,
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    };
    axios(config)
        .then(res => {
            console.dir(res.data,{depth:null})
            //console.log(chalk.green("Database reset successfully"));
    })
        .catch(err => {
            errorHandler(err);
    })

    //console.log(chalk.green(url));

}