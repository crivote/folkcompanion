import * as apis from '../services/external/apis.js';
import * as Components from '../components/main/index.js';
import { MyNotification } from '../components/common/notification.js';
import { Data, GlobalStore } from '../data/index.js';
import { titleForSort } from '../services/utils/titleforsort.js';
import { Utils } from '../services/utils/Utils.1.js';
import { Poly } from '../services/polyglot.js';
/**
 * @typedef {import('../data/models/user.js')} XanoUser
 */

/**
 * Clase estática controladora de arranque de app
 * y acceso a componente
 */
export class Controller {
  /**
   * Elemento donde se instancian componentes
   * @type {HTMLElement | null}
   */
  static htmlBaseElement = document.getElementById('app');

  /**
   * Elemento para el menu general
   * @type {HTMLElement | null}
   */
  static menuelement = document.getElementById('menuholder');

  /**
   * Elemento para el componente principal
   * @type {import('src/components/main/type.js').MainComponents}
   */
  static activeMenuComponent;

  /**
   * Load initial data and render components
   */
  static async startapp() {
    await Controller.getuserdetails();
  }

  /**
   * Get user details from localstorage or launch login
   */
  static async getuserdetails() {
    const user = await GlobalStore.user.getUser();
    if (user) {
      Poly.changeLang(user.lang);
      Controller.loadUserData();
    } else {
      Controller.getinstance('Login');
    }
  }

  static async loadUserData() {
    await Controller.loadAlltunes();
    await Controller.loadGenericPics();
    await Controller.loadUserTunebook();
    await Controller.loadUserSetbook();
    Controller.getinstance('Menubar');
  }

  /**
   * Checks if component instanced, load if necessary and return ref
   * @param {string} componentname
   */
  static getinstance(componentname) {
    if (Object.hasOwn(Components, componentname)) {
      const target =
        componentname === 'Menubar'
          ? Controller.menuelement
          : Controller.htmlBaseElement;

      const component = new Components[componentname](componentname, target);
      if (componentname !== 'Menubar') {
        Controller.activeMenuComponent = component;
      }
      return component;
    }
  }

  /**
   * Load generic pics
   */
  static async loadGenericPics() {
    Data.genericpics = await apis.Pexels.initialize();
    if (Data.genericpics && Data.genericpics.length > 0) {
      new MyNotification(
        'success',
        `cargadas ${Data.genericpics.length} imagenes genéricas.`
      );
      return true;
    }
    new MyNotification('danger', `error al cargar fotos genericas.`);
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
          tune.sortname = titleForSort(tune.main_name);
        }
      });
      new MyNotification('success', `cargados ${Data.tunes.length} temas.`);
      return true;
    }
    new MyNotification('danger', `error al cargar todos los temas.`);
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
      new MyNotification(
        'success',
        `cargados ${Data.tunebook.length} temas de tu repertorio.`
      );
      return true;
    }
    new MyNotification('info', `no tienes nada en tu repertorio.`);
    return true;
  }

  /**
   * Load user setbook
   */
  static async loadUserSetbook() {
    Data.setbook = await apis.Xanoapi.getsetbook();
    if (Data.setbook && Data.setbook.length > 0) {
      new MyNotification(
        'success',
        `cargados ${Data.setbook.length} sets de tu repertorio.`
      );
      return true;
    }
    new MyNotification('info', `no tienes ningun set.`);
  }
}
