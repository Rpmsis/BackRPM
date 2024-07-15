const mysql = require('../database/index');

function actualizar (id, unidadmedida,enteros,fracciones,canestandar,tipo,descripcion, callback){

    mysql.query(`Update consumibles  set unidadmedida = '${unidadmedida}', enteros = '${enteros}', fracciones = '${fracciones}', canestandar = '${canestandar}', tipo = '${tipo}', descripcion = '${descripcion}' WHERE idconsumible = '${id}' `, function(error,respuesta){
        
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