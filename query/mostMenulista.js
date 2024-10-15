const mysql = require('../database/index');

function mostrar (fechainicio, fechafin,callback){
    mysql.query(`SELECT * FROM menusemana WHERE fechainicio BETWEEN '${fechainicio}' AND '${fechafin}' ORDER BY fechainicio ASC;`, function(error,respuesta){
        
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

