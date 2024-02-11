import {Component} from '../abstract.js';
import {Mynotification} from './notification.js';
import {Controller, Utils, Data, ABCplayer} from '../startup.js';
import * as apis from '../apis.js';
import {Tuneaddtobook} from './tunebook_newtune.js';

/**
 * Tune for tunebook component
 */
export class Tune extends Component {
  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {string} id
   * @param {string} format
   */
  constructor(name, parentel, id, format) {
    super(name, parentel);
    this.id = id;
    this.data = Data.tunebook.find((item) => item.id === id);
    this.format = format;
    this.setup();
  }

  /**
   * Generates HTML, adds to the parent element and set listeners
   */
  setup() {
    this.calculateValues();
    const mycontent = this['generatehtml_' + this.format]();
    if (this.element) {
      this.element.outerHTML = mycontent;
    } else {
      this.attachAt(mycontent, false);
    }
    this.addlisteners();
  }

  /**
   * Generate calculated values from data
   */
  calculateValues() {
    this.data.titlesort = Utils.titleforsort(this.data.prefered_name);
    this.data.dayssincelastrehear = this.data?.last_rehearsals.length > 0 ?
        Utils.calctimesince(this.data.last_rehearsals[0]) : null;
    this.data.meanRehear = Utils.getMeanRehear(this.data.last_rehearsals);
  }

  /**
   * Add listeners to the html component
   */
  addlisteners() {
    this.element.querySelector('.rehearsal')
        .addEventListener('click', this.addrehearsal.bind(this));
    this.element.querySelector('.deletetune')
        .addEventListener('click', this.deletetune.bind(this));
    this.element.querySelector('.edittune')
        .addEventListener('click', this.quickedit.bind(this));
    this.element
        .addEventListener('click', this.viewdetails.bind(this));
    if (this.data.tuneref.ABCsample) {
      this.element.querySelector('.playabc')
          .addEventListener('click', ABCplayer.manageabc);
    }
  }

  /**
   * search for the status object in static Data
   *
   * @param {string} status
   * @return {object}
   */
  getstatus(status) {
    return Data.status.find((item) => item.label == status);
  }

