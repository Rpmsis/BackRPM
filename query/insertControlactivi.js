const mysql = require('../database/index');

function insertar (idactividades,fecha, responsables, timestandar, kg, lon,  lat, status, idasigactivi,idcheck,idchecksupervisor, callback){
    mysql.query(`Insert into controlactivi (idactividades,fecha, responsables, timestandar, kg, lon,  lat, status, idasigactivi,idcheck,idchecksupervisor) values ("${idactividades}","${fecha}", "${responsables}", "${timestandar}", "${kg}", "${lon}", "${lat}", "${status}", "${idasigactivi}", "${idcheck}", "${idchecksupervisor}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Actividad asignada"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
