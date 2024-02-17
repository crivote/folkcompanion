import {Component} from '../abstract.js';
import {Data} from '../startup.js';
import {Setbooknewset} from './setbook_newset.js';
import {Set} from './setbook_set.js';

/** Componente para sets */
export class Setbook extends Component {
  contentzone;
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
   * Setup elemento
   */
  setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.contentzone = this.element.querySelector('main');
    this.addListeners();
    this.rendersets(Data.setbook);
  }

  /**
   * Generar HTML
   *
   * @return {text} html content
   */
  generatehtml() {
    return `<section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Mis sets</h3>
          <span class="num_of_sets bg-slate-400 text-sm px-2 py-1 
          uppercase text-slate-200 rounded-lg text-md">
          ${Data.setbook.length} sets</span>
          <span class="addnewset text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
        </div>
      </header>
      <main class="p-6"></main>
    </section>`;
  }

  /**
     * add listeners to html elements
     */
  addListeners() {
    // filtrar titulo
    this.element.querySelector('.addnewset')
        .addEventListener('input', this.createnewset.bind(this));
  }

  /**
   * Renderizar componentes
   *
   * @param {object[]} list
   */
  rendersets(list) {
    this.contentzone.innerHTML = '';
    this.element.querySelector('.num_of_sets').innerHTML =
      list.length + ' sets';
    this.items = list.map((item) => {
      return new Set('set' + item.id, this.contentzone, item);
    });
  }

  /**
   * mostrar modal para añadir nuevo set
   */
  createnewset() {
    this.subelements.push(new Setbooknewset('newset', this.element));
  }
}
