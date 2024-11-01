import * as apis from './common/apis.js';
import * as components from './components/index.js';
import { Data } from './common/Data.js';
import { Utils } from './common/Utils.js';

/**
 * Clase estática controladora de arranque de app
 * y acceso a componente
 */
export class Controller {
  /**
   * Elemento donde se instancian componentes
   * @type {HTMLBodyElement}
   */
  static htmlelement = document.getElementById('app');

  /**
   * Elemento para el menu general
   * @type {HTMLBodyElement}
   */
  static menuelement = document.getElementById('menuholder');

  // objeto con instancias de componentes cargados en DOM
  /**
   * Elemento para el menu general
   * @type {components}
   */
  static activeScreen;

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
      if (componentname === 'Menubar') {
        return new components['Menubar']('Menubar', Controller.menuelement);
      }
      Controller.activeScreen = new components[componentname](
        componentname,
        Controller.htmlelement
      );
      return Controller.activeScreen;
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
          'token válido, datos de usuario recuperados.'
        );
        Controller.startapp();
      } catch (error) {
        new components.Mynotification(
          'warning',
          'el token guardado no es válido.'
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
  static async startapp() {
    await Controller.loadAlltunes();
    Controller.getinstance('Menubar');
  }

  /**
   * Load generic pics
   */
  static async loadGenericPics() {
    Data.genericpics = await apis.Pexels.initialize();
    if (Data.genericpics && Data.genericpics.length > 0) {
      new components.Mynotification(
        'success',
        `cargadas ${Data.genericpics.length} imagenes genéricas.`
      );
      return true;
    }
    new components.Mynotification('danger', `error al cargar fotos genericas.`);
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
        `cargados ${Data.tunes.length} temas.`
      );
      await Controller.loadUserTunebook();
      return true;
    }
    new components.Mynotification('danger', `error al cargar todos los temas.`);
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
        `cargados ${Data.tunebook.length} temas de tu repertorio.`
      );
      await Controller.loadUserSetbook();
      return true;
    }
    new components.Mynotification('info', `no tienes nada en tu repertorio.`);
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
        `cargados ${Data.setbook.length} sets de tu repertorio.`
      );
      return true;
    }
    new components.Mynotification('info', `no tienes ningun set.`);
    return true;
  }

  /**
   * Add to rehearsal count of a tune
   *
   * @param {number} tuneid
   */
  static async addrehearsal(tuneid) {
    let tune = Data.tunebook.find((tune) => tune.id == tuneid);

    // get a backup of tune in case of back error
    const backup = JSON.parse(JSON.stringify(tune));

    // añadir fecha ensayo
    if (!Array.isArray(tune.last_rehearsals)) {
      tune.last_rehearsals = [];
    }
    const now = new Date();
    tune.last_rehearsalDate = now.valueOf();
    tune.last_rehearsals.unshift(tune.last_rehearsalDate);
    if (tune.last_rehearsals.length > 10) {
      tune.last_rehearsals = tune.last_rehearsals.slice(0, 10);
    }

    // sumar nuevo ensayo
    tune.rehearsal_days++;

    const result = await apis.Xanoapi.edittunebooktune(tuneid, tune);

    if (result) {
      Utils.calcValueforTunes(tune);
      new components.Mynotification(
        'success',
        `añadido nuevo ensayo de ${tune.prefered_name}.`
      );
      return true;
    } else {
      tune = backup;
      new components.Mynotification('danger', `error al guardar el ensayo.`);
      return false;
    }
  }

  /**
   * Change status of tune
   *
   * @param {number} tuneid
   * @param {number} newStatus
   */
  static async changeStatus(tuneid, newStatus) {
    const tune = Data.tunebook.find((tune) => tune.id == tuneid);
    tune.status_num = newStatus;
    const result = await apis.Xanoapi.edittunebooktune(tuneid, tune);
    const newLabel = Utils.getstatus(newStatus);
    if (result) {
      new components.Mynotification(
        'success',
        `cambiado status de ${tune.prefered_name} a ${newLabel.label}`
      );
      return true;
    } else {
      new components.Mynotification('danger', `error al cambiar status.`);
      return false;
    }
  }
}
