import { Component } from '../common/abstract.js';
import { Controller } from '../startup.js';
import { ABCplayer } from '../common/ABCplayer.js';
import { Utils } from '../../Utils.js';
import { Data } from '../common/Data.js';
import * as apis from '../common/apis.js';

/**
 * Componente busqueda temas para añadir a basedatos
 */
export class Tunemanagersearch extends Component {
  tunes = [];
  results;
  details;
  // flag para impedir multiples consultas a thesession
  blocked = false;

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
   * añadir html y eventos
   */
  setup() {
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
    this.results = this.element.querySelector('.results');
    this.myinfo = this.element.querySelector('.info');
  }
  /**
   * añadir listeners al html
   */
  addListeners() {
    this.element
      .querySelector('#managertunesearch')
      .addEventListener('input', this.search.bind(this));
    this.element
      .querySelector('#managerclosetunesearch')
      .addEventListener('click', this.hide.bind(this));
  }

  /**
   * generate html for component
   *
   * @return {string}
   */
  generatehtml() {
    return `<div id="${this.name}" class="fixed inset-0 bg-gray-500 
    bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-lg w-1/3 max-h-screen 
        flex flex-col">
        <p id="managerclosetunesearch" class="text-right" title="close">
        <i class="fa fa-times-circle fa-2x"></i></p>
          <h2 class="text-2xl text-gray-400 font-bold mb-4">
          Añadir temas desde thesession</h2>
          <input id="managertunesearch" type="text" 
          placeholder="escriba parte del nombre">
          <p class="info mt-6 mb-2"></p>
        <ul class="results bg-slate-300 text-slate-50 p-2 overflow-auto h-auto">
        </ul>
      </div>
    </div>`;
  }

  /**
   * renders the list of found items
   * @param {array} items
   */
  generateresults(items) {
    this.results.innerHTML = '';
    items.forEach((item) => {
      const loadable = !this.checktuneexistindb(item.id);
      this.results.insertAdjacentHTML(
        'beforeend',
        `<li data-enriched="false" class="${
          loadable
            ? 'searchitem cursor-pointer bg-slate-500 hover:bg-slate-700'
            : 'bg-slate-300'
        } bg-slate-500 items-baseline 
          px-4 py-3 border-y border-slate-400" data-id="${item.id}">
                <div class="title">
                <span class="font-bold">${item.name}</span>
                <em class="ml-2 text-xs text-slate-300 uppercase">
                ${item.type}</em>
                </div>
          </li>`
      );
    });
    this.results
      .querySelectorAll('li.searchitem')
      .forEach((el) =>
        el.addEventListener('click', this.showdetails.bind(this))
      );
  }

  /**
   * get tune details from thesession
   * @param {event} event
   */
  async showdetails(event) {
    const el = event.currentTarget;
    if (el.dataset.enriched == 'false') {
      el.dataset.enriched = 'true';
      const id = el.dataset.id;
      this.details = await apis.Thesession.gettune(id);
      let tones = this.details.settings.map((item) => item.key);
      tones = [...new Set(tones)];
      el.insertAdjacentHTML(
        'beforeend',
        `<div class="details"><p>Alias: 
          ${this.details.aliases.join(' / ')}</p>
                <p>Tonalidades: ${tones.join(' - ')}</p>
                <button class="addtune bg-white text-slate-600 uppercase 
                p-2 font-bold mt-2 rounded-md">Añadir</button>
                </div>`
      );
      el.querySelector('.title').insertAdjacentHTML(
        'afterbegin',
        `<span class="playabc mr-2" data-state="stop" data-abc="L: 1/8
                K:${this.details.settings[0].key}
                ${this.details.settings[0].abc}">
                <i class="fa fa-play-circle fa-lg"></i></span>`
      );
      el.querySelector('.playabc').addEventListener(
        'click',
        ABCplayer.manageabc
      );
      el.querySelector('.addtune').addEventListener(
        'click',
        this.preparedata.bind(this)
      );
    }
  }

  /**
   * Search module
   *
   * @param {event} event
   */
  async search(event) {
    this.results.innerHTML = '';
    this.myinfo.textContent = '';
    const string = event.target.value;
    if (string.length > 6 && !this.blocked) {
      this.blocked = true;
      const result = await apis.Thesession.search(string);
      if (result.length > 0) {
        this.myinfo.textContent = `Encontrados ${result.length} resultados:`;
        this.generateresults(result);
      } else {
        this.myinfo.textContent = `Sin resultados en Thesession para ${string}`;
      }
      this.blocked = false;
    } else {
      this.myinfo.textContent = `Introduzca al menos 6 caracteres`;
    }
  }

  /**
   * Check if a thesessiontune is already in local DB
   *
   * @param {number} id
   * @return {boolean}
   */
  checktuneexistindb(id) {
    return Data.tunes.some(
      (tune) =>
        tune?.References &&
        Array.isArray(tune.References) &&
        tune.References.length > 0 &&
        tune.References.some(
          (item) =>
            item?.service_name == 'Thesession.org' &&
            item?.service_ID == id.toString()
        )
    );
  }

  /**
   * Get data ready to save new tune
   *
   * @param {event} event
   */
  preparedata(event) {
    const boton = event.target;
    const parent = boton.closest('.searchitem');

    let modes = this.details.settings.map((item) => item.key);
    modes = [...new Set(modes)];
    modes = modes.map((item) => {
      return {
        Key: item.substring(0, 1).toUpperCase(),
        Mode: item.substring(1, 2).toUpperCase() + item.substring(2),
      };
    });
    const type = this.normalicetype(this.details.type);
    const data = {
      main_name: this.details.name,
      sortname: Utils.titleforsort(this.details.name),
      other_names: this.details.aliases,
      popularity: this.details.tunebooks,
      type: type.type,
      author: 'trad.',
      time: type.time,
      References: [
        { service_name: 'thesession.org', service_ID: this.details.id },
      ],
      Modes_played: modes,
      ABCsample: `L: 1/8
                K:${this.details.settings[0].key}
                ${this.details.settings[0].abc}`,
    };

    this.savetune(data, parent);
  }

  /**
   *
   * @param {*} type
   * @return {object}
   */
  normalicetype(type) {
    type = type.replace(/\b\w/g, (char) => char.toUpperCase());
    if (type == 'Jig') {
      type = 'Double Jig';
    }
    return {
      type: type,
      time: Data.rythms[type] ?? '',
    };
  }

  /**
   *
   * @param {*} tunedata
   * @param {*} el
   */
  async savetune(tunedata, el) {
    try {
      const result = await apis.Xanoapi.addtotunes(tunedata);
      if (result) {
        Data.tunes.push(result);
        const manager = Controller.getinstance('Tunemanager');
        manager.rendertunes();
        el.remove();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
