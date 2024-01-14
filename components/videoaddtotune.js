import { Component } from "../abstract.js";
import { Controller } from "../startup.js";
import * as apis from "../apis.js";

export class Videoaddtotune extends Component {
    data = {};
    videolist = [];
    videozone;
    thumbzone;

    constructor(name, parentel, tune, videolist) {
        super(name, parentel);
        this.videolist = videolist;
        this.data = tune;
        this.setup();
    }

    generatehtml() {
        const videolist = this.videolist.map(video => {
            if (video.includes('youtube')) {
                video = video.split('v=');
            }
            else {
                video = video.split('/');
            }
            const key = video.pop();
            return `<option value="${key}">${key}</option>`;
        });

        return `<div id="modalvideoaddtotune" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-3/4 relative">
                <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-blue-400 font-semibold mb-6">Añadir vídeos a ${this.data.main_name}</h2>
                <div class="flex justify-center gap-3">
                    <input class="loadvideo" type="text" placeholder="paste a youtube ID">
                    <select class="loadvideo">
                        <option selected value="">Choose a link</option>
                        ${videolist.join('')}
                    </select>
                </div>
                <section data-key="" class="my-8" id="videocontainer"></section>
                <form id="videoform">
                    <div class="flex gap-6 bg-slate-100 border border-slate-300 p-4 justify-center">
                        <img class="border-4 border-slate-500 rounded-lg w-64 h-full" id="thumbvideo">
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-2">
                            <div>
                                <label class="uppercase text-slate-400 text-sm">tipo video</label>
                                <select name="type">
                                    <option selected value="album">Album</option>
                                    <option selected value="live event">Directo</option>
                                    <option selected value="home record">casero</option>
                                    <option selected value="others">otros</option>
                                </select>
                                </div>
                                <div>
                                <label class="uppercase text-slate-400 text-sm mt-4">inicio</label>
                                <input class="" type="number" name="inicio">
                                </div>
                                <div>
                                <label class="uppercase text-slate-400 text-sm mt-4">final</label>
                                <input class="" type="number" name="final">
                                </div>
                            </div>
                            <div>
                                <label class="uppercase text-slate-400 text-sm mt-4">titulo</label><br>
                                <input class="w-full" type="text" name="titulo">
                            </div>
                            <div>
                                <label class="uppercase text-slate-400 text-sm mt-4">artista</label><br>
                                <input class="w-full" type="text" name="artista">
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mt-6">
                        <button class="px-4 py-3 rounded-md bg-blue-500 text-white text-md font-bold uppercase mr-4" type="submit">añadir video</button>
                    </div>
                </form>
            <div>
        </div>`;
    }

    async setup() {
        this.attachAt(this.generatehtml(), false);
        this.videozone = this.element.querySelector('#videocontainer');
        this.thumbzone = this.element.querySelector('#thumbvideo');

        // close window
        this.element.querySelector('#closeaddtunebook').addEventListener('click', this.remove.bind(this));
        // load video
        this.element.querySelectorAll('.loadvideo').forEach(el => 
            el.addEventListener('change', this.loadvideo.bind(this)));
        // add current video to db and song reference
        this.element.querySelector('form').addEventListener('submit', this.addvideo.bind(this));
    }

    async addvideo(event) {
        event.preventDefault();
        //TODO: comprobar que el video no ha sido ya añadido antes
        const params = {
            url: this.videozone.dataset.key,
            thumb_url: this.thumbzone.src,
            type: this.element.querySelector('[name="type"]').value,
            Title: this.element.querySelector('[name="titulo"]').value,
            Performer: this.element.querySelector('[name="artista"]').value,
        };
        try {
            const result = await apis.Xanoapi.addvideo(params);
            if (result) {
                console.log(result);
                const link = {
                    videos_id: result.id,
                    start_time: this.element.querySelector('[name="inicio"]').value,
                    end_time: this.element.querySelector('[name="final"]').value
                }
                const medialinks = this.data?.medialinks ? this.data.medialinks.push(link) : [link];
                const params2 = {
                    media_links: medialinks,
                    main_name: "",
                    other_names: "",
                    Type: "",
                    Author: "",
                    time: "",
                    Tradition: "",
                    References: "",
                    Modes_played: "",
                    Estructure: "",
                    Compasses: "",
                    first_reference: "",
                    trivia: "",
                    ABCsample: "",
                    popularity: "",
                    sortname: ""
                }
                const result2 = await apis.Xanoapi.edittune(this.data.id, params2);
            }
        } catch (error) {
            console.log(error);
        }
    }

    loadvideo(event) {
        let key = event.currentTarget.value;
        this.videozone.dataset.key = key;
        this.videozone.innerHTML = Controller.videoembed(key); 
        this.thumbzone.src = `https://i3.ytimg.com/vi/${key}/hqdefault.jpg`;
    }

}
