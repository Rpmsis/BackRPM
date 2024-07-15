const mysql = require('../database/index');

/* SELECT insumos.folioInsumos, mantenimiento.folioMant, insumos.tipoAct FROM insumos LEFT JOIN mantenimiento ON insumos.folioInsumos = mantenimiento.folioMant WHERE mantenimiento.folioMant IS NULL AND (insumos.tipoAct = "Herramienta" OR insumos.tipoAct = "Vehículos" OR insumos.tipoAct = "Montacargas" OR insumos.tipoAct = "Maquinaria"); */
function mostrar (callback){
    mysql.query(`SELECT insumos.folioInsumos, mantenimiento.folioMant, insumos.tipoAct, insumos.F_creacion, insumos.Numserie, insumos.descrip FROM insumos LEFT JOIN mantenimiento ON insumos.folioInsumos = mantenimiento.folioMant WHERE mantenimiento.folioMant IS NULL AND (insumos.tipoAct = "Herramienta" OR insumos.tipoAct = "Vehículos" OR insumos.tipoAct = "Montacargas" OR insumos.tipoAct = "Maquinaria")`, function(error,respuesta){
        
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
