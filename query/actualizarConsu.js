const mysql = require('../database/index');

function actualizar(id, cantidad, costo, codigobarras, cantidadslp, costoslp, cantidadqro, costoqro, cantidadvsq, costovsq, cantidad19nt, costo19nt, callback) {

    mysql.query(`Update consumibles  set cantidad = '${cantidad}',costo = '${costo}', codigobarras = '${codigobarras}',
         cantidadslp = '${cantidadslp}', costoslp = '${costoslp}', cantidadqro = '${cantidadqro}', costoqro = '${costoqro}',
          cantidadvsq = '${cantidadvsq}', costovsq = '${costovsq}', cantidad19nt = '${cantidad19nt}', costo19nt = '${costo19nt}'   
        WHERE idconsumibles = '${id}' `, function (error, respuesta) {
        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: 'Consumible actualizado con exito' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
    });

}
module.exports = actualizar