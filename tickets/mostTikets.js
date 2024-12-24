const mysql = require('../database/index');

function mostrar(estatus, callback) {
    mysql.query(`SELECT * FROM STEELPROP.Tickes where Estatus= "${estatus}";`, function (error, respuesta) {

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
        //console.log(respuesta);
    });

}
module.exports = mostrar

