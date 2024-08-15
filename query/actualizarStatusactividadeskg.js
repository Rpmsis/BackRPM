const mysql = require('../database/index');

function actualizar (idactividades,kg, hora, minutos, timestandar, eficiencia, callback){

    mysql.query(`Update actividades  set kg = '${kg}', hora = '${hora}', minutos = '${minutos}', timestandar = '${timestandar}', eficiencia = '${eficiencia}' WHERE idactividades = '${idactividades}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: "Nuevo tiempo record!!" //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar