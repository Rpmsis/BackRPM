const mysql = require('../database/index');
const estatusasis= "ACTIVO";
function insertar (idcheck, nombre, privilegios, contraseña, horainicio, horafin, descanso, horainioMD, horafinMD, userid, callback){
    mysql.query(`Insert into user_asistencia (idcheck, nombre, privilegios, password, horaentrada, horasalida, descanso, horaentradaMD, horasalidaMD, userid, estatusasis) values ("${idcheck}", "${nombre}", "${privilegios}", "${contraseña}", "${horainicio}", "${horafin}", "${descanso}", "${horainioMD}", "${horafinMD}", "${userid}", "${estatusasis}")`, function(error,respuesta){
        
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
