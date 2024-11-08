const mysql = require('../database/index');

function mostrar (id, fecha,idasigactivi, callback){
    /* && status != "TERMINADO" */
    mysql.query(` select * from controlactivi where idactividades="${id}" && fecha= "${fecha}" && idasigactivi= "${idasigactivi}" `, function(error,respuesta){
        
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
