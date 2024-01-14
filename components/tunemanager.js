import { Component } from "../abstract.js";
import { Controller } from "../startup.js";
import { Tuneformanager } from "./tuneformanager.js";
import { Tunemanagersearch } from "./tunemanagersearch.js";
import * as apis from '../apis.js';

export class Tunemanager extends Component {
    tunes = [];
    filtered = [];
    contentzone = null;
    sortcriteria = 'main_name';
    items = [];

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    async setup() {
        this.tunes = await apis.Xanoapi.getalltunes();

        const typeslist = this.tunes.map(tune => tune.Type);
        this.typeslist = [...new Set(typeslist)];
        const originlist = this.tunes.map(tune => tune.Tradition);
        this.originlist = [...new Set(originlist.flat())];
        this.filtered = this.tunes;

        // generate HTML
        this.attachAt(this.generatehtml(), false);
        this.contentzone = this.element.querySelector('main');

        // add events
        this.element.querySelector('.tunes_search')
            .addEventListener('input', this.filter.bind(this));
        this.element.querySelector('.typetune_search')
            .addEventListener('change', this.typefilter.bind(this));
        this.element.querySelector('.origintune_search')
            .addEventListener('change', this.typefilter.bind(this));
        this.element.querySelector('.addnewtune')
            .addEventListener('click', this.launchsearch.bind(this));
        this.element.querySelector('.tunesorting')
            .addEventListener('change', this.applysort.bind(this));
        // add tunes elements    
        this.rendertunes();
    }

    rendertunes(list = this.tunes) {
        this.contentzone.innerHTML = '';
        this.element.querySelector('.num_of_tunes').innerHTML = list.length + ' temas';
        list = this.sorter(list);
        this.items = list.map((item) => {
            return new Tuneformanager('tune' + item.id, this.contentzone, item);
        });
    }

    sorter(list){
        list.sort((a, b) => {
            if (a[this.sortcriteria] < b[this.sortcriteria]){
                return this.sortcriteria == 'popularity' ? 1 : -1;
            } else if (a[this.sortcriteria] > b[this.sortcriteria]) {
                return this.sortcriteria == 'popularity' ? -1 : 1;
            } else {
                return 0;
            }
        });
        return list;
    }

    generatehtml() {
        return `<section id="${this.name}">
        <header class="p-6">
            <div class="flex items-center gap-2">
                <h3 class="text-4xl">Todos los temas</h3>
                <span class="num_of_tunes bg-slate-400 text-sm px-2 py-1 uppercase text-slate-200 rounded-lg text-md">${this.tunes.length} temas</span>
                <span class="addnewtune text-blue-600 hover:text-blue-400"><i class="fa fa-plus-circle fa-2x"></i></span>
                <div class="ml-auto flex items-center gap-3">
                    <select class="typetune_search"><option value="">Tipo</option><option> ${this.typeslist.join('</option><option>')}</option></select>
                    <select class="origintune_search"><option value="">Origen</option><option> ${this.originlist.join('</option><option>')}</option></select>
                    Filtrar <input type="text" class="tunes_search"> <i class="fa fa-filter"></i>
                </div>
            </div>
            <p>sorting by <select class="tunesorting">
            <option selected value="main_name">Nombre</option>
            <option value="Type">Tipo</option>
            <option value="popularity">Popularidad</option>
            </select>
            </p>
        </header>
        <main class="flex px-6 flex-wrap"></main>
        </section>`;
    }

    applysort(event) {
        const myinput = event.target.value;
        this.sortcriteria = myinput;
        this.rendertunes(this.filtered);
    }

    filter(event) {
        const myinput = event.target.value;
        if (myinput.length > 0) {
            this.filtered = this.tunes.filter(
                tune => {
                    if (tune.main_name.toLowerCase().includes(myinput.toLowerCase())) {
                        return true;
                    } else if (tune?.other_names 
                        && tune.other_names.join().toLowerCase().includes(myinput.toLowerCase())) {
                        return true;
                    }

                    return false;
                }
            );
        }
        else {
            this.filtered = this.tunes;
        }
        this.rendertunes(this.filtered);
    }

    typefilter(event) {
        const myinput = event.target.value;
        if (myinput.length > 0) {
            this.filtered = this.tunes.filter(
                tune => tune.Type == myinput
                    || (tune?.Tradition && tune.Tradition.includes(myinput))
            );
        }
        else {
            this.filtered = this.tunes;
        }
        this.rendertunes(this.filtered);
    }

    launchsearch() {
        Controller.tunemanagersearch = new Tunemanagersearch('tunemanagersearch', this.element);
    }
}
