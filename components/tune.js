import { Component } from "../abstract.js";
import { Controller, Utils, Data } from "../startup.js";
import * as apis from "../apis.js";
import { Tuneedit } from "./tuneedit.js";

export class Tune extends Component {
    constructor(name, parentel, index, format) {
        super(name, parentel);
        this.index =
        this.data = Data.tunebook[index];
        this.format = format;
        this.setup();
    }

    setup() {
        const mycontent = this['generatehtml_' + this.format]();
        this.attachAt(mycontent, false);
        this.addlisteners();
    }

    addlisteners() {
        this.element.querySelector('.rehearsal')
            .addEventListener('click', this.addrehearsal.bind(this));
        this.element
            .addEventListener('click', this.viewdetails.bind(this));
    }

    getstatus(status) {
        return Data.status.find(item => item.label == status);
    }

    generatehtml_card() {
        const mystatus = this.getstatus(this.data.status);

        return `<div id="tune${this.data.id}" class="flex flex-col border-t-8 border-${mystatus.color} relative tunecard shrink-0 xl-2:basis-1/5 xl:basis-1/4 lg:basis-1/3 md:basic-1/2 bg-white shadow-md rounded-md p-6 transition duration-300 ease-in-out hover:shadow-lg hover:scale-110">
        <div class="tuneimg h-64 -mt-6 -mx-6 bg-center bg-cover bg-[url('${this.data.preferred_img_url ?? `https://picsum.photos/200/200?random=${this.data.id}`}')]"></div>
        <span class="px-2 py-1 rounded-md text-sm absolute top-4 uppercase text-slate-700/75 font-bold bg-${mystatus.color}/75" >${mystatus.label}</span>
        <div class="absolute right-6 top-4 px-2 py-1 bg-slate-800/50 text-white/90 rounded-lg" title="Nº ensayos">
            <i class="fas fa-stopwatch"></i>
            <span class="numrehearsal ml-1">${this.data.rehearsal_days}</span>
        </div>
        <h6 class="text-center text-sm text-slate-800/75 p-1 uppercase -mt-10 bg-white/75 rounded-lg">
            <i class="fas fa-calendar"></i> 
            <span class="lastrehearsal ml-1">${this.data.last_rehearsals ? 'hace ' + Utils.calctimesince(this.data.last_rehearsals[0]) + ' días' : 'nunca'}</span>
        </h6>
        <h2 class="leading-none tunetitle text-2xl font-semibold text-center mt-6 mb-2 text-slate-500">${this.data.Prefered_name}</h2>
        <p class="tuneadditionaldata text-slate-300 font-regular uppercase text-sm text-center">${this.data.tuneref.type} ${this.data.tuneref.Author}</p>
        <div class="flex gap-1 mt-auto justify-center">
            <button class="rehearsal bg-blue-400 p-1 rounded-md text-white text-bold" title="añadir ensayo"><i class="fa fa-bolt fa-fw fa-lg"></i> ensayo</button>
        </div>
        </div>`;
    }

    generatehtml_list() {
        return `<div id="tune${this.data.id}" class="tunelist w-full bg-white border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center">
            <img src="${this.data.preferred_img_url ?? `https://picsum.photos/200/200?random=${this.data.id}`}" alt="Imagen" class="rounded-full h-16 w-16 object-cover mr-3">
            <h2 class="tunetitle text-xl font-semibold mr-2">${this.data.Prefered_name}</h2>
            <p class="tunemodes text-blue-400 font-semibold mr-2">${this.data.type}</p>
            <p class="tunealiases text-gray-500">${this.data.status}</p>
            <div class="flex gap-1 ml-auto items-center">
                <span class="numrehearsal bg-slate-500 text-white p-2 rounded-lg">${this.data.rehearsal_days} ensayos</span>
                <span class="lastrehearsal">${this.data.last_rehearsals ? 'último hace ' + Utils.calctimesince(this.data.last_rehearsals[0]) + ' días' : 'nunca'}</span>
                <button class="rehearsal bg-blue-400 p-1 rounded-md text-white text-bold" title="añadir ensayo"><i class="fa fa-guitar fa-fw fa-lg"></i></button>
                <button class="deletetune bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw fa-lg"></i></button>
            </div>
        </div>`;
    }

    async addrehearsal() {
        let datearray = this.last_rehearsals;
        if (!Array.isArray(datearray)) {
            datearray = [];
        }
        datearray.unshift(Utils.dateformat());

        const params = {
            status: this.data.status,
            rehearsal_days: this.data.rehearsal_days + 1,
            last_rehearsals: datearray.length > 5 ? datearray.slice(0, 5) : datearray
        };
        const result = await apis.Xanoapi.edittunebooktune(this.data.id, params);
        if (result) {
            this.data = result;
            this.element.querySelector('.numrehearsal').textContent = this.data.rehearsal_days;
            this.element.querySelector('.lastrehearsal').textContent = `hace ${Utils.calctimesince(this.data.last_rehearsals[0])} días`;
        }
    }

    viewdetails() {
        Controller.tuneedit = new Tuneedit('tuneedit', Controller.htmlelement, this.data);
    }

    async deletetune() {
        const result = await Xanoapi.deletetunebooktune(this.data.id);
        if (result) {

            const manager= Controller.getinstance('Tunebook');
            let mytuneindex = manager.tunes.findIndex(tune => tune.id == this.data.id);
            manager.tunes.splice(mytuneindex, 1);
            const mytuneobject = manager.items.findIndex(tune => tune.name == 'tune'+this.data.id);
            manager.items.splice(mytuneobject, 1);
            this.remove();
        }
    }

}
