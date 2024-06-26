const constructURL = require('../lib/constructURL');
const errorHandler = require('../lib/errorHandler');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const https = require('https');


module.exports = function(o) {

    isWrong = false;
    
    if (process.argv[3] === undefined){
        isWrong = true;
    }

    if (!isWrong && (process.argv[4] === 'json' || process.argv[4] === undefined)) {
        format = 'json';
    }
    else if (process.argv[4] === 'csv') format = 'csv';
    else isWrong = true;

    if (!isWrong) {
    
        param1 = process.argv[3];

        var url = constructURL('/questionnaire/', param1, format);

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
                //console.log(err);
        })

        //console.log(chalk.green(url));
        //axios(url);
    }
    else {
        console.log(chalk.red('Error: wrong format or mandatory parameters omitted\n'));
        console.log(chalk.yellow('Mandatory Parameters: \n --questionnaire_id [id]'));
        console.log(chalk.yellow('Optional Parameter: \n --format [json | csv] \n'));
        console.log(chalk.yellow('ex: se2222 questionnaire questionnaire_id json\n'));
    }

}