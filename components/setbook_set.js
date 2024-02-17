import {Component} from '../abstract.js';
import {Data} from '../startup.js';

/**
 * Set for setbook component
 */
export class Set extends Component {
/**
 * Constructor
 *
 * @param {string} name
 * @param {HTMLBodyElement} parentel
 * @param {number} id
 */
  constructor(name, parentel, id) {
    super(name, parentel);
    this.id = id;
    this.data = Data.setbook.find((item) => item.id === this.id);
    this.setup();
  }

  /**
   * genera el componente
   */
  setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * generar html componente
   *
   * @return {string}
   */
  generatehtml() {
    const tunes = '';
    this.data.tunes.forEach((tune) => {
      const mytune = Data.tunebook.find((item) => item.id === tune.tunebook_id);
      tunes += `
      <div class="border border-slate-300 m-4 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img class="mr-2 h-10 w-10 rounded-full object-cover" 
            src="${mytune.preferred_img_url}">
            <div>
              <h3 class="text-base font-semibold text-gray-900">
              ${mytune.preferred_name}</h3>
              <span class="block text-xs font-normal text-gray-500">
              ${tune.notes}</span>
            </div>
          </div>
          <p class="text-sm font-medium text-slate-500">
          ${mytune.tuneref.type} ${mytune.preferred_tone}</p>
        </div>
      </div>`;
    });

    return `<div class="group transition w-full my-3 p-6 rounded-lg shadow-lg 
    shadow-gray-300 bg-white/75 hover:bg-white relative" 
    data-id="${this.data.id}">
      <div class="absolute right-6 top-6 flex gap-1 mt-auto justify-end 
      opacity-0 transition duration-300 group-hover:opacity-100 scale-0 
      group-hover:scale-100">
        <button class="uppercase font-medium addrehearsal bg-blue-500 px-3 
        py-1 rounded-md text-white text-bold hover:bg-blue-700" 
        title="añadir ensayo"><i class="fa fa-bolt mr-1"></i></button>
        <button class="uppercase font-medium editset bg-slate-400 px-3 py-1
        rounded-md text-white text-bold hover:bg-slate-700" 
        title="edicion"><i class="fa fa-gear"></i></button>
        <button class="uppercase font-medium deleteset bg-red-500 px-3 py-1
          rounded-md text-white text-bold hover:bg-red-700" 
          title="borrar tema"><i class="fa fa-trash"></i></button>
        </div>
      <h3 class="font-medium text-lg">
      <strong>#${this.data.id}</strong> ${this.data.title}
      <span class="font-normal text-sm text-slate-500">
      ${this.data.created_at}</span>
      </h3>
      <p class="text-sm font-light text-slate-500">${this.data.notes}</p>
      <div class="items flex flex-col">
      ${tunes}
      </div>
    </div>`;
  }

  /**
   * Add listeners to the html component
   */
  addlisteners() {
    this.element.querySelector('.rehearsal')
        .addEventListener('click', this.addrehearsal.bind(this));
    this.element.querySelector('.editset')
        .addEventListener('click', this.editset.bind(this));
    this.element.querySelector('.deleteset')
        .addEventListener('click', this.deleteset.bind(this));
  }

  /**
   * Add listeners to the html component
   */
  addrehearsal() {
  }

  /**
   * Add listeners to the html component
   */
  editset() {
  }

  /**
 * Add listeners to the html component
 */
  deleteset() {
  }
}
