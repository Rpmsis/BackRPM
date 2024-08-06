const mysql = require('../database/index');

function actualizar (id, estatus, callback){

    mysql.query(`Update controlactivi  set status = '${estatus}'  WHERE idcontrolactivi = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Actividad en '+ estatus //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar