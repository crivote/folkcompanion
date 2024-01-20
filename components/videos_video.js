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
        return `<div id="video${this.data.id}" class="videolist w-full bg-white border-b-2 border-slate200 rounded-md flex items-center border border-slate-300">
            <div class="mythumbvideo w-auto h-full min-w-96 min-h-48 bg-cover bg-center bg-[url('${this.data.thumb_url}')]">
                <div class="hidden w-full">
                ${Utils.videoembed(this.data.url)}
                </div>
            </div>
            <div class="p-6 flex">
                <div>
                    <h2 class="title text-lg font-semibold">${this.data.Title}</h2>
                    <p class="otherdata text-slate-600 text-sm"><span class="bg-slate-100 text-slate-500 font-light uppercase text-xs p-2 rounded-lg">${this.data.type}</span>  ${this.data.Performer}</p>
                </div>
                <div class="flex gap-1 ml-auto items-center">
                    <span class="numrehearsal bg-slate-100 text-white p-2 rounded-lg">${this.data?.tunes ? `<i class="fa fa-circle-check text-green-600"></i>` : `<i class="fa fa-times-circle text-red-600"></i>`}</span>
                    <button class="editbutton bg-blue-400 p-1 rounded-md text-white text-bold" title="editar"><i class="fa fa-edit fa-fw fa-lg"></i></button>
                    <button class="deletebutton bg-red-400 p-1 rounded-md text-white text-bold" title="eliminar"><i class="fa fa-trash fa-fw fa-lg"></i></button>
                </div>
                <ul class="list-disc">
                ${this.data.tunes.map(id => this.gettunedata(id)).join('')}
                </ul>
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
