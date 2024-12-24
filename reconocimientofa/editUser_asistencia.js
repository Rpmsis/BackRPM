const mysql = require('../database/index');

function actualizar (id, descrip, foto, callback){
    mysql.query(`Update user_asistencia  set descrip = '${descrip}', foto = '${foto}' WHERE iduser_asistencia = '${id}' `, function(error,respuesta){
        
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