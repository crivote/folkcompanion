import * as apis from '../../services/external/apis.js';
import { MyNotification } from '../../components/common/notification.js';
import { Poly } from '../../services/polyglot.js';

const poly = Poly.get();

/**
 * @typedef {import('../models/xanovideo.ts').XanoVideo} XanoVideo
 */

export class VideoStore {
  /** @type {XanoVideo[]} */
  _videos = [];
  /** @type {Boolean} */
  _downloadedVideos = false;

  async getVideos() {
    if (!this._downloadedVideos) {
      await this.loadVideos();
    }
    return this._videos;
  }

  /**
   * @param {number} videoId
   * @returns {Promise<XanoVideo>}
   */
  async getVideo(videoId) {
    if (!this._downloadedVideos) {
      await this.loadVideos();
    }
    return this._videos.find((video) => video.id === videoId);
  }

  /**
   * @param {XanoVideo[]} videos
   */
  setVideos(videos) {
    this._videos = videos;
  }

  /**
   * @param {XanoVideo} video
   * @returns {Promise<XanoVideo | undefined>}
   */
  async addVideo(video) {
    const newvideo = await apis.Xanoapi.addvideo(video);
    if (this._videos) {
      this._videos.push(newvideo);
    } else {
      this.setVideos([newvideo]);
    }
    new MyNotification(
      'success',
      poly.t(`añadido nuevo video ${video.Title}.`)
    );
    return video;
  }

  /**
   * @param {XanoVideo} video
   * @returns {Promise<XanoVideo | undefined>}
   */
  async updateVideo(video) {
    let videoref = await this.getVideo(video.id);
    if (videoref) {
      videoref = video;
      // TODO update video on xano
      new MyNotification(
        'success',
        poly.t(`actualizado video ${video.Title}.`)
      );
      return videoref;
    }
  }

  async loadVideos() {
    const videos = await apis.Xanoapi.getallvideos();
    if (videos.length > 0) {
      this.setVideos(videos);
      this._downloadedVideos = true;
      new MyNotification(
        'success',
        poly.t(`cargados ${videos.length} videos.`)
      );
    }
  }
}
