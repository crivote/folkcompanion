import {Component} from '../abstract.js';
import {Controller, Data, Utils, ABCplayer} from '../startup.js';


/**
 * rehearsal proposal component
 */
export class Rehear extends Component {
  contentZone;
  numberTunes = 20;
  criterialist = [
    {value: 'points', label: 'prioridad', selected: true},
    {value: 'tuneref.type', label: 'tipo'},
    {value: 'prefered_tone', label: 'tonalidad'},
  ];
  sortcriteria = 'points';
  tunelist = [];

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
    this.renderList();
  }

  /**
   * Add listeners to the component
   */
  addListeners() {
    this.element.querySelector('.createnewlist')
        .addEventListener('click', this.renderList.bind(this));
    this.element.querySelector('.tunesorting')
        .addEventListener('change', this.sorter.bind(this));
  }

  /**
   * Add listeners to the list items
   */
  addContentListeners() {
    this.element.querySelectorAll('.rehearsal').forEach((item) => {
      item.addEventListener('click', this.addrehearsal.bind(this));
    });
    this.element.querySelectorAll('.playabc').forEach((item) => {
      item.addEventListener('click', ABCplayer.manageabc);
    });
  }

  /**
   * crear array de fechas de ensayos de tunes
   *
   * @return {array}
   */
  assignPointsTunes() {
    const pointsArray = Data.tunebook.map((tune) => {
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
    return `<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Lista para ensayar</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.numberTunes}
          </span></h3>
        </div>
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
    const orderedList = tunelist.sort((a, b) => a.points - b.points).reverse();
    return orderedList;
  }

  /**
     * Ordenar listado
     *
     * @param {array} list
     * @return {array} list
     */
  sorter(event) {
    const myinput = event.target.value;
    this.sortcriteria = myinput;

    this.tunelist.sort((a, b) => {
      if (a[this.sortcriteria] < b[this.sortcriteria]) {
        return this.sortorder == 'ASC' ? -1 : 1;
      } else if (a[this.sortcriteria] > b[this.sortcriteria]) {
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
    let myhtml = '';
    this.tunelist.forEach((tune) => {
      myhtml += this.renderTune(tune);
    });
    this.contentZone.innerHTML = myhtml;
    this.addContentListeners();
  }


  /**
   * renderizar tune individual para ensayar
   *
   * @param {object} originaltune
   * @return {string} html
   */
  renderTune(originaltune) {
    // const originaltune =
    // Data.tunebook.find((tunebook) => tunebook.id == tune.tuneid);
    const links = Utils.generatelinks(originaltune.tuneref?.References);

    return `<div id="tuneoriginal${originaltune.id}" class="tunelist group 
      w-full bg-white
      border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${originaltune.preferred_img_url ??
        `https://picsum.photos/200/200?random=${originaltune.id}`}')]">
      ${originaltune.tuneref.ABCsample ?
          `<span data-abc="${originaltune.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>` : '' }
      </div>
      <div>         
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${originaltune.prefered_name}
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${originaltune.prefered_tone.substring(0, 5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${Utils.removeWhiteSpaces(
      originaltune.prefered_tone.substring(0, 5))}.png">
        </span>
        <span>${links.join('')}</span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${originaltune.tuneref.type}</span>${originaltune.tuneref.author}</p>
      </div>
      <div class="flex gap-1 ml-auto items-center">
        <button data-id="${originaltune.id}" class="rehearsal bg-blue-400 p-1
        rounded-md text-white text-bold uppercase" title="añadir ensayo">
        <i class="fa fa-guitar fa-fw fa-lg"></i> Marcar completada</button>
    </div>
  </div>`;
  }

  /**
   * Add to rehearsal count of a tune and hide it.
   *
   * @param {event} event
   */
  async addrehearsal(event) {
    event.stopPropagation();
    const boton = event.currentTarget;
    const tuneel = boton.closest('.tunelist');
    const result = Controller.addrehearsal(boton.dataset.id);
    if (result) {
      boton.disabled = true;
      tuneel.classList.add('bg-green-100', 'text-green-600');
    }
  }
}
