/**
 * Get unique values array
 *
 * @param {any[]} items
 * @return {any[]}
 */
export function getUniqueValues(items) {
  let newitems = [...new Set(items)];
  if (newitems.includes(null)) {
    newitems = newitems.filter((item) => item != null);
    newitems.sort();
  }
  return newitems;
}
