import { Data } from './data.js';

/**
 * Utilidades genericas
 */

export class Utils {
  /**
   * Crea enlaces html a las referencias externas de datos
   *
   * @param {*} data
   * @return {string[]} result
   */
  static generatelinks(data) {
    const result = [];
    if (data) {
      data.forEach((item) => {
        let url;
        switch (item?.service_name) {
          case 'thesession.org':
            url = 'https://thesession.org/tunes/' + item.service_ID;
            result.push(
              `<a class="bg-yellow-600 px-2 rounded-full text-sm" 
                href="${url}" target="_blank" title="thesession">TS</a>`
            );
            break;
          case 'irishtune.info':
            url = 'https://www.irishtune.info/tune/' + item.service_ID;
            result.push(
              `<a class="bg-blue-600 px-2 rounded-full text-sm" 
                href="${url}" target="_blank" title="irishtune">IT</a>`
            );
            break;
          case 'tunearch.org':
            url = 'https://tunearch.org/wiki/' + item.service_ID;
            result.push(
              `<a class="bg-red-600 px-2 rounded-full text-sm" 
                href="${url}" target="_blank" title="tunearchive">TA</a>`
            );
            break;
          default:
        }
      });
    }
    return result;
  }

  /**
   * Extract ID from youtubeurl
   *
   * @param {string} url
   * @return {string | null} youtubeId
   */
  static extractYoutubeID(url) {
    const regExp = new RegExp(
      [
        '(?:https?:\\/\\/)?',
        '(?:www\\.)?',
        '(?:youtube\\.com\\/[^\\s]+\\?v=)(\\w{11})|',
        '(?:youtu\\.be\\/(\\w{11}))',
      ].join('')
    );
    const match = url.match(regExp);
    // Si se encontró un ID de YouTube en la URL, devolverlo
    if (match) {
      return match[1] ? match[1] : match[2];
    }
    return null;
  }

  /**
   * Get unique values array
   *
   * @param {any[]} items
   * @return {any[]}
   */
  static getUniqueValues(items) {
    let newitems = [...new Set(items)];
    if (newitems.includes(null)) {
      newitems = newitems.filter((item) => item != null);
      newitems.sort();
    }
    return newitems;
  }

  /**
   * Añade valores extra para temas de repertorio
   *
   * @param {object} tunebookTune
   */
  static calcValueforTunes(tunebookTune) {
    tunebookTune.titlesort = Utils.titleforsort(tunebookTune.prefered_name);
    const firstvaliddate = tunebookTune?.last_rehearsals.find(
      (item) => item !== null && item !== undefined && item !== 0
    );
    tunebookTune.last_rehearsalDate = firstvaliddate ?? 0;
    tunebookTune.meanRehear = Utils.getMeanRehear(tunebookTune.last_rehearsals);
  }

  /**
   * Devuelve versión del nombre para ordenar (sin articulos al inicio)
   *
   * @param {string} title
   * @return {string} title
   */
  static titleforsort(title) {
    title = title.toLowerCase();
    if (title.substring(0, 4) == 'the ') {
      title = title.substring(4);
    } else if (title.substring(0, 2) == 'a ') {
      title = title.substring(2);
    }
    return title;
  }

