const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const {exec} = require("child_process");
const app = require('../app');
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const FormData = require('form-data');
const express = require("express");
const app2 = express.Router();
const mongoose = require('mongoose');
const adminController = require('../api-backend/controllers/adminServer');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/'});

describe('Healthcheck Endpoint', () => {
    before((done) => {
      // Connect to your database
      mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        done();
      });
    });
    it("Should return status code 200", (done) => {
        request(app)
        .get('/intelliq_api/admin/healthcheck')
        .end((err, res) => {
            healthcheck = res.body;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', (done) => {
        expect(healthcheck).to.be.an('object');
        done();
    });
    it('Should return status: "OK"', (done) => {
        expect(healthcheck.status).to.eq('OK');
        done();
    });
    it("Should return status code 500 when disconnected", (done) => {
        mongoose.disconnect();
        request(app)
        .get('/intelliq_api/admin/healthcheck')
        .end((err, res) => {
            healthcheck = res.body;
            expect(res.status).to.eq(500);
            done();
        })
    });
    it('Should return an object', (done) => {
        expect(healthcheck).to.be.an('object');
        done();
    });
    it('Should return status: "failed"', (done) => {
        expect(healthcheck.status).to.eq('failed');
        done();
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Questionnaire Endpoint', () => {
    before((done) => {
        // Connect to your database
        mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          done();
        });
      });
    it('Should return status code 200 with questionnaireID: "QQ001"', (done) => {
        request(app)
        .get('/intelliq_api/questionnaire/QQ001/')
        .end((err, res) => {
            questionnaire = res;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', () => {
        expect(questionnaire).to.be.an('object');
    });
    it('Should return questionnaire with ID QQ001', () => {
        const data = questionnaire.body;
        const data1 = data[0].questionnaireID;
        expect(data1).to.eq('QQ001');
    });
    it('Should return status code 400 for missing parameter', (done) => {
        request(app)
        .get('/intelliq_api/questionnaire/ /')
        .end((err, res) => {
            questionnaire = res;
            expect(res.status).to.eq(400);
            done();
        })
    });
    it('Should return status code 402 with questionnaireID: "0"', (done) => {
        request(app)
        .get('/intelliq_api/questionnaire/0/')
        .end((err, res) => {
            questionnaire = res;
            expect(res.status).to.eq(402);
            done();
        })
    });
    it('Should return status code 500 when disconnected', (done) => {
        mongoose.disconnect();
        request(app)
        .get('/intelliq_api/questionnaire/QQ001/')
        .end((err, res) => {
            questionnaire = res;
            expect(res.status).to.eq(500);
            done();
        })
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Question Endpoint', () => {
    before((done) => {
        // Connect to your database
        mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          done();
        });
      });
    it('Should return status code 200', (done) => {
        request(app)
        .get('/intelliq_api/question/QQ001/P01')
        .end((err, res) => {
            question = res;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', () => {
        expect(question).to.be.an('object');
        //done();
    });
    it('Should return question with ID P01 from QQ001', () => {
        const data = question.body.qID;
        expect(data).to.eq('P01');
        //done();
    });
    it('Should return status code 400 missing parameter', (done) => {
        request(app)
        .get('/intelliq_api/question/QQ001/')
        .end((err, res) => {
            question = res;
            expect(res.status).to.eq(400);
            done();
        })
    });
    it('Should return status code 402 for .../question/QQ001/0/', (done) => {
        request(app)
        .get('/intelliq_api/question/QQ001/0/')
        .end((err, res) => {
            question = res;
            expect(res.status).to.eq(402);
            done();
        })
    });
    it('Should return status code 500 when disconnected', (done) => {
        mongoose.disconnect();
        request(app)
        .get('/intelliq_api/question/QQ001/P01')
        .end((err, res) => {
            expect(res.status).to.eq(500);
            done();
        })
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Getquestionanswers Endpoint', () => {
    before((done) => {
        // Connect to your database
        mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          done();
        });
      });
    it('Should return status code 200', (done) => {
        request(app)
        .get('/intelliq_api/getquestionanswers/QQ001/P01')
        .end((err, res) => {
            questionanswers = res;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', () => {
        expect(questionanswers).to.be.an('object');
    });
    it('Should return answer P01A1 for question P01 from Q001', () => {
        const data = questionanswers.body.answer;
        expect(data[0].ans).to.eq('P01A1');
    });
    it('Should return status code 400 for missing parameter', (done) => {
        request(app)
        .get('/intelliq_api/getquestionanswers/QQ001/')
        .end((err, res) => {
            questionnaireanswers = res;
            expect(res.status).to.eq(400);
            done();
        })
    });
    it('Should return status code 402 for getquestionanswers/0/0', (done) => {
        request(app)
        .get('/intelliq_api/getquestionanswers/0/0')
        .end((err, res) => {
            questionnaireanswers = res;
            expect(res.status).to.eq(402);
            done();
        })
    });
    it('Should return status code 500 when disconnected', (done) => {
        mongoose.disconnect();
        request(app)
        .get('/intelliq_api/getquestionanswers/QQ001/P01')
        .end((err, res) => {
            questionnaireanswers = res;
            expect(res.status).to.eq(500);
            done();
        })
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Getsessionanswers Endpoint', () => {
    before((done) => {
        // Connect to your database
        mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          done();
        });
      });
    it('Should return status code 200', (done) => {
        request(app)
        .get('/intelliq_api/getsessionanswers/QQ000/1111')
        .end((err, res) => {
            sessionanswers = res;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', () => {
        expect(sessionanswers).to.be.an('object');
    });
    it('Should return object with answers for session 1111 from Q000', () => {
        const data = sessionanswers.body;
        const data1 = data[0]
        expect(data1).to.have.property('questionnaireID');
        expect(data1).to.have.property('answers');
        expect(data1).to.have.property('session');
    });
    it('Should return status code 400 for missing parameter', (done) => {
        request(app)
        .get('/intelliq_api/getsessionanswers/QQ000/')
        .end((err, res) => {
            sessionanswers = res;
            expect(res.status).to.eq(400);
            done();
        })
    });
    it('Should return status code 402 for getsessionanswers/0/0', (done) => {
        request(app)
        .get('/intelliq_api/getsessionanswers/0/0')
        .end((err, res) => {
            sessionanswers = res;
            expect(res.status).to.eq(402);
            done();
        })
    });
    it('Should return status code 500 when disconnected', (done) => {
        mongoose.disconnect();
        request(app)
        .get('/intelliq_api/getsessionanswers/QQ000/1111')
        .end((err, res) => {
            sessionanswers = res;
            expect(res.status).to.eq(500);
            done();
        })
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Doanswer Endpoint', () => {
    before((done) => {
        // Connect to your database
        mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          done();
        });
      });
    it('Should return status code 200', (done) => {
        request(app)
        .post('/intelliq_api/doanswer/QQ000/P01/4444/P01A1')
        .end((err, res) => {
            doanswer = res;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return nothing', () => {
        expect(doanswer.body[0]).to.eq(undefined);
    });
    it('Should return status code 400 for missing parameter', (done) => {
        request(app)
        .post('/intelliq_api/doanswer/QQ000/P01//P01A1')
        .end((err, res) => {
            doanswer2 = res;
            expect(res.status).to.eq(400);
            done();
        })
    });
    it('Should return an object', () => {
        expect(doanswer2).to.be.an('object');
    });
    it('Should return "Bad request"', () => {
        expect(doanswer2.body.message).to.eq("Bad request");
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Questionnaire_upd Endpoint', () => {
    before((done) => {
      // Connect to your database
      mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        done();
      });
    });
    it("Should return status code 200 when successful", (done) => {
        function uploadFile(file) {
            const formData = new FormData();
            formData.append('', fs.createReadStream(file));
          
            return axios.post('/intelliq_api/admin/questionnaire_upd', formData, {
              headers: {
                ...formData.getHeaders()
              }
            });
        }
        const file = __dirname + '/QQ169.json';
        uploadFile(file)
            .then(response => {
                expect(response.status).to.eq(200);
            })
            done();
    });
    it("File should be uploaded as an object", (done) => {
        function uploadFile(file) {
            const formData = new FormData();
            formData.append('', fs.createReadStream(file));
          
            return axios.post('/intelliq_api/admin/questionnaire_upd', formData, {
              headers: {
                ...formData.getHeaders()
              }
            });
        }
        const file = __dirname + '/QQ169.json';
        uploadFile(file)
            .then(response => {
                expect(response.body).to.be.an('object');
            })
            done();
    });
    it("Should return status code 402 when unsuccessful", (done) => {
        function uploadFile(file) {
            const formData = new FormData();
            formData.append('', fs.createReadStream(file));
          
            return axios.post('/intelliq_api/admin/questionnaire_upd', formData, {
              headers: {
                ...formData.getHeaders()
              }
            });
        }
        const file = __dirname + '/QQ170.json';
        uploadFile(file)
            .then(response => {
                expect(response.status).to.eq(402);
            })
            done();
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});

describe('Resetq Endpoint', () => {
    before((done) => {
      // Connect to your database
      mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        done();
      });
    });
    it("Should return status code 200 when reseting answers for Q000", (done) => {
        request(app)
        .post('/intelliq_api/admin/resetq/Q000')
        .end((err, res) => {
            resetq = res.body;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', (done) => {
        expect(resetq).to.be.an('object');
        done();
    });
    it('Should return status: "OK"', (done) => {
        expect(resetq.status).to.eq('OK');
        done();
    });
    it("Should return status code 500 when disconnected", (done) => {
        mongoose.disconnect();
        request(app)
        .post('/intelliq_api/admin/resetq/Q000')
        .end((err, res) => {
            resetq = res.body;
            expect(res.status).to.eq(500);
            done();
        })
    });
    it('Should return an object', (done) => {
        expect(resetq).to.be.an('object');
        done();
    });
    it('Should return status: "failed"', (done) => {
        expect(resetq.status).to.eq('failed');
        done();
    });
    after(function(done) {
        // Disconnect from your database after all tests are done
        mongoose.disconnect(done);
    });
});


describe('Resetall Endpoint', () => {
    before((done) => {
      // Connect to your database
      mongoose.connect('mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        done();
      });
    });
    it("Should return status code 200", (done) => {
        request(app)
        .post('/intelliq_api/admin/resetall')
        .end((err, res) => {
            resetall = res.body;
            expect(res.status).to.eq(200);
            done();
        })
    });
    it('Should return an object', (done) => {
        expect(resetall).to.be.an('object');
        done();
    });
    it('Should return status: "OK"', (done) => {
        expect(resetall.status).to.eq('OK');
        done();
    });
    after(function(done) {
        mongoose.disconnect(done);
    });
});