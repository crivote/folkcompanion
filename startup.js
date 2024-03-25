import abcjs from 'https://cdn.jsdelivr.net/npm/abcjs@6.2.3/+esm';
import * as apis from './apis.js';
import * as components from './components/index.js';

/**
 * Utilidades genericas
 */
export class Utils {
  /**
   * Crea enlaces html a las referencias externas de datos
   *
   * @param {*} data
   * @return {html} result
   */
  static generatelinks(data) {
    const result = [];
    if (data) {
      data.forEach((item) => {
        let url;
        switch (item?.service_name) {
          case 'thesession.org':
            url = 'https://thesession.org/tunes/' + item.service_ID;
            result.push(
                `<a class="bg-yellow-600 px-2 rounded-full text-sm" 
                href="${url}" target="_blank">TS</a>`,
            );
            break;
          case 'irishtune.info':
            url = 'https://www.irishtune.info/tune/' + item.service_ID;
            result.push(
                `<a class="bg-blue-600 px-2 rounded-full text-sm" 
                href="${url}" target="_blank">IT</a>`,
            );
            break;
          case 'tunearch.org':
            url = 'https://tunearch.org/wiki/' + item.service_ID;
            result.push(
                `<a class="bg-red-600 px-2 rounded-full text-sm" 
                href="${url}" target="_blank">TA</a>`,
            );
            break;
          default:
        }
      });
    }
    return result;
  }

