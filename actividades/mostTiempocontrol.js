const mysql = require('../database/index');

function mostrar (idactividades, fecha, callback){
    mysql.query(` select * from controlactivi where fecha= "${fecha}" && idactividades= "${idactividades}"`, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
/*             const todosTerminado = respuesta.every(item => item.status === "TERMINADO");
            // Generar la respuesta
            const resultado = todosTerminado ? respuesta : { "respuesta": [] }; */
            callback(null,{
                respuesta
            })
        }
        //console.log("Qué sucede? " fecha, respuesta);
    });

}
module.exports = mostrar
