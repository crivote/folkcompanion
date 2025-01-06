import { Component } from '../common/abstract.js';
import { Controller } from '../common/startup.js';
import { Data } from '../common/data.js';

/**
 * Class for main menu component
 *
 **/
export class Menubar extends Component {
  pages = [
    {
      tag: Controller.poly.t('menubar.manager'),
      name: 'Tunemanager',
      role: 'admin',
    },
    {
      tag: Controller.poly.t('menubar.videos'),
      name: 'Videos',
      role: 'admin',
    },
    {
      tag: Controller.poly.t('menubar.suggest'),
      name: 'Suggestions',
      role: 'admin',
    },
    {
      tag: Controller.poly.t('menubar.tunebook'),
      name: 'Tunebook',
      role: 'all',
    },
    {
      tag: Controller.poly.t('menubar.sets'),
      name: 'Setbook',
      role: 'all',
    },
    {
      tag: Controller.poly.t('menubar.learn'),
      name: 'Learn',
      role: 'all',
    },
    {
      tag: Controller.poly.t('menubar.practice'),
      name: 'Rehear',
      role: 'all',
    },
    {
      tag: Controller.poly.t('menubar.game'),
      name: 'Game',
      role: 'all',
    },
    {
      tag: Controller.poly.t('menubar.stats'),
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
        menu =
          menu +
          `<span class="menuopt cursor-pointer 
        px-4 py-1 hover:font-bold" 
        data-nav="${item.name}">${item.tag}</span>`;
      }
    });
    return `
      <div class="flex h-full">
      <nav id="mainnav" class="uppercase flex mr-5 
      text-slate-200 text-xs leading-none items-center">
          ${menu}
      </nav>
      <div class="user ml-auto mr-6">
          <span class="text-slate-400 uppercase bg-slate-50>
          <i class="fa fa-user-circle text-white/50 hover:text-white/90"></i>
           ${Data.user.name}</span>
          <span id="logout" title="${Controller.poly.t('menubar.signoff')}">
          <i class="fa fa-times-circle fa-lg"></i></span>
      </div></div>`;
  }

  /**
   * Añadir listeners de eventos
   */
  addListeners() {
    // logout session
    this.element
      .querySelector('#logout')
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
    if (
      newitem instanceof HTMLElement &&
      !newitem.classList.contains('selected')
    ) {
      const selected = this.element.querySelector('.menuopt.selected');
      if (selected) {
        const oldcomponent = Controller.activeMenuComponent;
        if (oldcomponent) {
          oldcomponent.remove();
        }
        selected.classList.remove('selected', 'font-bold', 'bg-white/30'),
          'text-white';
      }

      const newitemcomponent = newitem.dataset.nav;
      Controller.getinstance(newitemcomponent);
      newitem.classList.add(
        'selected',
        'font-bold',
        'bg-white/30',
        'text-white'
      );
    }
  }

  /**
   * Cerrar la sesión del usuario
   */
  closesession() {
    Data.user = '';
    localStorage.removeItem('token');
    Data.tunebook = [];
    Data.setbook = [];
    this.remove();
    Controller.getuserdetails();
  }
}
