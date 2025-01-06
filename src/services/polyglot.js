import Polyglot from 'node-polyglot';
import * as phrases from '../data/locales/phrases.js';

export class Poly {
  static activeLang = 'en';
  /**
   * @type {Polyglot}}
   */
  static _ref;

  static _validLangs = ['en', 'es'];

  static start() {
    Poly._ref = new Polyglot({ phrases: phrases[Poly.activeLang] });
  }
  static get() {
    if (!Poly._ref) {
      Poly.start();
    }
    return Poly._ref;
  }

  /**
   * @param {string} newlang
   */
  static changeLang(newlang) {
    if (Poly._validLangs.includes(newlang) && Poly.activeLang !== newlang) {
      Poly.activeLang = newlang;
      const self = Poly.get();
      self.replace(phrases[Poly.activeLang]);
    }
  }
}
