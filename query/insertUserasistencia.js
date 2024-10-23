const mysql = require('../database/index');

function insertar (idcheck, nombre, privilegios, contraseña, horainicio, horafin, descanso, userid, callback){
    mysql.query(`Insert into user_asistencia (idcheck, nombre, privilegios, password, horaentrada, horasalida, descanso, userid) values ("${idcheck}", "${nombre}", "${privilegios}", "${contraseña}", "${horainicio}", "${horafin}", "${descanso}", "${userid}")`, function(error,respuesta){
        
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
