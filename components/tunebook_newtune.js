import {Component} from '../abstract.js';
import {Controller, Data, Utils} from '../startup.js';
import * as apis from '../apis.js';
import {Mynotification} from './notification.js';

/**
 * Componente para ventana crear o editar tunebook
 */
export class Tuneaddtobook extends Component {
  tune;
  pics;
  isNew;

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {number} tuneid
   * @param {string} mode
   */
  constructor(name, parentel, tuneid, mode = 'new') {
    super(name, parentel);
    this.isNew = mode == 'new';
    const source = this.isNew ? 'tunes' : 'tunebook';
    this.tune = Data[source].find((tune) => tune.id === tuneid);
    this.setup();
  }

  /**
   * Cargar contenido componente
   */
  async setup() {
    this.pics = await apis.Pexels.search(this.isNew ? this.tune.other_names[0] :
      this.tune.prefered_name);
    this.pics = this.pics.concat(Data.genericpics);
    if (!this.isNew) {
      this.pics.unshift(this.tune.preferred_img_url);
    }
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * Generar html del componente
   *
   * @return {string} html
   */
  generatehtml() {
    const tuneref = this.isNew ? this.tune : this.tune.tuneref;
    tuneref.tunekeys = tuneref.Modes_played.map(
        (mode) => `${mode.Key} ${mode.Mode}`,
    );

    return `
    <div id="${this.isNew ? 'modaladdtune' : 'modaledittune'}" 
    class="fixed inset-0 bg-gray-500 bg-opacity-75 
    flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-lg relative 
      max-h-full overflow-scroll">
        <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 
        text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
          <h2 class="text-2xl text-blue-400 font-semibold mb-6">
          ${this.isNew ? `Añadir tema a tu repertorio`: `Editar tema`}</h2>
            <section id="editform">
              <div class="flex items-center justify-center -mb-4 gap-4">
                <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                  <p>${tuneref.type} (${tuneref.time})</p>
                  <p>${tuneref.compasses} compases</p>
                  <p>${tuneref.Estructure}</p>
                </div>
                <div class="relative">
                  <img class="picphoto rounded-full h-48 w-48 border-8 
                  border-slate-200 object-cover object-center" 
                  src="${this.pics[0]}">
                  <span class="searchphoto absolute top-2 left-2 p-2 bg-white/75
                  w-10 hover:w-48 h-10 border border-slate-300 rounded-lg 
                  overflow-hidden transition-all ease-in-out">
                      <i class="fa fa-search fa-lg" aria-hidden="true"></i>
                      <input type="text" placeholder="busqueda de imagen" 
                      class="searchpics w-32 ml-2 py-0 px-2 txt-sm rounded-md 
                      border border-slate-200">
                  </span>
                </div>          
                <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                  <p>${tuneref.author}</p>
                  <p>${tuneref?.tradition ? tuneref.tradition.join(' · ') : ''}
                  </p>
                </div>
              </div>
        ${Utils.generateformfield(
      'titulo',
      'titulo favorito',
            this.isNew ? tuneref.main_name : this.tune.prefered_name,
            tuneref.other_names,
  )}
        ${Utils.generateformfield(
      'tonalidad',
      'tonalidad preferida',
            this.isNew ? tuneref.tunekeys[0] : this.tune.prefered_tone,
            tuneref.tunekeys,
  )}
        ${Utils.generateformfield(
      'status',
      'status de ejecución',
            this.isNew ? Data.status[0].label : this.tune.status,
            Data.status.map((sta) => sta.label),
  )}
              <div class="flex items-center justify-center border-b 
              border-slate-200 h-0 my-6">
              </div>
              <div class="flex border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4 gap-3 justify-between">
                <div class="flex flex-col">
                    <label class="uppercase text-slate-400 text-sm">
                    aprendido</label>
                    <input class="font-semibold text-sm border-0 text-blue-400 
                    bg-blue-200 rounded-md uppercase"type="date" 
                    name="learneddate" value="${this.isNew ?
                      Utils.dateformat() : this.tune.learned_date}">
                </div>
                <div class="flex flex-col">
                    <label class="uppercase text-slate-400 text-sm">
                    ensayos</label>
                    <input class="font-semibold text-sm border-0 
                    text-blue-400 w-24
                    text-right bg-blue-200 rounded-md" type="number" 
                    value="${this.isNew ? 0 : this.tune.rehearsal_days}"
                    min="0" name="numrehearsals">
                </div>
                <div class="flex flex-col">
                  <label class="uppercase text-slate-400 text-sm">Último</label>
                    <input class="font-semibold text-sm border-0 
                    text-blue-400 
                    bg-blue-200 rounded-md uppercase" type="datetime-local" 
                    name="lastrehearsal" value="${this.isNew ? '' :
                      Utils.dateformat(this.tune?.last_rehearsals[0], 'long') ??
                      ''}">
                  </div>
                </div>
                <div class="flex items-center justify-center">
                    <button class="savedata px-4 py-3 rounded-md bg-blue-500 
                    text-white text-md font-bold uppercase mr-4" 
                    >${this.isNew ? `Añadir tema`:
                    `Guardar cambios`}</button>
                </div>
              </section>
            <div>
        </div>`;
  }

  /**
   * Añadir listeners de eventos
   */
  addListeners() {
    this.element.querySelector('#closeaddtunebook')
        .addEventListener('click', this.remove.bind(this));
    // change selected image
    this.element.querySelector('.picphoto')
        .addEventListener('click', this.changeimage.bind(this));
    // show select control to change value
    this.element.querySelectorAll('.formcomponent')
        .forEach((el) =>
          el.addEventListener('click', this.showeditselect.bind(this)));
    // change value of select field
    this.element.querySelectorAll('.edit-select li')
        .forEach((el) =>
          el.addEventListener('click', this.changeselectvalue.bind(this)));
    // add tune
    this.element.querySelector('button.savedata')
        .addEventListener('click', this.savetunedata.bind(this));
    // show input to search pics
    this.element.querySelector('.searchphoto')
        .addEventListener('click', this.showinputforpicsearch.bind(this));
    // search pics
    this.element.querySelector('.searchpics')
        .addEventListener('change', this.searchpics.bind(this));
  }

  /**
   * Save data from the form
   *
   * @param {event} event
   */
  async savetunedata(event) {
    event.preventDefault();

    const params = {...Data.template.tunebook};
    params.tunes_id = this.isNew ? this.tune.id : this.tune.tuneref.id;
    params.user_id = Data.user.id;
    params.preferred_img_url = this.element.querySelector('.picphoto').src;
    params.prefered_name = this.element.querySelector('[data-name="titulo"]')
        .textContent;
    params.prefered_tone = this.element.querySelector('[data-name="tonalidad"]')
        .textContent;
    params.status = this.element.querySelector('[data-name="status"]')
        .textContent;
    params.learned_date = this.element
        .querySelector('input[name="learneddate"]').value;
    params.rehearsal_days = this.element
        .querySelector('input[name="numrehearsals"]').value;
    let rehearsalsarray = [];
    if (!this.isNew && Array.isArray(this.tune.last_rehearsals)) {
      rehearsalsarray = this.tune.last_rehearsals;
    }
    const lastrehearsalvalue = this.element
        .querySelector('input[name="lastrehearsal"]').value;
    if (lastrehearsalvalue) {
      rehearsalsarray.unshift(lastrehearsalvalue);
      if (rehearsalsarray.length > 10) {
        rehearsalsarray = rehearsalsarray.slice(0, 10);
      }
    }
    params.last_rehearsals = rehearsalsarray;
    const statusobject = Data.status.find(
        (status) => status.label == params.status);
    params.status_num = statusobject.value ?? 0;

    if (this.isNew) {
      try {
        let result = await apis.Xanoapi.addtotunebook(params);
        if (result) {
          result.tuneref = Data.tunes.find(
              (tune) => tune.id === result.tunes_id);
          result = Utils.calcValueforTunes(result);
          Data.tunebook.push(result);
          new Mynotification('success', `Se ha añadido el tema a tu tunebook.`);
          const tunebook = Controller.getinstance('Tunebook');
          tunebook.rendertunes(tunebook.filtered);
          this.remove();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result =
          await apis.Xanoapi.edittunebooktune(this.tune.id, params);
        if (result) {
          const myindex = Data.tunebook.findIndex(
              (tune) => tune.id == this.tune.id);
          Data.tunebook[myindex] = {...Data.tunebook[myindex], ...result};
          Data.tunebook[myindex] =
              Utils.calcValueforTunes(Data.tunebook[myindex]);
          new Mynotification('success',
              `Se han guardado los cambios en el tema.`);
          const tunebook = Controller.getinstance('Tunebook');
          tunebook.rendertunes(tunebook.filtered);
          this.remove();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * Show input for searching pics
   */
  showinputforpicsearch() {
    this.element.querySelector('.searchpics').classList.remove('hidden');
  }

  /**
   * Search pics from string of text
   *
   * @param {event} event
   */
  async searchpics(event) {
    event.currentTarget.classList.add('hidden');
    const searchstring = event.currentTarget.value;
    if (searchstring.length > 3) {
      this.pics = await apis.Pexels.search(searchstring, 10);
      new Mynotification('success',
          `Se han encontrado imágenes nuevas. Pulse para verlas.`);
    }
  }

  /**
   * Change the displayed image on click
   *
   * @param {event} event
   */
  changeimage(event) {
    const el = event.currentTarget;
    if (this.pics[0] === el.src) {
      this.pics.shift();
    }
    this.pics.push(el.src);
    el.src = this.pics.shift();
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
