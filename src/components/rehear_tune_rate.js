import { Component } from '../common/abstract.js';
import { Controller } from '../startup.js';
import { Utils } from '../../Utils.js';

/**
 * rehearsal proposal component
 */
export class RehearTuneRate extends Component {
  tune;

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {object} tune
   */
  constructor(name, parentel, tune) {
    super(name, parentel);
    this.tune = tune;
    this.setup();
  }

  /**
   * setear valores componente.
   */
  async setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * Add listeners to the list items
   */
  addListeners() {}

  /**
   * renderizar modal valoracion ensayo
   *
   * @return {string} html
   */
  generatehtml() {}

  /**
   * Add to rehearsal count of a tune and hide it.
   *
   * @param {event} event
   */
  async saverate(event) {
    event.stopPropagation();
  }
}
