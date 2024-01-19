import { Component } from "../abstract.js";
import { Controller } from "../startup.js";

export class Tunedetail extends Component {
    tune = {};
    data;

    constructor(name, parentel, data) {
        super(name, parentel);
        this.data = data;
        this.setup();
    }

    generatehtml() {
        let nameslist = [this.tune.main_name];
        if (this.tune?.other_names){
            nameslist = nameslist.concat(this.tune.other_names);
        }
        return `<div id="modaltunedetail" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-4/5 relative">
                <header class="flex">
                    <img class="picphoto rounded-full h-96 w-96 border-8 border-slate-200 object-cover object-center" src="${this.pics[0]}">

                </header>
                <p class="closetunedetail absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-blue-400 font-semibold mb-6">Editar tema</h2>
                    <div class="flex items-center justify-center -mb-4 gap-4">
                        <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                            <p>${this.tune.Type} (${this.tune.time})</p>
                            <p>${this.tune.Compasses} compases</p>
                            <p>${this.tune.Estructure}</p>
                        </div>
                        <div class="relative">
                        <span class="searchphoto absolute top-2 right-2 bg-slate-600 text-white rounded-full w-8 h-8 text-center p-1"><i class="fa fa-search fa-lg"></i></span>
                        </div>
                        <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                            <p>${this.tune.Author}</p>
                            <p>${this.tune?.Tradition ? this.tune.Tradition.join(' · ') : ''}</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-center border-b border-slate-200 h-0 my-6">
                        <span class="shownext text-blue-500 border-4 border-white"><i class="fa fa-plus-circle fa-lg"></i></span>
                    </div>
                    <div class="hidden flex justify-between border-2 p-4 border-slate-100 bg-slate-50 rounded-md mb-4 gap-3">
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">aprendido</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase" type="date" name="date" value="${this.data.learned_date}">
                        </div>
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">ensayos</label>
                            <input class="w-28 font-semibold border-0 text-blue-400 bg-blue-200 rounded-md" type="number" value="${this.data.rehearsal_days}" min="0" name="rehearsals">
                        </div>
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">Último</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase"type="date" name="lastrehearsal" value="${this.data?.last_rehearsals ? this.data.last_rehearsals[0] : ''}">
                        </div>
                    </div>
            <div>
        </div>`;
    }

    async setup() {
        //carga datos tema completo
        this.tune = Controller.returntunedata(this.data.tunes_id);
        this.tune.tunekeys = this.tune.Modes_played.map(mode => `${mode.Key} ${mode.Mode}`);
        this.attachAt(this.generatehtml(), false);

        // close window
        this.element.querySelector('.closetunedetail').addEventListener('click', this.remove.bind(this));
    }

}
