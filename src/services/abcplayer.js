import abcjs from 'https://cdn.jsdelivr.net/npm/abcjs@6.2.3/+esm';

/**
 * Class to play ABC tunes
 */

export class ABCplayer {
  static midiBuffer;

  /**
   * Reproducir ABC
   * @param {string} abc
   */
  static playabc(abc) {
    const clean = abc.replace(/!/g, '\n');
    if (abcjs.synth.supportsAudio()) {
      const visualObj = abcjs.renderAbc('*', clean)[0];
      ABCplayer.midiBuffer = new abcjs.synth.CreateSynth();
      ABCplayer.midiBuffer
        .init({
          visualObj: visualObj,
          options: {},
        })
        .then(function () {
          ABCplayer.midiBuffer.prime().then(function () {
            ABCplayer.midiBuffer.start();
          });
        })
        .catch(function (error) {
          console.warn('Audio problem:', error);
        });
    } else {
      console.warn('Audio not supported');
    }
  }

  /**
   * Detener ABC en curso
   */
  static stopabc() {
    if (ABCplayer.midiBuffer) {
      ABCplayer.midiBuffer.stop();
    }
  }

  /**
   * Generar evento controlador ABC
   *
   * @param {Event} event
   */
  static manageabc(event) {
    event.stopPropagation();
    const el = event.currentTarget;
    if (el instanceof HTMLBodyElement) {
      const musicData = el.dataset.abc;
      const controller = el.querySelector('i');
      if (musicData && controller) {
        if (el.dataset.state == 'playing') {
          el.dataset.state = 'stop';
          ABCplayer.stopabc();
          controller.classList.remove('fa-circle-stop');
          controller.classList.add('fa-play-circle');
        } else {
          el.dataset.state = 'playing';
          ABCplayer.playabc(musicData);
          controller.classList.remove('fa-play-circle');
          controller.classList.add('fa-circle-stop');
        }
      }
    }
  }
}
