const mysql = require('../database/index');

function eliminar (id, callback){
    mysql.query(`DELETE FROM activosfijos WHERE idActfijos = '${id}'`, function(error,respuesta){
        
        if(error){
            
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  'Dato eliminado con el id => ' + respuesta.insertId
            })
        }
        console.log(respuesta);
      });
}

module.exports = eliminar