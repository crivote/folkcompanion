import { Component } from "../abstract.js";
import { Controller, Data, Utils } from "../startup.js";
import * as apis from "../apis.js";
import { Mynotification } from './notification.js';

export class Tuneaddtobook extends Component {
    tune;
    pics;
    tuneid;

    constructor(name, parentel, tuneid) {
        super(name, parentel);
        this.tuneid = tuneid;
        this.tune = Data.tunes.find(tune => tune.id === this.tuneid);
        this.setup();
    }

    generatehtml() {
        this.tune.other_names.unshift(this.tune.main_name);
        return `<div id="modaladdtune" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg w-1/3 relative">
                <p id="closeaddtunebook" class="absolute right-4 top-4 text-red-400 text-right" title="close"><i class="fa fa-times-circle fa-2x"></i></p>
                <h2 class="text-2xl text-blue-400 font-semibold mb-6">Añadir tema a tu repertorio</h2>
                <form id="loginform">
                    <div class="flex items-center justify-center -mb-4 gap-4">
                        <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                            <p>${this.tune.Type} (${this.tune.time})</p>
                            <p>${this.tune.Compasses} compases</p>
                            <p>${this.tune.Estructure}</p>
                        </div>
                        <img class="picphoto rounded-full h-48 w-48 border-8 border-slate-200 object-cover object-center" src="${this.pics[0]}">
                        <div class="bg-blue-100 rounded-md p-4 text-sm min-w-max">
                            <p>${this.tune.Author}</p>
                            <p>${this.tune?.Tradition ? this.tune.Tradition.join(' · ') : ''}</p>
                        </div>
                    </div>
                    ${Controller.generateformfield('titulo', 'titulo favorito', this.tune.main_name, this.tune.other_names)}
                    ${Controller.generateformfield('tonalidad', 'tonalidad preferida', this.tune.tunekeys[0], this.tune.tunekeys)}
                    ${Controller.generateformfield('status', 'status de ejecución', Controller.statusoptions[0], Controller.statusoptions)}
                    <div class="flex items-center justify-center border-b border-slate-200 h-0 my-6">
                        <span class="shownext text-blue-500 border-4 border-white"><i class="fa fa-plus-circle fa-lg"></i></span>
                    </div>
                    <div class="hidden flex border-2 p-4 border-slate-100 bg-slate-50 rounded-md mb-4 gap-3">
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">aprendido</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase"type="date" name="date" value="${Utils.dateformat()}">
                        </div>
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">ensayos</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md" type="number" value="0" min="0" name="rehearsals">
                        </div>
                        <div class="flex flex-col">
                            <label class="uppercase text-slate-400 text-sm">Último</label>
                            <input class="font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase" type="date" name="lastrehearsal" value="">
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <button class="px-4 py-3 rounded-md bg-blue-500 text-white text-md font-bold uppercase mr-4" type="submit">añadir al repertorio</button>
                    </div>
                </form>
            <div>
        </div>`;
    }

    addListeners() {
        this.element.querySelector('#closeaddtunebook').addEventListener('click', this.remove.bind(this));
        // change selected image
        this.element.querySelector('.picphoto').addEventListener('click', this.changeimage.bind(this));
        // show select control to change value
        this.element.querySelectorAll('.edit-toggle')
            .forEach(el => el.addEventListener('click', this.showeditselect.bind(this)));
        // toggle show additional controls
        this.element.querySelectorAll('.shownext')
            .forEach(el => el.addEventListener('click', this.shownextel.bind(this)));
        // change value of select field
        this.element.querySelectorAll('.edit-select')
            .forEach(el => el.addEventListener('change', this.changeselectvalue.bind(this)));
        // add tune
        this.element.querySelector('form').addEventListener('submit', this.addtune.bind(this));
    }

    async setup() {
        this.pics = await apis.Pexels.search(this.tune.main_name);
        if (this.pics.length == 0) {
            if (this.tune.other_names && this.tune.other_names.length > 0) {
                this.pics = await apis.Pexels.search(this.tune.other_names[0]);
            } 
        }
        this.pics = this.pics.concat(Data.genericpics);
        this.tune.tunekeys = this.tune.Modes_played.map(mode => `${mode.Key} ${mode.Mode}`);
        this.attachAt(this.generatehtml(), false);
        this.addListeners();
    }

    async addtune(event) {
        event.preventDefault();

        // explore array of fields and add if they have value
        const inputselectors = [
            {field: 'preferred_img_url', selector: '.picphoto', value: 'src'},
            {field: 'Prefered_name', selector: '.datatitulo', value: 'textContent'},
            {field: 'Preferred_tone', selector: '.datatonalidad', value: 'textContent'},
            {field: 'learned_date', selector: 'input[name="date"]', value: 'value'},
            {field: 'status', selector: '.datastatus', value: 'textContent'},
            {field: 'rehearsal_days', selector: 'input[name="rehearsals"]', value: 'value'},
            {field: 'last_rehearsals', selector: '[name="lastrehearsal"]', value: 'value'}
        ];
        const params = Utils.populatefromform(Data.template.tunebook, this.element, inputselectors);
        params.tunes_id = this.tuneid;
        params.user_id = Data.user.id;

        try {
            const result = await apis.Xanoapi.addtotunebook(params);
            if (result) {
                this.remove();
                new Mynotification('success', `Se ha añadido el tema a tu tunebook.`);
                Controller.screens.Tunebook.tunebook.push(result);
                Controller.updatetunebook(Controller.screens.Tunebook.tunebook);
                Controller.screens.Tunebook.rendertunes();
            }
        } catch (error) {
            console.log(error);
        }
    }

    changeimage(event) {
        const el = event.currentTarget;
        if (this.pics[0] === el.src) {
            this.pics.shift();
        }
        this.pics.push(el.src);
        el.src = this.pics.shift();
    }

    shownextel(event) {
        const el = event.currentTarget;
        const target = el.parentElement.nextElementSibling;
        const icon = el.querySelector('i');
        if (icon.classList.contains('fa-plus-circle')) {
            icon.classList.replace('fa-plus-circle', 'fa-circle-minus');
            target.classList.remove('hidden');
        } else {
            icon.classList.replace('fa-circle-minus', 'fa-plus-circle');
            target.classList.add('hidden');
        }
    }

    showeditselect(event) {
        const el = event.currentTarget;
        const select = el.nextElementSibling;
        el.classList.add('hidden');
        select.classList.remove('hidden');
        select.click();
    }

    changeselectvalue(event) {
        const el = event.currentTarget;
        const editbutton = el.previousElementSibling;
        const textel = el.parentElement.previousElementSibling.querySelector('h4');
        // esconder select tras cambio valor y mostrar icono edicion
        el.classList.add('hidden');
        editbutton.classList.remove('hidden');
        textel.textContent = el.value;
    }

}