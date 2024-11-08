const mysql = require('../database/index');

function mostrar (fecha, responsable, callback){
    mysql.query(` SELECT * FROM asigactivi inner join actividades on asigactivi.idactividad=actividades.idactividades WHERE fechainicio = "${fecha}" && status != "INACTIVO" && responsable= "${responsable}" `, function(error,respuesta){
        
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
