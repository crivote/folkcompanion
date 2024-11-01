import { Component } from '../common/abstract.js';
import { Data } from '../common/Data.js';
import { LearnTune } from './learn_tune.js';

/**
 * rehearsal proposal component
 */
export class Learn extends Component {
  contentZone;
  numberTunes = 20;
  daysBackwards = 21;
  maxRehear = 7;
  criterialist = [
    { value: 'points', label: 'prioridad', selected: true },
    { value: 'type', label: 'tipo' },
    { value: 'prefered_tone', label: 'tonalidad' },
  ];
  sortcriteria = 'points';
  tunelist = [];
  tuneinstances = [];

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
   * setear valores componente.
   */
  async setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.contentZone = this.element.querySelector('main');
    this.addListeners();
    this.createList();
  }

  /**
   * Add listeners to the component
   */
  addListeners() {
    this.element
      .querySelector('.createnewlist')
      .addEventListener('click', this.createList.bind(this));
    this.element
      .querySelector('.tunesorting')
      .addEventListener('change', this.sorter.bind(this));
  }

  /**
   * crear array de fechas de ensayos de tunes
   *
   * @return {array}
   */
  assignPointsTunes() {
    const filteredTunes = Data.tunebook.filter((tune) => tune.status_num == 2);
    const pointsArray = filteredTunes.map((tune) => {
      const dateFilter = new Date();
      dateFilter.setDate(dateFilter.getDate() - this.daysBackwards);
      const validRehears = tune.last_rehearsals.filter(
        (rehear) => rehear > dateFilter
      );
      return { ...tune, points: validRehears.length };
    });
    return this.sortTunes(pointsArray);
  }

  /**
   * generar html componente
   *
   * @return {string} html
   */
  generatehtml() {
    return `<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Lista para Aprender</h3>
          <div class="ml-auto border-1 border-slate-300 p-2">
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.numberTunes}
          </span>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.daysBackwards}
          </span>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.maxRehear}
          </span>
          </div>
        </div>
         <select class="tunesorting text-sm bg-cyan-200 text-cyan-500 p-1 
          rounded-md border-0">
          ${this.criterialist
            .map(
              (item) => `<option ${item?.selected ? 'selected' : ''}
      value="${item.value}">${item.label}</option>`
            )
            .join('')}
          </select>
        <button class="mb-1 createnewlist bg-blue-400 p-1
        rounded-md text-white text-bold uppercase">
        <i class="fa fa-reload fa-fw fa-lg"></i> Generar Nueva lista</button>
      </header>
      <main class="p-6"></main>
      </section>`;
  }

  /**
   * sort tune list
   *
   * @param {array} tunelist
   * @return {array} tunelist
   */
  sortTunes(tunelist) {
    const orderedList = tunelist.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else {
        return new Date(b.last_rehearsalDate) - new Date(a.last_rehearsalDate);
      }
    });
    return orderedList;
  }

  /**
   * Ordenar listado
   *
   * @param {event} event
   */
  sorter(event) {
    const myinput = event.target.value;
    this.sortcriteria = myinput;

    this.tunelist.sort((a, b) => {
      const valueA =
        this.sortcriteria == 'type' ? a.tuneref.type : a[this.sortcriteria];
      const valueB =
        this.sortcriteria == 'type' ? b.tuneref.type : b[this.sortcriteria];
      if (valueA < valueB) {
        return this.sortorder == 'ASC' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortorder == 'ASC' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.renderList();
  }

  /**
   * Generar lista para ensayo
   *
   */
  createList() {
    // generar lista ensayos
    const orderedList = this.assignPointsTunes();
    this.tunelist = orderedList.slice(0, this.numberTunes);
    this.renderList();
  }

  /**
   * Generar lista para ensayo
   *
   */
  renderList() {
    this.contentZone.innerHTML = '';
    this.tuneinstances = this.tunelist.map((tune) => {
      return new LearnTune(
        'tune' + tune.id,
        this.contentZone,
        tune,
        this.maxRehear
      );
    });
  }
}
