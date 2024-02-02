import {Component} from '../abstract.js';
import {Controller, Data} from '../startup.js';

/**
 * Class for main menu component
 *
 **/
export class Menubar extends Component {
  pages = [
    {
      tag: 'Gestión temas',
      name: 'Tunemanager',
      role: 'admin',
    },
    {
      tag: 'Gestión videos',
      name: 'Videos',
      role: 'admin',
    },
    {
      tag: 'Peticiones',
      name: 'Suggestions',
      role: 'admin',
    },
    {
      tag: 'Mi repertorio',
      name: 'Tunebook',
      role: 'all',
    },
    {
      tag: 'Mis sets',
      name: 'Setbook',
      role: 'all',
    },
    {
      tag: 'Ensayar',
      name: 'Rehearsallist',
      role: 'all',
    },
    {
      tag: 'Juego',
      name: 'Game',
      role: 'all',
    },
    {
      tag: 'Estadísticas',
      name: 'Stats',
      role: 'all',
    },
  ];

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   */
  constructor(name, parentel) {
    super(name, parentel);
    this.setup();
  }

  /**
   * Setup component
   */
  setup() {
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * Generar html para componente
   *
   * @return {string}
   */
  generatehtml() {
    let menu = '';
    this.pages.forEach((item) => {
      if (item.role == 'all' || item.role == Data.user?.role) {
        menu = menu + `<span class="rounded-t-md px-4 py-2 hover:font-bold" 
        data-nav="${item.name}">${item.tag}</span>`;
      }
    });
    return `
      <header id="${this.name}" class="">
      <div class="menubar flex bg-indigo-700 text-white">

      <nav id="mainnav" class="uppercase flex gap-3 mx-5 
      translate-y-2 text-slate-200">
          ${menu}
      </nav>
      <div class="user ml-auto mr-6">
          <span class="text-slate-400 uppercase bg-slate-50>
          <i class="fa fa-user-circle"></i> ${Data.user.name}</span>
          <span id="logout" title="Cerrar la sesión">
          <i class="fa fa-times-circle fa-2x"></i></span>
      </div>
      </div>
      </header>`;
  }

  /**
   * Añadir listeners de eventos
   */
  addListeners() {
    // logout session
    this.element.querySelector('#logout')
        .addEventListener('click', this.closesession.bind(this));
    // hide active component and show selected
    this.element.querySelectorAll('#mainnav > span').forEach((el) => {
      el.addEventListener('click', this.showcomponent.bind(this));
    });
  }

  /**
   * Mostrar el componente del click
   *
   * @param {event} event
   */
  showcomponent(event) {
    const newitem = event.currentTarget;
    if (!newitem.classList.contains('selected')) {
      const selected = this.element.querySelector('#mainnav .selected');
      if (selected) {
        const selectedcomponent = selected.dataset.nav;
        const oldcomponent = Controller.getinstance(selectedcomponent);
        if (oldcomponent) {
          oldcomponent.hide();
        }
        selected.classList
            .remove('selected', 'font-bold', 'bg-cyan-50', 'text-indigo-900');
      }

      const newitemcomponent = newitem.dataset.nav;
      Controller.getinstance(newitemcomponent);
      newitem.classList
          .add('selected', 'font-bold', 'bg-cyan-50', 'text-indigo-900');
    }
  }

  /**
   * Cerrar la sesión del usuario
   */
  closesession() {
    Data.user = '';
    localStorage.removeItem('token');
    Data.tunebook = '';
    Data.setbook = '';
    this.remove();
    Controller.getuserdetails();
  }
}
