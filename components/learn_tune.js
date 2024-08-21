import {Component} from '../abstract.js';
import {Controller, Utils, ABCplayer} from '../startup.js';


/**
 * rehearsal proposal component
 */
export class LearnTune extends Component {
  tune;
  maxRehear;
  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {object} tune
   * @param {number} maxRehear
   */
  constructor(name, parentel, tune, maxRehear) {
    super(name, parentel);
    this.tune = tune;
    this.maxRehear = maxRehear;
    this.setup();
  }

  /**
   * setear valores componente.
   */
  async setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * Add listeners to the list items
   */
  addListeners() {
    if (this.tune.points < this.maxRehear) {
      this.element.querySelector('.rehearsal')
          .addEventListener('click', this.addrehearsal.bind(this));
    } else {
      this.element.querySelector('.promote')
          .addEventListener('click', this.promote.bind(this));
    }
    if (this.tune.tuneref.ABCsample) {
      this.element.querySelector('.playabc')
          .addEventListener('click', ABCplayer.manageabc);
    }
  }

  /**
   * renderizar tune para ensayar
   *
   * @return {string} html
   */
  generatehtml() {
    // Data.tunebook.find((tunebook) => tunebook.id == tune.tuneid);
    const links = Utils.generatelinks(this.tune.tuneref?.References);
    const rehearButton = `<button class="rehearsal bg-blue-400 p-1
        rounded-md text-white text-bold uppercase" title="añadir ensayo">
        <i class="fa fa-circle-check fa-fw fa-lg"></i></button>`;
    const changeStatusButton = `<button class="promote bg-yellow-400 p-1
        rounded-md text-blue-600 text-bold uppercase" 
        title="marcar como aprendida">
        <i class="fa fa-square-up-right fa-fw fa-lg"></i></button>`;

    return `<div id="tuneoriginal${this.tune.id}" class="tunelist group 
      w-full bg-white
      border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${this.tune.preferred_img_url ??
        `https://picsum.photos/200/200?random=${this.tune.id}`}')]">
      ${this.tune.tuneref.ABCsample ?
          `<span data-abc="${this.tune.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>` : '' }
      </div>
      <div>         
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${this.tune.prefered_name}
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${this.tune.prefered_tone.substring(0, 5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${Utils.removeWhiteSpaces(
      this.tune.prefered_tone.substring(0, 5))}.png">
        </span>
        <span>${links.join('')}</span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.tune.tuneref.type}</span>${this.tune.tuneref.author}</p>
      </div>
      <div class="ml-auto">
          <progress id="file" value="${this.tune.points}" 
          max="${this.maxRehear}">
          ${this.tune.points}</progress>
      </div>
      <div class="flex gap-1 items-center">
        ${this.tune.points >= this.maxRehear ?
          changeStatusButton : rehearButton }
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
    event.currentTarget.disabled = true;
    const result = await Controller.addrehearsal(this.tune.id);
    if (result) {
      this.element.classList.add('bg-green-100', 'text-green-600');
    } else {
      event.currentTarget.disabled = false;
    }
  }
  /**
   * Change status of tune
   *
   * @param {event} event
   */
  async promote(event) {
    event.currentTarget.disabled = true;
    const result = await Controller.changeStatus(
        this.tune.id, this.tune.status_num + 1);
    if (result) {
      this.remove();
    } else {
      event.currentTarget.disabled = false;
    }
  }
}
