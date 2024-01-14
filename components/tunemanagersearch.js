import { Component } from "../abstract.js";
import { Controller } from "../startup.js";
import * as apis from "../apis.js";

export class Tunemanagersearch extends Component {

    tunes = [];
    results;
    details;
    blocked = false;

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    generatehtml() {
        return `<div id="${this.name}" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded shadow-lg w-1/3 max-h-screen flex flex-col">
                <p id="managerclosetunesearch" class="text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-gray-400 font-bold mb-4">Añadir temas desde thesessio</h2>
                <input id="managertunesearch" type="text" placeholder="escriba parte del nombre">
                <p class="info mt-6 mb-2"></p>
                <ul class="results bg-slate-300 text-slate-50 p-2 overflow-auto h-auto"></ul>
          </div>
        </div>`;
    }

    generateresults(items) {
        this.results.innerHTML = '';
        items.forEach(item => {
            this.results.insertAdjacentHTML(
                'beforeend',
                `<li data-enriched="false" class="searchitem cursor-pointer bg-slate-500 hover:bg-slate-700 items-baseline px-4 py-3 border-y border-slate-400" data-id="${item.id}">
                <div class="title">
                <span class="font-bold">${item.name}</span><em class="ml-2 text-xs text-slate-300 uppercase">${item.type}</em>
                </div>
                </li>`
            );
        });
        this.results.querySelectorAll('li.searchitem')
            .forEach(
                el => el.addEventListener('click', this.showdetails.bind(this))
            );
    }

    async showdetails(event){
        const el = event.currentTarget;
        if (el.dataset.enriched == "false") {
            el.dataset.enriched = "true";
            const id = el.dataset.id;
            this.details = await apis.Thesession.gettune(id);
            let tones = this.details.settings.map(item => item.key);
            tones = [...new Set(tones)];
            el.insertAdjacentHTML(
                "beforeend",
                `<div class="details"><p>Alias: ${this.details.aliases.join(' / ')}</p>
                <p>Tonalidades: ${tones.join(' - ')}</p>
                <button class="addtune bg-white text-slate-600 uppercase p-2 font-bold mt-2 rounded-md">Añadir</button>
                </div>`
            );
            el.querySelector('.title').insertAdjacentHTML(
                'afterbegin', 
                `<span class="playabc mr-2" data-state="stop" data-abc="L: 1/8
                K:${this.details.settings[0].key}
                ${this.details.settings[0].abc}"><i class="fa fa-play-circle fa-lg"></i></span>`
            );
            el.querySelector('.playabc').addEventListener('click', this.playabc.bind(this));
            el.querySelector('.addtune').addEventListener('click', this.preparedata.bind(this));
        }
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

    setup() {
        this.attachAt(this.generatehtml(), false);
        this.results = this.element.querySelector('.results');
        this.myinfo = this.element.querySelector('.info');
        this.element.querySelector('#managertunesearch').addEventListener('input', this.search.bind(this));
        this.element.querySelector('#managerclosetunesearch').addEventListener('click', this.hide.bind(this));
    }

    async search(event) {
        this.results.innerHTML = '';
        this.myinfo.textContent = '';
        const string = event.target.value;
        if (string.length > 6 && !this.blocked) {
            this.blocked = true;
            let result = await apis.Thesession.search(string);
            if (result.length > 0) {
                this.myinfo.textContent = `Encontrados ${result.length} resultados:`;
                this.generateresults(result);
            } else {
                this.myinfo.textContent = `Sin resultados en Thesession para ${string}`;
            }
            this.blocked = false;
        }
        else {
            this.myinfo.textContent = `Introduzca al menos 5 caracteres`;
        }
    }

    preparedata(event) {
        const boton = event.target;
        const parent = boton.closest('.searchitem');
        const manager= Controller.getinstance('Tunemanager');
        const alreadysaved = manager.tunes.some(tune => 
            tune?.References &&
            tune.References.some(item =>
                item?.service_ID == this.details.id
                && item.service_name == 'Thesession.org')
        );
        
        if (!alreadysaved){
            let modes = this.details.settings.map(item => item.key);
            modes = [...new Set(modes)];
            modes = modes.map(item => {
                return {
                    Key: item.substring(0,1).toUpperCase(),
                    Mode: item.substring(1,2).toUpperCase() + item.substring(2)
                }
            });
            const type = this.normalicetype(this.details.type);
            const data={
                main_name: this.details.name,
                sortname: Controller.titleforsort(this.details.name),
                other_names: this.details.aliases,
                popularity: this.details.tunebooks,
                Type: type.type,
                Author: 'trad.',
                time: type.time,
                References: [{service_name: 'thesession.org', service_ID: this.details.id}],
                Modes_played: modes, 
                ABCsample: `L: 1/8
                K:${this.details.settings[0].key}
                ${this.details.settings[0].abc}`
            }
            
            this.savetune(data, parent);
        } else {
            parent.insertAdjacentHTML('afterbegin', '<p class="text-white bg-red-400 p-1 mb-1 font-medium uppercase text-xs">Ya hay un tema con esta referencia.</p>');
        }

    }

    normalicetype(type) {
        type = type.replace(/\b\w/g, char => char.toUpperCase());
        if (type == "Jig"){
            type = "Double Jig";
        }
        return {
            type: type,
            time: Controller.times[type] ?? ''
        };
    }

    async savetune(data, el){
        try {
            const result = await apis.Xanoapi.addtotunes(data);
            if (result) {
                Controller.screens.Tunemanager.tunes.push(result);
                Controller.screens.Tunemanager.rendertunes();
                el.remove();
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}