  /**
   * generate html for card view
   *
   * @return {string}
   */
  generatehtml_card() {
    const mystatus = this.getstatus(this.data.status);
    const mytype = this.data.customtype ?? this.data.tuneref.type;

    return `<div id="tune${this.data.id}" class="cursor-pointer flex flex-col 
    border-t-8 border-${mystatus.color} relative tunecard shrink-0 
    xl-2:basis-1/5 xl:basis-1/4 lg:basis-1/3 md:basic-1/2 bg-white shadow-md 
    rounded-md p-6 transition duration-300 ease-in-out hover:shadow-lg 
    hover:scale-110">
        <div class="tuneimg flex h-64 -mt-6 -mx-6 bg-center bg-cover 
        bg-[url('${this.data.preferred_img_url ??
          `https://picsum.photos/200/200?random=${this.data.id}`}')]">
        ${this.data.tuneref.ABCsample ?
            `<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
             class="playabc text-white/30 hover:text-white/75 m-auto 
             drop-shadow-xl">
            <i class=" m-auto fa fa-circle-play fa-5x"></i><span>` : '' }
        </div>
        <span class="px-2 py-1 rounded-md text-sm absolute top-4 uppercase
         text-slate-700/75 font-bold bg-${mystatus.color}/75" >
         ${mystatus.label}</span>
         ${this.data.prefered_tone ?
        `<div class="absolute right-6 top-4 px-2 py-1 bg-blue-800/50 
        text-white/90 rounded-lg text-xs" title="Tonalidad">
            <i class="fas fa-music"></i>
            <span class="numrehearsal ml-1 font-medium uppercase">
            ${this.data.prefered_tone}
           </span>
        </div>`: ''}
        <div class="flex gap-4 items-center justify-center -mt-10">
        <p class="text-center text-sm text-slate-800/75 px-2 py-1 uppercase 
        bg-white/75 rounded-lg">
            <i class="fas fa-calendar-check"></i> 
            <span class="lastrehearsal ml-1">${this.data?.dayssincelastrehear ?
              'hace ' + this.data.dayssincelastrehear + ' días' :
              'nunca'}</span>
        </p>
        <p class="text-center text-sm text-slate-800/75 px-2 py-1 uppercase 
        bg-white/75 rounded-lg">
            <span class="numrehearsal"><i class="fas fa-stopwatch">
            </i>
             ${this.data?.rehearsal_days}</span>
        </p>
        <p class="text-center text-sm text-slate-800/75 px-2 py-1 uppercase 
        bg-white/75 rounded-lg">
            <span class="meanrehear"><i class="fas fa-scale-balanced">
            </i>
             ${this.data?.meanRehear ?? 'n/a'}</span>
        </p>
        </div>
        <h2 class="leading-none tunetitle text-xl font-semibold text-center 
        mt-6 mb-1 text-slate-500">${this.data.prefered_name}</h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-sm text-center mb-2">${mytype} | ${this.data.tuneref.author}</p>
        <div class="flex gap-1 mt-auto justify-center">
            <button class="uppercase font-medium rehearsal bg-blue-500 px-3 
            py-1 rounded-md text-white text-bold hover:bg-blue-700" 
            title="añadir ensayo"><i class="fa fa-bolt mr-1"></i> 
            añadir ensayo</button>
            <button class="uppercase font-medium edittune bg-slate-400 px-3 py-1
            rounded-md text-white text-bold hover:bg-slate-700" 
            title="edicion rapida"><i class="fa fa-gear"></i></button>
            <button class="uppercase font-medium deletetune bg-red-500 px-3 py-1
             rounded-md text-white text-bold hover:bg-red-700" 
             title="borrar tema"><i class="fa fa-trash"></i></button>
        </div>
        </div>`;
  }

  /**
   * Generate list view of tune
   *
   * @return {string}
   */
  generatehtml_list() {
    return `<div id="tune${this.data.id}" class="tunelist w-full bg-white
     border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center">
            <img src="${this.data.preferred_img_url ??
              `https://picsum.photos/200/200?random=${this.data.id}`}" 
              alt="Imagen" class="rounded-full h-16 w-16 object-cover mr-3">
            ${this.data.tuneref.ABCsample ?
                `<p data-abc="${this.data.tuneref.ABCsample}" 
                data-state="stop" class="playabc text-slate-700/30 
                hover:text-slate-700/75">
                <i class="fa fa-circle-play fa-lg"></i><p>` : '' }
            <h2 class="tunetitle text-xl font-semibold mr-2">
            ${this.data.prefered_name}</h2>
            <p class="tunemodes text-blue-400 font-semibold mr-2">
            ${this.data.type}</p>
            <p class="tunealiases text-gray-500">${this.data.status}</p>
            <div class="flex gap-1 ml-auto items-center">
                <span class="numrehearsal bg-slate-500 text-white p-2
                 rounded-lg">
                ${this.data.rehearsal_days} ensayos</span>
                <span class="lastrehearsal">${this.data.last_rehearsals ?
                  'último hace ' +
                Utils.calctimesince(this.data.last_rehearsals[0]) + ' días' :
                'nunca'}</span>
                <button class="rehearsal bg-blue-400 p-1 rounded-md text-white 
                text-bold" title="añadir ensayo"><i class="fa fa-guitar 
                fa-fw fa-lg"></i></button>
                <button class="edittune bg-red-400 p-1 rounded-md text-white 
                text-bold" title="editar tema"><i class="fa fa-gear fa-fw 
                fa-lg"></i></button>
                <button class="deletetune bg-red-400 p-1 rounded-md text-white 
                text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw 
                fa-lg"></i></button>
            </div>
        </div>`;
  }

  /**
   * Add to rehearsal count of this tune
   *
   * @param {event} event
   */
  async addrehearsal(event) {
    event.stopPropagation();
    // get a backup of tune in case of back error
    const backup = JSON.parse(JSON.stringify(this.data));

    // añadir fecha ensayo
    if (!Array.isArray(this.data.last_rehearsals)) {
      this.data.last_rehearsals = [];
    }
    this.data.last_rehearsals.unshift(Utils.dateformat());
    if (this.data.last_rehearsals.length > 5) {
      this.data.last_rehearsals.slice(0, 5);
    }

    // sumar nuevo ensayo
    this.data.rehearsal_days++;

    const result = await apis.Xanoapi.edittunebooktune(this.data.id, this.data);

    if (result) {
      this.calculateValues();
      new Mynotification('success',
      `añadido nuevo ensayo de ${this.data.prefered_name}.`);
      const tunebook = Controller.getinstance('Tunebook');
      tunebook.rendertunes(tunebook.filtered);
    } else {
      this.data = backup;
      new Mynotification('error', `error al guardar el ensayo.`);
    }
  }

  /**
   * show detail tune component
   */
  viewdetails() {
    // Controller.tuneedit = new Tuneedit('tuneedit',
    // Controller.htmlelement, this.data);
  }

  /**
   * show quickedit component
   */
  quickedit() {
    const mytunebook = Controller.getinstance('Tunebook');
    mytunebook.subelements.push(new Tuneaddtobook(
        'modaltuneedit', mytunebook.element, this.data.id, 'edit'));
  }

  /**
   * Delete the tune from data and remove html element
   */
  async deletetune() {
    const result = await apis.Xanoapi.deletetunebooktune(this.data.id);
    if (result) {
      const mytuneindex = Data.tunes.findIndex(
          (tune) => tune.id == this.data.id);
      Data.tunes.splice(mytuneindex, 1);
      Utils.removeInstanceRef(this.name, 'Tunebook', 'tune_instances');
      new Mynotification('success',
          `eliminando ${this.data.prefered_name} del repertorio.`);
      this.remove();
    } else {
      new Mynotification('error', `no se ha podido eliminar el tema.`);
    }
  }
}
