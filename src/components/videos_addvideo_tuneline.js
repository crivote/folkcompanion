import { Component } from '../common/abstract.js';
import { Data } from '../common/Data.js';
import * as apis from '../common/apis.js';
import { Mynotification } from './notification.js';

/**
 * Componente adicion y edicion de tunes a un video
 *
 **/
export class Videoaddtune extends Component {
  video;
  tune;
  metatune;

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {object} mydata
   */
  constructor(name, parentel, mydata) {
    super(name, parentel);
    this.video = Data.videos.find((video) => video.id == mydata.videoid);
    this.tune = Data.tunes.find((tune) => tune.id == mydata.tunes_id);
    this.setup();
    this.metatune = mydata;
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
    this.element
      .querySelector('.removetune')
      .addEventListener('click', this.remove.bind(this));
  }

  /**
   * delete references to tune
   *
   */
  async remove() {
    if (
      this.tune.medialinks &&
      this.tune.medialinks.some((link) => link.videoid == this.video.id)
    ) {
      this.tune.medialinks = this.tune.medialinks.filter(
        (link) => link.videoid != this.video.id
      );
      try {
        const result = await apis.Xanoapi.edittune(this.tune.id, this.tune);
        if (result) {
          new Mynotification(
            'success',
            `Se ha borrado referencia al tema ${tune.main_name}.`
          );
        }
      } catch (error) {
        new Mynotification(
          'danger',
          `No se ha podido borrar referencia al tema ${tune.main_name}.`
        );
        console.log(error);
      }
    }
    super.remove();
  }

  /**
   * Generate html of element
   * @return {string}
   */
  generatehtml() {
    return `
        <li class="flex txt-xs bg-slate-500 text-white/80 p-2 gap-3"
         data-id="${this.tune.id}">
        <h2 class="font-semibold">${this.tune.main_name}</h2>
        <div class="ml-auto">
          <label class="uppercase text-slate-400 text-sm mt-4">
          <i class="fa fa-clock"></i> de</label>
          <input type="number" name="inicio" 
          class="p-1 w-16 text-right text-slate-600"
          value="${this.metatune ? this.metatune.start_time : 0}">
        </div>
        <div>
            <label class="uppercase text-slate-400 text-sm mt-4">
            <i class="fa fa-clock"></i> a</label>
            <input type="number" name="final" 
            class="p-1 w-16 text-right text-slate-600"
            value="${this.metatune ? this.metatune.end_time : 0}">
        </div>
        <button class="removetune text-white ml-3">
        <i class="fa fa-times-circle fa-lg text-red-300"></i></button>
    </li>
        `;
  }

  /**
   * Añadir enlace a tune en el video
   *
   * @param {number} videoid
   */
  async savevideoreference() {
    const params = {
      videos_id: this.video.id,
      tunes_id: this.tune.id,
      start_time: this.element.querySelector('[name="inicio"]').value,
      end_time: this.element.querySelector('[name="final"]').value,
      notes: '',
    };

    try {
      const result = await apis.Xanoapi.edittune(this.tune.id, params);
      if (result) {
        new Mynotification(
          'success',
          `Se ha guardado referencia al tema ${this.tune.main_name}.`
        );
      }
    } catch (error) {
      new Mynotification(
        'danger',
        `No se ha podido guardar referencia al tema ${this.tune.main_name}.`
      );
      console.log(error);
    }
  }
}
