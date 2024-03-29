import {Component} from '../abstract.js';
import {Controller, Data, Utils} from '../startup.js';
import * as apis from '../apis.js';

/** Class for editor for tunes of tunebook */
export class Tunebasicedit extends Component {
  // tune data
  tune;
  // array of pics for
  pics;

  constructor(name, parentel, id) {
    super(name, parentel);
    this.tune = Data.tunebook.find((item) => item.id === id);
    this.tune.tunekeys = this.tune.tuneref?.Modes_played.map(
        (mode) => `${Data.tones[mode.Key]} ${mode.Mode.substring(0, 3)}`);
    this.setup();
  }

  /**
   * Generate html for component
   *
   * @return {string}
   */
  generatehtml() {
    const nameslist = this.tune.tuneref?.other_names;


    return `<div id="modaledittune" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-1/2 lg:w-1/3 relative">
                <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-blue-400 font-semibold mb-6">Editar tema</h2>
                <form id="loginform">
                    <div class="flex items-center justify-center -mb-4 gap-4">
                        <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                            <p>${this.tune.tuneref.type} (${this.tune.time})</p>
                            <p>${this.tune.tuneref.compasses} compases</p>
                            <p>${this.tune.tuneref.Estructure}</p>
                        </div>
                        <div class="relative">
                            <img class="picphoto rounded-full h-48 w-48 border-8 border-slate-200 object-cover object-center" src="${this.pics[0]}">
                            <span class="searchphoto absolute top-2 right-2 bg-slate-600 rounded-full w-8 h-8 text-center p-1">
                                <i class="fa fa-search fa-lg"></i><input class="searchpics hidden" type="text">
                            </span>
                        </div>
                        <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                            <p>${this.tune.tuneref.author}</p>
                            <p>${this.tune.tuneref?.tradition.join(' · ') ?? ''}</p>
                        </div>
                    </div>
                    ${Utils.generateformfield('titulo', 'titulo favorito', this.tune.prefered_name ?? this.tune.tuneref.main_name, nameslist)}
                    ${Utils.generateformfield('tonalidad', 'tonalidad preferida', this.tune.prefered_tone ?? this.tune.tunekeys[0], this.tune.tunekeys)}
                    ${Utils.generateformfield('status', 'status de ejecución', this.tune.status, Data.status.map((status) => status.label))}
                    <div class="flex items-center justify-center border-b border-slate-200 h-0 my-6">
                        <span class="shownext text-blue-500 border-4 border-white"><i class="fa fa-plus-circle fa-lg"></i></span>
                    </div>
                    <div class="hidden flex justify-between border-2 p-4 border-slate-100 bg-slate-50 rounded-md mb-4 gap-3">
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">aprendido</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase" type="date" name="date" value="${this.tune.learned_date}">
                        </div>
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">ensayos</label>
                            <input class="w-28 font-semibold border-0 text-blue-400 bg-blue-200 rounded-md" type="number" value="${this.tune.rehearsal_days}" min="0" name="rehearsals">
                        </div>
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">Último</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase"type="date" name="lastrehearsal" value="${this.tune?.last_rehearsals[0] ?? ''}">
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <button class="px-4 py-3 rounded-md bg-blue-500 text-white text-md font-bold uppercase mr-4" type="submit">guardar cambios</button>
                    </div>
                </form>
            <div>
        </div>`;
  }


  addListeners() {
    // close window
    this.element.querySelector('#closeaddtunebook').addEventListener('click', this.remove.bind(this));
    // change selected image
    this.element.querySelector('.picphoto').addEventListener('click', this.changeimage.bind(this));
    // show select control to change value
    this.element.querySelectorAll('.edit-toggle')
        .forEach((el) => el.addEventListener('click', this.showeditselect.bind(this)));
    // toggle show additional controls
    this.element.querySelectorAll('.shownext')
        .forEach((el) => el.addEventListener('click', this.shownextel.bind(this)));
    // change value of select field
    this.element.querySelectorAll('.edit-select')
        .forEach((el) => el.addEventListener('change', this.changeselectvalue.bind(this)));
    // add tune
    this.element.querySelector('form').addEventListener('submit', this.savetune.bind(this));
    // show input to search
    this.element.querySelector('.searchphoto').addEventListener('click', this.showinputforpicsearch.bind(this));
    // search pics
    this.element.querySelector('.searchpics').addEventListener('change', this.searchpics.bind(this));
  }

  setup() {
    // add the current img
    this.pics = Data.genericpics;
    if (this.data?.preferred_img_url) {
      this.pics.unshift(this.data.preferred_img_url);
    }

    this.attachAt(this.generatehtml(), false);
  }

  showinputforpicsearch() {
    this.element.querySelector('.searchpics').classList.remove('hidden');
  }

  async searchpics(event) {
    event.currentTarget.classList.add('hidden');
    const searchstring = event.currentTarget.value;
    if (searchstring.length > 3) {
      this.pics = await apis.Pexels.search(searchstring, 10);
    }
  }

  async savetune(event) {
    event.preventDefault();
    const params = {
      preferred_img_url: this.element.querySelector('.picphoto').src,
      prefered_name: this.element.querySelector('h4.datatitulo').textContent,
      prefered_tone: this.element.querySelector('h4.datatonalidad').textContent,
      learned_date: this.element.querySelector('input[name="date"]').value,
      status: this.element.querySelector('h4.datastatus').textContent,
      rehearsal_days: this.element.querySelector('input[name="rehearsals"]').value,
      last_rehearsals: Array.isArray(this.data.last_rehearsals) ? [this.element.querySelector('input[name="lastrehearsal"]').value, ...this.data.last_rehearsals] : [this.element.querySelector('input[name="lastrehearsal"]').value],
    };
    try {
      const result = await apis.Xanoapi.edittunebooktune(this.data.id, params);
      if (result) {
        this.remove();
        result._tunes = this.tune;
        let mitune = Controller.screens.Tunebook.tunebook.find( (tune) => tune.id == this.data.id);
        mitune = result;
        Controller.updatetunebook(Controller.screens.Tunebook.tunebook);
        Controller.screens.Tunebook.rendertunes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeimage(event) {
    const el = event.currentTarget;
    if (this.pics[0] === el.src) {
      this.pics.shift();
    }
    this.pics.push(el.src);
    el.src = this.pics.shift();
  }

  shownextel(event) {
    const el = event.currentTarget;
    const target = el.parentElement.nextElementSibling;
    const icon = el.querySelector('i');
    if (icon.classList.contains('fa-plus-circle')) {
      icon.classList.replace('fa-plus-circle', 'fa-circle-minus');
      target.classList.remove('hidden');
    } else {
      icon.classList.replace('fa-circle-minus', 'fa-plus-circle');
      target.classList.add('hidden');
    }
  }

  showeditselect(event) {
    const el = event.currentTarget;
    const select = el.nextElementSibling;
    el.classList.add('hidden');
    select.classList.remove('hidden');
    select.click();
  }

  changeselectvalue(event) {
    const el = event.currentTarget;
    const editbutton = el.previousElementSibling;
    const textel = el.parentElement.previousElementSibling.querySelector('h4');
    // esconder select tras cambio valor y mostrar icono edicion
    el.classList.add('hidden');
    editbutton.classList.remove('hidden');
    textel.textContent = el.value;
  }
}