  /**
   * Extract ID from youtubeurl
   *
   * @param {string} url
   * @return {string} youtubeId
   */
  static extractYoutubeID(url) {
    // eslint-disable-next-line max-len
    const regExp =/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/[\w]+\?v=)(\w{11})|(?:youtu\.be\/(\w{11}))/;
    const match = url.match(regExp);
    // Si se encontró un ID de YouTube en la URL, devolverlo
    if (match) {
      return match[1] ? match[1] : match[2];
    }
    return null;
  }

  /**
   * Get unique values array
   *
   * @param {array} items
   * @return {array}
   */
  static getUniqueValues(items) {
    let newitems = [...new Set(items)];
    if (newitems.includes(null)) {
      newitems = newitems.filter((item) => item != null);
      newitems.sort();
    }
    return newitems;
  }

  /**
   * Añade valores extra para temas de repertorio
   *
   * @param {object} tunebookTune
   */
  static calcValueforTunes(tunebookTune) {
    tunebookTune.titlesort = Utils.titleforsort(tunebookTune.prefered_name);
    const firstvaliddate = tunebookTune?.last_rehearsals.find(
        (item) => item !== null && item !== undefined && item !== 0);
    tunebookTune.last_rehearsalDate = firstvaliddate ?? 0;
    tunebookTune.meanRehear =
        Utils.getMeanRehear(tunebookTune.last_rehearsals);
  }

  /**
   * Devuelve versión del nombre para ordenar (sin articulos al inicio)
   *
   * @param {string} title
   * @return {string} title
   */
  static titleforsort(title) {
    title = title.toLowerCase();
    if (title.substring(0, 4) == 'the ') {
      title = title.substring(4);
    } else if (title.substring(0, 2) == 'a ') {
      title = title.substring(2);
    }
    return title;
  }

  /**
   * Devuelve el numero de dias desde una fecha
   *
   * @param {number} mydate
   * @return {number} numdays
   */
  static calctimesince(mydate) {
    let cadenasalida = '';
    if (typeof mydate == 'number') {
      const now = new Date();
      const prev = new Date(mydate);
      const diferencia = now - prev;
      const totalMeses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30));
      if (totalMeses > 0) {
        cadenasalida = cadenasalida.concat('',
            `${totalMeses}m`);
      }
      const diasRestantes = diferencia % (1000 * 60 * 60 * 24 * 30);
      const totalDias = Math.floor(diasRestantes / (1000 * 60 * 60 * 24));
      if (totalDias > 0) {
        cadenasalida = cadenasalida
            .concat(' ', `${totalDias}d`);
      }
      const horasRestantes = diasRestantes % (1000 * 60 * 60 * 24);
      const totalHoras = Math.floor(horasRestantes / (1000 * 60 * 60));
      if (totalMeses == 0 && totalHoras > 0) {
        cadenasalida = cadenasalida.concat(' ', `${totalHoras}h`);
      }
      const minutosRestantes = horasRestantes % (1000 * 60 * 60);
      const totalMinutos = Math.floor(minutosRestantes / (1000 * 60));
      if (totalMeses == 0 && totalDias == 0 && totalMinutos > 0) {
        cadenasalida = cadenasalida.concat(' ', `${totalMinutos}min`);
      }
      if (cadenasalida == '') {
        cadenasalida = 'ahora';
      }
    } else {
      cadenasalida = 'nunca';
    }
    return cadenasalida;
  }

  /**
   * Convierte fecha a formato ISO datetime
   *
   * @param {Date | undefined} date
   * @param {string} type
   * @return {string}
   */
  static dateformat(date, type = 'short') {
    if (date === undefined) {
      date = new Date();
    } else if (!(date instanceof Date)) {
      date = new Date(date);
    }
    date = date.toISOString();
    const mylength = type == 'short' ? 10 : 16;
    return date.substring(0, mylength);
  }

  /**
   * Convierte los tonos a estructura DB
   *
   * @param {string[]} array
   * @return {object[]} modes
   */
  static converttones(array) {
    let modes = [...new Set(array)];
    modes = modes.map((item) => {
      const parts = item.trim().split(' ');
      return {
        Key: parts[0].toUpperCase(),
        Mode: parts[1].substring(0, 1).toUpperCase() + parts[1].substring(1),
      };
    });
    return modes;
  }

  /**
   * Genera html para iframe youtube
   *
   * @param {string} key
   * @return {html}
   */
  static videoembed(key) {
    return `
        <div class="aspect-w-16 aspect-h-9">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${key}" 
        title="" frameBorder="0" allow="accelerometer; autoplay; 
        clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
        web-share" allowFullScreen>
        </iframe></div>`;
  }

  /**
   * añadir opciones a un select
   *
   * @param {*} el
   * @param {*} value
   * @param {*} text
   */
  static appendOption(el, value, text) {
    const option = document.createElement('option');
    // Asignar texto y valor al elemento option
    option.value = value;
    option.text = text;
    // Añadir la nueva opción al select
    el.appendChild(option);
  }

  /**
   * poblar filtros select
   *
   * @param {*} el
   * @param {*} tag
   * @param {*} array
   */
  static generatefilteroptions(el, tag, array) {
    el.innerHTML = '';
    Utils.appendOption(el, '', tag);
    array.forEach((value) => {
      Utils.appendOption(
          el,
          Array.isArray(value) ? value[0] : value,
          Array.isArray(value) ? value[1] : value);
    });
  }

  /**
   * Genera html para campo form estático
   *
   * @param {string} name
   * @param {string} label
   * @param {string} value
   * @param {array} select
   * @return {html}
   */
  static generateformfield(name, label, value, select = null) {
    let arrayok = false;
    if (Array.isArray(select) && select.length > 1) {
      arrayok = true;
    }
    return `
      <div class="flex flex-col border-2 p-4 border-slate-100 bg-slate-50 
      rounded-md mb-4 ${arrayok ? `formcomponent` : 'staticcomponent'}">
        <label class="uppercase text-slate-400 text-sm">${label}
        ${arrayok ? '<span><i class="fa fa-edit"></i></span>' : ''}
        </label>
        <h4 data-name="${name}" class="formelement font-semibold 
        text-slate-600 text-xl">${value}</h4> 
        ${arrayok ? this.generateselect(select, 'data' + name) : ''}
      </div>`;
  }

  /**
   * Generar html para elemento select
   *
   * @param {array} data
   * @param {string} name
   * @return {html}
   */
  static generateselect(data, name) {
    if (Array.isArray(data) && data.length > 1) {
      return `
      <ul class="absolute border border-blue-400 shadow-lg edit-select
        hidden mt-2 text-sm font-semibold border-0 text-blue-400 
        bg-blue-200 rounded-md uppercase p-4 max-h-64 overflow-scroll"
        name="${name}">
            <li>${data.join('</li><li>')}</li>
      </ul>`;
    } else return '';
  }

  /**
   * remove instance ref from array of parent component
   *
   * @param {string} name
   * @param {string} component
   * @param {string} property
   */
  static removeInstanceRef(name, component, property) {
    const componentref = Controller.getinstance(component);
    const index = componentref[property].findIndex(
        (item) => item.name == name,
    );
    componentref[property].splice(index, 1);
  }

  /**
   * Calcula intervalo medio en dias entre fechas
   *
   * @param {array} datearray
   * @return {number} mediaEnDias
   */
  static getMeanRehear(datearray) {
    if (Array.isArray(datearray) && datearray.length > 1) {
      // Convertir fechas a milisegundos desde el 1 de enero de 1970
      const fechasEnMilisegundos =
          datearray.map((fecha) => new Date(fecha).getTime());
      // Cambiar orden a cronologico (mas antiguo antes)
      fechasEnMilisegundos.reverse();
      // Calcular la diferencia en milisegundos entre fechas consecutivas
      const intervalosEnMilisegundos = [];
      for (let i = 1; i < fechasEnMilisegundos.length; i++) {
        const intervalo = fechasEnMilisegundos[i] - fechasEnMilisegundos[i - 1];
        intervalosEnMilisegundos.push(intervalo);
      }

      // Calcular la media de los intervalos en días
      const mediaEnMilisegundos = intervalosEnMilisegundos
          .reduce((acumulador, valorActual) =>
            acumulador + valorActual, 0) / intervalosEnMilisegundos.length;
      const mediaEnDias = mediaEnMilisegundos / (1000 * 60 * 60 * 24);
      return Math.round(mediaEnDias);
    }
    return null;
  }
}

