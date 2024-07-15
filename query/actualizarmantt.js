const mysql = require('../database/index');

function actualizar (id, ubicacion, callback){
    mysql.query(`Update mantenimiento  set idubicacion = '${ubicacion}' WHERE idMantenimiento = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: "Todo bien" //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar