/* SELECT * FROM STEELPRO.menusemana WHERE fechainicio BETWEEN CAST('2024-08-17' AS DATE) AND CAST('2024-08-20' AS DATE); */

const mysql = require('../database/index');

function mostrar (fechainicio, fechafinal, callback){
    mysql.query(`SELECT * FROM menusemana WHERE fechainicio BETWEEN CAST('${fechainicio}' AS DATE) AND CAST('${fechafinal}' AS DATE);`, function(error,respuesta){
        
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

