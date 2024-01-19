import { Component } from "../abstract.js";
import { Controller, Data, ABCplayer } from "../startup.js";
import { Tuneaddtobook } from "./tunebook_addnew.js";

export class Tunesearchresult extends Component {

    tunedetail;

    constructor(name, parentel, id) {
        super(name, parentel);
        this.tunedetail = Data.tunes.find(tune => tune.id === id);
        this.setup();
    }

    generatehtml() {
        return `<li class="flex items-baseline px-4 py-3 border-y border-slate-400" data-id="${this.tunedetail.id}">
        ${this.tunedetail?.ABCsample ? `<span data-state="stop" data-abc="${this.tunedetail.ABCsample}" class="player rounded-full bg-black"><i class="fa fa-play-circle fa-lg mr-2"></i></span>` : ''}
        <span class="font-bold">${this.tunedetail.main_name}</span>
        <em class="ml-2 text-xs text-slate-300">${this.tunedetail.Type}</em>
        <span class="ml-auto text-xs uppercase">${this.tunedetail?.Tradition ? this.tunedetail.Tradition.join(' · ') : ''}</span>
        </li>`;
    }

    addListeners() {
        this.results.querySelector('li').addEventListener('click', this.showmodaltune.bind(this));
        this.results.querySelector('.player').addEventListener('click', ABCplayer.manageabc);
    }

    showmodaltune(event) {
        const id = event.currentTarget.dataset.id;
        Controller.Tuneaddtobook = new Tuneaddtobook('addtunetobook', Controller.htmlelement, id);
    }

    setup() {
        this.attachAt(this.generatehtml(), false);
        this.addListeners();
    }

}
