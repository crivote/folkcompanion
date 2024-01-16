import { Component } from "../abstract.js";

export class Mynotification extends Component {
    typedict = {
        info: {color: 'blue', icon: 'circle-info'},
        danger: {color: 'red', icon: 'circle-exclamation'},
        success: {color: 'green', icon: 'square-check'},
        warning: {color: 'yellow', icon: 'triangle-exclamation'}
    }

    constructor(type, message) {
        const parentelfixed = document.getElementById('notifications');
        super('notification', parentelfixed);
        this.type = type;
        this.message = message;
        this.setup();
    }

    setup() {
        const mycontent = this.generatehtml();
        this.attachAt(mycontent, false);
        this.element.addEventListener('click', this.remove.bind(this));
    }

    generatehtml() {
        const myelements = this.typedict[this.type];
        return `
        <div class="animate__animated animate__fadeInUp notification p-4 mb-4 text-sm text-${myelements.color}-800 rounded-lg bg-${myelements.color}-50" role="${this.type}">
          <i class="fa fa-solid fa-lg fa-${myelements.icon} mr-2"></i><span class="font-medium">${this.message}</span>
        </div>     
        `;
    }
}