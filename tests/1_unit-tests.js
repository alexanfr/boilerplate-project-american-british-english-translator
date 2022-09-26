const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
    suite('Translate to British English', function() {
        test('Translate Mangoes are my favorite fruit.', function(done) {
            assert.equal(translator.toBritishEnglish('Mangoes are my favorite fruit.')[0], 'Mangoes are my favourite fruit.');
            done();
        });

        test('Translate I ate yogurt for breakfast.', function(done) {
            assert.equal(translator.toBritishEnglish('I ate yogurt for breakfast.')[0], 'I ate yoghurt for breakfast.');
            done();
        });

        test("Translate We had a party at my friend's condo.", function(done) {
            assert.equal(translator.toBritishEnglish("We had a party at my friend's condo.")[0], "We had a party at my friend's flat.");
            done();
        });

        test('Can you toss this in the trashcan for me?', function(done) {
            assert.equal(translator.toBritishEnglish('Can you toss this in the trashcan for me?')[0], 'Can you toss this in the bin for me?');
            done();
        });

        test('Translate The parking lot was full.', function(done) {
            assert.equal(translator.toBritishEnglish('The parking lot was full.')[0], 'The car park was full.');
            done();
        });

        test('Translate Like a high tech Rube Goldberg machine.', function(done) {
            assert.equal(translator.toBritishEnglish('Like a high tech Rube Goldberg machine.')[0], 'Like a high tech Heath Robinson device.');
            done();
        });

        test('Translate To play hooky means to skip class or work.', function(done) {
            assert.equal(translator.toBritishEnglish('To play hooky means to skip class or work.')[0], 'To bunk off means to skip class or work.');
            done();
        });

        test('Translate No Mr. Bond, I expect you to die.', function(done) {
            assert.equal(translator.toBritishEnglish('No Mr. Bond, I expect you to die.')[0], 'No Mr Bond, I expect you to die.');
            done();
        });

        test('Translate Dr. Grosh will see you now.', function(done) {
            assert.equal(translator.toBritishEnglish('Dr. Grosh will see you now.')[0], 'Dr Grosh will see you now.');
            done();
        });

        test('Translate Lunch is at 12:15 today.', function(done) {
            assert.equal(translator.toBritishEnglish('Lunch is at 12:15 today.')[0], 'Lunch is at 12.15 today.');
            done();
        });
    });

    suite('Translate to American English', function() {
        test('Translate We watched the footie match for a while.', function(done) {
            assert.equal(translator.toAmericanEnglish('We watched the footie match for a while.')[0], 'We watched the soccer match for a while.');
            done();
        });

        test('Translate Paracetamol takes up to an hour to work.', function(done) {
            assert.equal(translator.toAmericanEnglish('Paracetamol takes up to an hour to work.')[0], 'Tylenol takes up to an hour to work.');
            done();
        });
        
    });
});
