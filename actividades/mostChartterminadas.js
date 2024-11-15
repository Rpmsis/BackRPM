const mysql = require('../database/indexP');

function mostrar(responsable, callback) {
    mysql.query(`SELECT  MONTH(fechainicio) AS mes, COUNT(*) as Cantidad
                FROM asigactivi where asigactivi.status="TERMINADO" && asigactivi.responsable="${responsable}"
                GROUP BY MONTH(fechainicio)
                HAVING COUNT(*) > 1;`, function (error, respuesta) {

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
