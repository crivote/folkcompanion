import { Component } from "../abstract.js";
import { Mynotification } from "./notification.js";
import { Controller, Utils, Data } from "../startup.js";
import * as apis from "../apis.js";

export class Video extends Component {

    constructor(name, parentel, id, format) {
        super(name, parentel);
        this.id = id;
        this.data = Data.videos.find(item => item.id === id);
        this.setup();
    }

    setup() {
        const mycontent = this.generatehtml();
        this.attachAt(mycontent, false);
        this.addlisteners();
    }

    addlisteners() {
        this.element.querySelector('.mythumbvideo')
            .addEventListener('click', this.showvideo.bind(this));
        this.element.querySelector('.editbutton')
            .addEventListener('click', this.editvideo.bind(this));
        this.element.querySelector('.deletebutton')
            .addEventListener('click', this.deletevideo.bind(this));
    }

    gettunedata(idtune) {
        const tune = Data.tunes.find(tune => tune.id == idtune);
        return `<li>${tune.main_name} ${tune.Type}</li>`;
    }

    generatehtml() {
        console.log(this.data);
        return `<div id="video${this.data.id}" class="videolist relative w-full bg-white border-b-2 border-slate200 rounded-md flex items-top border border-slate-300">
            <div class="mythumbvideo w-auto h-full min-w-96 min-h-48 bg-cover bg-center bg-[url('${this.data.thumb_url}')]">
                <div class="hidden w-full">
                ${Utils.videoembed(this.data.url)}
                </div>
            </div>
            <div class="px-4 py-2 flex-col">
                <span class="bg-slate-500 text-slate-50 font-light uppercase text-xs px-2 py-1 rounded-lg">${this.data.type}</span>  
                <span class="p-2">${this.data?.tunes && this.data.tunes.length > 0 ? `<i class="fa fa-circle-check text-green-600"></i>` : `<i class="fa fa-times-circle text-red-600"></i>`}</span>
                <h2 class="title text-lg font-semibold leading-tight text-slate-700">${this.data.Title}</h2>
                <p class="otherdata text-slate-600 text-sm">${this.data.Performer}</p>
                <ul class="list-disc mt-2 text-xs bg-slate400 p-4">
                    ${this.data.tunes.map(id => this.gettunedata(id)).join('')}
                </ul>
            </div>
            <div class="absolute right-3 top-3 flex gap-1 items-center">
                <button class="editbutton bg-blue-400 p-1 rounded-md text-white text-bold" title="editar"><i class="fa fa-edit fa-fw fa-lg"></i></button>
                <button class="deletebutton bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar"><i class="fa fa-trash fa-fw fa-lg"></i></button>
            </div>
        </div>`;
    }

    showvideo(event) {
        const el = event.currentTarget.firstElementChild;
        el.classList.remove('hidden');
    }

    editvideo() {

    }

    deletevideo() {
        
    }

}
