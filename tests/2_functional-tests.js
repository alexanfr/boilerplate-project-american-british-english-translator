const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();

suite('Functional Tests', () => {
    suite('POST Requests', function() {
        test('Translation with text and locale fields: POST request to /api/translate', function(done) {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mango is my favourite fruit.',
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, 'Mango is my <span class="highlight">favorite</span> fruit.');
                    done();
                })
        });

        test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mango is my favourite fruit.',
                    locale: 'invalid-locale'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                })
        });

        test('Translation with missing text field: POST request to /api/translate', function(done) {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        });

        test('Translation with missing locale field: POST request to /api/translate', function(done) {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mango is my favourite fruit.'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        });

        test('Translation with empty text: POST request to /api/translate', function(done) {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        });

        test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Hello',
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                    done();
                })
        });
    });
});
