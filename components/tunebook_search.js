import {Component} from '../abstract.js';
import {Data} from '../startup.js';
import {Tunesearchresult} from './tunebook_search_result.js';

/**
 * componente buscar temas para añadir a repertorio
 */
export class Tunesearch extends Component {
  // todos los temas
  tunes = Data.tunes;
  // ids ya en repertorio
  listoftunebookids;
  // html element para resultados
  resultszone;
  // instancias de resultados
  resultInstances;

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
   * Generar html y añadir listeners
   */
  setup() {
    // Create a list to exclude tunes already in the tunebook
    this.listoftunebookids = Data.tunebook.map((tune) => tune.tunes_id);

    this.attachAt(this.generatehtml(), false);
    this.resultszone = this.element.querySelector('.results');
    this.addListeners();
  }

  /**
   * Generar html elemento
   *
   * @return {string}
   */
  generatehtml() {
    return `<div id="${this.name}" class="animate__animated animate__slideInLeft
     fixed inset-0 w-1/3 bg-gray-400 flex p-6 shadow-lg">
            <div class="bg-white p-6 w-full rounded max-h-lvh overflow-auto">
                <p id="closetunesearch" class="text-right" title="close">
                <i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">
                Añadir nuevos temas a tu repertorio</h2>
                <input id="tunesearch" size=40" type="text" 
                placeholder="escribe parte del nombre para ver resultados">
                <p class="info mt-6 mb-2"></p>
                <div class="sugestion hidden">
                    <input type="text" class="titlesugestion" size="40" 
                    placeholder="escriba el título del tune que desea">
                    <button class="sendsugestion bg-blue-600 text-white p-2 
                    rounded-md uppercase">enviar</button>
                </div>
                <ul class="results bg-slate-500 text-slate-50 p-2"></ul>
          </div>
        </div>`;
  }

  /**
  * Añadir listeners al html
  */
  addListeners() {
    // filtrar resultados
    this.element.querySelector('#tunesearch')
        .addEventListener('input', this.search.bind(this));
    // cerrar componente
    this.element.querySelector('#closetunesearch')
        .addEventListener('click', this.eliminate.bind(this));
    // enviar sugerencia
    this.element.querySelector('.sendsugestion')
        .addEventListener('click', this.suggestion.bind(this));
  }

  /**
   * Buscar en todos los temas de la BD
   *
   * @param {event} event
   */
  search(event) {
    const myinfo = this.element.querySelector('.info');
    const suggestion = this.element.querySelector('.sugestion');
    myinfo.textContent = '';
    const string = event.target.value;

    if (string.length > 0) {
      // filtrar tunes excluyendo ya en el repertorio
      const result = this.tunes.filter((tune) => {
        return tune.other_names.some(
            (name) => name.toLowerCase().includes(string.toLowerCase()),
        ) && !this.listoftunebookids.includes(tune.id);
      });

      if (result.length > 0) {
        suggestion.classList.add('hidden');
        myinfo.textContent = `Encontrados ${result.length} resultados:`;
        this.generateresults(result);
      } else {
        myinfo.textContent = `Sin resultados en la base de datos.
            Si crees que el tema debería aparecer, por favor escribe el título
            a continuación e intentaremos añadirlo. Gracias!`;
        suggestion.classList.remove('hidden');
      }
    }
  }

  /**
   * Generar instancias de resultados
   *
   * @param {array} items
   */
  generateresults(items) {
    this.resultszone.innerHTML = '';
    this.resultInstances = items.map((item) => {
      return new Tunesearchresult('tune' + item.id, this.resultszone, item.id);
    });
  }

  /**
   * Ocultar el componente
   */
  eliminate() {
    this.element.classList.remove('animate__slideInLeft');
    this.element.classList.add('animate__slideOutLeft');
    this.element.addEventListener('animationend', () => {
      this.remove();
    });
  }

  /**
   * Guarda sugerencias del usuario para añadir temas
   *
   * @param {event} event
   */
  async suggestion(event) {

  }
}
