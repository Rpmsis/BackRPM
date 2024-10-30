const mysql = require('../database/index');

function mostrar (callback){
    mysql.query(`SELECT * FROM asistencia inner join user_asistencia on asistencia.idusuario= user_asistencia.userid`, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                respuesta
            })
        }
        //console.log(respuesta);
    });

}
module.exports = mostrar

