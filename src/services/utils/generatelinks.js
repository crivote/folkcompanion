/**
 * Crea enlaces html a las referencias externas de datos
 *
 * @param {object[]} data
 * @return {string[]} result
 */
export function generatelinks(data) {
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
