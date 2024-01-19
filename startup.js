import abcjs from 'https://cdn.jsdelivr.net/npm/abcjs@6.2.3/+esm';
import * as apis from "./apis.js";
import * as components from "./components/index.js";

// clase estática de utilidades varias
export class Utils {
    // crea enlaces a las referencias externas de datos
    static generatelinks(data){
        const result= [];
        if (data) {
            data.forEach(item => {
                let url;
                switch (item?.service_name) {
                    case 'thesession.org':
                        url = 'https://thesession.org/tunes/' + item.service_ID;
                        result.push(`<a class="bg-yellow-600 px-2 rounded-full text-sm" href="${url}" target="_blank">TS</a>`);
                        break;
                    case 'irishtune.info':
                        url = 'https://www.irishtune.info/tune/' + item.service_ID;
                        result.push(`<a class="bg-blue-600 px-2 rounded-full text-sm" href="${url}" target="_blank">IT</a>`);
                        break;
                    case 'tunearch.org':
                        url = 'https://tunearch.org/wiki/' + item.service_ID;
                        result.push(`<a class="bg-red-600 px-2 rounded-full text-sm" href="${url}" target="_blank">TA</a>`);
                        break;
                    default:
                }    
            });
        }
        return result;
    }

    // devuelve versión del nombre para ordenar (sin articulos al inicio)
    static titleforsort(title) {
        title = title.toLowerCase();
        if (title.substring(0,4) == 'the ') {
            title = title.substring(4);
        } else if (title.substring(0,2) == "a ") {
            title = title.substring(2);
        }
        return title;
    }

    // devuelve numero de dias desde una fecha pasada
    static calctimesince(date) {
        const now = new Date();
        date = new Date(date);
        const diff = now.getTime() - date.getTime();
        const numdays = Math.round(diff / (1000 * 3600 * 24));
        return numdays > 0 ? numdays : 0;
    }

    // formatea fecha para base de datos
    static dateformat(date){
        if (date === undefined){
            date = new Date();
        }
        date =  date.toISOString();
        return date.substring(0, 10);
    }

    // convierte cadenas de tonos a estructura DB
    static converttones(array){
        let modes = [...new Set(array)];
        modes = modes.map(item => {
            const parts = item.trim().split(" ");
            return {
                Key: parts[0].toUpperCase(),
                Mode: parts[1].substring(0,1).toUpperCase() + parts[1].substring(1)
            }
        });
        return modes;
    }

    static videoembed(key) {
        return `
        <div class="max-w-3xl mx-auto">
        <div class="aspect-w-16 aspect-h-9">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${key}" 
        title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen>
        </iframe></div></div`;
    }

}

export class Data {

    //tunebook template
    static template = {
        tunebook:  {
            "tunes_id": 0,
            "user_id": 0,
            "custom_type": "",
            "preferred_img_url": null,
            "Prefered_name": "",
            "Preferred_tone": null,
            "learned_date": null,
            "status": "Pendiente",
            "rehearsal_days": 0,
            "last_rehearsals": null,
            "statusnum": 0
        },
        set: {
            "user_id": 0,
            "tunes": [],
            "title": "",
            "notes": ""
        }
    };

    // user data
    static user;

    // all tunes from back
    static tunes;

    // tunes in user tunebook
    static tunebook;

    // some pics to add
    static genericpics;

    // status para temas por defecto
    static status = [
        {value: 1, label: 'Pendiente', color: 'stone-600'},
        {value: 2, label: 'Aprendiendo', color: 'orange-600', times: 10},
        {value: 3, label: 'Acompañar', color: 'yellow-500', days: 15},
        {value: 4, label: 'Básica', color: 'lime-500', days: 30},
        {value: 5, label: 'Fluida', color: 'green-600', days: 45},
        {value: 6, label: 'Dominada', color: 'emerald-900', days: 60},
    ];
    static rythms = {
        'Double Jig': '6/8',
        'Single Jig': '6/8',
        'Reel': '4/4',
        'March': '4/4',
        'Hornpipe': '4/4',
        'Slide': '12/8',
        'Slip Jig': '9/8',
        'Polka' : '2/4',
        'Mazurka': '4/4',
        'Waltz': '3/4',
    }
}

export class Controller {

    // elemento donde se instancian componentes
    static htmlelement = document.getElementById('app');

    // objeto con instancias de componentes cargados en DOM
    static screens = {};

    static midiBuffer;
    static player;
    static searchtunes=[];

    static async returntunedata(id) {
        if (!Object.hasOwn(Controller.tunes, id)) {
            Controller.tunes[id] = await apis.Xanoapi.getsingletune(id);
        }
        return Controller.tunes[id];
    }

