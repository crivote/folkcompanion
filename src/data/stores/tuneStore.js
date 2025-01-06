import * as apis from '../../services/external/apis.js';
import { MyNotification } from '../../components/common/notification.js';
import { Poly } from '../../services/polyglot.js';

const poly = Poly.get();

/**
 * @typedef {import('../models/tune.js').Tune} Tune
 */

export class TuneStore {
  /** @type {Tune[]} */
  _tunes = [];
  /** @type {Boolean} */
  _downloadedTunes = false;

  async getTunes() {
    if (!this._downloadedTunes) {
      await this.loadTunes();
    }
    return this._tunes;
  }

  /**
   * @param {number} tuneId
   * @returns {Promise<Tune>}
   */
  async getTune(tuneId) {
    if (!this._downloadedTunes) {
      await this.loadTunes();
    }
    return this._tunes.find((tune) => tune.id === tuneId);
  }

  /**
   * @param {Tune[]} tunes
   */
  setTunes(tunes) {
    this.__tunes = tunes;
  }

  async loadTunes() {
    const tunes = await apis.Xanoapi.getalltunes();
    if (tunes.length > 0) {
      this.setTunes(tunes);
      this._downloadedTunes = true;
      new MyNotification('success', poly.t(`cargados ${tunes.length} videos.`));
    }
  }
}
