import { Component } from "../abstract.js";
import { Mynotification } from "./notification.js";
import { Data } from "../startup.js";
import { Video } from './videos_video.js';
import { Videoadd } from "./videos_addvideo.js";
import * as apis from "../apis.js";

export class Videos extends Component {

    // instancias en DOM de las videocards
    items = [];
    videozone = null;
    subelements = [];

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    addListeners() {
        this.element.querySelector('.addnewvideo')
            .addEventListener('click', this.modalnewvideo.bind(this));
    }

    async setup() {
        if (!Data.videos) {
            Data.videos = await apis.Xanoapi.getallvideos();
            if (Data.videos && Data.videos.length>0) {
                // add info from tunes to tunebook
                Data.videos.forEach(video => {
                    const mytunes = Data.tunes.filter(tune => tune?.media_links 
                        && tune.media_links.some(link => link.videos_id == video.id) );
                    if (mytunes) {
                        video.tunes = mytunes.map(tune => tune.id);
                    }
                });
                new Mynotification('success', `cargados ${Data.tunebook.length} videos.`);
            }
        }
        this.filtered = Data.videos;

        // generate HTML
        this.attachAt(this.generatehtml(), false);
        this.videozone = this.element.querySelector('main');
        this.addListeners();
        this.rendervideos();
    }

    rendervideos(list = Data.videos) {
        this.videozone.innerHTML = '';
        this.element.querySelector('.num_of_videos').innerHTML = list.length + ' videos';
        this.items = list.map((item) => {
            return new Video('video' + item.id, this.videozone, item.id);
        });
    }

    generatehtml() {
        return `<section id="${this.name}">
        <header class="p-6">
            <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-3xl">Videos guardados</h3>
                <span class="num_of_videos bg-slate-400 text-sm px-2 py-1 uppercase text-slate-200 rounded-lg text-md">
                ${Data.videos.length} videos</span></h3>
                <span class="addnewvideo text-blue-600 hover:text-blue-400">
                <i class="fa fa-plus-circle fa-2x"></i></span>
            </div>
        </header>
        <main class="p-6"></main>
        </section>`;
    }

    modalnewvideo() {
        this.subelements.push(new Videoadd('newvideo', this.element));
    }
}
