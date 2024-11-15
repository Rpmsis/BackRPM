const mysql = require('../database/indexP');

function mostrar(mes, callback) {
    mysql.query(`SELECT * FROM STEELPRO.Tickes where Area_Final= "MANTENIMIENTO INDUSTRIAL"  && MONTH(Fecha_Compromiso) = ${mes};`, function (error, respuesta) {

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
