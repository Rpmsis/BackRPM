const mysql = require('../database/index');

function actualizar (folioActivo, cantidad, callback){

    mysql.query(`Update consumibles  set cantidad = '${cantidad}'  WHERE folioActivo = '${folioActivo}' `, function(error,respuesta){
        
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