/**
 * abstract class for components
 */
export class Component {
  /**
   * Constructor
   *
   * @param {string} name - The name of the component.
   * @param {HTMLBodyElement} parentel - The parent HTML element.
   * @param {Component} parentComponent - A class extending Component.
   */
  constructor(name, parentel, parentComponent) {
    // id of the DOM and object name
    this.name = name;
    // reference to the DOM parent element
    this.parentel = parentel;
    // reference to the parent Component
    this.parentComponent = parentComponent;
  }

  /**
   * Add html content at specified html element
   * @param {string} htmlcontent
   * @param {boolean} replace
   * @param {HTMLBodyElement} elem
   */
  attachAt(htmlcontent, replace = true, elem = this.parentel) {
    // if replace is true, replace content of elem, if not add at the end
    if (replace) {
      elem.innerHTML = htmlcontent;
    } else {
      elem.insertAdjacentHTML('beforeend', htmlcontent);
    }
    // reference to the DOM element of this component
    /**
     * @type {HTMLBodyElement | null}
     */
    if (elem.lastElementChild) {
      this.element = elem.lastElementChild;
    }
  }

  /**
   * Change all the content of an element keeping the reference
   *
   * @param {*} newhtml
   */
  replace(newhtml) {
    if (this.element instanceof HTMLBodyElement) {
      const clon = this.element.cloneNode(false);
      clon.outerHTML = newhtml;
      this.element = this.parentel.replaceChild(clon, this.element);
    }
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
