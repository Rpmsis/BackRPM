const mysql = require('../database/index');

function actualizar (id, proveedor, monto, Numserie, folioOC, callback){

    mysql.query(`Update insumos  set proveedor = '${proveedor}', monto = '${monto}', Numserie = '${Numserie}', folioOC = '${folioOC}'  WHERE IdInsumos = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Insumo actualizado con éxito' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar