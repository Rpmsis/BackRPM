const mysql = require('../database/index');

function insertar ( actividad,fecha,kg,familia, producto, ubicacion,timestandar,hora,minutos, callback){
    mysql.query(`Insert into actividades (actividad,fecha,kg,familia, producto, ubicacion,timestandar,hora,minutos) values 
        ("${actividad}","${fecha}", "${kg}", "${familia}", "${producto}", "${ubicacion}", "${timestandar}","${hora}","${minutos}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  respuesta.insertId //'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
