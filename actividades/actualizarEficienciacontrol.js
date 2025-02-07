const mysql = require('../database/index');

function actualizar (id, eficiencia,  callback){
    mysql.query(`Update controlactivi  set eficienciacontrol = '${eficiencia}' WHERE idcontrolactivi = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Actividad asignada' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar