import {Component} from '../abstract.js';
import {Data} from '../startup.js';
import {RehearTune} from './rehear_tune.js';

/**
 * rehearsal proposal component
 */
export class Rehear extends Component {
  contentZone;
  createsets = false;
  numberTunes = 20;
  numberSets = 8;
  criterialist = [
    {value: 'points', label: 'prioridad', selected: true},
    {value: 'type', label: 'tipo'},
    {value: 'prefered_tone', label: 'tonalidad'},
  ];
  sortcriteria = 'points';
  tunelist = [];
  tunesets = [];
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
    this.element.querySelector('.createnewlist')
        .addEventListener('click', this.createList.bind(this));
    this.element.querySelector('.changesets')
        .addEventListener('click', this.changesets.bind(this));
    if (!this.createsets) {
      this.element.querySelector('.tunesorting')
          .addEventListener('change', this.sorter.bind(this));
    }
  }

  /**
   * crear array de fechas de ensayos de tunes
   *
   * @return {array}
   */
  assignPointsTunes() {
    const filteredTunes = Data.tunebook.filter((tune) =>
      tune.status_num > 2);

    const pointsArray = filteredTunes.map((tune) => {
      const today = new Date();
      const diffdate = today - tune.last_rehearsalDate;
      const factor =
        Data.status.find((status) => status.value == tune.status_num);
      return {...tune, points: Math.round(diffdate * factor.factor),
      };
    });
    return this.sortTunes(pointsArray);
  }

  /**
   * generar html componente
   *
   * @return {string} html
   */
  generatehtml() {
    const filters =
      `<select class="tunesorting text-sm bg-cyan-200 text-cyan-500 p-1 
          rounded-md border-0">
          ${this.criterialist.map(
      (item)=> `<option ${item?.selected ? 'selected' : ''}
      value="${item.value}">${item.label}</option>`)
      .join('')}
          </select>`;

    return `<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Lista para ensayar</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.numberTunes}
          </span></h3>
        </div>
        ${this.createsets ? '' : filters}
        <button class="mb-1 createnewlist bg-blue-400 p-1
        rounded-md text-white text-bold uppercase">
        <i class="fa fa-reload fa-fw fa-lg"></i> Generar Nueva lista</button>
        <button class="mb-1 changesets bg-blue-400 p-1
        rounded-md text-white text-bold uppercase">
        <i class="fa fa-reload fa-fw fa-lg"></i> Generar sets</button>
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
    const orderedList = tunelist.sort((a, b) => a.points - b.points).reverse();
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
      const valueA = this.sortcriteria == 'type' ?
        a.tuneref.type : a[this.sortcriteria];
      const valueB = this.sortcriteria == 'type' ?
        b.tuneref.type : b[this.sortcriteria];
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
   * cambiar sets valueo
   *
   */
  changesets() {
    this.createsets = !this.createsets;
    this.createList();
  }


  /**
   * Generar lista para ensayo
   *
   */
  createList() {
    // generar lista ensayos
    const orderedList = this.assignPointsTunes();
    if (!this.createsets) {
      this.tunelist = orderedList.slice(0, this.numberTunes);
      this.renderList();
    } else {
      this.tunelist = orderedList.slice(0, this.numberTunes * 2);
      this.tunelist.forEach((tune) => {
        tune.alterations = Data.keyAlterations[tune.prefered_tone];
      });
      this.tunesets = [];
      while (this.tunesets.length < this.numberSets) {
        const firsttune = this.tunelist.shift();
        const currentSet = this.createSet(firsttune);
        this.tunesets.push(currentSet);
      }
      this.renderSets();
    }
  }

  /**
   * Build a set of tunes related
   *
   * @param {object} tune
   * @return {array}
   */
  createSet(tune) {
    const setArray = [tune];
    for (let i = 0; i < 2; i++) {
      const foundTune = this.findSimilarTune(tune);
      if (foundTune) {
        setArray.push(foundTune);
      }
    }
    return setArray;
  }

  /**
   * Find a tune with same type and tone
   *
   * @param {object} tune
   * @return {object}
   */
  findSimilarTune(tune) {
    let foundTune = this.tunelist
        .findIndex((item) => item.tuneref.type === tune.tuneref.type &&
        item.prefered_tone === tune.prefered_tone);
    if (foundTune === -1) {
      foundTune = this.tunelist
          .findIndex((item) => item.tuneref.type === tune.tuneref.type &&
          Math.abs(foundTune.alterations - item.alterations) < 2);
    }
    if (foundTune === -1) {
      foundTune = this.tunelist
          .findIndex((item) => item.tuneref.type === tune.tuneref.type);
    }
    if (foundTune !== -1) {
      const newTune = this.tunelist.splice(foundTune, 1);
      return newTune[0];
    }
    return false;
  }

  /**
   * Generar lista para ensayo
   *
   */
  renderList() {
    this.contentZone.innerHTML = '';
    this.tuneinstances = this.tunelist.map((tune) => {
      return new RehearTune('tune' + tune.id, this.contentZone, tune);
    });
  }

  /**
   * Generar lista para ensayo
   *
   */
  renderSets() {
    this.contentZone.innerHTML = '';
    this.tuneinstances = [];
    this.tunesets.forEach((set) => {
      this.contentZone.insertAdjacentHTML('beforeend',
          '<h5 class="mt-4">Set</h5>');
      set.forEach((tune) => {
        this.tuneinstances
            .push(new RehearTune('tune' + tune.id, this.contentZone, tune));
      });
    });
  }
}
