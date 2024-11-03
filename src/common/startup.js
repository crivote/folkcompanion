import * as apis from './apis.js';
import * as components from '../components/index.js';
import { Data } from './data.js';
import { Utils } from './utils.js';
import Polyglot from 'node-polyglot';
import * as phrases from '../locales/phrases.js';
/**
 * Clase estática controladora de arranque de app
 * y acceso a componente
 */
export class Controller {
  /**
   * Elemento donde se instancian componentes
   * @type {HTMLElement}
   */
  static htmlelement = document.getElementById('app');

  /**
   * Elemento para el menu general
   * @type {HTMLElement}
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
  static poly;

  /**
   * Checks if component instanced, load if necessary and return ref
   * @param {string} componentname
   * @return {object}
   */
  static getinstance(componentname) {
    if (Object.hasOwn(components, componentname)) {
      const target =
        componentname === 'Menubar'
          ? Controller.menuelement
          : Controller.htmlelement;

      const component = new components[componentname](componentname, target);
      if (componentname !== 'Menubar') {
        Controller.activeScreen = component;
      }
      return component;
    }
  }

  /**
   * @typedef {Object} User
   * @property {number} id - The unique identifier for the user.
   * @property {number} created_at - The timestamp of when the user was created.
   * @property {string} name - The name of the user.
   * @property {string} email - The email of the user.
   * @property {string} password - The password of the user.
   * @property {Object} google_oauth - The OAuth information for Google.
   * @property {string} google_oauth.id - The Google ID for OAuth.
   * @property {string} google_oauth.name - The name associated with the Google account.
   * @property {string} google_oauth.email - The email associated with the Google account.
   * @property {"admin" | "user" | "guest"} role - The role of the user.
   * @property {Object} max_scores - The maximum scores of the user.
   * @property {number} max_scores.number_of_questions - The number of questions answered by the user.
   * @property {number} max_scores.points - The points scored by the user.
   * @property {number} max_scores.date - The timestamp of the date of scoring.
   * @property {Object} avatar - The avatar information of the user.
   * @property {string} avatar.access - Access level for the avatar.
   * @property {string} avatar.path - The path to the avatar file.
   * @property {string} avatar.name - The name of the avatar file.
   * @property {string} avatar.type - The type of the avatar file.
   * @property {number} avatar.size - The size of the avatar file in bytes.
   * @property {string} avatar.mime - The MIME type of the avatar file.
   * @property {Object} avatar.meta - Metadata for the avatar.
   * @property {number} avatar.meta.width - The width of the avatar.
   * @property {number} avatar.meta.height - The height of the avatar.
   * @property {string} avatar.url - The URL to access the avatar.
   * @property {string} lang - The language preference of the user.
   * @property {Object} config - Configuration in JSON format.
   */

  /**
   * Get user details from localstorage or launch login
   */
  static async getuserdetails() {
    Controller.poly = new Polyglot({ phrases: phrases.en });
    const token = localStorage.getItem('token');
    if (token) {
      try {
        /** @type {User} */
        const newuser = await apis.Xanoapi.getuser(token);
        Data.user = newuser;
        if (Data.user.lang !== 'en') {
          Controller.poly.replace(phrases.es);
        }
        new components.Mynotification(
          'success',
          Controller.poly.t('token.token_ok')
        );
        Controller.startapp();
      } catch (error) {
        new components.Mynotification(
          'warning',
          Controller.poly.t('token.token_ko')
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
