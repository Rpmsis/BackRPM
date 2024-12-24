const mysql = require('../database/index');
const estatusasis= "ACTIVO";
function insertar (idcheck, nombre, horainicio, horafin, descanso, horainioMD, horafinMD,  turno,descrip,foto, callback){
    mysql.query(`Insert into user_asistencia (idcheck, nombre, horaentrada, horasalida, descanso, horaentradaMD, horasalidaMD, estatusasis, turno,descrip,foto) 
        values ("${idcheck}", "${nombre}", "${horainicio}", "${horafin}", "${descanso}", "${horainioMD}", "${horafinMD}", "${estatusasis}", "${turno}", "${descrip}","${foto}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Usuario agregado"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