    // carga un componente o si ya existe devuelve una referencia al mismo.
    static getinstance(componentname) {
        if (Object.hasOwn(components, componentname)) {
            if (!Object.hasOwn(Controller.screens, componentname)) {
                Controller.screens[componentname] = new components[componentname](componentname, Controller.htmlelement);
            } else {
                Controller.screens[componentname].show();
            }
            return Controller.screens[componentname];
        }
    }

    // try to identify user from saved token, or show login form
    static async getuserdetails() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                Data.user = await apis.Xanoapi.getuser(token);
                new components.Mynotification('success', 'token válido, datos de usuario recuperados.');
                Controller.startapp();
            } catch (error) {
                new components.Mynotification('warning', 'el token guardado no es válido.');
                localStorage.removeItem('token');
                Controller.getinstance('Login');
            }
        } else {
            // no hay token guardado, mostrar login
            Controller.getinstance('Login');
        }
    }

    // when user is identified, load data from back and render menu
    static async startapp() {
        Data.genericpics = await apis.Pexels.initialize();
        if (Data.genericpics && Data.genericpics.length>0) {
            new components.Mynotification('success', `cargadas ${Data.genericpics.length} imagenes genéricas.`);
        }
        Data.tunes = await apis.Xanoapi.getalltunes();
        if (Data.tunes && Data.tunes.length>0) {
            // add maintitle to othernames for searchs
            Data.tunes.forEach(tune => {
                if (tune?.other_names) {
                    tune.other_names.push(tune.main_name);
                } else {
                    tune.other_names=[tune.main_name];
                }
                if (!tune.sortname || tune.sortname.length == 0) {
                    tune.sortname = Utils.titleforsort(tune.main_name);
                }

            });
            new components.Mynotification('success', `cargados ${Data.tunes.length} temas.`);
        }
        Data.tunebook = await await apis.Xanoapi.gettunebook();
        if (Data.tunebook && Data.tunebook.length>0) {
            // add info from tunes to tunebook
            Data.tunebook.forEach(item => {
                item.tuneref = Data.tunes.find(tune => tune.id === item.tunes_id);
            })
            new components.Mynotification('success', `cargados ${Data.tunebook.length} temas de tu repertorio.`);
        }
        Controller.getinstance('Menubar');
    }

    static async loadtunebook() {
        const tunebook = sessionStorage.getItem('tunebook');
        let result ="";
        if (tunebook) { 
            result = JSON.parse(tunebook);
        }
        else {
            result = await apis.Xanoapi.gettunebook();
            Controller.updatetunebook(result);
        }
        return result;
    }

    static updatetunebook(tunebook) {
        sessionStorage.setItem('tunebook', JSON.stringify(tunebook));
    }


    static generateformfield(name, label, value, select) {
        return `
        <div class="flex border-2 p-4 border-slate-100 bg-slate-50 rounded-md mb-4">
            <div>
                <label class="uppercase text-slate-400 text-sm">${label}</label>
                <h4 class="data${name} font-semibold text-slate-600 text-xl">${value}</h4>
            </div>
            ${ select ? this.generateselect(select, "data"+name) : ''}
        </div>`;
    }

    static generateselect(data, name) {
        if (Array.isArray(data) && data.length>1){
            return `<div class="ml-auto">
                <div class="edit-toggle"><i class="fa fa-edit fa-lg"></i></div>
                <select data-element="${name}" class="edit-select hidden mt-2 text-sm font-semibold border-0 text-blue-400 bg-blue-200 rounded-md uppercase" name="status">
                    <option>${data.join('</option><option>')}</option>
                </select>
            </div>`;
        }
        else return '';
    }

};

export class ABCplayer {

    static playabc(abc) {
        if (abcjs.synth.supportsAudio()) {
            const visualObj = abcjs.renderAbc("*", abc)[0];
            Controller.midiBuffer = new abcjs.synth.CreateSynth();
            Controller.midiBuffer.init(
                {
                    visualObj: visualObj,
                    options: {}
                }
            )
            .then(function(response) {
                Controller.midiBuffer.prime()
                .then(function(response) {
                    Controller.midiBuffer.start();
                });
            })
            .catch(function(error) {
                console.warn("Audio problem:", error);
            });

        } else {
            console.warn("Audio not supported");
        }
	}

    static stopabc() {
        if (Controller.midiBuffer) {
            Controller.midiBuffer.stop();
        }
    }

    static manageabc(event) {
        event.stopPropagation();
        const el = event.currentTarget;
        if (el.dataset.state == "playing") {
            el.dataset.state = "stop";
            ABCplayer.stopabc();
            el.querySelector('i').classList.remove('fa-circle-stop');
            el.querySelector('i').classList.add('fa-play-circle');
        } else {
            el.dataset.state = "playing";
            ABCplayer.playabc(el.dataset.abc);
            el.querySelector('i').classList.remove('fa-play-circle');
            el.querySelector('i').classList.add('fa-circle-stop');
        }
    }
}
