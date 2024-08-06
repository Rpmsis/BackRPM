const mysql = require('../database/index');

function mostrar (responsable,callback){
    mysql.query(`SELECT * FROM prestamo WHERE responsable="${responsable}" && estatus="PRESTAMO" && cantidad>=1`, function(error,respuesta){
        
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

