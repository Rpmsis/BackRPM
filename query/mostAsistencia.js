const mysql = require('../database/index');

function mostrar (fecha,callback){
    mysql.query(`SELECT * FROM asistencia inner join user_asistencia on asistencia.idusuario= user_asistencia.userid where asistencia.fecha="${fecha}";`, function(error,respuesta){
        
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

