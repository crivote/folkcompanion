import * as apis from '../../services/external/apis.js';
import { MyNotification } from '../../components/common/notification.js';
import { Poly } from '../../services/polyglot.js';

const poly = Poly.get();

/**
 * @typedef {import('../models/userset.js').userSet} UserSet
 */

export class UserSetStore {
  /** @type {UserSet[]} */
  _userSets = [];
  /** @type {Boolean} */
  _downloadedUserSets = false;

  async getUserSets() {
    if (!this._downloadedUserSets) {
      await this.loadUserSets();
    }
    return this._userSets;
  }

  /**
   * @param {number} setId
   * @returns {Promise<UserSet>}
   */
  async getUserSet(setId) {
    if (!this._downloadedUserSets) {
      await this.loadUserSets();
    }
    return this._userSets.find((set) => set.id === setId);
  }

  /**
   * @param {UserSet[]} sets
   */
  setUserSets(sets) {
    this._userSets = sets;
  }

  /**
   * @returns {Promise<void>}
   */
  async loadUserSets() {
    const sets = await apis.Xanoapi.gettunebook();
    if (sets.length > 0) {
      this.setUserSets(sets);
      this._downloadedUserSets = true;
      new MyNotification(
        'success',
        poly.t(`cargados ${sets.length} sets del usuario.`)
      );
    }
  }
}
