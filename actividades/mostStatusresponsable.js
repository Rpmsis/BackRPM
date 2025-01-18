const mysql = require('../database/index');

function mostrar ( callback){
    /* && status != "TERMINADO" */
    mysql.query(` select * from controlactivi; `, function(error,respuesta){
        
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
