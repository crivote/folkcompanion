import { Component } from "../abstract.js";
import { Controller } from "../startup.js";

export class Setbook extends Component {
   
    contentzone = null;
    format = 'card';
    setbook = [];

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    setup() {

    }

    rendersets(list) {
        this.contentzone.innerHTML = '';
        this.element.querySelector('#num_of_tunes').innerHTML = list.length + ' temas';
        this.items = list.map((item) => {
            return new Setitem('tune' + item.id, this.contentzone, item, this.format);
        });
    }

    generatehtml() {
        return `<section id="${this.name}">
        <header class="flex p-6"><h3 class="text-4xl">Mis sets <span id="num_of_sets" class="bg-slate-400 text-white p4 rounded-lg text-md">${this.setbook.length} sets</span></h3>
        <span id="addnewset"><i class="fa fa-plus-circle fa-2x"></i></span>
        <div class="ml-auto flex">
        <div class="flex gap-2 border border-slate-400 rounded-md p-2">
            <span class="viewselector selected bg-slate-500 text-white" data-format="card"><i class="fa fa-grip fa-lg"></i></span>
            <span class="viewselector" data-format="list"><i class="fa fa-list fa-lg fa-fw"></i></span>
        </div>
        <select id="typetune_search"><option value="">Tipo</option><option> ${this.typeslist.join('</option><option>')}</option></select>
        </header>
        <main class="flex p-6 flex-wrap ${this.format == "card" ? 'gap-3' : ''}"></main>
        </section>`;
    }

}
