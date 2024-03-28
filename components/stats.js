import {Component} from '../abstract.js';
import {Data} from '../startup.js';

/**
 * historic list component
 */
export class Stats extends Component {
  contentZone = null;
  subelements = [];
  listDates = [];
  objectDates = {};

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
   * Add event listeners
   *
   */
  addListeners() {
    this.element.querySelector('.unfoldday')
        .addEventListener('click', this.unfold.bind(this));
  }

  /**
   * setear valores componente.
   */
  async setup() {
    // generar lista ensayos
    const listofdates = this.createDatesArray();

    // agrupar por dias
    await this.groupDatesByDay(listofdates);

    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.contentZone = this.element.querySelector('main');
    // this.addListeners();
    this.renderDiary();
  }

  /**
   * crear array de fechas de ensayos de tunes
   *
   * @return {array}
   */
  createDatesArray() {
    const datesArray = [];
    Data.tunebook.forEach((tune) => {
      tune.last_rehearsals.forEach((date) =>{
        datesArray.push({
          tuneid: tune.id,
          date: date,
        });
      });
    });
    return datesArray;
  }

  /**
   *
   * @param {array} dates
   * @return {object} groupedDates
   */
  async groupDatesByDay(dates) {
    dates.forEach((date) => {
      const mydate = new Date(date.date);
      const day = mydate.toISOString().split('T')[0];
      if (!this.listDates.includes(day)) {
        this.listDates.push(day);
      }
      if (!this.objectDates[day]) {
        this.objectDates[day] = [];
      }
      this.objectDates[day].push(date);
    });
  }

  /**
   * generar html componente
   *
   * @return {string} html
   */
  generatehtml() {
    return `<section id="${this.name}">
      <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Histórico de ensayos</h3>
          <span class="num_of_days bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">
          </span></h3>
        </div>
      </header>
      <main class="p-6 grid lg:grid-cols-2 gap-3"></main>
      </section>`;
  }

  /**
   *
   */
  renderDiary() {
    this.contentZone.innerHTML = '';
    this.element.querySelector('.num_of_days').innerHTML =
      this.listDates.length + ' días';
    this.listDates.sort().reverse();
    this.listDates.forEach((day) => {
      this.attachAt(this.renderDay(day), false, this.contentZone);
    });
  }

  /**
   * renderizar caja para dia
   *
   * @param {array} day
   * @return {string} html
   */
  renderDay(day) {
    const fecha = new Date(day);
    const opciones = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const encabezado = fecha.toLocaleDateString('es-ES', opciones);
    return `<details class="border border-slate-300 bg-slate-200 
    my-3 rounded-md p-2">
      <summary>${encabezado} 
        <span>${this.objectDates[day].length} temas ensayados</span></summary>
      <ol>
        ${this.renderDayTunes(this.objectDates[day])}
      </ol>
    </details>`;
  }

  /**
   *
   * @param {*} tunes
   * @return {string}
   */
  renderDayTunes(tunes) {
    const htmlcontent = '';
    tunes.sort((a, b) => b.date - a.date);
    tunes.forEach((tune) => {
      const mytune = Data.tunebook.find(
          (tunebooktune) => tunebooktune.id === tune.tuneid);
      const mytime = new Date(mytune.date);
      htmlcontent += `<li>${mytune.prefered_name} 
      <span>${mytime.getHours()}:${mytime.getMinutes()}</span>
      </li>`;
    });
    return htmlcontent;
  }
}
