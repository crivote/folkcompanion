import { Component } from "../abstract.js";
import { Controller, Data } from "../startup.js";
import { Tunesearch } from "./tunesearch.js";
import { Tune } from "./tune.js";

export class Tunebook extends Component {
    filtered = [];

    // instancias en DOM de las card tunes
    items = [];

    typeslist = [];
    statuslist = [];
    contentzone = null;
    format = 'card';

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    addListeners() {
        this.element.querySelector('#tunebook_search')
            .addEventListener('input', this.filter.bind(this));
        this.element.querySelector('#typetune_search')
            .addEventListener('change', this.typefilter.bind(this));
        this.element.querySelector('#statustune_search')
            .addEventListener('change', this.typefilter.bind(this));
        this.element.querySelector('#addnewtune')
            .addEventListener('click', this.launchsearch.bind(this));
        this.element.querySelectorAll('.viewselector')
            .forEach(
                el => el.addEventListener('click', this.changeview.bind(this))
            );
    }

    async setup() {
        const typeslist = Data.tunebook.map(tune => tune.tuneref.Type);
        this.typeslist = [...new Set(typeslist)];
        const statuslist = Data.tunebook.map(tune => tune.status);
        this.statuslist = [...new Set(statuslist)];
        this.filtered = Data.tunebook;

        // generate HTML
        this.attachAt(this.generatehtml(), false);
        this.contentzone = this.element.querySelector('main');
        this.addListeners();
        this.rendertunes();
    }

    rendertunes(list = Data.tunebook) {
        this.contentzone.innerHTML = '';
        this.element.querySelector('#num_of_tunes').innerHTML = list.length + ' temas';
        this.items = list.map((item, index) => {
            return new Tune('tune' + item.id, this.contentzone, index, this.format);
        });
    }

    generatehtml() {
        return `<section id="${this.name}">
        <header class="flex p-6"><h3 class="text-4xl">Mi repertorio <span id="num_of_tunes" class="bg-slate-400 text-white p4 rounded-lg text-md">${Data.tunebook.length} temas</span></h3>
        <span id="addnewtune"><i class="fa fa-plus-circle fa-2x"></i></span>
        <div class="ml-auto flex">
        <div class="flex gap-2 border border-slate-400 rounded-md p-2">
            <span class="viewselector selected bg-slate-500 text-white" data-format="card"><i class="fa fa-grip fa-lg"></i></span>
            <span class="viewselector" data-format="list"><i class="fa fa-list fa-lg fa-fw"></i></span>
        </div>
        <select id="typetune_search"><option value="">Tipo</option><option> ${this.typeslist.join('</option><option>')}</option></select>
        <select id="statustune_search"><option value="">Status</option><option> ${this.statuslist.join('</option><option>')}</option></select>
        Filtrar <input type="text" id="tunebook_search"> <i class="fa fa-filter"></i></div>
        </header>
        <main class="p-6 ${this.format == "card" ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : ''}"></main>
        </section>`;
    }

    filter(event) {
        const myinput = event.target.value;
        if (myinput.length > 0) {
            this.filtered = Data.tunebook.filter(
                tune => tune.Prefered_name.toLowerCase().includes(myinput.toLowerCase())
                || tune.tuneref.other_names.join(',').includes(myinput.toLowerCase())
            );
        }
        else {
            this.filtered = Data.tunebook;
        }
        this.rendertunes(this.filtered);
    }

    typefilter(event) {
        const myinput = event.target.value;
        if (myinput.length > 0) {
            this.filtered = Data.tunebook.filter(
                tune => tune.tuneref.Type == myinput
                    || tune.status == myinput
            );
        }
        else {
            this.filtered = Data.tunebook;
        }
        this.rendertunes(this.filtered);
    }

    changeview(event) {
        const myinput = event.currentTarget;
        const newformat = myinput.dataset.format;
        if (newformat != this.format) {
            this.element.querySelector('.viewselector.selected').classList.remove('selected', 'bg-slate-500', 'text-white');
            myinput.classList.add('selected', 'bg-slate-500', 'text-white');
            this.format = myinput.dataset.format;
            this.rendertunes();
            this.contentzone.classList.toggle('grid');
        }  
    }

    launchsearch() {
        Controller.tunesearch = new Tunesearch('tunesearch', this.element);
    }
}
