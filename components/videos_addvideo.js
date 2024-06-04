import {Component} from '../abstract.js';
import {Utils, Data} from '../startup.js';
import * as apis from '../apis.js';
import {Mynotification} from './notification.js';

/**
 * Componente adicion y edicion videos
 *
 **/
export class Videoadd extends Component {
  videokey;
  videozone;
  video;
  isNew;
  tunes = [];

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {number} videoid
   */
  constructor(name, parentel, videoid = '') {
    super(name, parentel);
    this.isNew = (videoid == '');
    if (!this.isNew) {
      this.video = Data.videos.find((video) => video.id == videoid);
      this.tunes = this.video.tunes;
      this.videokey = this.video.url;
    }
    this.setup();
  }

  /**
   * Setup inicial componente
   */
  async setup() {
    this.attachAt(this.generatehtml(), false);
    this.videozone = this.element.querySelector('#videocontainer');
    if (!this.isNew) {
      this.loadVideo(this.videokey);
    }
    this.addListeners();
  }

  /**
   * Añadir disparadores eventos
   */
  addListeners() {
    // close window
    this.element.querySelector('#closeaddvideo')
        .addEventListener('click', this.remove.bind(this));
    // load video
    this.element.querySelector('.getVideoKey')
        .addEventListener('change', this.getVideoKey.bind(this));
    // add current video to db
    this.element.querySelector('.sendbutton')
        .addEventListener('click', this.addvideo.bind(this));
    this.element.querySelector('.addtunetovideo')
        .addEventListener('click', this.addtunetovideo.bind(this));
    // show select control to change value
    this.element.querySelectorAll('.formcomponent').forEach((el) =>
      el.addEventListener('click', this.showeditselect.bind(this)));
    // change value of select field
    this.element.querySelectorAll('.edit-select li').forEach((el) =>
      el.addEventListener('click', this.changeselectvalue.bind(this)));
  }

  /**
   * Generate subform for each tune
   *
   * @param {string} tuneid
   */
  generateTuneForm(tuneid) {

  }

  /**
   * HTML del componente
   *
   * @return {string} html
   */
  generatehtml() {
    return `
    <div id="modalvideoadd" class="fixed inset-0 bg-gray-500 bg-opacity-75 
    flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-lg w-auto relative
      max-h-full overflow-scroll">
        <p id="closeaddvideo" class="absolute right-4 top-4 text-red-400 
        text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
        <h2 class="text-2xl text-blue-400 font-semibold mb-3">
        ${this.isNew ? `Añadir nuevo video`: `Editar video`}</h2>
        </h2>

        <div class="flex justify-center gap-3">
            <label class="uppercase text-slate-400 text-sm mt-4">
            Youtube video URL (ID)</label>
            <input class="getVideoKey" type="text" 
            placeholder="paste a youtube URL" 
            value="${this.isNew ? '' : this.video.url}">
        </div>

        <main class="mt-3 grid lg-grid-cols-5 gap-4">
          <section id="form" class="lg-col-span-2">
            <div class="flex flex-col gap-2">
          ${Utils.generateformfield(
      'titulo',
      'titulo del vídeo',
            this.isNew ? '' : this.video.Title,
  )}
          ${Utils.generateformfield(
      'artista',
      'artista',
            this.isNew ? '' : this.video.Performer,
  )}
          ${Utils.generateformfield(
      'type',
      'Categoría de vídeo',
            this.isNew ? '' : this.video.type,
            Data.videotypes,
  )}

      <section class="tunesaddition bg-slate-100 border 
            border-slate-300 p-4">
              <div id="datatuneadd" class="flex gap-3 tunecontainer">
                <div>
                  <datalist id="alltunes">
                    ${Data.tunes.map(
      (tune) => `<option value="${tune.id}">${tune.main_name}</option>`)
      .join('')}
                    </datalist>
                    <input list="alltunes" class="tuneselector" 
                    name="tuneselector">
                </div>
                <div>
                    <label class="uppercase text-slate-400 text-sm mt-4">
                    inicio (en s)</label>
                    <input class="w-20" type="number" name="inicio">
                </div>
                <div>
                    <label class="uppercase text-slate-400 text-sm mt-4">
                    final (en s)</label>
                    <input class="w-20" type="number" name="final">
                </div>
                <button class="remove">
                <i class="fa fa-times-circle"></i></button>
            </div>
                        
          </section>
          </div>
          </section>
          <section id="videocontainer" class="lg-col-span-3">
          </section>
          </main>
      <div class="flex items-center justify-center mt-6">
        <button disabled class="sendbutton px-4 py-3 rounded-md bg-blue-500 
        text-white text-md font-bold uppercase mr-4">Guardar video</button>
      </div>
    <div>
  </div>`;
  }

