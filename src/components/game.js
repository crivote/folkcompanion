import { Component } from '../common/abstract.js';
import { ABCplayer } from '../common/abcplayer.js';
import { Data } from '../common/data.js';

/**
 * Game component class
 */
export class Game extends Component {
  points;
  turns;
  // all tunes available to play
  drawbase;
  // the current right answer
  rightanswer;
  // time spent answering
  tiempo;
  // numero de opciones
  numoftunes;
  numofturns;
  // puntuacion maxima por acierto
  maxscore;
  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   */
  constructor(name, parentel) {
    super(name, parentel);
    this.setup();
  }

  /**
   * setup of component
   */
  setup() {
    this.turns = 0;
    this.points = 0;
    this.numoftunes = 5;
    this.numofturns = 20;
    this.maxscore = 1000;
    this.audioKO = new Audio('./audio/Sad_Trombone-Joe_Lamb-665429450.mp3');
    this.audioOK = new Audio(
      './audio/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3'
    );

    // select only tunes with ABC
    this.drawbase = Data.tunes.filter(
      (tune) => tune.ABCsample && tune.ABCsample.length > 0
    );
    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.gamezone = this.element.querySelector('main');
    this.addListeners();
  }

  /**
   * Generate html content of component
   *
   * @return {string}
   */
  generatehtml() {
    return `<section id="${this.name}">
    <header class="p-6">
        <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-3xl">Juego</h3>
                <span class="turns bg-slate-400 text-sm px-2 py-1 
                uppercase text-slate-200 rounded-lg text-md">
                ${this.turns} Intentos</span> 
                <span class="points bg-slate-400 text-sm px-2 py-1 
                uppercase text-slate-200 rounded-lg text-md">
                ${this.points} Puntos</span> 
            </h3>
        </div>
        <button class="newgame">Nueva partida</button>
    </header>
    <main class="p-6"></main>
    </section>`;
  }

  /**
   * add event listeners
   */
  addListeners() {
    this.element
      .querySelector('.newgame')
      .addEventListener('click', this.startgame.bind(this));
  }

  /**
   * Start the game reseting values
   */
  startgame() {
    this.turns = 0;
    this.points = 0;
    this.nextturn();
  }

  /**
   * Generates a turn, draws options, set values and call renderer
   */
  nextturn() {
    this.element.querySelector('.turns').textContent = this.turns + ' intentos';
    this.element.querySelector('.points').textContent = this.points + ' puntos';
    if (this.turns == this.numofturns) {
      this.gamezone.innerHTML = '';
      // TODO guardar puntuación máxima en el objeto user
      this.showresult(
        'right',
        `Fin de la partida. Has obtenido ${this.points} 
          puntos en ${this.turns} preguntas.`
      );
    } else {
      const quizitems = this.drawnewtunegroup();
      const quizdata = {
        abc: this.rightanswer.ABCsample,
        names: quizitems.map((tune) => {
          return { id: tune.id, name: tune.main_name };
        }),
      };
      this.renderquiz(quizdata);
    }
  }

  /**
   * Obtener al azar grupo de 5 tunes y setear correcta
   *
   * @return {array}
   */
  drawnewtunegroup() {
    const maxnumber = this.drawbase.length;
    const drawing = [];
    let randomnumber;
    let drawedtune;
    while (drawing.length < this.numoftunes) {
      randomnumber = Math.floor(Math.random() * (maxnumber + 1));
      drawedtune = { ...this.drawbase[randomnumber] };
      if (!drawing.includes(drawedtune)) {
        drawing.push(drawedtune);
      }
    }
    this.rightanswer = drawing[0];
    return this.barajar(drawing);
  }

  /**
   * Renderiza el control audio y las opciones de respuesta
   *
   * @param {array} quizdata
   */
  renderquiz(quizdata) {
    this.gamezone.innerHTML = `
        <div class="question relative">
            <div class="flex p-6">
                <div data-abc="${quizdata.abc}" data-state="stop" 
                class="rounded-full playabc h-48 w-48 bg-slate-600 flex 
                text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
                <i class=" m-auto fa fa-circle-play fa-5x"></i>
                </div>
            </div>
            <ul class="options divide-y w-1/2 m-auto border border-slate-200
             rounded-md bg-white p-8 shadow-md">
            ${quizdata.names
              .map(
                (option) => `<li class="text-lg p-4 
            text-center font-medium bg-slate-100 hover:bg-slate-200 
            cursor-pointer" data-value="${option.id}">${option.name}</li>`
              )
              .join('')}
            </ul>
        </div>`;
    this.element
      .querySelector('.playabc')
      .addEventListener('click', this.lanzatiempo.bind(this));
    this.element.querySelectorAll('.options li').forEach((el) => {
      el.addEventListener('click', this.checkanswer.bind(this));
    });
  }

  /**
   * inicia reproduccion audio y lanza crono respuesta
   *
   * @param {event} event
   */
  lanzatiempo(event) {
    this.tiempo = new Date();
    ABCplayer.manageabc(event);
  }

  /**
   * helper para ordenar elementos
   *
   * @param {array} opciones
   * @return {array}
   */
  barajar(opciones) {
    const nuevoset = [...opciones];
    for (let i = nuevoset.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nuevoset[i], nuevoset[j]] = [nuevoset[j], nuevoset[i]];
    }
    return nuevoset;
  }

  /**
   * Comprobar respuesta y procesar resultado
   *
   * @param {event} event
   */
  checkanswer(event) {
    ABCplayer.stopabc();
    event.currentTarget.classList.add(
      'bg-slate-700',
      'text-white',
      'font-bold'
    );
    const answer = event.currentTarget.dataset.value;
    this.turns++;
    // check time for points
    const tiempoahora = new Date();
    const tiemporespuesta = tiempoahora - this.tiempo;
    if (answer == this.rightanswer.id) {
      this.audioOK.play();
      this.points += Math.max(
        Math.floor(this.maxscore - tiemporespuesta / 100),
        0
      );
      this.showresult('right', 'Has dado la respuesta correcta');
    } else {
      this.audioKO.play();
      this.showresult(
        'wrong',
        'La respuesta correcta es <strong>' +
          this.rightanswer.main_name +
          '</strong>'
      );
    }
  }

  /**
   * mostrar resultado quiz y lanzar nuevo turno
   *
   * @param {string} state
   * @param {string} text
   */
  showresult(state, text) {
    const htmlcontent = `<div class="animate__animate 
    ${
      state == 'right'
        ? 'animate__bounceIn bg-green-700'
        : 'animate__backInDown bg-red-600'
    } 
    message shadow-xl absolute top-64 p-12 rounded-lg text-3xl text-white
    left-1/3 right-1/3 text-center">${text}</div>`;
    // insert message and add listener
    this.gamezone.insertAdjacentHTML('beforeend', htmlcontent);
    this.gamezone
      .querySelector('.message')
      .addEventListener('click', this.nextturn.bind(this));
  }
}
