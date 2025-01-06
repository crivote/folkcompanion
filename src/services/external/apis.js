import axios from 'axios';

/**
 * @typedef {import('../../data/models/user.ts').User} User
 */

/**
 * clase para Xano DB
 */
export class Xanoapi {
  /**
   * @typedef {Object} XanoVideo
   * @property {number} [id] - Unique identifier of the video.
   * @property {string} [created_at] - Timestamp indicating when the video was created.
   * @property {string} url - URL of the video.
   * @property {string} thumb_url - Thumbnail URL of the video.
   * @property {string} type - Type of the video (enum).
   * @property {string} Title - Title of the video.
   * @property {string} Performer - Performer associated with the video.
   * @property {string} notes - Additional notes about the video.
   * @property {XanoAlbumRelation} [album_relation] - Information about the album relation.
   * @property {XanoTunesLink[]} [tuneslinks] - List of tunes links related to the video.
   */

  /**
   * @typedef {Object} XanoAlbumRelation
   * @property {number} recordings_id - ID of the related recording.
   * @property {number} track - Track number in the album.
   * @property {string} notes - Notes regarding the album relation.
   * @property {string} [Addon] - Additional optional information.
   */

  /**
   * @typedef {Object} XanoTunesLink
   * @property {number} id - Unique identifier of the tune link.
   * @property {string} created_at - Timestamp indicating when the tune link was created.
   * @property {number} tunes_id - ID of the tune.
   * @property {number} videos_id - ID of the associated video.
   * @property {number} timestart - Start time in the video for the tune link.
   * @property {number} timeend - End time in the video for the tune link.
   * @property {string} notes - Notes for the tune link.
   * @property {string} [Addon] - Additional optional information.
   */

  /**
   * @type {string}
   */
  static #url = 'https://x8ki-letl-twmt.n7.xano.io/api:JIBL7nZM/';
  /**
   * @type {string}
   */
  static token;

