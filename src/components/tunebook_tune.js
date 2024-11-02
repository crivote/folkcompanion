import { Component } from '../common/abstract.js';
import { Mynotification } from './notification.js';
import { Controller } from '../common/startup.js';
import { ABCplayer } from '../common/abcplayer.js';
import { Utils } from '../common/Utils.js';
import { Data } from '../common/data.js';
import * as apis from '../common/apis.js';
import { Tuneaddtobook } from './tunebook_newtune.js';

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
      this.replace(mycontent);
    } else {
      this.attachAt(mycontent, false);
    }
    this.addlisteners();
  }

  /**
   * Add listeners to the html component
   */
  addlisteners() {
    this.element
      .querySelector('.rehearsal')
      .addEventListener('click', this.addrehearsal.bind(this));
    this.element
      .querySelector('.deletetune')
      .addEventListener('click', this.deletetune.bind(this));
    this.element
      .querySelector('.edittune')
      .addEventListener('click', this.quickedit.bind(this));
    this.element.addEventListener('click', this.viewdetails.bind(this));
    if (this.data.tuneref.ABCsample) {
      this.element
        .querySelector('.playabc')
        .addEventListener('click', ABCplayer.manageabc);
    }
  }

  /**
   * generate html for card view
   *
   * @return {string}
   */
  generatehtml_card() {
    const mystatus = Utils.getstatus(this.data.status_num);
    const links = Utils.generatelinks(this.data.tuneref?.References);
    return `<div id="tune${this.data.id}" class="group cursor-pointer flex 
    flex-col border-t-8 border-${mystatus.color} relative tunecard 
    bg-white shadow-md rounded-md p-6 transition duration-300 ease-in-out 
    hover:shadow-lg hover:scale-110 hover:z-40">
        <div class="tuneimg flex h-52 -mt-6 -mx-6 bg-center bg-cover 
        bg-[url('${
          this.data.preferred_img_url ??
          `https://picsum.photos/200/200?random=${this.data.id}`
        }')]">
        ${
          this.data.tuneref.ABCsample
            ? `<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
             class="opacity-0 transition group-hover:opacity-100 playabc
             text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
            <i class=" m-auto fa fa-circle-play fa-5x"></i><span>`
            : ''
        }
        </div>
        <span class="px-2 py-1 rounded-md text-sm absolute top-4 left-3 
        uppercase text-slate-700/75 font-bold bg-${mystatus.color}/75" >
         ${mystatus.label}</span>
         ${
           this.data.prefered_tone
             ? `<div class="absolute right-3 top-4 px-2 py-1 bg-slate-800/70 
        text-white/90 rounded-lg text-sm" title="Tonalidad">
            <span class="group/item ml-1 font-medium uppercase">
            ${this.data.prefered_tone.substring(0, 5)}
            <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl z-40" src="./img/${Utils.removeWhiteSpaces(
          this.data.prefered_tone.substring(0, 5)
        )}.png">
           </span>
        </div>`
             : ''
         }

        ${
          this.data.notes.trim()
            ? `<div class="absolute right-3 top-40 mt-2">
        <i class="fa-solid fa-2x fa-note-sticky text-yellow-300/75 
        shadow-lg"></i>
        <span class="absolute hidden group-hover:block -right-8 bottom-10 
        w-40 shadow-xl rounded-md text-xs p-2 bg-yellow-200 text-slate-500 
        z-40">
        ${this.data.notes}</span>
        </div>`
            : ''
        }
        <div class="flex gap-2 items-center justify-center -mt-8 rounded-md
        w-fit mx-auto px-2 bg-white/50 group-hover:bg-white/85 shadow-lg">
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <i class="opacity-75 fas fa-stopwatch">
            </i> <span class="lastrehearsal ml-1">
            ${Utils.calctimesince(this.data?.last_rehearsals[0])}</span>
        </p>
        <p class="text-center text-xs text-slate-800/75 px-2 py-1 uppercase">
            <span class="numrehearsal"><i class="opacity-75 
            fas fa-calendar-check">
            </i> ${this.data?.rehearsal_days}</span>
        </p>
          </div>
        <h2 class="leading-none tunetitle text-xl font-medium text-center 
        mt-5 mb-2 text-blue-900">${this.data.prefered_name}
        <span>${links.join('')}</span></h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs text-center mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.data.tuneref.type}</span>${this.data.tuneref.author}</p>
        <div class="mytags text-xs flex flex-wrap gap-1 justify-center">
        ${this.generatetags()}
        </div>
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
   * @return {string}
   */
  generatetags() {
    let taghtml = '';
    if (Array.isArray(this.data.tags) && this.data.tags.length > 0) {
      this.data.tags.forEach((tag) => {
        taghtml += `<span class="bg-yellow-100 text-slate-600/75 p-2
        uppercase">${tag}</span>`;
      });
    }
    return taghtml;
  }

  /**
   * Generate list view of tune
   *
   * @return {string}
   */
  generatehtml_list() {
    const mystatus = Utils.getstatus(this.data.status_num);
    return `<div id="tune${this.data.id}" class="tunelist group w-full bg-white
     border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
      <div class="tuneimg flex h-20 w-20 bg-center bg-cover mr-3
      bg-[url('${
        this.data.preferred_img_url ??
        `https://picsum.photos/200/200?random=${this.data.id}`
      }')]">
      ${
        this.data.tuneref.ABCsample
          ? `<span data-abc="${this.data.tuneref.ABCsample}" data-state="stop"
            class="opacity-0 transition group-hover:opacity-100 playabc
            text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
          <i class="m-auto fa fa-circle-play fa-3x"></i><span>`
          : ''
      }
      </div>
      <div class="w-20 text-center border border-slate-200 p-1 rounded-md">
        <p class="numrehearsal bg-slate-500 text-white font-medium px-2
        rounded-lg"> ${this.data.rehearsal_days} 
        <i class="opacity-75 fas fa-calendar-check"></i></p>
      <p class="lastrehearsal text-xs text-slate-400 uppercase mt-1">
      ${Utils.calctimesince(this.data?.last_rehearsals[0])}</p>
      </div>
      <div>
        <p class="px-2 py-1 w-32 text-center rounded-md text-xs 
        top-4 left-3 uppercase text-slate-700/75 font-bold
        bg-${mystatus.color}/75">${mystatus.label}</p>            
        <h2 class="tunetitle text-xl font-semibold mr-2">
        ${this.data.prefered_name} 
        <span class="group/item ml-1 text-sm bg-slate-200 rounded-md p-1 px-2 
        font-medium
        uppercase text-slate-500">${this.data.prefered_tone.substring(0, 5)}
        <img class="group-hover/item:visible invisible w-42 fixed inset-0 
        h-auto m-auto border border-slate-400 p-4 bg-white/90 rounded-lg 
        shadow-2xl" src="./img/${Utils.removeWhiteSpaces(
          this.data.prefered_tone.substring(0, 5)
        )}.png">
        </span>
        </h2>
        <p class="tuneadditionaldata text-slate-400 font-regular uppercase 
        text-xs mb-2"><span class="font-medium mr-1 text-slate-500">
        ${this.data.tuneref.type}</span>${this.data.tuneref.author}</p>
      </div>
      <div class="flex gap-1 ml-auto items-center">
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
    const result = Controller.addrehearsal(this.data.id);
    if (result) {
      const tunebook = Controller.activeScreen;
      tunebook.rendertunes(tunebook.filtered);
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
    const mytunebook = Controller.activeScreen;
    mytunebook.subelements.push(
      new Tuneaddtobook(
        'modaltuneedit',
        mytunebook.element,
        this.data.id,
        'edit'
      )
    );
  }

  /**
   * Delete the tune from data and remove html element
   */
  async deletetune() {
    // TODO revisar setbook por si hay algun set con el tune borrado.
    const result = await apis.Xanoapi.deletetunebooktune(this.data.id);
    if (result) {
      const mytuneindex = Data.tunebook.findIndex(
        (tune) => tune.id == this.data.id
      );
      Data.tunebook.splice(mytuneindex, 1);
      new Mynotification(
        'success',
        `eliminado el tema ${this.data.prefered_name} del repertorio.`
      );
      const tunebook = Controller.activeScreen;
      tunebook.rendertunes(tunebook.filtered);
    } else {
      new Mynotification('danger', `no se ha podido eliminar el tema.`);
    }
  }
}
