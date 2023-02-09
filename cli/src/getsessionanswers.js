const constructURL = require('../lib/constructURL');
const errorHandler = require('../lib/errorHandler');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const https = require('https');

module.exports = function(o) {

    isWrong = false;
    
    if (process.argv[3] === undefined || process.argv[4] === undefined){
        isWrong = true;
    }

    if (!isWrong && (process.argv[5] === 'json' || process.argv[5] === undefined)) {
        format = 'json';
    }
    else if (process.argv[5] === 'csv') format = 'csv';
    else isWrong = true;

    if (!isWrong) {
    
        param1 = process.argv[3];
        param2 = process.argv[4];

        var url = constructURL('/getsessionanswers/', param1, param2, format);

        console.log(chalk.green(url));
        //axios(url);
    }
    else {
        console.log(chalk.red('Error: wrong format or mandatory parameters omitted\n'));
        console.log(chalk.yellow('Mandatory Parameters: \n --questionnaire_id [id] \n --session_id [id]'));
        console.log(chalk.yellow('Optional Parameter: \n --format [json | csv] \n'));
        console.log(chalk.yellow('ex: se2222 getsessionanswers questionnaire_id session_id json\n'));
    }

}