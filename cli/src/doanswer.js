const constructURL = require('../lib/constructURL');
const errorHandler = require('../lib/errorHandler');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const https = require('https');

module.exports = function(o) {

    isWrong = false;
    
    if (process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined || process.argv[6] === undefined){
        isWrong = true;
    }

    if (!isWrong) {
    
        param1 = process.argv[3];
        param2 = process.argv[4];
        param3 = process.argv[5];
        param4 = process.argv[6];

        var url = constructURL('/doanswer/', param1, param2, param3, param4);
        var config = {
            method: 'post',
            url: url,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        };
        axios(config)
            .then(res => {
                console.log(chalk.green("Answer submitted successfully"));
        })
            .catch(err => {
                errorHandler(err);
        })
        //console.log(chalk.green(url));
        //axios(url);
    }
    else {
        console.log(chalk.red('Error: mandatory parameters omitted\n'));
        console.log(chalk.yellow('Mandatory Parameters: \n --questionnaire_id [id] \n --question_id [id] \n --session_id [id] \n --option_id [id]'));
        console.log(chalk.yellow('ex: se2222 doanswer questionnaire_id question_id session_id option_id\n'));
    }

}