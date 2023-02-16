module.exports = function (scope, a, b, c, d) {
    let base = 'http://localhost:9103/intelliq_api';

    if (scope === '/resetq/') {
        base = base + '/admin' + scope + a;
    }

    else if (scope === '/questionnaire/') {
        if (b===undefined) b = 'json';
        base = base + scope + a + '?format=' + b;
    }

    else if (scope === '/questionnaire_upd/') {
        base = base + '/admin' + scope;
    }

    else if (scope === '/question/') {
        if (c===undefined) c = 'json';
        base = base + scope + a + '/' + b + '?format=' + c;
    }

    else if (scope === '/doanswer/') {
        base = base + scope + a + '/' + b + '/' + c + '/' + d;
    }

    else if (scope === '/getsessionanswers/') {
        if (c===undefined) c = 'json';
        base = base + scope + a + '/' + b + '?format=' + c;
    }

    else if (scope === '/getquestionanswers/') {
        if (c===undefined) c = 'json';
        base = base + scope + a + '/' + b + '?format=' + c;
    }

    else if (scope === '/healthcheck/' || '/resetall/') {
        base = base + '/admin' + scope;
    }

    return base;
}