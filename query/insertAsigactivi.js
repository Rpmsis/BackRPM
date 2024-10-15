const mysql = require('../database/index');
const motivo = "";

function insertar (fechacreacion, responsable, fechainicio, empresa, idactividad, status, timeControl, kg, numpersonas, eficacia, eficienciasig, callback){
    mysql.query(`Insert into asigactivi (fechacreacion, responsable, fechainicio, empresa, idactividad, status, timeControl, kgControl, motivo, numpersonas, eficacia, eficienciasig) values ("${fechacreacion}", "${responsable}", "${fechainicio}","${empresa}","${idactividad}","${status}","${timeControl}", "${kg}", "${motivo}", "${numpersonas}", "${eficacia}", "${eficienciasig}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Actividad asignada!"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
