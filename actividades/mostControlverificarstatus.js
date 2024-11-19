const mysql = require('../database/index');

function mostrar(responsable,fecha, callback) {
    mysql.query(`SELECT * FROM controlactivi where responsables="${responsable}" && fecha="${fecha}" && status="EN PROCESO" || status="EN PAUSA";`, function (error, respuesta) {

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
    });

}
module.exports = mostrar
