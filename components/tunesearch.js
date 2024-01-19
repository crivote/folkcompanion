import { Component } from "../abstract.js";
import { Controller, Data, ABCplayer } from "../startup.js";
import * as apis from "../apis.js";
import { Tuneaddtobook } from "./tuneaddtobook.js";

export class Tunesearch extends Component {

    tunes = Data.tunes;
    listoftunebookids;
    results;

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    generatehtml() {
        return `<div id="${this.name}" class="animate__animated animate__slideInLeft fixed inset-0 w-1/3 bg-gray-400 flex p-6 shadow-lg">
            <div class="bg-white p-6 w-full rounded max-h-lvh overflow-auto">
                <p id="closetunesearch" class="text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">Buscar temas para tu repertorio</h2>
                <input id="tunesearch" type="text" placeholder="escriba parte del nombre">
                <p class="info mt-6 mb-2"></p>
                <ul class="results bg-slate-500 text-slate-50 p-2"></ul>
          </div>
        </div>`;
    }

    addListenersresult() {
        this.results.querySelectorAll('li')
            .forEach(
                el => el.addEventListener('click', this.showmodaltune.bind(this))
            );
        this.results.querySelectorAll('.player')
            .forEach(
                el => el.addEventListener('click', ABCplayer.manageabc)
            );
    }

    generateresults(items) {
        this.results.innerHTML = '';
        items.forEach(item => {
            this.results.insertAdjacentHTML("beforeend",
                `<li class="flex items-baseline px-4 py-3 border-y border-slate-400" data-id="${item.id}">
                ${item?.ABCsample ? `<span data-state="stop" data-abc="${item.ABCsample}" class="player rounded-full bg-black"><i class="fa fa-play-circle fa-lg mr-2"></i></span>` : ''}
                <span class="font-bold">${item.main_name}</span>
                <em class="ml-2 text-xs text-slate-300">${item.Type}</em>
                <span class="ml-auto text-xs uppercase">${item?.Tradition ? item.Tradition.join(' · ') : ''}</span>
                </li>`);
        });
        addListenersresult();
    }

    showmodaltune(event) {
        const id = event.currentTarget.dataset.id;
        Controller.Tuneaddtobook = new Tuneaddtobook('addtunetobook', Controller.htmlelement, id);
    }

    addListeners() {
        this.element.querySelector('#tunesearch').addEventListener('input', this.search.bind(this));
        this.element.querySelector('#closetunesearch').addEventListener('click', this.remove.bind(this));
    }

    setup() {
        this.attachAt(this.generatehtml(), false);
        this.results = this.element.querySelector('.results');
        this.addListeners();
        // Create a list to exclude tunes already in the tunebook
        this.listoftunebookids = Data.tunebook.map(tune => tune.tunes_id);
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

}
