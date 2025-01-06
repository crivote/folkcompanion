/**
 * Devuelve el numero de dias desde una fecha
 *
 * @param {number} mydate
 * @param {boolean} flagdaysonly
 * @return {string | number} totalDias | cadenasalida
 */

export function calctimesince(mydate, flagdaysonly = false) {
  let cadenasalida = '';
  if (typeof mydate == 'number') {
    const now = new Date();
    const prev = new Date(mydate);
    const diferencia = now.valueOf() - prev.valueOf();
    const totalMeses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30));
    if (totalMeses > 0) {
      cadenasalida = cadenasalida.concat('', `${totalMeses}m`);
    }
    const diasRestantes = diferencia % (1000 * 60 * 60 * 24 * 30);
    const totalDias = Math.floor(diasRestantes / (1000 * 60 * 60 * 24));
    if (flagdaysonly) {
      return totalDias;
    }
    if (totalDias > 0) {
      cadenasalida = cadenasalida.concat(' ', `${totalDias}d`);
    }
    const horasRestantes = diasRestantes % (1000 * 60 * 60 * 24);
    const totalHoras = Math.floor(horasRestantes / (1000 * 60 * 60));
    if (totalMeses == 0 && totalHoras > 0) {
      cadenasalida = cadenasalida.concat(' ', `${totalHoras}h`);
    }
    const minutosRestantes = horasRestantes % (1000 * 60 * 60);
    const totalMinutos = Math.floor(minutosRestantes / (1000 * 60));
    if (totalMeses == 0 && totalDias == 0 && totalMinutos > 0) {
      cadenasalida = cadenasalida.concat(' ', `${totalMinutos}min`);
    }
    if (cadenasalida == '') {
      cadenasalida = 'ahora';
    }
  } else {
    cadenasalida = 'nunca';
  }
  return cadenasalida;
}
