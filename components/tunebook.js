import {Component} from '../abstract.js';
import {Utils, Data} from '../startup.js';
import {Tunesearch} from './tunebook_search.js';
import {Tune} from './tunebook_tune.js';

/**
 * Componente repertorio personal
 */
export class Tunebook extends Component {
  // filtro para temas del repertorio
  filtered = [];
  // instancias en DOM de las card tunes
  tune_instances = [];
  // listas para filtros select
  typeslist = [];
  statuslist = [];
  toneslist = [];
  // elemento html para los temas
  contentzone = null;
  // formato por defecto
  format = 'card';
  // array de subcomponentes instanciados
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
   * Generar html del componente y asignar eventos
   */
  async setup() {
    this.typeslist = Utils.getUniqueValues(
        Data.tunebook.map((tune) => tune.tuneref.Type));
    this.statuslist = Utils.getUniqueValues(
        Data.tunebook.map((tune) => tune.status));
    this.tonelist = Utils.getUniqueValues(
        Data.tunebook.map((tune) => tune.Preferred_tone));
    this.filtered = Data.tunebook;

    const mycontent = this.generatehtml();
    // generate HTML
    if (this.element) {
      this.element.outerHTML = mycontent;
    } else {
      this.attachAt(mycontent, false);
    }
    this.contentzone = this.element.querySelector('main');
    this.addListeners();
    this.rendertunes();
  }

  /**
   * add listeners to html elements
   */
  addListeners() {
    // filtrar titulo
    this.element.querySelector('#tunebook_filter')
        .addEventListener('input', this.applyFilter.bind(this));
    // fitrar tipo tema
    this.element.querySelector('#typetune_filter')
        .addEventListener('change', this.applyFilter.bind(this));
    // filtrar por tono
    this.element.querySelector('#tonetune_filter')
        .addEventListener('change', this.applyFilter.bind(this));
    // filtrar por status
    this.element.querySelector('#statustune_filter')
        .addEventListener('change', this.applyFilter.bind(this));
    // quitar filtros
    this.element.querySelector('.resetfilter')
        .addEventListener('click', this.resetFilter.bind(this));
    // añadir tema
    this.element.querySelector('.addnewtune')
        .addEventListener('click', this.launchsearch.bind(this));
    // tipo de vista temas
    this.element.querySelectorAll('.viewselector')
        .forEach(
            (el) => el.addEventListener('click', this.changeview.bind(this)),
        );
  }

  /**
   * Renderiza las instancias de tune y las guarda en this.instances
   *
   * @param {tunes[]} list
   */
  rendertunes(list = Data.tunebook) {
    this.contentzone.innerHTML = '';
    this.element.querySelector('.num_of_tunes').innerHTML =
      list.length + ' temas';
    this.tune_instances = list.map((item) => {
      return new Tune('tune' + item.id, this.contentzone, item.id, this.format);
    });
  }

  /**
   * genera html general del componente
   *
   * @return {string}
   */
  generatehtml() {
    return `<section id="${this.name}">
        <header class="p-6">
            <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-3xl">Mi repertorio</h3>
                <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 
                uppercase text-slate-200 rounded-lg text-md">
                ${Data.tunebook.length} temas</span></h3>
                <span class="addnewtune text-blue-600 hover:text-blue-400">
                <i class="fa fa-plus-circle fa-2x"></i></span>
                <div class="ml-auto flex items-center gap-3">
                    <span class="viewselector selected bg-slate-500 
                    text-white" data-format="card">
                    <i class="fa fa-grip fa-lg"></i></span>
                    <span class="viewselector" data-format="list">
                    <i class="fa fa-list fa-lg fa-fw"></i></span>
                </div>
                <select id="typetune_filter"><option value="">Tipo</option>
                <option> ${this.typeslist.join('</option><option>')}
                </option></select>
                <select id="statustune_filter"><option value="">Status</option>
                <option> ${this.statuslist.join('</option><option>')}
                </option></select>
                <select id="tonetune_filter"><option value="">Tone</option>
                <option> ${this.tonelist.join('</option><option>')}
                </option></select>

                Filtrar <input type="search" id="tunebook_filter">
                <i class="resetfilter fa fa-trash"></i>
            </div>
        </header>
        <main class="p-6 ${this.format == 'card' ?
        `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 gap-4` : ''}"></main>
        </section>`;
  }

  /**
   * Vaciar filtros y pintar todos los temas
   *
   */
  resetFilter() {
    this.element.querySelector('#tunebook_filter').value = '';
    this.element.querySelector('#typetune_filter').value = '';
    this.element.querySelector('#statustune_filter').value = '';
    this.element.querySelector('#tonetune_filter').value = '';
    this.filtered = Data.tunebook;
    this.rendertunes();
  }

  /**
   * aplicar filtros en tiempo real y pintar temas filtrados
   */
  applyFilter() {
    const valstring = this.element.querySelector('#tunebook_filter')
        .value.toLowerCase();
    const valseltype = this.element.querySelector('#typetune_filter').value;
    const valselstat = this.element.querySelector('#statustune_filter').value;
    const valseltona = this.element.querySelector('#tonetune_filter').value;
    this.filtered = Data.tunebook.filter(
        (tune) => {
          let val1 = true;
          if (valstring != '') {
            val1 = tune.Prefered_name.toLowerCase().includes(valstring) ||
                tune.tuneref.other_names.join(',')
                    .toLowerCase()
                    .includes(valstring);
          }
          let val2 = true;
          if (valseltype != '') {
            val2 = tune.tuneref.Type == valseltype;
          }
          let val3 = true;
          if (valselstat != '') {
            val3 = tune.status == valselstat;
          }
          let val4 = true;
          if (valseltona != '') {
            val4 = tune.Preferred_tone == valseltona;
          }
          return val1 && val2 && val3 && val4;
        },
    );
    this.rendertunes(this.filtered);
  }

  /**
   * Cambiar formato presentacion temas y volver a renderizar
   *
   * @param {event} event
   */
  changeview(event) {
    const myinput = event.currentTarget;
    const newformat = myinput.dataset.format;
    if (newformat != this.format) {
      this.element.querySelector('.viewselector.selected')
          .classList.remove('selected', 'bg-slate-500', 'text-white');
      myinput.classList.add('selected', 'bg-slate-500', 'text-white');
      this.format = myinput.dataset.format;
      this.contentzone.classList.toggle('grid');
      this.rendertunes();
    }
  }

  /**
   * Instanciar componente de búsqueda para añadir nuevo tema
   */
  launchsearch() {
    this.subelements.push(new Tunesearch('tunesearch', this.element));
  }
}
