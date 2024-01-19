import { Component } from "../abstract.js";
import { Data, ABCplayer } from "../startup.js";

export class Game extends Component {
    points;
    turns;
    drawbase;
    rightanswer;

    constructor(name, parentel) {
        super(name, parentel);
        this.setup();
    }

    addListeners() {
        this.element.querySelector('.newgame')
            .addEventListener('click', this.startgame.bind(this));
    }

    async setup() {
        this.turns = 0;
        this.points = 0;
        this.drawbase = Data.tunes.filter(tune => tune.ABCsample && tune.ABCsample.length > 0);

        // generate HTML
        this.attachAt(this.generatehtml(), false);
        this.gamezone = this.element.querySelector('main');
        this.addListeners();
    }

    drawnewtune() {
        const maxnumber = this.drawbase.length;
        const drawing = [];
        let randomnumber, drawedtune;
        for(let i = 1; i < 6 ; i++) {
            randomnumber = Math.floor(Math.random() * (maxnumber + 1));
            drawedtune = { ...this.drawbase[randomnumber]};
            drawing.push(drawedtune);
        }
        return drawing;
    }

    renderquiz(quizdata) {
        this.gamezone.innerHTML = `
        <div class="question relative">
            <div class="flex p-6">
                <div data-abc="${quizdata.abc}" data-state="stop" class="rounded-full playabc h-48 w-48 bg-slate-600 flex text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
                <i class=" m-auto fa fa-circle-play fa-5x"></i>
                </div>
            </div>
            <ul class="options divide-y w-1/2 m-auto border border-slate-200 rounded-md bg-white p-8 shadow-md">
            ${quizdata.names.map(option => `<li class="text-lg p-4 text-center font-medium bg-slate-100 hover:bg-slate-200 cursor-pointer" data-value="${option.id}">${option.name}</li>`).join('')}
            </ul>
        </div>`;
        this.element.querySelector('.playabc')
            .addEventListener('click', ABCplayer.manageabc);
        this.element.querySelectorAll('.options li').forEach(el => {
           el.addEventListener('click', this.checkanswer.bind(this));
        });
    }

    startgame() {
        this.turns = 0;
        this.points = 0;
        this.nextturn();
    }

    barajar(opciones) {
        for (let i = opciones.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
        }
    }

    nextturn() {
        this.turns++;
        this.element.querySelector('.turns').textContent = this.turns + ' intentos';
        this.element.querySelector('.points').textContent = this.points + ' puntos';
        const quizitems = this.drawnewtune();
        this.rightanswer = quizitems[0];
        this.barajar(quizitems);
        const quizdata = {
            abc: this.rightanswer.ABCsample,
            names: quizitems.map(tune => {return{id: tune.id, name: tune.main_name}})
        };
        this.renderquiz(quizdata);
    }

    checkanswer(event) {
        ABCplayer.stopabc();
        event.currentTarget.classList.add('bg-slate-700', 'text-white', 'font-bold');
        const answer = event.currentTarget.dataset.value;
        if (answer == this.rightanswer.id) {
            this.points = this.points + 100;
            this.showresult('right', 'respuesta correcta');
        } else {
            this.showresult('wrong', 'La respuesta correcta es <strong>'+this.rightanswer.main_name+'</strong>');
        }
    }

    showresult(state, text) {
        const htmlcontent = `<div class="animate__animate ${state == 'right' ? 'bg-green-700 animate__bounceIn' : 'bg-red-600 animate__backInDown'} message shadow-xl absolute top-64 p-12 rounded-lg text-3xl text-white left-1/3 right-1/3 text-center">${text}</div>`;
        this.gamezone.insertAdjacentHTML("beforeend", htmlcontent);
        this.gamezone.querySelector('.message').addEventListener('click', this.nextturn.bind(this));
    }

    generatehtml() {
        return `<section id="${this.name}">
        <header class="p-6">
            <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-3xl">Juego</h3>
                    <span class="turns bg-slate-400 text-sm px-2 py-1 uppercase text-slate-200 rounded-lg text-md">
                    ${this.turns} Intentos</span> 
                    <span class="points bg-slate-400 text-sm px-2 py-1 uppercase text-slate-200 rounded-lg text-md">
                    ${this.points} Puntos</span> 
                </h3>
            </div>
            <button class="newgame">Nueva partida</button>
        </header>
        <main class="p-6"></main>
        </section>`;
    }

}
