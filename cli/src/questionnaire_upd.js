const constructURL = require('../lib/constructURL');
const errorHandler = require('../lib/errorHandler');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const https = require('https');
const FormData = require('form-data');
const request = require('request');
const express = require('express');
const multer = require('multer');

module.exports = function(o) {
    isWrong = false;
    if (process.argv[3] === undefined){
        isWrong = true;
    }
    if (!isWrong) {
        source = process.argv[3]; //file path
        var url = constructURL('/questionnaire_upd/');

        function uploadFile(file) {
            const formData = new FormData();
            formData.append('', fs.createReadStream(file));
          
            return axios.post(url, formData, {
              headers: {
                ...formData.getHeaders()
              }
            });
        }
          
          
        const file = source;
        uploadFile(file)
            .then(response => {
                //console.log(response.data);
                console.log('File uploaded successfully');
            })
            .catch(error => {
                console.error(error);
            });
          
        
        //console.log(chalk.green(url));
    }
    else {
        console.log(chalk.red('Error: mandatory parameters omitted\n'));
        console.log(chalk.yellow('Mandatory Parameters: \n --source [file]'));
        console.log(chalk.yellow('ex: se2222 questionnaire_upd source\n'));
    }

}