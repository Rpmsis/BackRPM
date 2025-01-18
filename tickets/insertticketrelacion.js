const mysql = require('../database/index');
const motivo = "";
/* BRISA AUZA ROSAS, RPM4bo70oo78aflxnte2cq,TECNOLOGÃAS DE LA INFORMACIÃ“N, 
POR DEFINIR, 26/12/2024, 12:34:19 p. m., PRUEBA TICKET, TECNOLOGÃAS DE LA INFORMACIÃ“N, CREADO, 
NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, NULL, NULL, NULL
 */
function insertar(Creado_Por, Id_Creado, Area, Proceso_Interno, Fecha_Creada, Hora_Creada, Descripcion, Area_Final, Estatus, Folio_de_relacion, callback) {
    mysql.query(`Insert into Tickes (Creado_Por, Id_Creado, Area, Proceso_Interno, Fecha_Creada, Hora_Creada, Descripcion, 
        Area_Final, Archivo_Adjunto, Estatus, Fecha_Atencion, Atendido_por, Cerrado_Por, Adjunto_Solucion, Fecha_De_Cierre, 
        Fecha_Compromiso, Atendio_Fecha_Compromiso, Cancelado_Por, Fecha_de_cancelacion, Motivo_de_Cancelacion, Calificacion, Adjunto_Calificacion, 
        Fecha_De_Calificacion, Calificado_Por, No_Conforme, Gerencia, Fecha_de_autorizacion, Autorizado_Por, 
        Folio_de_relacion) values ("${Creado_Por}","${Id_Creado}","${Area}","${Proceso_Interno}","${Fecha_Creada}", "${Hora_Creada}",
        "${Descripcion}","${Area_Final}","null", "${Estatus}", "null","null","null","null","null","null","null","null","null","null",
        "null","null","null","null","null","null","null","null","${Folio_de_relacion}"
        )`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: "Actividad asignada!"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar
