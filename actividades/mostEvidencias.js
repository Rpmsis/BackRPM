const mysql = require('../database/index');

function mostrar (fecha,idasigactivi, callback){
    /* && status != "TERMINADO" */
    mysql.query(` select * from evidencia_act where  fecha= "${fecha}" && idasigactivi= "${idasigactivi}" `, function(error,respuesta){
        
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
        //console.log("Qué sucede? " fecha, respuesta);
    });

}
module.exports = mostrar
