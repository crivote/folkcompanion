import {Component} from '../abstract.js';
import {Mynotification} from './notification.js';
import {Data} from '../startup.js';
import {Video} from './videos_video.js';
import {Videoadd} from './videos_addvideo.js';
import * as apis from '../apis.js';

/**
 * video list component
 */
export class Videos extends Component {
  // instancias en DOM de las videocards
  items = [];
  videozone = null;
  subelements = [];

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   */
  constructor(name, parentel) {
    super(name, parentel);
    this.setup();
  }

  /**
   * Add event listeners
   *
   */
  addListeners() {
    this.element.querySelector('.addnewvideo')
        .addEventListener('click', this.modalnewvideo.bind(this));
  }

  /**
   * setear valores componente.
   */
  async setup() {
    this.attachAt(this.generatehtml(), false);
    this.videozone = this.element.querySelector('main');
    this.addListeners();
    if (!Data.videos) {
      Data.videos = await apis.Xanoapi.getallvideos();
      if (Data.videos && Data.videos.length>0) {
        new Mynotification('success', `cargados ${Data.videos.length} videos.`);
      }
    }
    this.rendervideos();
  }
  /**
   * generar html componente
   *
   * @return {string} html
   */
  generatehtml() {
    return `<section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Videos guardados</h3>
          <span class="num_of_videos bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">
          ${Data.videos.length} videos</span></h3>
          <span class="addnewvideo text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
        </div>
      </header>
      <main class="p-6 grid lg:grid-cols-2 gap-3"></main>
      </section>`;
  }

  /**
   * renderizar componentes videos
   *
   * @param {array} list
   */
  rendervideos(list = Data.videos) {
    this.videozone.innerHTML = '';
    this.element.querySelector('.num_of_videos')
        .innerHTML = list.length + ' videos';
    this.items = list.map((item) => {
      return new Video('video' + item.id, this.videozone, item.id);
    });
  }

  /**
   * Abrir modal para añadir editar videos
   */
  modalnewvideo() {
    this.subelements.push(new Videoadd('newvideo', this.element));
  }
}
