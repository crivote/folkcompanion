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
    const mycontent = this['generatehtml_' + this.format]();
    if (this.element) {
      this.element.outerHTML = mycontent;
    } else {
      this.attachAt(mycontent, false);
    }
    this.addlisteners();
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

    return `<div id="tune${this.data.id}" class="group cursor-pointer flex 
    flex-col border-t-8 border-${mystatus.color} relative tunecard shrink-0 
    xl-2:basis-1/5 xl:basis-1/4 lg:basis-1/3 md:basic-1/2 bg-white shadow-md 
    rounded-md p-6 transition duration-300 ease-in-out hover:shadow-lg 
    hover:scale-110">
        <div class="tuneimg flex h-52 -mt-6 -mx-6 bg-center bg-cover 
        bg-[url('${this.data.preferred_img_url ??
          `https://picsum.photos/200/200?random=${this.data.id}`}')]">
        ${this.data.tuneref.ABCsample ?
            `<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
             class="opacity-0 transition group-hover:opacity-100 playabc
             text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
            <i class=" m-auto fa fa-circle-play fa-5x"></i><span>` : '' }
        </div>
        <span class="px-2 py-1 rounded-md text-xs absolute top-4 left-3 
        uppercase text-slate-700/75 font-bold bg-${mystatus.color}/75" >
         ${mystatus.label}</span>
         ${this.data.prefered_tone ?
        `<div class="absolute right-3 top-4 px-2 py-1 bg-blue-800/50 
        text-white/90 rounded-lg text-xs" title="Tonalidad">
            <span class="ml-1 font-medium uppercase">
            ${this.data.prefered_tone.substring(0, 5)}
           </span>
        </div>`: ''}
        <div class="flex gap-2 items-center justify-center -mt-8 rounded-md
        w-fit mx-auto px-2 bg-white/35 group-hover:bg-white/85">
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <i class="opacity-75 fas fa-calendar-check">
            </i> <span class="lastrehearsal ml-1">
            ${this.data?.dayssincelastrehear ?
              this.data.dayssincelastrehear + 'd' :
              'nunca'}</span>
        </p>
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <span class="numrehearsal"><i class="opacity-75 fas fa-stopwatch">
            </i> ${this.data?.rehearsal_days}</span>
        </p>
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <span class="meanrehear">
            <i class="opacity-75 fas fa-scale-balanced"></i> 
            ${this.data?.meanRehear ? this.data.meanRehear + 'd' : 'n/a'}
            </span>
        </p>
        </div>
        <h2 class="leading-none tunetitle text-xl font-medium text-center 
        mt-5 mb-2 text-blue-900">${this.data.prefered_name}</h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs text-center mb-2"><span class="font-medium mr-1 text-slate-500">
        ${mytype}</span>${this.data.tuneref.author}</p>
        <div class="flex gap-1 mt-auto justify-center opacity-0 
        transition-opacity duration-300 group-hover:opacity-100
        scale-0 group-hover:scale-100">
            <button class="uppercase font-medium rehearsal bg-blue-500 px-3 
            py-1 rounded-md text-white text-bold hover:bg-blue-700" 
            title="añadir ensayo"><i class="fa fa-bolt mr-1"></i></button>
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
    const mystatus = this.getstatus(this.data.status);
    return `<div id="tune${this.data.id}" class="tunelist w-full bg-white
     border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-3">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${this.data.preferred_img_url ??
        `https://picsum.photos/200/200?random=${this.data.id}`}')]">
      ${this.data.tuneref.ABCsample ?
          `<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play"></i><span>` : '' }
      </div>
      <div>
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${this.data.prefered_name}</h2>
        <p class="tunemodes text-blue-400 font-semibold mr-2">
        ${this.data.type}</p>
      </div>
        <span class="px-2 py-1 w-20 text-center rounded-md text-xs absolute 
        top-4 left-3 uppercase text-slate-700/75 font-bold
        bg-${mystatus.color}/75">${mystatus.label}</span>            
         <div class="flex gap-1 ml-auto items-center">
                <span class="numrehearsal bg-slate-500 text-white p-2
                 rounded-lg"> ${this.data.rehearsal_days}</span>
                <span class="lastrehearsal">${this.data.last_rehearsals ?
                Utils.calctimesince(this.data.last_rehearsals[0]) + ' d' :
                'n/a'}</span>
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
    const now = new Date();
    this.data.last_rehearsalDate = now.valueOf();
    this.data.last_rehearsals.unshift(now.valueOf());
    if (this.data.last_rehearsals.length > 10) {
      this.data.last_rehearsals.slice(0, 10);
    }

    // sumar nuevo ensayo
    this.data.rehearsal_days++;

    const result = await apis.Xanoapi.edittunebooktune(this.data.id, this.data);

    if (result) {
      this.data = Utils.calcValueforTunes(this.data);
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
    // TODO revisar setbook por si hay algun set con el tune borrado.
    const result = await apis.Xanoapi.deletetunebooktune(this.data.id);
    if (result) {
      const mytuneindex = Data.tunebook.findIndex(
          (tune) => tune.id == this.data.id);
      Data.tunebook.splice(mytuneindex, 1);
      new Mynotification('success',
          `eliminado el tema ${this.data.prefered_name} del repertorio.`);
      const tunebook = Controller.getinstance('Tunebook');
      tunebook.rendertunes(tunebook.filtered);
    } else {
      new Mynotification('error', `no se ha podido eliminar el tema.`);
    }
  }
}