  /**
   * obtener key de video de youtube
   *
   * @param {event} event
   */
  getVideoKey(event) {
    const url = event.currentTarget.value;
    const youtubeid = Utils.extractYoutubeID(url);
    if (youtubeid) {
      this.videokey = youtubeid;
      this.loadVideo(this.videokey);
      event.currentTarget.value = this.videokey;
    }
  }

  /**
   * Cargar video de youtube
   *
   * @param {string} key
   */
  loadVideo(key) {
    this.videozone.innerHTML = Utils.videoembed(key);
    this.element.querySelector('.sendbutton').disabled = false;
  }

  /**
   * Añadir enlace a tune en el video
   *
   * @param {number} videoid
   */
  async addtunetovideo(videoid) {
    const link = {
      videos_id: videoid,
      start_time: this.element.querySelector('[name="inicio"]').value,
      end_time: this.element.querySelector('[name="final"]').value,
    };
    const medialinks =
        this.data?.medialinks ? this.data.medialinks.push(link) : [link];
    const params2 = {
      media_links: medialinks,
      main_name: '',
      other_names: '',
      type: '',
      author: '',
      time: '',
      tradition: '',
      References: '',
      Modes_played: '',
      Estructure: '',
      compasses: '',
      first_reference: '',
      trivia: '',
      ABCsample: '',
      popularity: '',
      sortname: '',
    };
    const result = await apis.Xanoapi.edittune(this.data.id, params2);
  }

  /**
   * guardar video en db
   *
   * @param {event} event
   */
  async addvideo(event) {
    event.preventDefault();
    if (!Data.videos.some((video) => video.url == this.videokey)) {
      // Comprobar que el video no ha sido ya añadido antes
      const params = {
        url: this.videokey,
        thumb_url: `https://i3.ytimg.com/vi/${this.videokey}/hqdefault.jpg`,
        type: this.element.querySelector('[name="type"]').value,
        Title: this.element.querySelector('[name="titulo"]').value,
        Performer: this.element.querySelector('[name="artista"]').value,
        notes: this.element.querySelector('[name="notas"]').value,
        album_relation: {},
      };
      try {
        const result = await apis.Xanoapi.addvideo(params);
        if (result) {
          new Mynotification('success', `Se ha guardado el vídeo.`);
        }
      } catch (error) {
        new Mynotification('error', `No se ha podido guardar el vídeo.`);
        console.log(error);
      }
    } else {
      new Mynotification('error', `Ya hay un video guardado con la misma url.`);
    }
  }
  /**
   * Show select for the title
   *
   * @param {event} event
   */
  showeditselect(event) {
    const el = event.currentTarget;
    const select = el.querySelector('.edit-select');
    // title.classList.add('hidden');
    select.classList.remove('hidden');
  }

  /**
     * Update value of h4 on select change
     *
     * @param {event} event
     */
  changeselectvalue(event) {
    event.stopImmediatePropagation();
    const el = event.currentTarget;
    const list = el.parentNode;
    const textel = list.previousElementSibling;
    // esconder select tras cambio valor y mostrar icono edicion
    list.classList.add('hidden');
    textel.textContent = el.textContent;
  }
}
