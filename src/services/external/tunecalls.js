import { MyNotification } from '../../components/common/notification.js';

/**
 *
 */
export class Tunecalls {
  /**
   * Add to rehearsal count of a tune
   *
   * @param {number} tuneid
   */
  static async addrehearsal(tuneid) {
    let tune = Data.tunebook.find((tune) => tune.id == tuneid);

    // get a backup of tune in case of back error
    const backup = JSON.parse(JSON.stringify(tune));

    // añadir fecha ensayo
    if (!Array.isArray(tune.last_rehearsals)) {
      tune.last_rehearsals = [];
    }
    const now = new Date();
    tune.last_rehearsalDate = now.valueOf();
    tune.last_rehearsals.unshift(tune.last_rehearsalDate);
    if (tune.last_rehearsals.length > 10) {
      tune.last_rehearsals = tune.last_rehearsals.slice(0, 10);
    }

    // sumar nuevo ensayo
    tune.rehearsal_days++;

    const result = await apis.Xanoapi.edittunebooktune(tuneid, tune);

    if (result) {
      Utils.calcValueforTunes(tune);
      new MyNotification(
        'success',
        `añadido nuevo ensayo de ${tune.prefered_name}.`
      );
      return true;
    } else {
      tune = backup;
      new MyNotification('danger', `error al guardar el ensayo.`);
      return false;
    }
  }

  /**
   * Change status of tune
   *
   * @param {number} tuneid
   * @param {number} newStatus
   */
  static async changeStatus(tuneid, newStatus) {
    const tune = Data.tunebook.find((tune) => tune.id == tuneid);
    tune.status_num = newStatus;
    const result = await apis.Xanoapi.edittunebooktune(tuneid, tune);
    const newLabel = Utils.getstatus(newStatus);
    if (result) {
      new MyNotification(
        'success',
        `cambiado status de ${tune.prefered_name} a ${newLabel.label}`
      );
      return true;
    } else {
      new MyNotification('danger', `error al cambiar status.`);
      return false;
    }
  }
}
