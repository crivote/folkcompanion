import { Component } from "../abstract.js";
import { Utils, Data } from "../startup.js";
import * as apis from "../apis.js";
import { Mynotification } from "./notification.js";

export class Videoadd extends Component {

    videozone;
    thumbzone;
    videokey; 
    constructor(name, parentel, videokey='') {
        super(name, parentel);
        this.setup();
        if (videokey != ''){
            this.videokey = videokey;
        }
    }

    addListeners() {
        // close window
        this.element.querySelector('#closeaddvideo').addEventListener('click', this.remove.bind(this));
        // load video
        this.element.querySelectorAll('.loadvideo').forEach(el => 
            el.addEventListener('change', this.loadvideo.bind(this)));
        // add current video to db
        this.element.querySelector('.sendbutton').addEventListener('click', this.addvideo.bind(this));
        this.element.querySelector('.tuneselector').addEventListener('change', this.processselector.bind(this));
    }

    async setup() {
        this.attachAt(this.generatehtml(), false);
        this.videozone = this.element.querySelector('#videocontainer');
        this.thumbzone = this.element.querySelector('#thumbvideo');
        this.addListeners();
    }

    generatehtml() {
        return `<div id="modalvideoadd" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-3/4 relative">
                <p id="closeaddvideo" class="absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-blue-400 font-semibold mb-6">Añadir vídeo</h2>
                <div class="flex justify-center gap-3">
                    <input class="loadvideo" type="text" placeholder="paste a youtube ID">
                </div>
                <div class="mt-6 flex gap-5">
                    <section class="w-1/2" id="videocontainer"></section>
                    <div class="flex flex-col gap-2">
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-4">titulo</label><br>
                            <input class="w-full" type="text" name="titulo">
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-4">artista</label><br>
                            <input class="w-full" type="text" name="artista">
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-4">Notas</label><br>
                            <textarea class="w-full" type="text" name="notas"></textarea>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm">tipo video</label>
                            <select name="type">
                                ${Data.videotypes.map(type => `<option>${type}</option>`).join('')}
                            </select>
                        </div>

                        <section class="tunesaddition bg-slate-100 border border-slate-300 p-4">

                        <div id="datatune1" class="flex gap-3 tunecontainer">
                            <div>
                                <datalist id="alltunes">
                                    ${Data.tunes.map(tune => `<option value="${tune.id}">${tune.main_name}</option>`).join('')}
                                </datalist>
                                <input list="alltunes" class="tuneselector" name="tune1selector" >
                                <input class="hidden" type="text" name="tune1final">
                            </div>
                            <div>
                                <label class="uppercase text-slate-400 text-sm mt-4">inicio</label>
                                <input class="" type="number" name="inicio1">
                            </div>
                            <div>
                                <label class="uppercase text-slate-400 text-sm mt-4">final</label>
                                <input class="" type="number" name="final1">
                            </div>
                        </div>
                        <div id="datatune2" class="hidden flex gap-3 tunecontainer">
                            <div>
                                    <input list="alltunes" class="tuneselector" name="tune2selector" >
                                    <input class="hidden" type="text" name="tune2final">
                                </div>
                                <div>
                                    <label class="uppercase text-slate-400 text-sm mt-4">inicio</label>
                                    <input class="" type="number" name="inicio2">
                                </div>
                                <div>
                                    <label class="uppercase text-slate-400 text-sm mt-4">final</label>
                                    <input class="" type="number" name="final2">
                                </div>
                            </div>
                            <div id="datatune3" class="hidden flex gap-3 tunecontainer">
                                <div>
                                    <input list="alltunes" class="tuneselector" name="tune3selector" >
                                    <input class="hidden" type="text" name="tune3final">
                                </div>
                                <div>
                                    <label class="uppercase text-slate-400 text-sm mt-4">inicio</label>
                                    <input class="" type="number" name="inicio3">
                                </div>
                                <div>
                                    <label class="uppercase text-slate-400 text-sm mt-4">final</label>
                                    <input class="" type="number" name="final3">
                                </div>
                            </div>
                            <div id="datatune4" class="hidden flex gap-3 tunecontainer">
                                <div>
                                    <input list="alltunes"class="tuneselector" name="tune4selector" >
                                    <input class="hidden" type="text" name="tune3final">
                                </div>
                                <div>
                                    <label class="uppercase text-slate-400 text-sm mt-4">inicio</label>
                                    <input class="" type="number" name="inicio3">
                                </div>
                                <div>
                                    <label class="uppercase text-slate-400 text-sm mt-4">final</label>
                                    <input class="" type="number" name="final3">
                                </div>
                            </div>
                        </div>
                        </section>
                    </div>

                    <div class="flex items-center justify-center mt-6">
                        <button disabled class="sendbutton px-4 py-3 rounded-md bg-blue-500 text-white text-md font-bold uppercase mr-4">añadir video</button>
                    </div>
            <div>
        </div>`;
    }

    processselector(event) {
        const el = event.currentTarget;
        if (el.value != "") {
            el.classList.add('hidden');
            const tunename = Data.tunes.find(tune => tune.id == el.value);
            el.nextSibling.classList.remove('hidden');
            el.nextSibling.value = tunename.main_name;
            const next = el.closest('.tunecontainer')?.nextSibling;
            if (next) {
                next.classList.remove('hidden');
            }
        }
    }

    async addvideo(event) {
        event.preventDefault();
        //TODO: comprobar que el video no ha sido ya añadido antes
        const params = {
            url: this.videokey,
            thumb_url: `https://i3.ytimg.com/vi/${this.videokey}/hqdefault.jpg`,
            type: this.element.querySelector('[name="type"]').value,
            Title: this.element.querySelector('[name="titulo"]').value,
            Performer: this.element.querySelector('[name="artista"]').value,
            notes: this.element.querySelector('[name="notas"]').value,
            album_relation: {}
        };
        try {
            const result = await apis.Xanoapi.addvideo(params);
            if (result) {
                new Mynotification('success', `Se ha guardado el vídeo.`);

                // save links to video in tunes
                const tunesids = [];
                const els = ['tune1selector', 'tune2selector', 'tune3selector', 'tune4selector'];

                els.forEach( elname => {
                    const el = this.element.querySelector(elname);
                    if (el.value != '') {
                        tunesids.push(el.value);
                    }
                });

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
                    type: "",
                    author: "",
                    time: "",
                    tradition: "",
                    References: "",
                    Modes_played: "",
                    Estructure: "",
                    compasses: "",
                    first_reference: "",
                    trivia: "",
                    ABCsample: "",
                    popularity: "",
                    sortname: ""
                }
                const result2 = await apis.Xanoapi.edittune(this.data.id, params2);
            }
        } catch (error) {
            new Mynotification('error', `No se ha podido guardar el vídeo.`);
            console.log(error);
        }
    }

    loadvideo(event) {
        let key = event.currentTarget.value;
        this.videokey = key;
        this.videozone.innerHTML = Utils.videoembed(key); 
        this.element.querySelector('.sendbutton').disabled = false;
    }

}
