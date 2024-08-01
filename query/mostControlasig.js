const mysql = require('../database/index');

function mostrar (fecha, callback){
    mysql.query(`SELECT controlactivi.idcontrolactivi, controlactivi.responsables, actividades.actividad, tiempos.status as estatusT, asigactivi.status as estatusA, controlactivi.status as estatusC FROM controlactivi INNER JOIN actividades on controlactivi.idactividades = actividades.idactividades INNER JOIN asigactivi on controlactivi.idasigactivi = asigactivi.idasigactivi LEFT JOIN tiempos on tiempos.idcontrolactivi= controlactivi.idcontrolactivi where controlactivi.fecha = "${fecha}" && asigactivi.status != "INACTIVO";`, function(error,respuesta){
        
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
