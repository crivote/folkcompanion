import { Component } from "../abstract.js";
import { Controller, Data, ABCplayer } from "../startup.js";
import { Tunesearchresult } from "./tunebook_search_result.js"; 

export class Tunesearch extends Component {

    tunes = Data.tunes;
    listoftunebookids;
    resultszone;
    results;

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    setup() {
        this.attachAt(this.generatehtml(), false);
        this.resultszone = this.element.querySelector('.results');
        this.addListeners();

        // Create a list to exclude tunes already in the tunebook
        this.listoftunebookids = Data.tunebook.map(tune => tune.tunes_id);
    }

    generatehtml() {
        return `<div id="${this.name}" class="animate__animated animate__slideInLeft fixed inset-0 w-1/3 bg-gray-400 flex p-6 shadow-lg">
            <div class="bg-white p-6 w-full rounded max-h-lvh overflow-auto">
                <p id="closetunesearch" class="text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">Añadir nuevos temas a tu repertorio</h2>
                <input id="tunesearch" type="text" placeholder="escribe parte del nombre para ver resultados">
                <p class="info mt-6 mb-2"></p>
                <ul class="results bg-slate-500 text-slate-50 p-2"></ul>
          </div>
        </div>`;
    }

    addListeners() {
        this.element.querySelector('#tunesearch').addEventListener('input', this.search.bind(this));
        this.element.querySelector('#closetunesearch').addEventListener('click', this.remove.bind(this));
    }

    search(event) {
        const mylist = this.element.querySelector('.results');
        const myinfo = this.element.querySelector('.info');
        mylist.innerHTML = '';
        myinfo.textContent = '';
        const string = event.target.value;
        if (string.length > 0) {
            let result = this.tunes.filter((tune) => {
                return tune.other_names.some(
                    name => name.toLowerCase().includes(string.toLowerCase())
                ) && !this.listoftunebookids.includes(tune.id)
            });
            if (result.length > 0) {
                myinfo.textContent = `Encontrados ${result.length} resultados:`;
                this.generateresults(result);
            } else {
                myinfo.textContent = `Sin resultados en la base.`;
            }
        }
    }

    generateresults(items) {
        this.resultszone.innerHTML = '';
        this.results = items.map((item) => {
            return new Tunesearchresult('tune' + item.id, this.resultszone, item.id);
        });

    }

}
