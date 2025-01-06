import { Component } from '../../abstract.js';
import { Controller } from '../../../controller/startup.js';
import { Data } from '../../../data/data.js';
import { Tunebook } from '../../main/tunebook.js';

/**
 * Componente adicion y edicion sets
 *
 *  @class
 **/
export class Setbooknewset extends Component {
  contentzone;
  parent;
  set;

  /**
   * Crea una instancia del componente Setbooknewset.
   *
   * @param {string} name - El nombre del componente.
   * @param {HTMLBodyElement} parentel - El elemento HTML padre donde se adjuntará este componente.
   * @param {typeof Tunebook} parent - La clase padre de tipo Tunebook, que gestiona el conjunto de tunes.
   * @param {number} [setid=0] - El ID del set a editar. Si es 0, se crea un nuevo set.
   */
  constructor(name, parentel, parent, setid = 0) {
    super(name, parentel);
    this.parent = parent;
    this.isNew = setid === 0;
    if (!this.isNew) {
      this.set = Data.setbook.find((set) => set.id === setid);
      this.tunes = this.set.tunes;
    }
    this.setup();
  }

  setup() {
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.contentzone = this.element.querySelector('main');
    this.addListeners();
  }

  rendersets(list) {
    this.contentzone.innerHTML = '';
    this.element.querySelector('#num_of_tunes').innerHTML =
      list.length + ' temas';
    this.items = list.map((item) => {
      return new Setitem('tune' + item.id, this.contentzone, item, this.format);
    });
  }

  generatehtml() {
    return `
     <div id="modalvideoadd" class="fixed inset-0 bg-gray-500 bg-opacity-75 
    flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-lg w-auto relative
      max-h-full overflow-scroll">
        <p id="closeaddvideo" class="absolute right-4 top-4 text-red-400 
        text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
        <h2 class="text-2xl text-blue-400 font-semibold mb-3">
        ${this.isNew ? `Añadir nuevo video` : `Editar video`}</h2>
        </h2>

        <div class="flex justify-center gap-3">
            <label class="uppercase text-slate-400 text-sm mt-4">
            Youtube video URL (ID)</label>
            <input class="getVideoKey" type="text" 
            placeholder="paste a youtube URL" 
            value="${this.isNew ? '' : this.video.url}">
        </div>

        <main class="mt-3 grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          <section id="form" class="xl:col-span-2">
            <div class="flex flex-col gap-2">
  ${Utils.generateformfield(
    'titulo',
    'titulo del vídeo',
    this.isNew ? '' : this.video.Title,
    null,
    true
  )}
  ${Utils.generateformfield(
    'artista',
    'artista',
    this.isNew ? '' : this.video.Performer,
    null,
    true
  )}
  ${Utils.generateformfield(
    'type',
    'Categoría de vídeo',
    this.isNew ? '' : this.video.type,
    Data.videotypes
  )}
              <div class="flex flex-col border-2 p-4 border-slate-100 
              bg-slate-50 rounded-md mb-4">
                <label class="uppercase text-slate-400 text-sm">
                Notas</label>   
                <textarea 
                name="notes">${this.isNew ? '' : this.video.notes}</textarea>
              </div>        
          <section class="tunesaddition ${this.isNew ? 'hidden' : ''}
          bg-slate-100 border 
              border-slate-300 p-4">
          <div id="datatuneadd" class="flex gap-3 tunecontainer">
              <datalist id="alltunes">
                ${this.isNew ? '' : this.getfulllistoftunes()}
              </datalist>
              <input list="alltunes" class="tuneselector p-1 txt-sm mx-auto" 
              name="tuneselector" placeholder="añadir un tema">
          </div>   
          <ul class="listoftunes mt-2"></ul>    
        </section>
      </div>
      </section>
          <section id="videocontainer" class="xl:col-span-3">
          </section>
          </main>
      <div class="flex items-center justify-center mt-6">
        <button disabled class="sendbutton px-4 py-3 rounded-md bg-blue-500 
        text-white text-md font-bold uppercase mr-4">Guardar video</button>
      </div>
    <div>
  </div>`;
  }
}
