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

    generatesubitemtune(idtune) {
        return ``;
    }

    generatehtml() {
        console.log(this.data);
        return `<div id="video${this.data.id}" class="videolist w-full bg-white border-b-2 border-slate200 rounded-md px-6 py-2 flex items-center gap-2">
            <div class="mythumbvideo min-w-72 min-h-48 bg-cover bg-center bg-[url('${this.data.thumb_url}')]">
                <div class="hidden w-full">
                ${Utils.videoembed(this.url)}
                </div>
            </div>
            <diV
                <h2 class="title text-xl font-semibold">${this.data.Title}</h2>
                <p class="otherdata text-slate-600 font-semibold">${this.data.type}  ${this.data.Performer}</p>
            </div>
            <div class="flex gap-1 ml-auto items-center">
                <span class="numrehearsal bg-slate-100 text-white p-2 rounded-lg">${this.data?.tunes ? `<i class="fa fa-circle-check text-green-600"></i>` : `<i class="fa fa-times-circle text-red-600"></i>`}</span>
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
