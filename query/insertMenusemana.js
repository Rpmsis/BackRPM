const mysql = require('../database/index');

function insertar(fecha, fechainicio, numsemana, diasemana, platoentrada, platofuerteA, platofuerteB, bebida, imagen1, imagen2, imagen3, imagen4, callback) {
    mysql.query(`Insert into menusemana (fecha,fechainicio,numsemana,diasemana,platoentrada,platofuerteA,platofuerteB,bebida,imagen1,imagen2,imagen3,imagen4) 
            values ("${fecha}", "${fechainicio}","${numsemana}", "${diasemana}", "${platoentrada}", "${platofuerteA}", "${platofuerteB}","${bebida}","${imagen1}","${imagen2}","${imagen3}","${imagen4}")`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: "Se registro la comida"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar
