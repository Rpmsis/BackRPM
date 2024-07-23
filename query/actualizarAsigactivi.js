const mysql = require('../database/index');
/* idasigactivi:"",
        fechainicio: "",
        empresa: "",
        idactividad: "",
        status:"", */

function actualizar (idasigactivi, fechainicio, empresa,idactividad,status, motivo, callback){

    mysql.query(`Update asigactivi  set  fechainicio = '${fechainicio}', empresa = '${empresa}', idactividad = '${idactividad}',status = '${status}', motivo = '${motivo}' WHERE idasigactivi = '${idasigactivi}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Asignación actualizada' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar