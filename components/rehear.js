import {Component} from '../abstract.js';
import {Data} from '../startup.js';

/**
 * rehearsal proposal component
 */
export class Rehear extends Component {
  contentZone;
  numberTunes = 20;
  rehearList = [];

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
    // this.addListeners();
    this.renderList();
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
      tune.points = diffdate * factor;
      return tune;
    });
    return pointsArray.sort((a, b) => a.points - b.points);
  }

  /**
   * generar html componente
   *
   * @return {string} html
   */
  generatehtml() {
    const listofcontent = this.renderList();
    return `<section id="${this.name}">
      <header class="pt-6 px-6">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-3xl">Lista para ensayar</h3>
          <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase
          text-slate-200 rounded-lg text-md">${this.numberTunes}
          </span></h3>
        </div>
      </header>
      <main class="p-6">${listofcontent}
      </main>
      </section>`;
  }

  /**
   * Generar lista para ensayo
   * @return {string} html
   */
  renderList() {
    // generar lista ensayos
    const orderedList = this.assignPointsTunes();
    this.rehearList = orderedList.slice(0, this.numberTunes);
    let myhtml = '';
    this.rehearList.forEach((tune) => {
      myhtml += this.renderTune(tune);
    });
    return myhtml;
  }

  /**
   * renderizar tune individual para ensayar
   *
   * @param {object} tune
   * @return {string} html
   */
  renderTune(tune) {
    return `<div id="tune${tune.id}" class="tunelist group w-full bg-white
     border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${tune.preferred_img_url ??
        `https://picsum.photos/200/200?random=${tune.id}`}')]">
      ${tune.tuneref.ABCsample ?
          `<span data-abc="${tune.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>` : '' }
      </div>
      <div>         
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${tune.prefered_name} 
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${tune.prefered_tone.substring(0, 5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${Utils.removeWhiteSpaces(
      tune.prefered_tone.substring(0, 5))}.png">
        </span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${tune.tuneref.type}</span>${tune.tuneref.author}</p>
      </div>
      <div class="flex gap-1 ml-auto items-center">
        <button class="rehearsal bg-blue-400 p-1 rounded-md text-white 
        text-bold" title="añadir ensayo"><i class="fa fa-guitar 
        fa-fw fa-lg"></i></button>
    </div>
  </div>`;
  }
}
