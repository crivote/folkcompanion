import { Component } from "../abstract.js";
import { Controller } from "../startup.js";

export class Menubar extends Component {
    pages = [
        {
            tag: 'Gestión temas',
            name: 'Tunemanager',
            role: 'admin'
        },
        {
            tag: 'Mi repertorio',
            name: 'Tunebook',
            role: 'all'
        },
        {
            tag: 'Mis sets',
            name: 'Setbook',
            role: 'all'
        },
        {
            tag: 'Ensayar',
            name: 'Rehearsallist',
            role: 'all'
        },
        {
            tag: 'Juego',
            name: 'Game',
            role: 'all'
        },
        {
            tag: 'Estadísticas',
            name: 'Stats',
            role: 'all'
        },
    ];

    constructor(name, parentel) {
        super(name, parentel);
        this.user = Controller.user;
        this.setup();
    }

    setup() {
        this.attachAt(this.generatehtml(), false);
        this.element.querySelector('#logout')
            .addEventListener('click', this.closesession.bind(this));
        this.element.querySelectorAll('#mainnav > span').forEach(el => {
            el.addEventListener('click', this.showcomponent.bind(this));
        });
    }

    showcomponent(event) {
        let newitem = event.currentTarget;
        if (!newitem.classList.contains('selected')) {
            let selected = this.element.querySelector('#mainnav .selected');
            if (selected) {
                let selectedcomponent = selected.dataset.nav;
                let oldcomponent = Controller.getinstance(selectedcomponent);
                oldcomponent.hide();
                selected.classList.remove('selected', 'font-bold', 'bg-blue-100', 'text-indigo-900');
            }
            
            let newitemcomponent = newitem.dataset.nav;
            Controller.getinstance(newitemcomponent);
            newitem.classList.add('selected', 'font-bold', 'bg-blue-100', 'text-indigo-900');
        }
    }

    generatehtml() {
        let menu = '';
        this.pages.forEach(item => {
            if (item.role == "all" || item.role == this.user?.role) {
                menu = menu + `<span class="rounded-t-md px-4 py-2 hover:font-bold" data-nav="${item.name}">${item.tag}</span>`
            }
        })

        return `
        <header id="${this.name}" class="">
        <div class="menubar flex bg-indigo-00 text-white px-6 py-2">

        <nav id="mainnav" class="uppercase flex gap-3 mx-5 translate-y-2 text-slate-200">
            ${menu}
        </nav>
        <div class="user ml-auto">
            <span class="text-slate-400 uppercase bg-slate-50><i class="fa fa-user-circle"></i> ${this.user.name}</span>
            <span id="logout" title="Cerrar la sesión"><i class="fa fa-times-circle fa-2x"></i></span>
        </div>
        </div>
        </header>`;
    }

    closesession() {
        Controller.user = '';
        localStorage.removeItem('token');
        this.remove();
        Controller.tunebook.remove();
        Controller.getuserdetails();
    }

}
