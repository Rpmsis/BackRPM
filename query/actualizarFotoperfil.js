const mysql = require('../database/index');

function actualizar (id,foto, callback){

    mysql.query(`Update Alta_Rh  set foto = '${foto}' WHERE idCheck = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  'Comida actualizada'
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar