/**
 * Extract ID from youtubeurl
 *
 * @param {string} url
 * @return {string | null} youtubeId
 */
export function extractYoutubeID(url) {
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
