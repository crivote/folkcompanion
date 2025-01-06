import { Component } from '../abstract.js';
import { Controller } from '../../controller/startup.js';

/**
 * Login form component class
 */
export class Login extends Component {
  /**
   * Constructor
   *
   * @param {*} name
   * @param {*} parentel
   */
  constructor(name, parentel = Controller.htmlBaseElement) {
    super(name, parentel, null);
    this.setup();
  }

  /**
   * Init component
   */
  setup() {
    const htmlcontent = this.generatehtml();
    this.attachAt(htmlcontent);
    this.element
      .querySelector('#sendlogin')
      .addEventListener('click', this.action.bind(this));
  }

  /**
   * Generate HTML
   *
   * @return {string}
   */
  generatehtml() {
    return `<div id="${this.name}" class="fixed inset-0 bg-gray-500 
    bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-lg w-128">
          <h2 class="text-2xl text-gray-400 font-bold mb-4">${Controller.poly.t('login.title')}</h2>
          <form id="loginform">
            <p class="generalerror"></p>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm mb-1 uppercase" 
              for="email">
               ${Controller.poly.t('login.email')}
              </label>
              <input
                class="w-full px-3 text-black py-2 border rounded-md 
                focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="${Controller.poly.t('login.email')}"
                required
              />
              <span class="emailerror"></span>
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm mb-1 uppercase" 
              for="password">
                ${Controller.poly.t('login.pass')}
              </label>
              <input
                class="w-full px-3 py-2 text-black border rounded-md 
                focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="${Controller.poly.t('login.pass')}"
                required
              />
              <span class="passworderror"></span>
            </div>
            <div class="flex justify-center">
              <button id="sendlogin"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ${Controller.poly.t('login.login')}
              </button>
            </div>
            <p class="newuser">${Controller.poly.t('login.new_user')}</p>
          </form>
        </div>
      </div>`;
  }

  /**
   * Get form elements
   *
   * @return {{ email?: string, password?: string }}
   */
  getformdata() {
    const myform = this.element.querySelector('#loginform').elements;

    return {
      email: myform.email?.value,
      password: myform.password?.value,
    };
  }

  /**
   * Validate fields
   * @param {{ email?: string, password?: string }} data
   * @return {{ email: string, password: string } | undefined}
   */
  checkvalue(data) {
    if (
      data.email &&
      typeof data.email === 'string' &&
      data.password &&
      typeof data.password === 'string'
    ) {
      return { email: data.email, password: data.password };
    }
    if (!data.email) {
      this.element.querySelector('.emailerror').textContent = Controller.poly.t(
        'login.required_mail'
      );
    }
    if (!data.password) {
      this.element.querySelector('.passworderror').textContent =
        Controller.poly.t('login.required_pass');
    }
  }

  /**
   * Validate user
   *
   * @param {event} e
   */
  async action(e) {
    e.preventDefault();
    const data = this.getformdata();
    const testedData = this.checkvalue(data);
    if (testedData) {
      const result = await Controller.data.user.loadUserLogin(testedData);
      if (result) {
        this.remove();
      } else {
        this.element.querySelector('.generalerror').innerHTML =
          `<span class="bg-red-500 text-white p-2">${Controller.poly.t(
            'login.login_error'
          )}</span>`;
      }
    }
  }
}
