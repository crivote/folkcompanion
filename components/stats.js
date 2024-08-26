import {Component} from '../abstract.js';
import {Data, Utils} from '../startup.js';

/**
 * historic list component
 */
export class Stats extends Component {
  contentZoneList;
  contentZoneGraphs;
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
   * setear valores componente.
   */
  async setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.contentZoneList = this.element.querySelector('main .list');
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
   * @return {boolean}
   */
  groupDatesByDay(dates) {
    this.objectDates = {};
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
    return true;
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
          <h3 class="text-3xl">Histórico de ensayos</h3>
          <span class="num_of_days bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">
          </span></h3>
        </div>
      </header>
      <main class="p-6 grid lg:grid-cols-2 gap-2 grid-flow-row">
        <section class="list">
        </section>
        <section class="graphs">
        </section>
      </main>
      </section>`;
  }

  /**
   *
   */
  async renderDiary() {
    // generar lista ensayos
    const listofdates = this.createDatesArray();
    // agrupar por dias
    await this.groupDatesByDay(listofdates);
    this.listDates.sort().reverse();
    this.element.querySelector('.num_of_days').innerHTML =
      this.listDates.length + ' días';
    this.listDates.forEach((day) => {
      this.attachAt(this.renderDay(day), false, this.contentZoneList);
    });
  }
  /**
   *
   */
  renderGraphs() {
    const totalRehearDays = this.listDates.length;
    const totalRehearTunes = this.objectDates.reduce((prev, act) => {
      prev += act.length;
    }, 0);
    const totalDays = Utils.calctimesince(this.listDates.at(-1), true);
    const rehearsalPerDay = totalRehearDays / totalDays;
    const myhtml = `
    <div>
    <p>${totalRehearDays} rehears in last ${totalDays} days.</p>
    <p>${totalRehearTunes} tunes played in total</p>
    <p>${Math.floor(totalRehearTunes/totalRehearDays)} avg tunes per
    rehearsal</p>
    <p>${rehearsalPerDay * 7} rehears avg per week</p>
    </div>
    `;
    this.attachAt(myhtml, true, this.contentZoneGraphs);
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
    my-3 rounded-md p-4 hover:bg-slate-300 transition cursor-pointer">
      <summary><span class="font-bold text-blue-800">${encabezado}</span>
        <span class="ml-1 bg-slate-400 p-1 text-xs uppercase text-white/75
        rounded-lg">
        ${this.objectDates[day].length} temas ensayados</span></summary>
      <ol class="bg-white/75 p-2 mt-2 rounded-md">
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
    let htmlcontent = '';
    tunes.sort((a, b) => b.date - a.date);
    tunes.forEach((tune) => {
      const mytune = Data.tunebook.find(
          (tunebooktune) => tunebooktune.id === tune.tuneid);
      const mytime = new Date(tune.date);
      const minutes = mytime.getMinutes() < 10 ? '0'+mytime.getMinutes() :
      mytime.getMinutes();
      htmlcontent += `<li class="py-1 text-slate-500">
      <span class="text-xs text-white bg-slate-400/75 py-1 px-2
      rounded-xl mr-1">
      ${mytime.getHours()}:${minutes}</span>
      ${mytune.prefered_name} 
      <span class="font-medium ml-1 text-xs text-slate-400 uppercase">
        ${mytune.tuneref.type}</span>
           </li>`;
    });
    return htmlcontent;
  }

  /**
   * Show html element
   */
  show() {
    this.renderDiary();
    super.show();
  }
}
