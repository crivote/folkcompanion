import { Component } from '../common/abstract.js';
import { Controller } from '../startup.js';
import { Data } from '../common/Data.js';

export class Setbooknewset extends Component {
  contentzone = null;
  setbook = [];
  contentzone;

  constructor(name, parentel) {
    super(name, parentel);
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
    return `<section id="${this.name}">
        <header class="flex p-6"><h3 class="text-4xl">Mis sets <span id="num_of_sets" class="bg-slate-400 text-white p4 rounded-lg text-md">${this.setbook.length} sets</span></h3>
        <span id="addnewset"><i class="fa fa-plus-circle fa-2x"></i></span>
        </header>
        <main class="flex p-6 flex-wrap"></main>
        </section>`;
  }
}
