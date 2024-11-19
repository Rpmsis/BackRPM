const mysql = require('../database/indexP');

function mostrar(idactividad,mes, callback) {
    mysql.query(`SELECT responsables,sum(timestandar) as tiempo_total FROM controlactivi where idactividades=${idactividad} && MONTH(fecha) = ${mes} group by responsables;`, function (error, respuesta) {

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
