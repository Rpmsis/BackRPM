const mysql = require('../database/index');

function actualizar (id, estatus, callback){
    mysql.query(`Update personal_logistica  set estatus = '${estatus}' WHERE idpersonal_logistica = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Actividad actualizada' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar