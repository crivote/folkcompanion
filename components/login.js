import {Component} from '../abstract.js';
import {Controller} from '../startup.js';
import * as apis from '../apis.js';


export class Login extends Component {
  constructor(name, parentel) {
    super(name, parentel);
    this.setup();
  }

  setup() {
    const htmlcontent = this.generatehtml();
    this.attachAt(htmlcontent);
    this.element.querySelector('#sendlogin')
        .addEventListener('click', this.action.bind(this));
  }

  generatehtml() {
    return `<div id="${this.name}" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-lg w-128">
          <h2 class="text-2xl text-gray-400 font-bold mb-4">Inicio de Sesión</h2>
          <form id="loginform">
            <span class="generalerror bg-red-500 text-white p-2"></span>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm mb-1 uppercase" for="email">
                Correo Electrónico 
              </label>
              <input
                class="w-full px-3 text-black py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Correo Electrónico"
                required
              />
              <span class="emailerror"></span>
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm mb-1 uppercase" for="password">
                Contraseña
              </label>
              <input
                class="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="Contraseña"
                required
              />
              <span class="passworderror"></span>
            </div>
            <div class="flex justify-center">
              <button id="sendlogin"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>`;
  }

  getformdata() {
    return this.element.querySelector('#loginform').elements;
  };

  checkvalue(data) {
    if (data.email.value &&
            data.password.value) {
      return true;
    }
    if (!data.email.value) {
      this.element.querySelector('.emailerror').textContent = 'Email obligatorio';
    }
    if (!data.password.value) {
      this.element.querySelector('.passworderror').textContent = 'Introduce contraseña';
    }
    return false;
  }

  async action(e) {
    e.preventDefault();
    const data = this.getformdata();
    if (this.checkvalue(data)) {
      try {
        const result = await apis.Xanoapi.authcall(data.email.value, data.password.value);
        if (result) {
          localStorage.setItem('token', result);
          this.remove();
          Controller.getuserdetails();
        } else {
          this.element.querySelector('.generalerror').textContent = 'Error en login';
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
