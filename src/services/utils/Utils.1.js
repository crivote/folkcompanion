import { Data } from '../../data/data.js';
import { titleForSort } from './titleforsort.js';

export class Utils {
  /**
   * Extract ID from youtubeurl
   *
   * @param {string} url
   * @return {string | null} youtubeId
   */

  /**
   * Añade valores extra para temas de repertorio
   *
   * @param {object} tunebookTune
   */
  static calcValueforTunes(tunebookTune) {
    tunebookTune.titlesort = titleForSort(tunebookTune.prefered_name);
    const firstvaliddate = tunebookTune?.last_rehearsals.find(
      (item) => item !== null && item !== undefined && item !== 0
    );
    tunebookTune.last_rehearsalDate = firstvaliddate ?? 0;
    tunebookTune.meanRehear = Utils.getMeanRehear(tunebookTune.last_rehearsals);
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
  static dateformat(date = new Date(), type = 'short') {
    if (!(date instanceof Date)) {
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
