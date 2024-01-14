import abcjs from 'https://cdn.jsdelivr.net/npm/abcjs@6.2.3/+esm';
import * as apis from "./apis.js";
import * as components from "./components/index.js";

export class Controller {
    static user;
    static htmlelement;
    // components
    static login;
    static screens = {};
    static tunebook;
    static midiBuffer;
    static searchtunes=[];
    // data
    static tunes ={};
    static genericpics = [];
    static statusoptions = [
        'Pendiente',
        'Aprendiendo',
        'Acompañar',
        'Básica',
        'Fluida',
        'Dominada'
    ];
    static statuscolors = {
        'Pendiente': 'stone-600',
        'Aprendiendo': 'orange-600',
        'Acompañar': 'yellow-500',
        'Básica': 'lime-500',
        'Fluida': 'green-600',
        'Dominada': 'emerald-900'
    };
    static times = {
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

    static generatelinks(data){
        const result= [];
        if (data) {
            data.forEach(item => {
                let url;
                switch (item?.service_name) {
                    case 'thesession.org':
                        url = 'https://thesession.org/tunes/' + item.service_ID;
                        result.push(`<a class="bg-yellow-600 px-2" href="${url}" target="_blank">thesession</a>`);
                        break;
                    case 'irishtune.info':
                        url = 'https://www.irishtune.info/tune/' + item.service_ID;
                        result.push(`<a class="bg-blue-600 px-2" href="${url}" target="_blank">irishtune</a>`);
                        break;
                    case 'tunearch.org':
                        url = 'https://tunearch.org/wiki/' + item.service_ID;
                        result.push(`<a class="bg-red-600 px-2" href="${url}" target="_blank">tunearchive</a>`);
                        break;
                    default:
                }    
            });
        }
        return result;
    }

    static async returntunedata(id) {
        if (!Object.hasOwn(Controller.tunes, id)) {
            Controller.tunes[id] = await apis.Xanoapi.getsingletune(id);
        }
        return Controller.tunes[id];
    }

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

    static titleforsort(title) {
        title = title.toLowerCase();
        if (title.substring(0,4) == 'the ') {
            title = title.substring(4);
        } else if (title.substring(0,2) == "a ") {
            title = title.substring(2);
        }
        return title;
    }

    static async getuserdetails() {
        Controller.genericpics = await apis.pexels.search('irish folk music', 20);
        const token = localStorage.getItem('token');

        if (token) {
            try {
                Controller.user = await apis.Xanoapi.getuser(token);
            } catch (error) {
                //TODO: si el token falla mostrar componente error para borrar
                console.log(error);
                localStorage.removeItem('token');
                Controller.login = new components.Login('loginmodal', Controller.htmlelement);
            }
            if (Controller.user){
                Controller.startapp();
            }
        } else {
            // no hay token guardado, mostrar login
            Controller.login = new components.Login('loginmodal', Controller.htmlelement);
        }
    }

    static startapp() {
        Controller.getinstance('Menubar');
        apis.pexels.initialize();
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

    static calctimesince(date) {
        const now = new Date();
        date = new Date(date);
        
        const diff = now.getTime() - date.getTime();
        return Math.ceil(diff / (1000 * 3600 * 24));
    }

    static dateformat(date){
        if (date === undefined){
            date = new Date();
        }
        date =  date.toISOString();
        return date.substring(0, 10);
    }

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

    static playabc(abc) {
        let returnobject = '';
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
                })
                .then(function(response){
                    console.log("abc play ends", response);
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

    static videoembed(key) {
        return `
        <div class="max-w-3xl mx-auto">
        <div class="aspect-w-16 aspect-h-9">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${key}" 
        title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen>
        </iframe></div></div`;
    }

};
