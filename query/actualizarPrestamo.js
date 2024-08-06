const mysql = require('../database/index');

function actualizar (id, cantidad, estatus, callback){
    mysql.query(`Update prestamo  set cantidad = '${cantidad}', estatus = '${estatus}' WHERE idprestamo = '${id}' `, function(error,respuesta){ 
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  "Datos actualizados"
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar