const mysql = require('../database/index');

function mostrar (empresa, fecha, callback){
    mysql.query(`SELECT * FROM asigactivi inner join actividades on asigactivi.idactividad = actividades.idactividades WHERE asigactivi.empresa = "${empresa}" && asigactivi.status != "INACTIVO" && asigactivi.fechainicio = "${fecha}";`, function(error,respuesta){
        
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

