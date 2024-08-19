import {Component} from '../abstract.js';
import {Utils, Data, Controller} from '../startup.js';
import * as apis from '../apis.js';
import {Mynotification} from './notification.js';
import {Videoaddtune} from './videos_addvideo_tuneline.js';


/**
 * Componente adicion y edicion videos
 *
 **/
export class Videoadd extends Component {
  videokey;
  videozone;
  tuneszone;
  video;
  isNew;
  tunes = [];
  instances;

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {number} videoid
   * @param {number} tuneid
   */
  constructor(name, parentel, videoid = '', tuneid ='') {
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
   * Setup inicial component
   */
  async setup() {
    this.attachAt(this.generatehtml(), false);
    this.videozone = this.element.querySelector('#videocontainer');
    this.tuneszone = this.element.querySelector('ul.listoftunes');
    this.inputvideo = this.element.querySelector('.getVideoKey');
    this.inputtune = this.element.querySelector('.tuneselector');
    if (!this.isNew) {
      this.loadVideo(this.videokey);
      this.instances = this.tunes.map((tune) => {
        const fulltune = Data.tunes.find((ftune) => ftune.id == tune);
        const times = fulltune.media_links.find(
            (link) => link.videos_id == this.video.id);
        return new Videoaddtune(
            'tune'+tune,
            this.tuneszone,
            this.video.id,
            tune,
            times,
        );
      });
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
    this.inputvideo
        .addEventListener('change', this.getVideoKey.bind(this));
    // add tune to video
    this.inputtune
        .addEventListener('change', this.addtunetovideo.bind(this));
    // add current video to db
    this.element.querySelector('.sendbutton')
        .addEventListener('click', this.addvideo.bind(this));
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

        <main class="mt-3 grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          <section id="form" class="xl:col-span-2">
            <div class="flex flex-col gap-2">
          ${Utils.generateformfield(
      'titulo',
      'titulo del vídeo',
            this.isNew ? '' : this.video.Title, null, true,
  )}
          ${Utils.generateformfield(
      'artista',
      'artista',
            this.isNew ? '' : this.video.Performer, null, true,
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
              <datalist id="alltunes">
                ${this.getfulllistoftunes()}
              </datalist>
              <input list="alltunes" class="tuneselector p-1 txt-sm mx-auto" 
              name="tuneselector" placeholder="añadir un tema">
          </div>   
          <ul class="listoftunes mt-2"></ul>    
        </section>
      </div>
      </section>
          <section id="videocontainer" class="xl:col-span-3">
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
   * Generate list of ids and tune names
   *
   * @return {string}
   */
  getfulllistoftunes() {
    const result = Data.tunes.flatMap((tune) => {
      const myid = tune.id;
      return tune.other_names.map((tunename) =>
        `<option value="${myid}" label="${tunename}">${tunename}</option>`,
      );
    }).join( '');
    return result;
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
    this.inputvideo.value='';
  }

  /**
   * Añadir enlace a tune en el video
   *
   * @param {event} event
   */
  async addtunetovideo(event) {
    const el = event.currentTarget;
    const newtune = el.value;
    el.value='';
    this.tunes.push(newtune);
    this.instances.push(
        new Videoaddtune(
            'tune'+newtune,
            this.tuneszone,
            this.video.id,
            newtune,
        ),
    );
  }

  /**
   * guardar video en db
   *
   * @param {event} event
   */
  async addvideo(event) {
    event.preventDefault();
    const params = {
      url: this.videokey,
      thumb_url: `https://i3.ytimg.com/vi/${this.videokey}/hqdefault.jpg`,
      type: this.element.querySelector('[data-name="type"]').value,
      Title: this.element.querySelector('[data-name="titulo"]').value,
      Performer: this.element.querySelector('[data-name="artista"]').value,
      notes: '',
      album_relation: {},
    };
    if (this.isNew) {
      if (!Data.videos.some((video) => video.url == this.videokey)) {
        // Comprobar que el video no ha sido ya añadido antes
        try {
          const result = await apis.Xanoapi.addvideo(params);
          if (result) {
            new Mynotification('success', `Se ha guardado el nuevo vídeo.`);
          }
        } catch (error) {
          new Mynotification(
              'danger',
              `No se ha podido guardar el nuevo vídeo.`);
          console.log(error);
        }
      } else {
        new Mynotification(
            'danger',
            `Ya hay un video guardado con la misma url.`);
      }
    } else {
      // actualizar datos
      params.id = this.video.id;
      try {
        const result = await apis.Xanoapi.editvideo(this.video.id, params);
        if (result) {
          new Mynotification('success', `Se ha actualizado el vídeo.`);
          this.instances.forEach(
              (tuneinstance) => tuneinstance.savevideoreference());
          this.remove();
          const videos = Controller.getinstance('Videos');
          videos.rendervideos();
        }
      } catch (error) {
        new Mynotification('danger', `No se ha podido actualizar el vídeo.`);
        console.log(error);
      }
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
