export class Component{
    // reference to the DOM element rendered
    element = null;

    constructor(name, parentel) {
        // id of the DOM and object name
        this.name = name;
        // reference to the DOM parent element
        this.parentel = parentel;
    }

    attachAt(htmlcontent, replace = true, elem = this.parentel) {
        // if add is false, replace content of elem, if not add at the end
        if (replace) {
            elem.innerHTML = htmlcontent;
        } else {
            elem.insertAdjacentHTML("beforeend", htmlcontent);
        }
        this.element = elem.lastElementChild;
    }

    hide() {
        this.element.classList.add('hidden');
    }
    show() {
        this.element.classList.remove('hidden');
    }
    remove() {
        this.element.remove();
    }
}
