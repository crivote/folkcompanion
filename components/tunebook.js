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
  criterialist = [
    {value: 'titlesort', label: 'nombre', selected: true},
    {value: 'status_num', label: 'status'},
    {value: 'lastrehearsalDate', label: 'último ensayo'},
    {value: 'prefered_tone', label: 'tonalidad'},
    {value: 'rehearsal_days', label: 'nº ensayos'},
  ];
  sortcriteria = 'titlesort';
  sortorder = 'ASC';
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
   *
   * @param {array} filter
   */
  setup(filter = Data.tunebook) {
    this.filtered = filter;
    const mycontent = this.generatehtml();
    // generate HTML
    if (this.element) {
      this.replace(mycontent);
    } else {
      this.attachAt(mycontent, false);
    }
    this.contentzone = this.element.querySelector('main');
    this.filterzone = this.element.querySelector('.filtercomponent');
    this.filternotice = this.element.querySelector('.filternotice');
    this.counter = this.element.querySelector('.tunecounter');
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
    this.element.querySelector('.tunesorting')
        .addEventListener('change', this.applysort.bind(this));
    this.element.querySelector('.sortorder')
        .addEventListener('click', this.changesortorder.bind(this));
  }

  /**
   * Renderiza las instancias de tune y las guarda en this.instances
   *
   * @param {array} list
   */
  rendertunes() {
    this.contentzone.innerHTML = '';
    const list = this.sorter(this.filtered);
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
    return `
    <section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Mi repertorio</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 
          uppercase text-slate-200 rounded-lg text-md">
          <span class="tunecounter">${this.filtered.length}</span> temas
          </span></h3>
          <span class="addnewtune text-blue-600 hover:text-blue-400">
          <i class="fa fa-plus-circle fa-2x"></i></span>
          <div class="ml-auto flex items-center gap-1 mr-3">
            <span class="viewselector p-1 rounded-md
            ${this.format == 'card' ? 'selected bg-slate-500 text-white' : ''}"
            data-format="card">
              <i class="fa fa-fw fa-grip fa-lg"></i></span>
            <span class="viewselector p-1 rounded-md
            ${this.format == 'list' ? 'selected bg-slate-500 text-white' : ''}"
            data-format="list">
              <i class="fa fa-fw fa-list fa-lg fa-fw"></i></span>
          </div>
          <div class="filtercomponent border border-slate-400 p-2 rounded-md">
          ${this.generateHTMLfilter()}
          </div>
        </div>
        <p class="filternotice bg-slate-500 rounded-lg text-white p-2 text-xs 
        mb-2 w-64 flex uppercase hidden">Mostrando 
        <span class="numfiltered mx-1 font-bold"></span> temas filtrados
        <span class="resetfilter ml-auto cursor-pointer hover:text-white/75">
        <i class="fa fa-times-circle fa-lg"></i></span>
        </p>
        <p><span class="sortorder"><i class="fa-solid 
        ${this.sortorder == 'ASC' ?
        'fa-arrow-down-short-wide' : 'fa-arrow-up-wide-short'}"></i></span>
          <select class="tunesorting text-sm bg-cyan-200 text-cyan-500 p-1 
          rounded-md border-0">
          ${this.criterialist.map(
      (item)=> `<option ${item?.selected ? 'selected' : ''}
      value="${item.value}">${item.label}</option>`)
      .join('')}
          </select>
        </p>
      </header>
      <main class="p-6 ${this.format == 'card' ?
        `grid gap-6` : ''}" 
        style="grid-template-columns: repeat(auto-fit, 350px);
        justify-content: center;">
      </main>
    </section>`;
  }

  /**
   * Generates filter component
   *
   * @return {string} html
   */
  generateHTMLfilter() {
    this.generateFilterList();
    return `
    <i class="fas fa-filter"></i>
    <select id="typetune_filter" class="text-sm 
    bg-cyan-200 text-cyan-500 p-1 rounded-md border-0">
    <option value="">tipo</option>
    <option> ${this.typeslist.join('</option><option>')}
    </option></select>
    <select id="statustune_filter" class="text-sm 
    bg-cyan-200 text-cyan-500 p-1 rounded-md border-0">
    <option value="">status</option>
    <option> ${this.statuslist.join('</option><option>')}
    </option></select>
    <select id="tonetune_filter" class="text-sm 
    bg-cyan-200 text-cyan-500 p-1 rounded-md border-0">
    <option value="">tono</option>
    <option> ${this.tonelist.join('</option><option>')}
    </option></select>
    <input type="search" id="tunebook_filter" placeholder="busqueda por texto"
    class="w-32 rounded-md bg-white/50 p-1 text-sm text-slate-500 
    border-slate-300">`;
  }

  /**
   * Generar items de listados filtro.
   */
  generateFilterList() {
    this.typeslist = Utils.getUniqueValues(
        Data.tunebook.map((tune) => tune.tuneref.type)).sort();
    this.statuslist = Utils.getUniqueValues(
        Data.tunebook.map((tune) => tune.status)).sort();
    this.tonelist = Utils.getUniqueValues(
        Data.tunebook.map((tune) => tune.prefered_tone)).sort();
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
        return this.sortorder == 'ASC' ? -1 : 1;
      } else if (a[this.sortcriteria] > b[this.sortcriteria]) {
        return this.sortorder == 'ASC' ? 1 : -1;
      } else {
        return 0;
      }
    });
    return list;
  }

  /**
   * Cambiar el criterio filtrado
   *
   * @param {event} event
   */
  applysort(event) {
    const myinput = event.target.value;
    this.sortcriteria = myinput;
    this.rendertunes();
  }

  /**
   * cambiar sentido de ordenacion
   */
  changesortorder() {
    this.sortorder = this.sortorder == 'ASC' ? 'DESC' : 'ASC';
    const myel = this.element.querySelector('.sortorder i');
    if (this.sortorder == 'ASC') {
      myel.classList.remove('fa-arrow-up-wide-short');
      myel.classList.add('fa-arrow-down-short-wide');
    } else {
      myel.classList.remove('fa-arrow-down-short-wide');
      myel.classList.add('fa-arrow-up-wide-short');
    }
    this.rendertunes();
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
    this.filternotice.classList.add('hidden');
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
            val1 = tune.prefered_name.toLowerCase().includes(valstring) ||
                tune.tuneref.other_names.join(',')
                    .toLowerCase()
                    .includes(valstring);
          }
          let val2 = true;
          if (valseltype != '') {
            val2 = tune.tuneref.type == valseltype;
          }
          let val3 = true;
          if (valselstat != '') {
            val3 = tune.status == valselstat;
          }
          let val4 = true;
          if (valseltona != '') {
            val4 = tune.prefered_tone == valseltona;
          }
          return val1 && val2 && val3 && val4;
        },
    );
    this.filternotice.querySelector('.numfiltered').textContent =
        this.filtered.length;
    this.filternotice.classList.remove('hidden');
    this.rendertunes();
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
