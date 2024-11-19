const mysql = require('../database/indexP');

function mostrar(responsable,idactividad,mes, callback) {
    mysql.query(`SELECT sum(timeControl) as tiempo_total, sum(kgControl) as kg_total FROM asigactivi where asigactivi.status!="INACTIVO" && asigactivi.status="TERMINADO" && asigactivi.responsable="${responsable}" && idactividad=${idactividad} && MONTH(fechainicio) = ${mes};`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                respuesta
            })
        }
        //console.log("Qué sucede? " fecha, respuesta);
    });

}
module.exports = mostrar
