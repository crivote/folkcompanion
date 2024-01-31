import {Component} from '../abstract.js';

/**
 * Clase para notificaciones al usuario
 */
export class Mynotification extends Component {
  typedict = {
    info: {name: 'info', color: 'blue', icon: 'circle-info'},
    danger: {name: 'danger', color: 'red', icon: 'circle-exclamation'},
    success: {name: 'success', color: 'green', icon: 'square-check'},
    warning: {name: 'warning', color: 'yellow', icon: 'triangle-exclamation'},
  };
  // time to auto remove info notifications
  timeInfoExpires = 2500;

  /**
   * Constructor
   *
   * @param {string} type
   * @param {string} message
   */
  constructor(type, message) {
    const parentelfixed = document.getElementById('notifications');
    super('notification', parentelfixed);
    this.type = this.typedict[type];
    this.message = message;
    this.setup();
  }

  /**
   * setear valores, renderizar contenido y añadir listeners
   * si es informativo, desaparece en tiempo
   */
  setup() {
    const mycontent = this.generatehtml();
    this.attachAt(mycontent, false);
    this.element.addEventListener('click', this.eliminate.bind(this));
    if (this.type.name == 'success' || this.type.name == 'info') {
      setTimeout(this.eliminate.bind(this), this.timeInfoExpires);
    }
  }

  /**
   * Generate html
   *
   * @return {string}
   */
  generatehtml() {
    return `
        <div class="animate__animated animate__fadeInUp notification p-4 
        mb-4 text-sm text-${this.type.color}-800 rounded-lg 
        bg-${this.type.color}-50 text-right" role="${this.type}">
          <i class="fa fa-solid fa-lg fa-${this.type.icon} mr-2"></i>
          <span class="font-medium">${this.message}</span>
        </div>`;
  }

  /**
   * Remove the html element of notification
   *
   */
  eliminate() {
    this.element.classList.remove('animate__fadeInUp');
    this.element.classList.add('animate__backOutRight');
    this.element.addEventListener('animationend', () => {
      this.remove();
    });
  }
}
