const mysql = require('../database/index');

function mostrar (responsable, fecha, callback){
    mysql.query(`SELECT * FROM asigactivi inner join actividades on asigactivi.idactividad = actividades.idactividades WHERE asigactivi.responsable = "${responsable}" && asigactivi.status != "INACTIVO"  && asigactivi.fechainicio >= "${fecha}"`, function(error,respuesta){
        
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

