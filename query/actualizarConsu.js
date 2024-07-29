const mysql = require('../database/index');

function actualizar (id, cantidad,costo, codigobarras, callback){

    mysql.query(`Update consumibles  set cantidad = '${cantidad}',costo = '${costo}', codigobarras = '${codigobarras}'  WHERE idconsumibles = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Consumible actualizado con exito' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar