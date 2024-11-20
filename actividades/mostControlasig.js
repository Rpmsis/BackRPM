const mysql = require('../database/index');

function mostrar (idchecksupervisor, fecha, callback){
    mysql.query(`SELECT controlactivi.idcontrolactivi, controlactivi.idchecksupervisor, tiempo_actividades.idtiempos, asigactivi.idasigactivi, actividades.idactividades ,  controlactivi.responsables, controlactivi.idcheck, actividades.actividad, tiempo_actividades.status as estatusT, asigactivi.status as estatusA, 
                controlactivi.status as estatusC FROM controlactivi INNER JOIN actividades on controlactivi.idactividades = actividades.idactividades 
                INNER JOIN asigactivi on controlactivi.idasigactivi = asigactivi.idasigactivi LEFT JOIN tiempo_actividades on tiempo_actividades.idcontrolactivi= controlactivi.idcontrolactivi 
                where controlactivi.fecha = "${fecha}" && asigactivi.status != "INACTIVO"  && controlactivi.idchecksupervisor="${idchecksupervisor}"`, function(error,respuesta){
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
