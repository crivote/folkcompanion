import { Component } from '../common/abstract.js';
import { Controller } from '../common/startup.js';
import { ABCplayer } from '../common/abcplayer.js';
import { Utils } from '../common/utils.js';
import { Data } from '../common/data.js';
import { Tunemanageredit } from './tunemanager_edittune.js';
import { Xanoapi } from '../common/apis.js';
import { Tunemanager } from './tunemanager.js';

/**
 * class for single tune in manager
 */
export class Tuneformanager extends Component {
  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   * @param {string} id
   */
  constructor(name, parentel, id) {
    super(name, parentel);
    this.id = id;
    this.data = Data.tunes.find((item) => item.id === id);
    this.setup();
  }

  /**
   * initial Setup
   */
  setup() {
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * Add listeners to html after render
   */
  addListeners() {
    if (this.data.ABCsample) {
      this.element
        .querySelector('.playabc')
        .addEventListener('click', ABCplayer.manageabc);
    }
    this.element
      .querySelector('.edittune')
      .addEventListener('click', this.edittune.bind(this));
    this.element
      .querySelector('.deletetune')
      .addEventListener('click', this.deletetune.bind(this));
  }

  generatehtml() {
    const links = Utils.generatelinks(this.data?.References);
    return `<div id="tune${this.data.id}" class="tunelist w-full bg-white border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-3">
            <span class="rounded-full w-8 h-8 text-center bg-slate-300 text-white text-xl font-light uppercase">${
              this.data.ABCsample
                ? `<i data-abc="${this.data.ABCsample}" data-state="stop" class="playabc fa fa-circle-play fa-lg"></i>`
                : this.data.main_name.substr(0, 1)
            }</span>
            <span class="bg-slate-200 rounded-md text-xs p-1 w-16 shrink-0"><i class="fa fa-star fa-lg mr-1 text-yellow-600"></i>${this.data.popularity ?? 0}</span>
            <h2 class="tunetitle text-xl font-semibold mr-2">${this.data.main_name}</h2>
            ${this.data?.other_names ? `<span class="bg-blue-400 text-white rounded-md text-xs p-1" title="${this.data.other_names.join(' / ')}">${this.data.other_names.length}</span>` : ''}
            <p class="tunemodes text-blue-400 font-semibold mr-2">${this.data.type}</p>
            <p class="tunealiases text-gray-500">${this.data.author}</p>
            <p class="text-gray-500">${this.data?.tradition ? this.data?.tradition.join(' · ') : ''}</p>
            <div class="flex gap-2 ml-auto items-center">
                ${links.join(' ')}
                <span>${this.checkcontent(this.data.Modes_played, 'tonalidades')}</span>
                <span>${this.checkcontent(this.data.first_reference, 'historia')}</span>
                <span>${this.checkcontent(this.data.media_links, 'videos')}</span>
            </div>
            <div class="flex gap-1 ml-3 items-center">
                <button class="edittune bg-slate-400 p-1 rounded-md text-white text-bold" title="editar tema"><i class="fa fa-pencil fa-fw fa-lg"></i></button>
                <button class="deletetune bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw fa-lg"></i></button>
            </div>
        </div>`;
  }

  checkcontent(data, tag) {
    if (data && Array.isArray(data) && data.length > 0 && data[0] != null) {
      return `<i title="${tag}" class="text-green-500 fa fa-check-circle"></i>`;
    } else {
      return `<i title="${tag}" class="text-red-500 fa fa-times-circle"></i>`;
    }
  }

  /**
   * open tune editor component
   */
  edittune() {
    if (Controller.activeScreen instanceof Tunemanager)
      Controller.activeScreen.subelement = new Tunemanageredit(
        'tunemanageredit',
        Controller.htmlelement,
        this.data
      );
  }

  /**
   * delete tune from database
   */
  async deletetune() {
    const result = await Xanoapi.deletetune(this.data.id);
    if (result) {
      delete Data.tunes[this.data.id];
      const manager = Controller.getinstance('Tunemanager');
      const mytuneindex = manager.tunes.findIndex(
        (tune) => tune.id == this.data.id
      );
      manager.tunes.splice(mytuneindex, 1);
      const mytuneobject = manager.items.findIndex(
        (tune) => tune.name == 'tune' + this.data.id
      );
      manager.items.splice(mytuneobject, 1);
      this.remove();
    }
  }
}
