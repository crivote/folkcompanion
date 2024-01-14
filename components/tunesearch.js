import { Component } from "../abstract.js";
import { Controller } from "../startup.js";
import * as apis from "../apis.js";
import { Tuneaddtobook } from "./tuneaddtobook.js";

export class Tunesearch extends Component {

    tunes = [];
    results;

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    generatehtml() {
        return `<div id="${this.name}" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded shadow-lg w-1/3 max-h-lvh overflow-auto">
                <p id="closetunesearch" class="text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">Buscar temas para tu repertorio</h2>
                <input id="tunesearch" type="text" placeholder="escriba parte del nombre">
                <p class="info mt-6 mb-2"></p>
                <ul class="results bg-slate-500 text-slate-50 p-2"></ul>
          </div>
        </div>`;
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
        this.results.querySelectorAll('li')
            .forEach(
                el => el.addEventListener('click', this.showmodaltune.bind(this))
            );
        this.results.querySelectorAll('.player')
            .forEach(
                el => el.addEventListener('click', this.playabc.bind(this))
            );
    }

    showmodaltune(event) {
        const id = event.currentTarget.dataset.id;
        Controller.Tuneaddtobook = new Tuneaddtobook('addtunetobook', Controller.htmlelement, id);
    }

    playabc(event) {
        event.stopPropagation();
        const el = event.currentTarget;
        if (el.dataset.state == "playing") {
            el.dataset.state = "stop";
            Controller.stopabc();
            el.querySelector('i').classList.remove('fa-circle-stop');
            el.querySelector('i').classList.add('fa-play-circle');
        } else {
            el.dataset.state = "playing";
            this.abcplayer = Controller.playabc(el.dataset.abc);
            el.querySelector('i').classList.remove('fa-play-circle');
            el.querySelector('i').classList.add('fa-circle-stop');
        }
    }

    async setup() {
        this.attachAt(this.generatehtml(), false);
        this.results = this.element.querySelector('.results');
        if (Controller.searchtunes.length > 0) {
            this.tunes = Controller.searchtunes;
        } else {
            const listtunes = await apis.Xanoapi.getalltunessearch();
            // filter list to exclude tunes already in the tunebook
            const listofids = Controller.screens.Tunebook.tunebook.map(tune => tune.tunes_id);
            this.tunes = listtunes.filter(tune => !listofids.includes(tune.id));
            this.tunes.forEach(tune => {
                if (Array.isArray(tune.other_names)) {
                    tune.other_names.push(tune.main_name);
                } else {
                    tune.other_names = [tune.main_name];
                }
            });
            Controller.searchtunes = this.tunes;
        }
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
                return tune.other_names.some(name => name.toLowerCase().includes(string.toLowerCase()));
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
