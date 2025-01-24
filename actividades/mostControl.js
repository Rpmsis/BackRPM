const mysql = require('../database/index');

function mostrar(callback) {
    mysql.query(`SELECT * FROM controlactivi;`, function (error, respuesta) {

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
