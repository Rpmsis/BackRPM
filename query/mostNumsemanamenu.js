/* SELECT * FROM STEELPRO.menusemana WHERE fechainicio BETWEEN CAST('2024-08-17' AS DATE) AND CAST('2024-08-20' AS DATE); */

const mysql = require('../database/index');

function mostrar (callback){
    mysql.query(`SELECT numsemana FROM menusemana where numsemana IS NOT NULL GROUP BY numsemana HAVING COUNT(*) > 0 ORDER BY numsemana ASC;`, function(error,respuesta){
        
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

