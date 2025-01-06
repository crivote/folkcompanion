import { VideoStore } from './stores/videoStore.js';
import { UserStore } from './stores/userStore.js';
import { TuneStore } from './stores/tuneStore.js';
import { UserTuneStore } from './stores/userTuneStore.js';
import { UserSetStore } from './stores/userSetStore.js';

export class GlobalStore {
  static videos = new VideoStore();
  static user = new UserStore();
  static tunes = new TuneStore();
  static userTunes = new UserTuneStore();
  static userSets = new UserSetStore();

  // Load common values for all users

  static async loadAllDataForUser() {
    const user = await GlobalStore.user.getUser();
    if (user) {
      await GlobalStore.tunes.getTunes();
      await GlobalStore.userTunes.getUserTunes();
      await GlobalStore.userSets.getUserSets();
    }
  }
}
