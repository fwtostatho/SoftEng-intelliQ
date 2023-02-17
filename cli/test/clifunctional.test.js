const constructURL = require('../lib/constructURL');
const chai = require('chai')
const expect = chai.expect;
const exec = require("child_process");
const { spawn } = require('child_process');
const { execSync } = require('child_process');

describe('Functional Testing', function() {
    this.timeout(0);
    before((done) => {
        const options = { stdio: 'ignore' };
        execSync('mongorestore --db survey --drop "mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority" ..\\data\\survey',options);
        done();
    });

    describe('healthcheck output', function() {
        it('Should return the correct output when running the shell command "se2222 healthcheck"', (done) => {
            const output = execSync('se2222 healthcheck').toString();
            expect(output).to.include("status: 'OK'");
            done();
        });
    });

    describe('questionnaire output', function() {
        it('Should return the correct output when running the shell command "se2222 questionnaire QQ000"', (done) => {
            const output = execSync('se2222 questionnaire QQ000').toString();
            expect(output).to.include("questionnaireID: 'QQ000'");
            done();
        });
        it('Should return the correct output when running the shell command "se2222 questionnaire QQ000 csv"', (done) => {
            const output = execSync('se2222 questionnaire QQ000 csv').toString();
            expect(output).to.include('"QQ000","My first research questionnaire"');
            done();
        });
    });

    describe('question output', function() {
        it('Should return the correct output when running the shell command "se2222 question QQ000 Q01"', (done) => {
            const output = execSync('se2222 question QQ000 Q01').toString();
            expect(output).to.include("questionnaireID: 'QQ000'").and.to.include("qID: 'Q01'");
            done();
        });
        it('Should return the correct output when running the shell command "se2222 question QQ000 Q01 csv"', (done) => {
            const output = execSync('se2222 question QQ000 Q01 csv').toString();
            expect(output).to.include('"QQ000","Q01"');
            done();
        });
    });

    describe('getquestionanswers output', function() {
        it('Should return the correct output when running the shell command "se2222 getquestionanswers QQ000 Q01"', (done) => {
            const output = execSync('se2222 getquestionanswers QQ000 Q01').toString();
            expect(output).to.include("questionnaireID: 'QQ000'").and.to.include("qID: 'Q01'");
            done();
        });
        it('Should return the correct output when running the shell command "se2222 getquestionanswers QQ000 Q01 csv"', (done) => {
            const output = execSync('se2222 getquestionanswers QQ000 Q01 csv').toString();
            expect(output).to.include('"QQ000","Q01"');
            done();
        });
    });

    describe('getsessionanswers output', function() {
        it('Should return the correct output when running the shell command "se2222 getsessionanswers QQ000 2222"', (done) => {
            const output = execSync('se2222 getsessionanswers QQ000 2222').toString();
            expect(output).to.include("questionnaireID: 'QQ000'").and.to.include("session: '2222'");
            done();
        });
        it('Should return the correct output when running the shell command "se2222 getsessionanswers QQ000 2222 csv"', (done) => {
            const output = execSync('se2222 getsessionanswers QQ000 2222 csv').toString();
            expect(output).to.include(',"2222"');
            done();
        });
    });

    describe('doanswer output', function() {
        it('Should return the correct output when running the shell command "se2222 doanswer QQ000 Q01 6969 P01A1"', (done) => {
            const output = execSync('se2222 doanswer QQ000 Q01 6969 P01A1').toString();
            expect(output).to.eq("Answer submitted successfully\n");
            done();
        });
    });

    describe('questionnaire_upd output', function() {
        const path = __dirname + '\\QQ169.json';
        const command = 'se2222 questionnaire_upd '+'"'+path+'"';
        const path2 = __dirname + '\\QQ170.json';
        const command2 = 'se2222 questionnaire_upd '+'"'+path2+'"';
        it('Should return the correct output when running the shell command "'+command+'"', (done) => {
            const output = execSync(command).toString();
            expect(output).to.eq("File uploaded successfully\n");
            done();
        });
        it('Should return "Bad request" when uploading a file with unsupported format running the shell command "'+command2+'"', (done) => {
            const output = execSync(command2).toString();
            expect(output).to.eq("Bad request\n");
            done();
        });
    });

    describe('resetq output', function() {
        it('Should return the correct output when running the shell command "se2222 resetq QQ000"', (done) => {
            const output = execSync('se2222 resetq QQ000').toString();
            expect(output).to.eq("{ status: 'OK' }\n");
            done();
        });
    });

    describe('resetall output', function() {
        it('Should return the correct output when running the shell command "se2222 resetall"', (done) => {
            const output = execSync('se2222 resetall').toString();
            expect(output).to.eq("{ status: 'OK' }\n");
            done();
        });
    });

    after(function(done) {
        const options = { stdio: 'ignore' };
        execSync('mongorestore --db survey --drop "mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority" ..\\data\\survey',options);
        done();
    });

});