import { Component } from "../abstract.js";
import { Controller, Utils } from "../startup.js";
import * as apis from "../apis.js";
import { Videoaddtotune } from "./videos_addvideo.js";

export class Tunemanageredit extends Component {
    data;
    Thesessionzone;
    videolinks;

    constructor(name, parentel, data) {
        super(name, parentel);
        this.data = data;
        this.setup();
    }

    generatehtml() {
        const sessionbool = this.data?.References && this.data.References[0]?.service_name ? this.data.References.find(item => item.service_name == "thesession.org") : false;
        const irishtunebool = this.data?.References && this.data.References[0]?.service_name ? this.data.References.find(item => item.service_name == "irishtune.info") : false;
        const tunearchbool = this.data?.References && this.data.References[0]?.service_name ? this.data.References.find(item => item.service_name == "tunearch.org") : false;
        const tonalities = this.data?.Modes_played && this.data.Modes_played[0]?.key ? this.data.Modes_played.map(mode => mode.Key + ' ' + mode.Mode) : [];

        let sessionbutton = '';
        if (sessionbool) {
            sessionbutton = `<button class="refreshThesession bg-purple-500 text-white p-2 rounded-md" data-id="${sessionbool.service_ID}">Completar datos Thesession</button>`
        }
        return `<div id="modaledittunemanager" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-4/5 relative flex gap-3 max-h-screen">
            <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <div class="owndata basis-1/2">
                    <h2 class="text-2xl text-blue-400 font-semibold mb-6">Editar tune</h2> 

                    <div class="flex gap-3">
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">thesession</label>
                            <p class="editthesession border" contenteditable="true">${sessionbool ? sessionbool.service_ID : ''}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">irishtune</label>
                            <p class="editirishtune border" contenteditable="true">${irishtunebool ? irishtunebool.service_ID : ''}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">tunearch</label>
                            <p class="edittunearch border" contenteditable="true">${tunearchbool ? tunearchbool.service_ID : ''}</p>
                        </div>
                    </div>

                    <label class="uppercase text-slate-400 text-sm mt-3">titulo</label>
                    <p class="editmainname border" contenteditable="true">${this.data.main_name}</p>
                    <label class="uppercase text-slate-400 text-sm mt-3">titulo para orden</label>
                    <p class="editsortname border" contenteditable="true">${this.data.sortname.length > 0 ? this.data.sortname : 'sin alias'}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">aliases</label>
                    <p class="editalias border" contenteditable="true">${this.data?.other_names ? this.data.other_names.join(' / ') : ''}</p>

                    <div class="flex gap-3">
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">tipo</label>
                            <p class="edittype border" contenteditable="true">${this.data.Type}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">tiempo</label> 
                            <p class="edittime border" contenteditable="true">${this.data.time}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">compases</label>
                            <p class="editcompases border" contenteditable="true">${this.data.Compasses}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">estructura</label>
                            <p class="editestructure border" contenteditable="true">${this.data.Estructure}</p>
                        </div>
                        <div>
                            <label class="uppercase text-slate-400 text-sm mt-3">popularidad</label>
                            <p class="editpopularity border" contenteditable="true">${this.data.popularity ?? 0}</p>
                        </div>
                    </div>

                    <label class="uppercase text-slate-400 text-sm mt-3">autor</label>
                    <p class="editautor border" contenteditable="true">${this.data.Author}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">tradicion</label>
                    <p class="edittradition border" contenteditable="true">${this.data?.Tradition ? this.data.Tradition.join(' / ') : ''}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">trivia</label>
                    <p class="edittrivia border" contenteditable="true">${this.data.trivia}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">tonalidades</label>
                    <p class="editmodesplayed border" contenteditable="true">${tonalities.join(' / ')}</p>

                    <label class="uppercase text-slate-400 text-sm mt-3">ABC</label>
                    <p class="editabcsample border" contenteditable="true">${this.data.ABCsample}</p>

                    <div class="flex items-center justify-center">
                        <button class="updatetune px-4 py-3 rounded-md bg-blue-500 text-white text-md font-bold uppercase mx-4">guardar cambios</button>
                    </div>
                </div>
                <div class="Thesessiondata basis-1/2 shrink-0 overflow-auto">
                    <p class="mb-2">${sessionbutton}</p>
                </div>
        </div>`;
    }

