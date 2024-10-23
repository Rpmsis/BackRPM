const mysql = require('../database/index');
const motivo= "NA"
function actualizar (id, horafin, estatus, callback){
    mysql.query(`Update asistencia  set horafin = '${horafin}', estatus = '${estatus}', motivo = '${motivo}' WHERE idasistencia = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Asistencia actualizada' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar