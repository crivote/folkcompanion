import {Component} from '../abstract.js';
import {Controller, Data} from '../startup.js';

/**
 * Class for main menu component
 *
 **/
export class Menubar extends Component {
  pages = [
    {
      tag: 'temas',
      name: 'Tunemanager',
      role: 'admin',
    },
    {
      tag: 'videos',
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
      tag: 'Aprender',
      name: 'Learn',
      role: 'all',
    },
    {
      tag: 'Ensayar',
      name: 'Rehear',
      role: 'all',
    },
    {
      tag: 'Juego',
      name: 'Game',
      role: 'all',
    },
    {
      tag: 'Historial',
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
    // launch tunebook
    this.element.querySelector('[data-nav="Tunebook"]').click();
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
        menu = menu + `<span class="menuopt cursor-pointer 
        rounded-t-md px-4 py-2 hover:font-bold" 
        data-nav="${item.name}">${item.tag}</span>`;
      }
    });
    return `
      <div class="flex">
      <nav id="mainnav" class="uppercase flex mr-5 
      translate-y-1 text-slate-200 text-sm leading-none items-end">
          ${menu}
      </nav>
      <div class="user ml-auto mr-6">
          <span class="text-slate-400 uppercase bg-slate-50>
          <i class="fa fa-user-circle text-white/50 hover:text-white/90"></i>
           ${Data.user.name}</span>
          <span id="logout" title="Cerrar la sesión">
          <i class="fa fa-times-circle fa-lg"></i></span>
      </div></div>`;
  }

  /**
   * Añadir listeners de eventos
   */
  addListeners() {
    // logout session
    this.element.querySelector('#logout')
        .addEventListener('click', this.closesession.bind(this));
    // hide active component and show selected
    this.element.querySelectorAll('.menuopt').forEach((el) => {
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
      const selected = this.element.querySelector('.menuopt.selected');
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