    generatesessionhtml(tune){
        const youtubesearch = /http(s)?[\S]+you[\S]+/g;
        const recordings = tune.recordings.map(element => 
            `<li><strong>${element.artist.name}</strong> - ${element.name}</li>`
        );
        const videolinks = tune.comments.map(comment => comment.content);
        const comments = videolinks.map(item => `<li class="border-b mb-2">${item}</li>`);
        this.videolinks = videolinks.join('').match(youtubesearch);
        const settings = tune.settings.map(setting => `<li class="py-2"><span class="addtoform"><i class="fa fa-plus-circle fa-lg"></i></span> 
            <span data-target="editabcsample" class="playabc" data-state="stop" data-abc="${setting.abc}">
             <i class="fa fa-circle-play fa-lg"></i></span> ${setting.key} by ${setting.member.name}</li>`);

        return `
        <h2 class="text-2xl text-blue-400 font-semibold mb-6">Datos Thesession</h2> 

        <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> titulo</label>
        <p data-target="editmainname">${tune.name}</p>

        <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> titulo para orden</label>
        <p data-target="editsortname">${Utils.titleforsort(tune.name)}</p>

        <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> aliases</label>
        <p data-target="editalias">${tune.aliases.join(' / ')}</p>

        <label class="uppercase text-slate-400 text-sm mt-1">  tipo</label>
        <p>${tune.type}</p>
   
        <label class="uppercase addtoform text-slate-400 text-sm mt-1"><i class="fa fa-plus-circle fa-lg"></i> popularidad</label>
        <p data-target="editpopularity">${tune.tunebooks}</p>

        <details>
        <summary class="uppercase text-slate-400 text-sm mt-1">Settings ABC ${settings.length}</summary>
        <ul class="list-disc">${settings.join('')}</ul>
        </details>

        <details>
        <summary class="uppercase text-slate-400 text-sm mt-1">Grabaciones ${recordings.length}</summary>
        <ul class="list-disc">${recordings.join('')}</ul>
        </details>

        <details>
        <summary class="uppercase text-slate-400 text-sm mt-1">Comentarios ${comments.length}</summary>
        <ul>${comments.join('')}</ul>
        </details>
        
        <button class="openvideomodal px-4 py-3 rounded-md bg-orange-500 text-white text-md font-bold uppercase mx-4">añadir videos</button>
        `;
        
    }

    setup() {
        this.attachAt(this.generatehtml(), false);
        // close window
        this.Thesessionzone = this.element.querySelector('.Thesessiondata');
        this.element.querySelector('#closeaddtunebook').addEventListener('click', this.remove.bind(this));
        this.element.querySelector('.updatetune').addEventListener('click', this.updatetune.bind(this));

        if (this.element?.querySelector('.refreshThesession')) {
            this.element.querySelector('.refreshThesession').addEventListener('click', this.refreshsession.bind(this));
        }
    }

    async refreshsession(event){
        const Thesession = event.currentTarget.dataset.id;
        const Thesessiondata = await apis.Thesession.gettune(Thesession);
        this.Thesessionzone.innerHTML = this.generatesessionhtml(Thesessiondata);
        this.Thesessionzone.querySelectorAll('.addtoform').forEach(el => {
            el.addEventListener('click', this.savefromsessiontoform.bind(this));
        });
        this.Thesessionzone.querySelector('.openvideomodal').addEventListener('click', this.openvideomodal.bind(this));
    }

    openvideomodal() {
        Controller.tuneedit = new Videoaddtotune('videoaddtotune', Controller.htmlelement, this.data, this.videolinks);
    }

    savefromsessiontoform(event) {
        const el = event.currentTarget.nextElementSibling;
        if (el.dataset.target){
            const mytarget = this.element.querySelector('.owndata .'+el.dataset.target);
            mytarget.innerText = el.innerText;
        }
    }

    // extrae las referencias a servicios externos
    checkservicesid(array) {
        let References=[];
        array.forEach(service => {
            let identifier = service.split('.');
            let value = this.element.querySelector('#modaledittunemanager .edit'+identifier[0]).innerText;
            if (value.length > 0){
                References.push({
                    service_name: service,
                    service_ID: value
                });
            }
        });
        return References;
    }

    async updatetune(event) {
        event.preventDefault();
        const References = this.checkservicesid(['thesession.org', 'irishtune.info', 'tunearch.org']);
        const Modes_played = Utils.converttones(this.element.querySelector('#modaledittunemanager .editmodesplayed').innerText.split('/'));
        const params = {
            main_name: this.element.querySelector('#modaledittunemanager .editmainname').innerText,
            other_names: this.element.querySelector('#modaledittunemanager .editalias').innerText.split('/'),
            Type: this.element.querySelector('#modaledittunemanager .edittype').innerText,
            Author: this.element.querySelector('#modaledittunemanager .editautor').innerText,
            time: this.element.querySelector('#modaledittunemanager .edittime').innerText,
            Tradition: this.element.querySelector('#modaledittunemanager .edittradition').innerText.split('/'),
            References: References,
            Modes_played: Modes_played,
            Estructure: this.element.querySelector('#modaledittunemanager .editestructure').innerText,
            Compasses: this.element.querySelector('#modaledittunemanager .editcompases').innerText,
            trivia: this.element.querySelector('#modaledittunemanager .edittrivia').innerText,
            popularity: this.element.querySelector('#modaledittunemanager .editpopularity').innerText,
            sortname: this.element.querySelector('#modaledittunemanager .editsortname').innerText,
            ABCsample: this.element.querySelector('#modaledittunemanager .editabcsample').innerText
        };
        try {
            const result = await apis.Xanoapi.edittune(this.data.id, params);
            if (result) {
                Controller.tunes[this.data.id] = result;
                const manager= Controller.getinstance('Tunemanager');
                let mytune = manager.tunes.find(tune => tune.id == this.data.id);
                mytune = result;
                const mytuneobject = manager.items.find(tune => tune.name == 'tune'+this.data.id);
                mytuneobject.data = result;
                const newhtml = mytuneobject.generatehtml();
                mytuneobject.element.outerHTML = newhtml;
                this.remove();
            }
        } catch (error) {
            console.log(error);
        }
    }

}