/**
 * objeto de datos globales
 */
export const Data = {
  // data templates
  template: {
    tunebook: {
      tunes_id: 0,
      user_id: 0,
      preferred_img_url: '',
      prefered_name: '',
      prefered_tone: '',
      status: '',
      learned_date: '',
      rehearsal_days: 0,
      last_rehearsals: [],
      status_num: 0,
    },
    set: {
      user_id: 0,
      tunes: [],
      title: '',
      notes: '',
    },
    suggestion: {
      type_of_suggestion: '',
      user_id: 0,
      content: '',
      status: '',
      notes: '',
    },
  },
  // user data
  user: '',
  // all tunes from back
  tunes: '',
  // tunes in user tunebook
  tunebook: '',
  // sets in user setbook
  setbook: '',
  // all videos from back
  videos: '',
  // some pics to add
  genericpics: '',
  // status para temas por defecto
  status: [
    {value: 1, label: 'Pendiente', color: 'stone-600'},
    {value: 2, label: 'Aprendiendo', color: 'orange-600', times: 10},
    {value: 3, label: 'Acompañar', color: 'yellow-500', days: 15},
    {value: 4, label: 'Básica', color: 'lime-500', days: 30},
    {value: 5, label: 'Fluida', color: 'green-600', days: 45},
    {value: 6, label: 'Dominada', color: 'emerald-900', days: 60},
  ],
  rythms: {
    'Double Jig': '6/8',
    'Single Jig': '6/8',
    'Reel': '4/4',
    'March': '4/4',
    'Hornpipe': '4/4',
    'Slide': '12/8',
    'Slip Jig': '9/8',
    'Polka': '2/4',
    'Mazurka': '4/4',
    'Waltz': '3/4',
  },
  videotypes: [
    'album',
    'live event',
    'tv record',
    'home record',
    'learning',
    'others',
  ],
  tones: {
    'A': 'la',
    'B': 'si',
    'C': 'do',
    'D': 're',
    'E': 'mi',
    'F': 'fa',
    'G': 'sol',
  },
};

/**
 * Clase estática controladora de arranque de app
 * y acceso a componente
 */
export class Controller {
  // elemento donde se instancian componentes
  static htmlelement = document.getElementById('app');

  // objeto con instancias de componentes cargados en DOM
  static screens = {};

  static midiBuffer;
  static player;
  static searchtunes = [];

  /**
   * Checks if component instanced, load if necessary and return ref
   * @param {string} componentname
   * @return {object}
   */
  static getinstance(componentname) {
    if (Object.hasOwn(components, componentname)) {
      if (!Object.hasOwn(Controller.screens, componentname)) {
        Controller.screens[componentname] = new components[componentname](
            componentname,
            Controller.htmlelement,
        );
      } else {
        Controller.screens[componentname].show();
      }
      return Controller.screens[componentname];
    }
  }

