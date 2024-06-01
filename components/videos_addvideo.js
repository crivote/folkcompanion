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
    this.element.querySelector('.loadvideo')
        .addEventListener('change', this.loadvideo.bind(this));
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
        <h2 class="text-2xl text-blue-400 font-semibold mb-6">
        ${this.isNew ? `Añadir nuevo video`: `Editar video`}</h2>
        </h2>

        <div class="flex justify-center gap-3">
            <input class="loadvideo" type="text" 
            placeholder="paste a youtube URL">
        </div>

        <div class="mt-6 flex gap-3">
          <section class="w-auto>"
          <div id="videocontainer"></div>
          <ul id="tunesadded" data-added=""></ul>
          </section>
          <section class="w-1/2" id="form">
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
                    <input class="w-20" type="number" name="inicio1">
                </div>
                <div>
                    <label class="uppercase text-slate-400 text-sm mt-4">
                    final (en s)</label>
                    <input class="w-20" type="number" name="final1">
                </div>
                <button class="addtunetovideo">Añadir tema</button>
            </div>
                        
          </section>
          </div>
          </section>
      <div class="flex items-center justify-center mt-6">
        <button disabled class="sendbutton px-4 py-3 rounded-md bg-blue-500 
        text-white text-md font-bold uppercase mr-4">Guardar video</button>
      </div>
    <div>
  </div>`;
  }

  /**
   * Cargar video de youtube
   *
   * @param {event} event
   */
  loadvideo(event) {
    const url = event.currentTarget.value;
    const youtubeid = Utils.extractYoutubeID(url);
    if (youtubeid) {
      this.videokey = youtubeid;
      this.videozone.innerHTML = Utils.videoembed(youtubeid);
      this.element.querySelector('.sendbutton').disabled = false;
    }
  }

  /**
   * Añadir enlace a tune en el video
   *
   * @param {event} event
   */
  addtunetovideo(event) {

  }

  /**
   * guardar video en db
   *
   * @param {event} event
   */
  async addvideo(event) {
    event.preventDefault();
    // TODO: comprobar que el video no ha sido ya añadido antes
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

        // save links to video in tunes
        const tunesids = [];
        const els =
          ['tune1selector', 'tune2selector', 'tune3selector', 'tune4selector'];

        els.forEach( (elname) => {
          const el = this.element.querySelector(elname);
          if (el.value != '') {
            tunesids.push(el.value);
          }
        });

        const link = {
          videos_id: result.id,
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
        const result2 = await apis.Xanoapi.edittune(this.data.id, params2);
      }
    } catch (error) {
      new Mynotification('error', `No se ha podido guardar el vídeo.`);
      console.log(error);
    }
  }
}
