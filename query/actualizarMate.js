const mysql = require('../database/index');

function actualizar (id, familia, producto,  callback){
    mysql.query(`Update material_actividades  set familia = '${familia}', producto = '${producto}' WHERE idmaterial = '${id}' `, function(error,respuesta){
        
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