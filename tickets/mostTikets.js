const mysql = require('../database/indexP');

function mostrar(estatus, callback) {
    mysql.query(`SELECT * FROM Tickes where Estatus= "${estatus}" && Area_Final= "TECNOLOGÍAS DE LA INFORMACIÓN";`, function (error, respuesta) {

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

