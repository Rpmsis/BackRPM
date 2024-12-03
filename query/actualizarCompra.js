const mysql = require('../database/index');

function actualizar (id,cantidad,preciounitario,valorinventario, callback){

    mysql.query(`Update compras  set cantidad = '${cantidad}',preciounitario = '${preciounitario}', valorinventario = '${valorinventario}'  WHERE idcompras = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Compra actualizada con exito' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar