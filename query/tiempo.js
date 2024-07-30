const moment = require('moment');
console.log(moment().format('HH:mm'));

function minutosTranscurridos(desdeHora, hastaHora) {
    // Parsear las horas en formato "HH:mm"
    var desde = desdeHora.split(":");
    var hasta = hastaHora.split(":");
    console.log(desde,hasta);

    // Convertir a minutos desde la medianoche
    var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
    console.log("Minutos hora inicio ",minutosDesde)
    var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
    console.log("Mintos de hora final ",minutosHasta)

    // Si la hora "hasta" es menor que la hora "desde", es porque es del día siguiente
    if (minutosHasta < minutosDesde) {
        minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
    }

    // Calcular la diferencia de minutos
    var diferenciaMinutos = minutosHasta - minutosDesde;

    return diferenciaMinutos;
}

// Ejemplo de uso:
var minutos = minutosTranscurridos("10:55", "14:02");
console.log("Minutos transcurridos:", minutos);
