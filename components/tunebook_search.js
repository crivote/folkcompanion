import {Component} from '../abstract.js';
import {Data, Controller} from '../startup.js';
import {Tunesearchresult} from './tunebook_search_result.js';
import {Mynotification} from './notification.js';
import * as apis from '../apis.js';

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
    const mycontent = this.generatehtml();
    if (this.element) {
      this.element.outerHTML = mycontent;
    } else {
      this.attachAt(mycontent, false);
    }
    this.resultszone = this.element.querySelector('.results');
    this.addListeners();
  }

  /**
   * Generar html elemento
   *
   * @return {string}
   */
  generatehtml() {
    return `
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75">
    <div id="${this.name}" class="animate__animated animate__slideInLeft
     fixed inset-0 w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-gray-400 flex p-6 shadow-lg">
            <div class="bg-white p-6 w-full rounded max-h-lvh overflow-auto">
                <p id="closetunesearch" class="text-right" title="close">
                <i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">
                Añadir nuevos temas a tu repertorio</h2>
                <input id="tunesearch" class="w-full" type="text" 
                placeholder="escribe parte del nombre para ver resultados">
                <p class="info mt-6 mb-2"></p>
                <div class="sugestion hidden">
                    <input type="text" class="titlesuggestion" size="40" 
                    placeholder="escriba el título del tune que desea">
                    <button class="sendsuggestion bg-blue-600 text-white p-2 
                    rounded-md uppercase">enviar</button>
                </div>
                <ul class="results hidden bg-slate-500 text-slate-50 p-2"></ul>
          </div>
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
    this.element.querySelector('.sendsuggestion')
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
    const string = event.target.value.toLowerCase();

    if (string.length > 0) {
      // filtrar tunes excluyendo ya en el repertorio
      const result = this.tunes.filter((tune) =>
        tune.other_names.some(
            (name) => name.toLowerCase().includes(string)),
      );

      if (result.length > 0) {
        suggestion.classList.add('hidden');
        myinfo.textContent = `Encontrados ${result.length} resultados:`;
        this.generateresults(result);
      } else {
        this.resultszone.innerHTML = '';
        this.resultInstances = '';
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
    if (items.length > 0);
      this.resultszone.classList.remove('hidden');
      this.resultszone.innerHTML = '';
      this.resultInstances = items.map((item) => {
        return new Tunesearchresult('tune' + item.id, this.resultszone, item.id);
      });
    } else {
      this.resultszone.classList.add('hidden');
    }
  }

  /**
   * Ocultar el componente
   */
  eliminate() {
    this.element.classList.remove('animate__slideInLeft');
    this.element.classList.add('animate__slideOutLeft');
    this.element.addEventListener('animationend', () => {
      this.remove();
      const mytunebook= Controller.getinstance('Tunebook');
      const myreference = mytunebook.subelements.findIndex(
          (item) => item.name == this.name);
      mytunebook.subelements.splice(myreference, 1);
    });
  }

  /**
   * Guarda sugerencias del usuario para añadir temas
   *
   * @param {event} event
   */
  async suggestion(event) {
    const suggestion = this.element.querySelector('.titlesuggestion').value;
    if (suggestion) {
      const template = {...Data.template.suggestion};
      template.type_of_suggestion = 'tune';
      template.user_id = Data.user.id;
      template.content = suggestion;
      template.status = 'waiting';
      const result = await apis.Xanoapi.addsuggestion(template);
      if (result) {
        this.setup();
        new Mynotification('success',
            `Se ha guardado su petición.`);
      } else {
        this.data = backup;
        new Mynotification('error', `error al guardar la petición.`);
      }
    }
  }
}