  /**
   * Autenticar usuario y devuelve token
   *
   * @param {string} user
   * @param {string} pass
   * @return {Promise<string>} token
   */
  static async authcall(user, pass) {
    try {
      const result = await axios.post(`${Xanoapi.#url}auth/login`, {
        email: user,
        password: pass,
      });
      if (result.status == 200) {
        return result.data.authToken;
      }
      Promise.reject(false);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * helper para añadir auth header a peticiones
   *
   * @return {object}
   */
  static returnheader() {
    return {
      headers: {
        Authorization: `Bearer ${Xanoapi.token}`,
      },
    };
  }

  /**
   * Recibe datos del usuario del token
   *
   * @param {string} token
   * @return {Promise<User>} user
   */
  static async getuser(token) {
    Xanoapi.token = token;
    try {
      const result = await axios.get(
        Xanoapi.#url + 'auth/me',
        Xanoapi.returnheader()
      );
      if (result.status == 200) {
        return result.data;
      } else {
        Xanoapi.token = '';
        Promise.reject(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param {User} user
   * @return {Promise<User>} user
   */
  static async updateUser(user) {
    const result = await axios.patch(
      Xanoapi.#url + 'user/' + user.id,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async getsingletune(id) {
    const result = await axios.get(
      Xanoapi.#url + 'tunes/' + id,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async getalltunes() {
    const result = await axios.get(
      Xanoapi.#url + 'tunes',
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async gettunebook() {
    const result = await axios.get(
      Xanoapi.#url + 'tunebook',
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async addtotunes(tune) {
    const result = await axios.post(
      Xanoapi.#url + 'tunes',
      tune,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async deletetune(id) {
    const result = await axios.delete(
      Xanoapi.#url + 'tunes/' + id,
      Xanoapi.returnheader()
    );
    return result.status == 200;
  }

  static async deletetunebooktune(id) {
    const result = await axios.delete(
      Xanoapi.#url + 'tunebook/' + id,
      Xanoapi.returnheader()
    );
    return result.status == 200;
  }

  static async addtotunebook(tune) {
    const result = await axios.post(
      Xanoapi.#url + 'tunebook',
      tune,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async edittune(id, tune) {
    const result = await axios.patch(
      Xanoapi.#url + 'tunes/' + id,
      tune,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async edittunebooktune(id, tune) {
    const result = await axios.patch(
      Xanoapi.#url + 'tunebook/' + id,
      tune,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }
  /**
   *
   * @param {XanoVideo} video
   * @returns {Promise<XanoVideo>}
   */
  static async addvideo(video) {
    const result = await axios.post(
      Xanoapi.#url + 'videos',
      video,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  /**
   *
   * @returns {Promise<XanoVideo[]>}
   */
  static async getallvideos() {
    const result = await axios.get(
      Xanoapi.#url + 'videos',
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  /**
   *
   * @param {number} id
   * @param {XanoVideo} video
   * @returns {Promise<XanoVideo>}
   */
  static async editvideo(id, video) {
    const result = await axios.patch(
      Xanoapi.#url + 'videos/' + id,
      video,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async getsecrets() {
    const result = await axios.get(
      Xanoapi.#url + 'secrets',
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  /**
   * Add a new suggestion
   *
   * @param {object} suggestion
   * @return {Promise<object>}
   */
  static async addsuggestion(suggestion) {
    const result = await axios.post(
      Xanoapi.#url + 'suggestions',
      suggestion,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async getallsuggestions() {
    const result = await axios.get(
      Xanoapi.#url + 'suggestions',
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async editsuggestion(id, suggestion) {
    const result = await axios.patch(
      Xanoapi.#url + 'suggestions/' + id,
      suggestion,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async getsetbook() {
    const result = await axios.get(
      Xanoapi.#url + 'sets',
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async addtosetbook(set) {
    const result = await axios.post(
      Xanoapi.#url + 'sets',
      set,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async editsetbookset(id, set) {
    const result = await axios.patch(
      Xanoapi.#url + 'sets/' + id,
      set,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async addvideotune(data) {
    const result = await axios.post(
      Xanoapi.#url + 'videotunes',
      data,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async editvideotune(id, data) {
    const result = await axios.patch(
      Xanoapi.#url + 'videotunes/' + id,
      data,
      Xanoapi.returnheader()
    );
    return result.status == 200 ? result.data : false;
  }

  static async deletevideotune(id) {
    const result = await axios.delete(
      Xanoapi.#url + 'videotunes/' + id,
      Xanoapi.returnheader()
    );
    return result.status == 200;
  }
}

// Thesession class
export class Thesession {
  static async search(searchstring) {
    let page = 1;
    let asyncall = await this.singlesearch(searchstring, page);
    let result = asyncall.data.tunes;
    let pages = asyncall.data.pages;
    // limite pages if there are too many results
    pages = pages > 3 ? 3 : pages;
    while (page < pages) {
      page++;
      asyncall = await this.singlesearch(searchstring, page);
      result = result.concat(asyncall.data.tunes);
    }
    return result;
  }

  static singlesearch(searchstring, page = 1) {
    const url = `https://thesession.org/tunes/search?q=${searchstring}&format=json&page=${page}`;
    return axios.get(url);
  }

  static async gettune(tuneid) {
    const url = `https://thesession.org/tunes/${tuneid}?format=json`;
    const result = await axios.get(url);
    if (result.status == 200) {
      if (result.data.recordings > 0) {
        const recordings = await this.gettunerecordings(tuneid);
        result.data.recordings = recordings.data.recordings;
      }
      return result.data;
    }
    return false;
  }

  static async gettunerecordings(tuneid) {
    const url = `https://thesession.org/tunes/${tuneid}/recordings?format=json`;
    const result = await axios.get(url);
    return result;
  }
}

// Pexels class
export class Pexels {
  /**
   * @typedef {Object} PexelsPic
   * @property {number} id - Identificador
   * @property {number} width - Ancho
   * @property {number} height - Alto
   * @property {string} url - Url directa
   * @property {string} photographer - Autor
   * @property {string} photographer_url - web Autor
   * @property {number} photographer_id -Id Autor
   * @property {string} avg_color - Color medio en RGB
   * @property {object} src - tamaños alternativos
   * @property {boolean} liked - favorita
   * @property {string} alt - Alto
   */

  /**
   * @type string
   */
  static #token;
  /**
   * @type string
   */
  static #url = 'https://api.pexels.com/v1/';

  /**
   *
   * @param {string} searchstring
   * @param {number} number
   * @returns {Promise<string[]>}
   */
  static async search(searchstring, number = 5) {
    const result = await axios.get(
      Pexels.#url + 'search?query=' + searchstring + '&per_page=' + number,
      {
        headers: {
          Authorization: Pexels.#token,
        },
      }
    );
    if (result.status == 200) {
      /** @type    * @typedef {Object} PexelsPic[] */
      const photos = result.data.photos;
      /** @type string[] */
      const response = photos.map((pic) => pic.src.large);
      return response;
    } else {
      return [];
    }
  }

  /**
   * Initialize api call to pexels
   *
   * @returns {Promise<string[]>}
   */
  static async initialize() {
    const secrets = await Xanoapi.getsecrets();
    const Pexelsrecord = secrets.find((item) => item.name == 'pexels');
    Pexels.#token = Pexelsrecord.value;
    const firstresult = await Pexels.search('folk music europe');
    return firstresult;
  }
}
