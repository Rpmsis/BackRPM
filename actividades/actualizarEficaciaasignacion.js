const mysql = require('../database/index');

function actualizar (id, eficacia, eficiencia, estatus,  callback){
    mysql.query(`Update asigactivi  set eficacia = '${eficacia}', eficienciasig = '${eficiencia}', individualkg = '${estatus}' WHERE idasigactivi = '${id}' `, function(error,respuesta){
        
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