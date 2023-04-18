import { Conjugator } from "./Conjugator";

export class Dictionary {
  
  static STORAGE_SITE = 'https://raw.githubusercontent.com/ConfiacB/korean-training/master/vocab.json';

  static create = () => {
    return fetch(Dictionary.STORAGE_SITE).then((response) => {
      return response.json();
    }).then((vocab) => {
      return new Dictionary(vocab);
    });
  }

  constructor(vocab) {
    if (!vocab) {
      throw new Error("Cannot construct Dictionary with empty arguments, call Dictionary.create() instead.");
    }

    this.vocab = vocab;
    const conjugator = new Conjugator();
    this.verbTenses = conjugator.getVerbTenses();
    this.adjectiveTenses = conjugator.getAdjectiveTenses();
  }

  findWord = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase().trim();
    let results = [];
    let searchArray = (tuple) => {
      let engWord = tuple[0].toLowerCase();
      if (engWord.includes(searchTerm) || searchTerm.includes(engWord)) {
        results.push(`${tuple[1]} (${tuple[0]})`);
      }
      let korWord = tuple[1];
      if (korWord.includes(searchTerm) || searchTerm.includes(korWord)) {
        results.push(`${tuple[0]} (${tuple[1]})`);
      }
    };

    Object.keys(this.vocab).forEach(key => {
      if (key !== "default") {
        this.vocab[key].forEach(searchArray);
      }
    });
    return results;
  }

  getVocabCategories = () => {
    return Object.keys(this.vocab);
  }

  getVocab = (...categories) => {
    let combined = [];
    for (let i = 0; i < categories.length; i++) {
      combined = combined.concat(this.vocab[categories[i]]);
    }
    return JSON.parse(JSON.stringify(combined));
  }

  makeQuizletFile = () => {
    let output = "";
    this.getVocabCategories().forEach((category) => {
      this.vocab[category].forEach((item) => {
        let line = item[0] + "\t" + item[1] + "\n";
        // eslint-disable-next-line
        output = output + line;
      });
    });
  }
}