  /**
   * Get user details from localstorage or launch login
   */
  static async getuserdetails() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        Data.user = await apis.Xanoapi.getuser(token);
        new components.Mynotification(
            'success',
            'token válido, datos de usuario recuperados.',
        );
        Controller.startapp();
      } catch (error) {
        new components.Mynotification(
            'warning',
            'el token guardado no es válido.',
        );
        localStorage.removeItem('token');
        Controller.getinstance('Login');
      }
    } else {
      // no hay token guardado, mostrar login
      Controller.getinstance('Login');
    }
  }

  /**
   * Load data and launch app menu
   */
  static startapp() {
    Promise.all([
      Controller.loadGenericPics(),
      Controller.loadAlltunes(),
    ]).then(
        (result) => {
          Controller.getinstance('Menubar');
        });
  }

  /**
   * Load generic pics
   */
  static async loadGenericPics() {
    Data.genericpics = await apis.Pexels.initialize();
    if (Data.genericpics && Data.genericpics.length > 0) {
      new components.Mynotification(
          'success',
          `cargadas ${Data.genericpics.length} imagenes genéricas.`,
      );
      return true;
    }
    new components.Mynotification(
        'danger',
        `error al cargar fotos genericas.`,
    );
    throw new Error('error');
  }

  /**
   * Load all available tunes
   */
  static async loadAlltunes() {
    Data.tunes = await apis.Xanoapi.getalltunes();
    if (Data.tunes && Data.tunes.length > 0) {
      // add maintitle to othernames for searchs
      Data.tunes.forEach((tune) => {
        if (tune?.other_names) {
          if (!tune.other_names.includes(tune.main_name)) {
            tune.other_names.push(tune.main_name);
          }
        } else {
          tune.other_names = [tune.main_name];
        }
        if (!tune.sortname || tune.sortname.length == 0) {
          tune.sortname = Utils.titleforsort(tune.main_name);
        }
      });
      new components.Mynotification(
          'success',
          `cargados ${Data.tunes.length} temas.`,
      );
      await Controller.loadUserTunebook();
      return true;
    }
    new components.Mynotification(
        'danger',
        `error al cargar todos los temas.`,
    );
    throw new Error('error');
  }

  /**
   * Load user tunebook
   */
  static async loadUserTunebook() {
    Data.tunebook = await apis.Xanoapi.gettunebook();
    if (Data.tunebook && Data.tunebook.length > 0) {
      // add info from tunes to tunebook
      Data.tunebook.forEach((item) => {
        item.tuneref = Data.tunes.find((tune) => tune.id === item.tunes_id);
        Utils.calcValueforTunes(item);
      });
      new components.Mynotification(
          'success',
          `cargados ${Data.tunebook.length} temas de tu repertorio.`,
      );
      await Controller.loadUserSetbook();
      return true;
    }
    new components.Mynotification(
        'info',
        `no tienes nada en tu repertorio.`,
    );
    return true;
  }

  /**
   * Load user setbook
   */
  static async loadUserSetbook() {
    Data.setbook = await apis.Xanoapi.getsetbook();
    if (Data.setbook && Data.setbook.length > 0) {
      new components.Mynotification(
          'success',
          `cargados ${Data.setbook.length} sets de tu repertorio.`,
      );
      return true;
    }
    new components.Mynotification(
        'info',
        `no tienes ningun set.`,
    );
    return true;
  }
}

/**
 * Class to play ABC tunes
 */
export class ABCplayer {
  static midiBuffer;

  /**
   * Reproducir ABC
   * @param {string} abc
   */
  static playabc(abc) {
    if (abcjs.synth.supportsAudio()) {
      const visualObj = abcjs.renderAbc('*', abc)[0];
      ABCplayer.midiBuffer = new abcjs.synth.CreateSynth();
      ABCplayer.midiBuffer
          .init({
            visualObj: visualObj,
            options: {},
          })
          .then(function(response) {
            ABCplayer.midiBuffer.prime().then(function(response) {
              ABCplayer.midiBuffer.start();
            });
          })
          .catch(function(error) {
            console.warn('Audio problem:', error);
          });
    } else {
      console.warn('Audio not supported');
    }
  }

  /**
   * Detener ABC en curso
   */
  static stopabc() {
    if (ABCplayer.midiBuffer) {
      ABCplayer.midiBuffer.stop();
    }
  }

  /**
   * Generar evento controlador ABC
   *
   * @param {event} event
   */
  static manageabc(event) {
    event.stopPropagation();
    const el = event.currentTarget;
    if (el.dataset.state == 'playing') {
      el.dataset.state = 'stop';
      ABCplayer.stopabc();
      el.querySelector('i').classList.remove('fa-circle-stop');
      el.querySelector('i').classList.add('fa-play-circle');
    } else {
      el.dataset.state = 'playing';
      ABCplayer.playabc(el.dataset.abc);
      el.querySelector('i').classList.remove('fa-play-circle');
      el.querySelector('i').classList.add('fa-circle-stop');
    }
  }
}
