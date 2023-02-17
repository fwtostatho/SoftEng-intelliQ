const fs = require('fs');
const chalk = require('chalk');

module.exports = function (err, customMessage) {

    let serverStatus = err.message.split(' ').slice(0,2).join(' ');
    if (serverStatus == 'connect ECONNREFUSED') {
        console.log(chalk.red("Sorry the server is facing some problems right now.\nPlease try again later!"));
        return;
    }

    let errMessage = err.response.data.message;
    //console.log(errMessage);

    (customMessage === undefined) ? console.log(chalk.red(errMessage)) : console.log(chalk.red(errMessage + '\n' + customMessage))
    //console.log('error');

}