  /**
   * Devuelve el numero de dias desde una fecha
   *
   * @param {number} mydate
   * @param {boolean} flagdaysonly
   * @return {string | number} totalDias | cadenasalida
   */
  static calctimesince(mydate, flagdaysonly = false) {
    let cadenasalida = '';
    if (typeof mydate == 'number') {
      const now = new Date();
      const prev = new Date(mydate);
      const diferencia = now.valueOf() - prev.valueOf();
      const totalMeses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30));
      if (totalMeses > 0) {
        cadenasalida = cadenasalida.concat('', `${totalMeses}m`);
      }
      const diasRestantes = diferencia % (1000 * 60 * 60 * 24 * 30);
      const totalDias = Math.floor(diasRestantes / (1000 * 60 * 60 * 24));
      if (flagdaysonly) {
        return totalDias;
      }
      if (totalDias > 0) {
        cadenasalida = cadenasalida.concat(' ', `${totalDias}d`);
      }
      const horasRestantes = diasRestantes % (1000 * 60 * 60 * 24);
      const totalHoras = Math.floor(horasRestantes / (1000 * 60 * 60));
      if (totalMeses == 0 && totalHoras > 0) {
        cadenasalida = cadenasalida.concat(' ', `${totalHoras}h`);
      }
      const minutosRestantes = horasRestantes % (1000 * 60 * 60);
      const totalMinutos = Math.floor(minutosRestantes / (1000 * 60));
      if (totalMeses == 0 && totalDias == 0 && totalMinutos > 0) {
        cadenasalida = cadenasalida.concat(' ', `${totalMinutos}min`);
      }
      if (cadenasalida == '') {
        cadenasalida = 'ahora';
      }
    } else {
      cadenasalida = 'nunca';
    }
    return cadenasalida;
  }

  /**
   * Remove white spaces
   *
   * @param {string} text
   * @return {string}
   */
  static removeWhiteSpaces(text) {
    return text.split(' ').join('').toLowerCase();
  }

  /**
   * search for the status object in static Data
   *
   * @param {number} status
   * @return {object}
   */
  static getstatus(status) {
    return Data.status.find((item) => item.value === status);
  }

  /**
   * Convierte fecha a formato ISO datetime
   *
   * @param {Date | undefined} date
   * @param {string} type
   * @return {string}
   */
  static dateformat(date, type = 'short') {
    if (date === undefined) {
      date = new Date();
    } else if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const dateString = date.toISOString();
    const mylength = type == 'short' ? 10 : 16;
    return dateString.substring(0, mylength);
  }

  /**
   * Converts tones to DB structure
   *
   * @param {string[]} array
   * @return {object[]} modes
   */
  static converttones(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    const uniqueTones = [...new Set(array)];
    const modes = uniqueTones.map((item) => {
      const parts = item.trim().split(' ');
      return {
        Key: parts[0].toUpperCase(),
        Mode: parts[1].substring(0, 1).toUpperCase() + parts[1].substring(1),
      };
    });

    return modes;
  }

  /**
   * Genera html para iframe youtube
   *
   * @param {string} key
   * @return {string}
   */
  static videoembed(key) {
    return `
        <div class="aspect-w-16 aspect-h-9">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${key}" 
        title="" frameBorder="0" allow="accelerometer; autoplay; 
        clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
        web-share" allowFullScreen>
        </iframe></div>`;
  }

  /**
   * añadir opciones a un select
   *
   * @param {*} el
   * @param {*} value
   * @param {*} text
   */
  static appendOption(el, value, text) {
    const option = document.createElement('option');
    // Asignar texto y valor al elemento option
    option.value = value;
    option.text = text;
    // Añadir la nueva opción al select
    el.appendChild(option);
  }

  /**
   * poblar filtros select
   *
   * @param {*} el
   * @param {*} tag
   * @param {*} array
   */
  static generatefilteroptions(el, tag, array) {
    el.innerHTML = '';
    Utils.appendOption(el, '', tag);
    array.forEach((value) => {
      Utils.appendOption(
        el,
        Array.isArray(value) ? value[0] : value,
        Array.isArray(value) ? value[1] : value
      );
    });
  }

  /**
   * Genera html para campo form estático
   *
   * @param {string} name
   * @param {string} label
   * @param {string} value
   * @param {array} select
   * @param {boolean} editable
   * @return {string}
   */
  static generateformfield(
    name,
    label,
    value,
    select = null,
    editable = false
  ) {
    let arrayok = false;
    if (Array.isArray(select) && select.length > 1) {
      arrayok = true;
    }
    return `
      <div class="flex flex-col border-2 p-4 border-slate-100 bg-slate-50 
      rounded-md mb-4 ${arrayok ? `formcomponent` : 'staticcomponent'}">
        <label class="uppercase text-slate-400 text-sm">${label}
        ${arrayok ? '<span><i class="fa fa-edit"></i></span>' : ''}
        </label>
        <h4 data-name="${name}" 
        ${editable ? 'contenteditable="true" ' : ''} 
        class="formelement font-semibold 
        text-slate-600 text-xl">${value}</h4> 
        ${arrayok ? this.generateselect(select, 'data' + name) : ''}
      </div>`;
  }

  /**
   * Generar html para elemento select
   *
   * @param {array} data
   * @param {string} name
   * @return {string}
   */
  static generateselect(data, name) {
    if (Array.isArray(data) && data.length > 1) {
      return `
      <ul class="absolute border border-blue-400 shadow-lg edit-select
        hidden mt-2 text-sm font-semibold border-0 text-blue-400 
        bg-blue-200 rounded-md uppercase p-4 max-h-64 overflow-scroll"
        name="${name}">
            <li>${data.join('</li><li>')}</li>
      </ul>`;
    } else return '';
  }

  /**
   * Calcula intervalo medio en dias entre fechas
   *
   * @param {array} datearray
   * @return {number} mediaEnDias
   */
  static getMeanRehear(datearray) {
    if (Array.isArray(datearray) && datearray.length > 1) {
      // Convertir fechas a milisegundos desde el 1 de enero de 1970
      const fechasEnMilisegundos = datearray.map((fecha) =>
        new Date(fecha).getTime()
      );
      // Cambiar orden a cronologico (mas antiguo antes)
      fechasEnMilisegundos.reverse();
      // Calcular la diferencia en milisegundos entre fechas consecutivas
      const intervalosEnMilisegundos = [];
      for (let i = 1; i < fechasEnMilisegundos.length; i++) {
        const intervalo = fechasEnMilisegundos[i] - fechasEnMilisegundos[i - 1];
        intervalosEnMilisegundos.push(intervalo);
      }

      // Calcular la media de los intervalos en días
      const mediaEnMilisegundos =
        intervalosEnMilisegundos.reduce(
          (acumulador, valorActual) => acumulador + valorActual,
          0
        ) / intervalosEnMilisegundos.length;
      const mediaEnDias = mediaEnMilisegundos / (1000 * 60 * 60 * 24);
      return Math.round(mediaEnDias);
    }
    return null;
  }
}
