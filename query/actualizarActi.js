const mysql = require('../database/index');

function actualizar (id, actividad, timestandar,hora,minutos, callback){
    mysql.query(`Update actividades  set actividad = '${actividad}', timestandar = '${timestandar}', hora = '${hora}', minutos = '${minutos}' WHERE idactividades = '${id}' `, function(error,respuesta){
        
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