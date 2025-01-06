import * as apis from '../../services/external/apis.js';
import { MyNotification } from '../../components/common/notification.js';
import { Poly } from '../../services/polyglot.js';

const poly = Poly.get();

/**
 * @typedef {import('../models/user.ts').User} User
 */

export class UserStore {
  /** @type {User | undefined} */
  _user;
  /** @type {string | undefined} */
  _token = localStorage.getItem('token');

  /**
   * @returns {Promise<User | undefined>}
   */
  async getUser() {
    if (this._token && !this._user) {
      await this.loadUserToken();
    }
    if (this._user) return this._user;
  }

  /**
   * @param {User} user
   * @returns {Promise<User | undefined>}
   */
  async updateUser(user) {
    if (user) {
      const updatedUser = await apis.Xanoapi.updateUser(user);
      this._user = updatedUser;
      new MyNotification('success', poly.t(`Updated user data`));
      return user;
    }
  }

  /**
   * @returns {Promise<Boolean>}
   */
  async loadUserToken() {
    if (this._token) {
      try {
        /** @type {User} */
        const newuser = await apis.Xanoapi.getuser(this._token);
        this.updateUser(newuser);
        new MyNotification('success', poly.t('token.token_ok'));
        return true;
      } catch (error) {
        localStorage.removeItem('token');
        new MyNotification('warning', poly.t('token.token_ko'));
      }
    }
    return false;
  }

  /**
   * @param {{email: string, password: string}} params
   * @returns {Promise<Boolean>}
   */
  async loadUserLogin(params) {
    if (params) {
      try {
        const { email, password } = params;
        const result = await apis.Xanoapi.authcall(email, password);
        if (result) {
          localStorage.setItem('token', result);
          this._token = result;
          this.loadUserToken();
          return true;
        }
      } catch (error) {
        localStorage.removeItem('token');
        new MyNotification('warning', poly.t('token.token_ko'));
      }
    }
    return false;
  }
}
