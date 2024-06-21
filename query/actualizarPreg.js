const mysql = require('../database/index');

function actualizar (id, pregunta, estatus, callback){
    mysql.query(`Update forms  set preguntas = '${pregunta}', estatus = '${estatus}' WHERE idForms = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar