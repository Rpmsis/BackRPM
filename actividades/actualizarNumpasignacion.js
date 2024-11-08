const mysql = require('../database/index');

function actualizar (id, numpersona,  callback){
    mysql.query(`Update asigactivi  set numpersonas = '${numpersona}' WHERE idasigactivi = '${id}' `, function(error,respuesta){
        
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