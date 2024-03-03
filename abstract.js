/**
 * abstract class for components
 */
export class Component {
  // reference to the DOM element rendered
  element = null;
  // TODO add reference to parent instance

  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   */
  constructor(name, parentel) {
    // id of the DOM and object name
    this.name = name;
    // reference to the DOM parent element
    this.parentel = parentel;
  }

  /**
   * Add html content at specified html element
   * @param {string} htmlcontent
   * @param {boolean} replace
   * @param {HTMLBodyElement} elem
   */
  attachAt(htmlcontent, replace = true, elem = this.parentel) {
    // if add is false, replace content of elem, if not add at the end
    if (replace) {
      elem.innerHTML = htmlcontent;
    } else {
      elem.insertAdjacentHTML('beforeend', htmlcontent);
    }
    this.element = elem.lastElementChild;
  }

  /**
   * Change all the content of an element keeping the reference
   *
   * @param {*} newhtml
   */
  replace(newhtml) {
    const clon = this.element.cloneNode(false);
    clon.outerHTML = newhtml;
    this.element = this.element.parentNode.replaceChild(clon, this.element);
  }

  /**
   * Hide html element
   */
  hide() {
    this.element.classList.add('hidden');
  }

  /**
   * Show html element
   */
  show() {
    this.element.classList.remove('hidden');
  }

  /**
   * Remove html element
   */
  remove() {
    // TODO: add instance deletion using properties
    this.element.remove();
  }
}
