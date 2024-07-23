const mysql = require('../database/index');

function eliminar (id, callback){
    mysql.query(`DELETE FROM usuarioprov WHERE idusuarioprov = '${id}'`, function(error,respuesta){
        
        if(error){
            
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  'Datos guardados correctamente.'//'Dato eliminado con el id => ' + respuesta.insertId
            })
        }
        console.log(respuesta);
      });
}

module.exports = eliminar