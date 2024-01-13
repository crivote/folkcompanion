import { Component } from "../abstract.js";
import { Controller } from "../startup.js";
import * as apis from "../apis.js";
import { Tuneedit } from "./tuneedit.js";

export class Tune extends Component {
    constructor(name, parentel, data, format) {
        super(name, parentel);
        this.data = data;
        this.format = format;
        this.setup();
    }

    async setup() {
        const mycontent = this['generatehtml_' + this.format]();
        this.attachAt(mycontent, false);
        this.element.querySelector('.rehearsal')
            .addEventListener('click', this.addrehearsal.bind(this));
        this.element.querySelector('.edittune')
            .addEventListener('click', this.edittune.bind(this));
        this.element.querySelector('.deletetune')
            .addEventListener('click', this.deletetune.bind(this));
    }

    generatehtml_card() {
        return `<div id="tune${this.data.id}" class="relative tunecard shrink-0 xl-2:basis-1/5 xl:basis-1/4 lg:basis-1/3 md:basic-1/2 mt-16 bg-white shadow-md rounded-md p-6 transition duration-300 ease-in-out hover:shadow-lg hover:scale-110">

        <div class="tuneimg border-t-8 border-${Controller.statuscolors[this.data.status]} flex items-center justify-center -mt-6 -mx-6">
            <img src="${this.data.preferred_img_url ?? `https://picsum.photos/200/200?random=${this.data.id}`}" alt="Imagen" class="-mt-16 rounded-full h-36 w-36 object-cover">
        </div>
        <span class="p-1 rounded-md text-sm absolute top-8 uppercase text-white bg-${Controller.statuscolors[this.data.status]} font-bold">${this.data.status}</span>
        <div class="absolute right-6 top-8" title="Nº ensayos">
            <i class="fas fa-star"></i>
            <span class="numrehearsal ml-1">${this.data.rehearsal_days}</span>
        </div>
        <h2 class="tunetitle text-2xl text-center font-semibold mt-1 mb-3">${this.data.Prefered_name}</h2>
        <h6 class="tunerythm text-center text-sm text-gray-400 uppercase mt-3 mb-1">
        <i class="fas fa-calendar"></i>
        <span class="lastrehearsal ml-1">${this.data.last_rehearsals ? 'hace ' + Controller.calctimesince(this.data.last_rehearsals[0]) + ' días' : 'nunca'}</span>
        </h6>
        <p class="tunemodes text-blue-400 font-semibold mb-2">${this.data.type}</p>
        <div class="flex gap-1 absolute bottom-5 right-5">
            <button class="rehearsal bg-blue-400 p-1 rounded-md text-white text-bold" title="añadir ensayo"><i class="fa fa-guitar fa-fw fa-lg"></i></button>
            <button class="edittune bg-slate-400 p-1 rounded-md text-white text-bold" title="editar tema"><i class="fa fa-pencil fa-fw fa-lg"></i></button>
            <button class="deletetune bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw fa-lg"></i></button>
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
                <span class="lastrehearsal">${this.data.last_rehearsals ? 'último hace ' + Controller.calctimesince(this.data.last_rehearsals[0]) + ' días' : 'nunca'}</span>
                <button class="rehearsal bg-blue-400 p-1 rounded-md text-white text-bold" title="añadir ensayo"><i class="fa fa-guitar fa-fw fa-lg"></i></button>
                <button class="edittune bg-slate-400 p-1 rounded-md text-white text-bold" title="editar tema"><i class="fa fa-pencil fa-fw fa-lg"></i></button>
                <button class="deletetune bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar tema"><i class="fa fa-trash fa-fw fa-lg"></i></button>
            </div>
        </div>`;
    }

    async addrehearsal() {
        let datearray = this.last_rehearsals;
        if (!Array.isArray(datearray)) {
            datearray = [];
        }
        datearray.unshift(Controller.dateformat());

        const params = {
            status: this.data.status,
            rehearsal_days: this.data.rehearsal_days + 1,
            last_rehearsals: datearray.length > 5 ? datearray.slice(0, 5) : datearray
        };
        const result = await apis.xanoapi.edittunebooktune(this.data.id, params);
        if (result) {
            this.data = result;
            this.element.querySelector('.numrehearsal').textContent = this.data.rehearsal_days;
            this.element.querySelector('.lastrehearsal').textContent = `hace ${Controller.calctimesince(this.data.last_rehearsals[0])} días`;
        }
    }

    edittune() {
        Controller.tuneedit = new Tuneedit('tuneedit', Controller.htmlelement, this.data);
        
    }

    async deletetune() {
        const result = await xanoapi.deletetunebooktune(this.data.id);
        if (result) {
            delete Controller.tunes[this.data.id];
            const manager= Controller.getinstance('Tunebook');
            let mytuneindex = manager.tunes.findIndex(tune => tune.id == this.data.id);
            manager.tunes.splice(mytuneindex, 1);
            const mytuneobject = manager.items.findIndex(tune => tune.name == 'tune'+this.data.id);
            manager.items.splice(mytuneobject, 1);
            this.remove();
        }
    }

}
