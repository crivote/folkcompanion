import {Component} from '../abstract.js';
import {Utils, Data} from '../startup.js';
import * as apis from '../apis.js';

/**
 * Componente adicion y edicion de tunes a un video
 *
 **/
export class Videoaddtune extends Component {
  video;
  tune;

  /**
  * Constructor
  *
  * @param {string} name
  * @param {HTMLBodyElement} parentel
  * @param {number} videoid
  */
  constructor(name, parentel, videoid) {
    super(name, parentel);
    this.video = Data.videos.find((video) => video.id == videoid);
    this.tune = this.video.tunes;
    this.setup();
  }

  /**
  * Setup inicial componente
  */
  async setup() {
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
  * Añadir disparadores eventos
  */
  addListeners() {
    // close window
    this.element.querySelector('#closeaddvideo')
        .addEventListener('click', this.remove.bind(this));
  }

  /**
  *
  */
  generatehtml() {
    return `
        <li class="flex" data-id="${tune.id}>
        <h2>${tune.main_name}</h2>
        <div>
          <label class="uppercase text-slate-400 text-sm mt-4">
          <i class="fa fa-clock"></i> inicio</label>
          <span class="w-20" contenteditable="true" name="inicio"></span>
        </div>
        <div>
            <label class="uppercase text-slate-400 text-sm mt-4">
            <i class="fa fa-clock"></i> FINAL</label>
            <span class="w-20" contenteditable="true" name="FINAL"></span>
        </div>
        <button class="remove"><i class="fa fa-times-circle"></i></button>
    </li>
        `;
  }
}

