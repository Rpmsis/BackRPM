const mysql = require('../database/index');
//`nombre`,`puesto`,`estatus`
function insertar(nombre, puesto, callback) {
    mysql.query(`Insert into personal_logistica (nombre, puesto) values 
        ("${nombre}","${puesto}")`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: "Se agrego a la lista." //'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar
