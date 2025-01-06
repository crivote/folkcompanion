/**
 * Devuelve versión del nombre para ordenar (sin articulos al inicio)
 *
 * @param {string} title
 * @return {string} title
 */
export function titleForSort(title) {
  title = title.toLowerCase();
  if (title.substring(0, 4) == 'the ') {
    title = title.substring(4);
  } else if (title.substring(0, 2) == 'a ') {
    title = title.substring(2);
  }
  return title;
}
