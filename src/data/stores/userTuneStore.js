import * as apis from '../../services/external/apis.js';
import { MyNotification } from '../../components/common/notification.js';
import { Poly } from '../../services/polyglot.js';

const poly = Poly.get();

/**
 * @typedef {import('../models/usertune.js').userTune} UserTune
 */

export class UserTuneStore {
  /** @type {UserTune[]} */
  _userTunes = [];
  /** @type {Boolean} */
  _downloadedUserTunes = false;

  async getUserTunes() {
    if (!this._downloadedUserTunes) {
      await this.loadUserTunes();
    }
    return this._userTunes;
  }

  /**
   * @param {number} tuneId
   * @returns {Promise<UserTune>}
   */
  async getUserTune(tuneId) {
    if (!this._downloadedUserTunes) {
      await this.loadUserTunes();
    }
    return this._userTunes.find((tune) => tune.id === tuneId);
  }

  /**
   * @param {UserTune[]} tunes
   */
  setUserTunes(tunes) {
    this._userTunes = tunes;
  }

  /**
   * @returns {Promise<void>}
   */
  async loadUserTunes() {
    const tunes = await apis.Xanoapi.gettunebook();
    if (tunes.length > 0) {
      this.setUserTunes(tunes);
      this._downloadedUserTunes = true;
      new MyNotification(
        'success',
        poly.t(`cargados ${tunes.length} temas del usuario.`)
      );
    }
  }
}
