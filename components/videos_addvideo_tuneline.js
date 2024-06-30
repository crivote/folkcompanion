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
  constructor(name, parentel, videoid, tuneid) {
    super(name, parentel);
    this.video = Data.videos.find((video) => video.id == videoid);
    this.tune = Data.tunes.find((tune) => tune.id == tuneid);
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
 * Generate html of element
 * @return {string}
 */
  generatehtml() {
    const times = this.tune.media_links.find(
        (link) => link.videos_id == this.video.id);
    return `
        <li class="flex txt-xs bg-slate-500 text-white/80 p-2"
         data-id="${this.tune.id}">
        <h2>${this.tune.main_name}</h2>
        <div class="ml-auto">
          <label class="uppercase text-slate-400 text-sm mt-4">
          <i class="fa fa-clock"></i> inicio</label>
          <input type="number" name="inicio" value="
           ${times ? times.start_time : 0}">
        </div>
        <div>
            <label class="uppercase text-slate-400 text-sm mt-4">
            <i class="fa fa-clock"></i> final</label>
            <input type="number" name="final" value="
            ${times ? times.end_time : 0}">
        </div>
        <button class="remove"><i class="fa fa-times-circle"></i></button>
    </li>
        `;
  }

  /**
   * Añadir enlace a tune en el video
   *
   * @param {number} videoid
   */
  async addtunetovideo() {
    const link = {
      videos_id: videoid,
      start_time: this.element.querySelector('[name="inicio"]').value,
      end_time: this.element.querySelector('[name="final"]').value,
    };
    const medialinks =
        this.tune?.medialinks ? this.tune.medialinks.push(link) : [link];
    const params2 = {
      ...this.tune,
      medialinks: medialinks,
    };
    const result = await apis.Xanoapi.edittune(this.tune.id, params2);
  }
}

