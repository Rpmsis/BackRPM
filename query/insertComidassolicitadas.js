const mysql = require('../database/index');

function insertar (fechacreacion,lunes, martes, miercoles, jueves, viernes, nombre, idcheck, numsemana, callback){
    mysql.query(`Insert into comidas_solicitadas (fechacreacion,lunes, martes, miercoles, jueves, viernes, nombre, idcheck, numsemana) 
        values ("${fechacreacion}", "${lunes}", "${martes}", "${miercoles}", "${jueves}", "${viernes}", "${nombre}", "${idcheck}", "${numsemana}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Se registraron sus platillos"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
