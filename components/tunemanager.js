import {Component} from '../abstract.js';
import {Data} from '../startup.js';
import {Tuneformanager} from './tunemanager_tune.js';
import {Tunemanagersearch} from './tunemanager_search.js';

/**
 * Clase componente gestion temas
 */
export class Tunemanager extends Component {
  filtered = [];
  contentzone = null;
  sortcriteria = 'main_name';

  // instancias en DOM de las card tunes
  tuneInstances = [];
  // array de subcomponentes instanciados
  subelements = [];

  /**
   * Constructor
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   */
  constructor(name, parentel) {
    super(name, parentel);
    this.setup();
  }

  /**
   * poblar filtros y renderizar contenido
   */
  setup() {
    const typeslist = Data.tunes.map((tune) => tune.Type);
    this.typeslist = [...new Set(typeslist)];
    const originlist = Data.tunes.map((tune) => tune.Tradition);
    this.originlist = [...new Set(originlist.flat())];
    this.filtered = Data.tunes;

    // generate HTML
    const myhtml = this.generatehtml();
    this.attachAt(myhtml, false);
    this.contentzone = this.element.querySelector('main');
    // add events
    this.addListeners();
    this.rendertunes();
  }

  /**
   * Generar el html del componente
   *
   * @return {string} html
   */
  generatehtml() {
    return `
    <section id="${this.name}">
      <header class="p-6">
        <div class="flex tuneInstances-center gap-2">
          <h3 class="text-3xl">Todos los temas</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${Data.tunes.length} temas</span>
          <span class="addnewtune text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
          <div class="ml-auto flex tuneInstances-center gap-3">
              <select class="typetune_search">
                <option value="">Tipo</option>
                <option> ${this.typeslist.join('</option><option>')}</option>
              </select>
              <select class="origintune_search">
                <option value="">Origen</option>
                <option> ${this.originlist.join('</option><option>')}</option>
              </select>
              Filtrar <input type="text" class="tunes_search">
              <i class="resetfilter fa fa-trash"></i>
          </div>
        </div>
        <p>sorting by 
          <select class="tunesorting">
            <option selected value="main_name">Nombre</option>
            <option value="Type">Tipo</option>
            <option value="popularity">Popularidad</option>
          </select>
        </p>
      </header>
      <main class="flex px-6 flex-wrap"></main>
    </section>`;
  }

  /**
   * Event listeners
   *
   **/
  addListeners() {
    this.element.querySelector('.tunes_search')
        .addEventListener('input', this.filter.bind(this));
    this.element.querySelector('.typetune_search')
        .addEventListener('change', this.filter.bind(this));
    this.element.querySelector('.origintune_search')
        .addEventListener('change', this.filter.bind(this));
    this.element.querySelector('.addnewtune')
        .addEventListener('click', this.launchsearch.bind(this));
    this.element.querySelector('.tunesorting')
        .addEventListener('change', this.applysort.bind(this));
    this.element.querySelector('.resetfilter')
        .addEventListener('click', this.resetFilter.bind(this));
  }

  /**
   * Genera las instancias de temas
   *
   * @param {array} list //all tunes collection
   */
  rendertunes(list = Data.tunes) {
    this.contentzone.innerHTML = '';
    this.element.querySelector('.num_of_tunes').innerHTML =
        list.length + ' temas';
    list = this.sorter(list);
    this.tuneInstances = list.map((item) => {
      return new Tuneformanager('tune' + item.id, this.contentzone, item.id);
    });
  }

  /**
   * Ordenar listado
   *
   * @param {array} list
   * @return {array} list
   */
  sorter(list) {
    list.sort((a, b) => {
      if (a[this.sortcriteria] < b[this.sortcriteria]) {
        return this.sortcriteria == 'popularity' ? 1 : -1;
      } else if (a[this.sortcriteria] > b[this.sortcriteria]) {
        return this.sortcriteria == 'popularity' ? -1 : 1;
      } else {
        return 0;
      }
    });
    return list;
  }

  /**
   * Cambiar criterio orden
   *
   * @param {event} event
   */
  applysort(event) {
    const myinput = event.target.value;
    this.sortcriteria = myinput;
    this.rendertunes(this.filtered);
  }

  /**
   * Borrar todos los filtros
   */
  resetFilter() {
    this.filtered = Data.tunes;
    this.element.querySelector('.tunes_search').value = '';
    this.element.querySelector('.typetune_search').value = '';
    this.element.querySelector('.origintune_search').value = '';
    this.rendertunes();
  }

  /**
   * filtrar relación de tunes por nombre
   *
   * @param {event} event
   */
  filter() {
    const valtext = this.element.querySelector('.tunes_search')
        .value.toLowerCase();
    const valtype = this.element.querySelector('.typetune_search')
        .value.toLowerCase();
    const valtrad = this.element.querySelector('.origintune_search')
        .value.toLowerCase();

    this.filtered = Data.tunes.filter(
        (tune) => {
          let val1 = true;
          if (valtext) {
            val1 = tune.main_name.toLowerCase()
                .includes(myinput.toLowerCase()) ||
                tune.other_names.join().toLowerCase()
                    .includes(myinput.toLowerCase());
          }
          let val2 = true;
          if (valtype) {
            val2 = tune.Type == valtype;
          }
          let val3 = true;
          if (valtrad) {
            val3 = tune.Tradition.includes(valtrad);
          }
          return val1 && val2 && val3;
        },
    );
    this.rendertunes(this.filtered);
  }

  /**
   * Abrir subcomponente para añadir temas
   */
  launchsearch() {
    this.subelements.push(
        new Tunemanagersearch('tunemanagersearch', this.element));
  }
}
