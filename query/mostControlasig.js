const mysql = require('../database/index');

function mostrar (fecha, callback){
    mysql.query(`SELECT controlactivi.idcontrolactivi, controlactivi.responsables, actividades.actividad FROM controlactivi INNER JOIN actividades on controlactivi.idactividades = actividades.idactividades where controlactivi.fecha = "${fecha}"`, function(error,respuesta){
        
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
        //console.log("Qué sucede? ",empresa, fecha, respuesta);
    });

}
module.exports = mostrar
