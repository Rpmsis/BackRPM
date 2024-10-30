const mysql = require('../database/index');

function mostrar (dia,callback){
    mysql.query(`SELECT * FROM user_asistencia WHERE descanso NOT LIKE '%${dia}%' && estatusasis != "INACTIVO";`, function(error,respuesta){
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

