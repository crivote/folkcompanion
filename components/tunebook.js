import { Component } from "../abstract.js";
import { Data } from "../startup.js";
import { Tunesearch } from "./tunebook_search.js";
import { Tune } from "./tunebook_tune.js";

export class Tunebook extends Component {
    filtered = [];

    // instancias en DOM de las card tunes
    items = [];
    typeslist = [];
    statuslist = [];
    contentzone = null;
    format = 'card';
    subelements = [];

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    addListeners() {
        this.element.querySelector('#tunebook_search')
            .addEventListener('input', this.applyFilter.bind(this));
        this.element.querySelector('#typetune_search')
            .addEventListener('change', this.applyFilter.bind(this));
        this.element.querySelector('#statustune_search')
            .addEventListener('change', this.applyFilter.bind(this));
        this.element.querySelector('.addnewtune')
            .addEventListener('click', this.launchsearch.bind(this));
        this.element.querySelector('.resetfilter')
            .addEventListener('click', this.resetFilter.bind(this));
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
        this.element.querySelector('.num_of_tunes').innerHTML = list.length + ' temas';
        this.items = list.map((item) => {
            return new Tune('tune' + item.id, this.contentzone, item.id, this.format);
        });
    }

    generatehtml() {
        return `<section id="${this.name}">
        <header class="p-6">
            <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-3xl">Mi repertorio</h3>
                <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase text-slate-200 rounded-lg text-md">
                ${Data.tunebook.length} temas</span></h3>
                <span class="addnewtune text-blue-600 hover:text-blue-400">
                <i class="fa fa-plus-circle fa-2x"></i></span>
                <div class="ml-auto flex items-center gap-3">
                    <span class="viewselector selected bg-slate-500 text-white" data-format="card"><i class="fa fa-grip fa-lg"></i></span>
                    <span class="viewselector" data-format="list"><i class="fa fa-list fa-lg fa-fw"></i></span>
                </div>
                <select id="typetune_search"><option value="">Tipo</option><option> ${this.typeslist.join('</option><option>')}</option></select>
                <select id="statustune_search"><option value="">Status</option><option> ${this.statuslist.join('</option><option>')}</option></select>
                Filtrar <input type="search" id="tunebook_search">
                <i class="resetfilter fa fa-trash"></i>
            </div>
        </header>
        <main class="p-6 ${this.format == "card" ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : ''}"></main>
        </section>`;
    }

    resetFilter() {
        this.filtered = Data.tunebook;
        this.element.querySelector('#tunebook_search').value = '';
        this.element.querySelector('#typetune_search').value = '';
        this.element.querySelector('#statustune_search').value = '';
        this.rendertunes();
    }

    applyFilter() {
        const valstring = this.element.querySelector('#tunebook_search').value.toLowerCase();
        const valseltype = this.element.querySelector('#typetune_search').value;
        const valselstat = this.element.querySelector('#statustune_search').value;
        this.filtered = Data.tunebook.filter(
            tune => {
                let val1 = true;
                if (valstring != '') {
                    val1 = tune.Prefered_name.toLowerCase().includes(valstring)
                    || tune.tuneref.other_names.join(',').toLowerCase().includes(valstring);
                }
                let val2 = true;
                if (valseltype != '') {
                    val2 = tune.tuneref.Type == valseltype;
                }
                let val3 = true;
                if (valselstat != '') {
                    val3 = tune.status == valselstat;
                }
                return val1 && val2 && val3;
            }
        );
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
        this.subelements.push(new Tunesearch('tunesearch', this.element));
    }
}
