const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const reverseDictionary = (obj) => {
    return Object.assign ( 
        {},
        ...Object.entries(obj).map(([a, b]) => ({ [b]: a}))
    );
};

class Translator {

    translate(text, dictionary, titles, timeRegex, locale) {
        const lowerText = text.toLowerCase();
        const matchesMap = {};

        Object.entries(titles).map(([a, b]) => {
            if(lowerText.includes(a)) {
                matchesMap[a] = b.charAt(0).toUpperCase() + b.slice(1);
            }
        });

        const wordsWithSpaces = Object.fromEntries(
            Object.entries(dictionary).filter(([a, b]) => a.includes(''))
        );

        Object.entries(wordsWithSpaces).map(([a, b]) => {
            if(lowerText.includes(a)) {
                matchesMap[a] = b;
            }
        });

        lowerText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).forEach((word) => {
            if(dictionary[word]) matchesMap[word] = dictionary[word];
        });

        const matchedTimes = lowerText.match(timeRegex);

        if(matchedTimes) {
            matchedTimes.map((c) => {
                if(locale === 'toBritish') {
                    return (matchesMap[c] = c.replace(':', '.'));
                }
                return(matchesMap[c] = c.replace('.', ':'));
            });
        }

        if(Object.keys(matchesMap).length === 0) return null;

        const translation = this.replaceAll(text, matchesMap);

        const translationWithHighlight = this.replaceAllWithHighlight(text, matchesMap);

        return[translation, translationWithHighlight];
    }

    toBritishEnglish(text) {
        const dictionary = { ...americanOnly, ...americanToBritishSpelling };
        const titles = americanToBritishTitles;
        const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g;
        const translatedText = this.translate(text, dictionary, titles, timeRegex, 'toBritish');
        
        if(!translatedText) {
            return text;
        }

        return translatedText;
    }

    toAmericanEnglish(text) {
        const dictionary = { ...britishOnly, ...reverseDictionary(americanToBritishSpelling) };
        const titles = reverseDictionary(americanToBritishTitles);
        const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g;
        const translatedText = this.translate(text, dictionary, titles, timeRegex, 'toAmerican');

        if(!translated) {
            return text;
        }

        return translatedText;
    }

    replaceAll(text, matchesMap) {
        const re = new RegExp(Object.keys(matchesMap).join('|'), 'gi');
        return text.replace(re, (matched) => matchesMap[matched.toLowerCase()]);
    }

    replaceAllWithHighlight(text, matchesMap) {
        const re = new RegExp(Object.keys(matchesMap).join('|'), 'gi');
        return text.replace(re, (matched) => {
            return `<span class='highlight'>${
                matchesMap[matched.toLowerCase()]
            }</span>`;
        });
    }
}

module.exports = Translator;