const mysql = require('../database/index');

function insertar ( actividad,fecha,kg,familia, producto, ubicacion,timestandar,hora,minutos, eficiencia,nombre,id,periodo, callback){
    mysql.query(`Insert into actividades (actividad,fecha,kg,familia, producto, ubicacion,timestandar,hora,minutos, eficiencia,responsableact,idcheck,periodo) values 
        ("${actividad}","${fecha}", "${kg}", "${familia}", "${producto}", "${ubicacion}", "${timestandar}","${hora}","${minutos}","${eficiencia}","${nombre}","${id}","${periodo}")`, function(error,respuesta){
        
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
