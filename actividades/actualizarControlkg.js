const mysql = require('../database/index');

function actualizar (id, kg, callback){

    mysql.query(`Update controlactivi  set kg = '${kg}'  WHERE idcontrolactivi = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Kilos actualizados ' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar