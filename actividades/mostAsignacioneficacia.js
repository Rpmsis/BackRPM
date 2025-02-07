const mysql = require('../database/index');

function mostrar (callback){
    mysql.query(`SELECT * FROM asigactivi inner join actividades on asigactivi.idactividad = actividades.idactividades WHERE asigactivi.status != "INACTIVO";`, function(error,respuesta){
        
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

