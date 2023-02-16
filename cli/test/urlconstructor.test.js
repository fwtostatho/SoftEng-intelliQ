const constructURL = require('../lib/constructURL');
const chai = require('chai')
const expect = chai.expect;
const exec = require("child_process");

describe('healthcheck URL ', () => {
    it('se2222 healthcheck', () => {
        expect( constructURL('/healthcheck/') )
        .to.eq('https://localhost:9103/intelliq_api/admin/healthcheck/');
    });
});

describe('resetall URL ', () => {
    it('se2222 resetall', () => {
        expect( constructURL('/resetall/') )
        .to.eq('https://localhost:9103/intelliq_api/admin/resetall/');
    });
});

describe('resetq URL ', () => {
    it('se2222 resetq QQ000', () => {
        expect( constructURL('/resetq/', 'QQ000') )
        .to.eq('https://localhost:9103/intelliq_api/resetq/QQ000');
    });
});

describe('questionnaire URL ', () => {
    it('se2222 questionnaire QQ000', () => {
        expect( constructURL('/questionnaire/', 'QQ000') )
        .to.eq('https://localhost:9103/intelliq_api/questionnaire/QQ000?format=json');
    });
    it('se2222 questionnaire QQ000 json', () => {
        expect( constructURL('/questionnaire/', 'QQ000', 'json') )
        .to.eq('https://localhost:9103/intelliq_api/questionnaire/QQ000?format=json');
    });
    it('se2222 questionnaire QQ000 csv', () => {
        expect( constructURL('/questionnaire/', 'QQ000', 'csv') )
        .to.eq('https://localhost:9103/intelliq_api/questionnaire/QQ000?format=csv');
    });
});

describe('question URL ', () => {
    it('se2222 question QQ000 P00', () => {
        expect( constructURL('/question/', 'QQ000', 'P00') )
        .to.eq('https://localhost:9103/intelliq_api/question/QQ000/P00?format=json');
    });
    it('se2222 question QQ000 P00 json', () => {
        expect( constructURL('/question/', 'QQ000', 'P00', 'json') )
        .to.eq('https://localhost:9103/intelliq_api/question/QQ000/P00?format=json');
    });
    it('se2222 question QQ000 P00 csv', () => {
        expect( constructURL('/question/', 'QQ000', 'P00', 'csv') )
        .to.eq('https://localhost:9103/intelliq_api/question/QQ000/P00?format=csv');
    });
});

describe('doanswer URL ', () => {
    it('se2222 doanswer QQ000 P00 0001 01', () => {
        expect( constructURL('/doanswer/','QQ000','P00','0001','01') )
        .to.eq('https://localhost:9103/intelliq_api/doanswer/QQ000/P00/0001/01');
    });
});

describe('questionnaire_upd URL ', () => {
    it('se2222 questionnaire_upd QQ000.json', () => {
        expect( constructURL('/questionnaire_upd/','QQ000.json') )
        .to.eq('https://localhost:9103/intelliq_api/questionnaire_upd/QQ000.json');
    });
});

describe('getquestionanswers URL ', () => {
    it('se2222 getquestionanswers QQ000 P00', () => {
        expect( constructURL('/getquestionanswers/','QQ000','P00') )
        .to.eq('https://localhost:9103/intelliq_api/getquestionanswers/QQ000/P00?format=json');
    });
    it('se2222 getquestionanswers QQ000 P00 json', () => {
        expect( constructURL('/getquestionanswers/','QQ000','P00','json') )
        .to.eq('https://localhost:9103/intelliq_api/getquestionanswers/QQ000/P00?format=json');
    });
    it('se2222 getquestionanswers QQ000 P00 csv', () => {
        expect( constructURL('/getquestionanswers/','QQ000','P00','csv') )
        .to.eq('https://localhost:9103/intelliq_api/getquestionanswers/QQ000/P00?format=csv');
    });
});

describe('getsessionanswers URL ', () => {
    it('se2222 getsessionanswers QQ000 P00', () => {
        expect( constructURL('/getsessionanswers/','QQ000','P00') )
        .to.eq('https://localhost:9103/intelliq_api/getsessionanswers/QQ000/P00?format=json');
    });
    it('se2222 getsessionanswers QQ000 P00 json', () => {
        expect( constructURL('/getsessionanswers/','QQ000','P00','json') )
        .to.eq('https://localhost:9103/intelliq_api/getsessionanswers/QQ000/P00?format=json');
    });
    it('se2222 getsessionanswers QQ000 P00 csv', () => {
        expect( constructURL('/getsessionanswers/','QQ000','P00','csv') )
        .to.eq('https://localhost:9103/intelliq_api/getsessionanswers/QQ000/P00?format=csv');
    });
});