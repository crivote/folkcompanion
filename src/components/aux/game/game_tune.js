import { Component } from '../abstract.js';
import { ABCplayer } from '../../common/abcplayer.js';
import { Data } from '../../common/data.js';

/**
 * Game component class
 */
export class GameTune extends Component {
  // the current right answer
  rightanswer;
  // time spent answering
  tiempo;
  // puntuacion maxima por acierto
  maxscore;
  questionData;
  /**
   * Constructor
   *
   * @param {string} name
   * @param {HTMLBodyElement} parentel
   */
  constructor(name, parentel, questionData) {
    super(name, parentel);
    this.questionData = questionData;
    this.setup();
  }

  /**
   * setup of component
   */
  setup() {
    this.maxscore = 1000;
    this.audioKO = new Audio('./audio/Sad_Trombone-Joe_Lamb-665429450.mp3');
    this.audioOK = new Audio(
      './audio/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3'
    );

    // generate HTML
    this.attachAt(this.generatehtml(), false);
    this.addListeners();
  }

  /**
   * Generate html content of component
   *
   * @return {string}
   */
  generatehtml() {
    return `<div class="question relative">
    <div class="flex p-6">
        <div data-abc="${this.questionData.abc}" data-state="stop" 
        class="rounded-full playabc h-48 w-48 bg-slate-600 flex 
        text-white/30 hover:text-white/75 m-auto drop-shadow-xl">
        <i class=" m-auto fa fa-circle-play fa-5x"></i>
        </div>
    </div>
    <ul class="options divide-y w-1/2 m-auto border border-slate-200
     rounded-md bg-white p-8 shadow-md">
        ${this.questionData.names
          .map(
            (option) => `<li class="text-lg p-4 
        text-center font-medium bg-slate-100 hover:bg-slate-200 cursor-pointer"
        data-value="${option.id}">${option.name}</li>`
          )
          .join('')}
        </ul>
    </div>`;
  }

  /**
   * add event listeners
   */
  addListeners() {
    this.element
      .querySelector('.playabc')
      .addEventListener('click', this.lanzatiempo.bind(this));
    this.element.querySelectorAll('.options li').forEach((el) => {
      el.addEventListener('click', this.checkanswer.bind(this));
    });
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
   * inicia reproduccion audio y lanza crono respuesta
   *
   * @param {event} event
   */
  lanzatiempo(event) {
    this.tiempo = new Date();
    ABCplayer.manageabc(event);
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
