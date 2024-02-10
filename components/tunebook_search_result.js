import {Component} from '../abstract.js';
import {Controller, Data, ABCplayer} from '../startup.js';
import {Tuneaddtobook} from './tunebook_newtune.js';

/**
 * Clase para componente tune resultado busqueda para añadir tunebook
 */
export class Tunesearchresult extends Component {
  tunedetail;
  isintunebook;

  /**
   * constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {number} id
   */
  constructor(name, parentel, id) {
    super(name, parentel);
    this.tunedetail = Data.tunes.find((tune) => tune.id === id);
    this.isintunebook = Data.tunebook.some((tune) => tune.tunes_id == id);
    this.setup();
  }

  /**
   * setup inicial
   */
  setup() {
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * generar html del componente
   *
   * @return {string} html
   */
  generatehtml() {
    return `
    <li class="${this.isintunebook ? 'opacity-50' :
    'cursor-pointer hover:bg-white/25'}
    flex gap-2 items-baseline px-4 py-3 border-y border-slate-400" 
    data-id="${this.tunedetail.id}">
        ${this.tunedetail?.ABCsample ?
          `<span data-state="stop" data-abc="${this.tunedetail.ABCsample}" 
          class="player rounded-full bg-black p-1 w-8 h-8 flex">
          <i class="fa fa-play-circle fa-lg m-auto"></i></span>` : ''}
        <span class="font-bold">${this.tunedetail.main_name}</span>
        <em class="text-xs text-slate-300">${this.tunedetail.Type}</em>
        <span class="text-xs uppercase">${this.tunedetail?.Tradition ?
          this.tunedetail.Tradition.join(' · ') : ''}</span>
        ${this.tunedetail.popularity ? `<span class="ml-auto bg-slate-600
        p-1 rounded-lg text-xs w-16 text-center" title="popularidad">
        <i class="fa fa-star mr-1"></i>
        ${this.tunedetail.popularity}</span>` : ''}
    </li>`;
  }

  /**
   * añadir listeners de eventos
   */
  addListeners() {
    if (!this.isintunebook) {
      this.element.addEventListener('click', this.showmodaltune.bind(this));
    }
    if (this.tunedetail?.ABCsample && this.tunedetail.ABCsample.length > 0) {
      this.element.querySelector('.player')
          .addEventListener('click', ABCplayer.manageabc);
    }
  }

  /**
   * Create instance of addtune to tunebook component
   */
  showmodaltune() {
    const tunebook= Controller.getinstance('Tunebook');
    tunebook.subelements.push(
        new Tuneaddtobook(
            'addtunetobook',
            Controller.htmlelement,
            this.tunedetail.id,
        ),
    );
  }
}
