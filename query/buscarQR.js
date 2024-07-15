const mysqlPreg = require('../database/index');
const mysqlRes = require('../database/index');
const moment = require('moment');
const fecha = moment().format("YYYY-MM-DD");

var folioActivo = "";
var filPreg = [];
var filRes = [];

var PregFinal = [];

function mostrarpregunta(folio, callback){
    mysqlPreg.query(`Select idForms,preguntas,periodo,fechaInicio from forms where folioActivo LIKE '%26062401%' && estatus= 'Activo'`, function (error, respuesta) {
    if (error) {
        console.log("Diario: ", error);
        callback(null,{
            mensaje: error
        })
    }
    else {
        /* folio activo */
        folioActivo = "26062401"
        /* Agregar los datos obtenidos al array de filPreg */
        filPreg.push(...respuesta);
        console.log("Fecha del dia= ", fecha);
        respuesta1(filPreg, folioActivo, (error, respuestaPreg) =>{
            if(error){
                return callback(error);
            }else{
                callback(null,{
                    mensaje: respuestaPreg
                });
            }
        });

    }

});

}



function respuesta1(filPreg, folioActivo) {
    /* -----------Respuestas--------------------------*/
    mysqlRes.query(`Select * from respuesta where folioActivo = '${folioActivo}'`, function (error, respuesta) {
        if (error) {
            console.log(error)
        } else {

            filRes.push(...respuesta);
            /* console.log("Preguntas del dia de hoy: ", filPreg); */
            filRes = (filRes.map(filtro => ({
                idRespuesta: filtro.idRespuesta,
                idpregunta: filtro.idPregunta,
                fecha: filtro.fecha
            })))
            diario1(filPreg, filRes);
            semana1(filPreg, filRes);
            quincenal1(filPreg, filRes);
            mensual(filPreg, filRes);
            anual(filPreg, filRes);
        }
    })
    /* ---------------------------------------------- */

}

function diario1(filPreg, filRes) {
    var diario = [];
    var filtroDiario = [];
    diario = filPreg.filter(filt => filt.periodo == "Diario");
    //console.log(diario)
    if (diario) {
        /*fase 1:  Muestra las respuestas y preguntas de la fecha actual */
        filRes = filRes.filter(respuesta => respuesta.fecha === fecha)
        /* console.log("Respuestas: ", filRes); */
        //Envia solo el id para comparar
        const idsRespondidos = filRes.map(respuesta => respuesta.idpregunta);
        /* ---------------------------------------------------------------- */

        /*Fase 2:  Encontrar la pregunta que no ha sido respondida */
        const preguntaNoRespondida = diario.filter(pregunta => !idsRespondidos.includes(pregunta.idForms));
        /* ------------------------------------------------------- */

        /* Fase 3: Agregar al array final las preguntas filtradas */
        filtroDiario = preguntaNoRespondida;
        // Mostrar la pregunta no respondida
        //console.log("Diario", filtroDiario);
        /* -------------------------------------------------------- */

    }
    else {
        console.log("No existen preguntas diarias")
    }
}

function semana1(filPreg, filRes) {
    var semana = [];
    var filtrosemana = [];

    /* Fase 1: obten las preguntas semanales */
    semana = filPreg.filter(filt => filt.periodo == "Semanal")
    //console.log("Semana", semana);
    //console.log("Respuesta",filRes);
    semana = semana.map(filtro2 => ({
        idForms: filtro2.idForms,
        preguntas: filtro2.preguntas,
        periodo: filtro2.periodo,
        fechaInicio: filtro2.fechaInicio
    }))
    /* ----------------------------------------- */

    if (semana) {
        /* Fase 2: Verificar las preguntas que ya fueron contestadas */
        const idsemana = semana.map(item => item.idForms);
        const preguntasContestadas = filRes.filter(respuesta => idsemana.includes(respuesta.idpregunta));
        //console.log("Contestadas",preguntasContestadas)
        /* ------------------------------------------------- */

        /* fase 3: Verificar las preguntas no contestadas y guardarlas en el array final */
        const idrespuestas = filRes.map(item => item.idpregunta);
        filtrosemana = semana.filter(preguntas => !idrespuestas.includes(preguntas.idForms));
        //console.log("No contestadas ",filtrosemana)
        /* -------------------------------------------------------------------------------- */

        if (preguntasContestadas) {
            /* fase 4: Verificar las ultimas fechas de las preguntas que fueron contestadas y almacenarlas en un nuevo array*/
            const ultimasFecha = {};
            // Recorremos las respuestas para obtener las últimas respuestas de cada pregunta
            preguntasContestadas.forEach(respuesta => {
                if (!ultimasFecha[respuesta.idpregunta] || respuesta.fecha > ultimasFecha[respuesta.idpregunta].fecha) {
                    ultimasFecha[respuesta.idpregunta] = respuesta;
                }
            });
            // Convertimos el objeto de últimas respuestas de nuevo a un array
            var ultimasPreguntas = Object.values(ultimasFecha);
            //console.log('Últimas respuestas de cada pregunta:', ultimasPreguntas);
            /* -------------------------------------------------------------------------------------------------------- */


            /* fase 5: Suma dias a las preguntas que fueron respondidas */
            ultimasPreguntas = ultimasPreguntas.map(filtro => ({ Pregunta: filtro.idpregunta, fechaInicio: moment(filtro.fecha).add(7, 'days').format("YYYY-MM-DD") }))
            //console.log('Últimas respuestas de cada pregunta respondida:', ultimasPreguntas);
            /* -------------------------------------------------------------------------------------------- */


            /* fase 6: Función para combinar los arreglos y mostrar la pregunta correspondiente a cada última respuesta */
            const resfilpreg = ultimasPreguntas.map(respuesta => {
                const pregunta = semana.find(item => item.idForms === respuesta.Pregunta);
                return {
                    ...respuesta,
                    pregunta: pregunta ? pregunta.preguntas : 'Pregunta no encontrada'
                };
            });
            /* ------------------------------------------------------------------------------------------------------- */

            /* fase 7: agregar los datos filtrados de las preguntas que fueroon respondidas en el array final de semana */
            filtrosemana.push(...resfilpreg);
            //console.log("filtrosemana ", filtrosemana);
            /* ------------------------------------------------------------------------------------------------------- */

            /* fase 8: comparar que la fecha de inicio de todas las preguntas conincidan con la fecha actual */
            filtrosemana = filtrosemana.filter(filtro => filtro.fechaInicio === fecha);
            //console.log("Semana ", filtrosemana);
            /* .............................................................................................. */

        } else {
            filtrosemana = semana;
            /* fase 8: comparar que la fecha de inicio de todas las preguntas conincidan con la fecha actual */
            filtrosemana = filtrosemana.filter(filtro => filtro.fechaInicio === fecha);
            console.log("Semana ", filtrosemana);
            /* .............................................................................................. */

        }
    }
    else {
        console.log("No existen pregutas semanales")
    }
}

function quincenal1(filPreg, filRes) {
    var quin = [];
    var filtroquincena = [];

    /* Fase 1: Mostrar las preguntas que son quincenales */
    quin = filPreg.filter(filt => filt.periodo == "Quincenal");
    /* console.log(quin) */
    quin = quin.map(filtro2 => ({
        idForms: filtro2.idForms,
        preguntas: filtro2.preguntas,
        periodo: filtro2.periodo,
        fechaInicio: filtro2.fechaInicio
    }))
    /* console.log(quin) */

    /* ------------------------------------------------------ */

    if (quin) {
        /* Fase 2: Mostrar las preguntas que fueron respondidas */
        const idquin = quin.map(item => item.idForms);
        const preguntasContestadas = filRes.filter(respuesta => idquin.includes(respuesta.idpregunta));
        //console.log("Contestadas",preguntasContestadas)
        /* ---------------------------------------------------- */
        if (preguntasContestadas) {
            /* fase 3: Verificar las preguntas no contestadas y guardarlas en el array final */
            const idrespuestas = filRes.map(item => item.idpregunta);
            filtroquincena = quin.filter(preguntas => !idrespuestas.includes(preguntas.idForms));
            //console.log("No contestadas ",filtroquincena)
            /* -------------------------------------------------------------------------------- */

            /* fase 4: Verificar las ultimas fechas de las preguntas que fueron contestadas y almacenarlas en un nuevo array*/
            const ultimasFecha = {};
            // Recorremos las respuestas para obtener las últimas respuestas de cada pregunta
            preguntasContestadas.forEach(respuesta => {
                if (!ultimasFecha[respuesta.idpregunta] || respuesta.fecha > ultimasFecha[respuesta.idpregunta].fecha) {
                    ultimasFecha[respuesta.idpregunta] = respuesta;
                }
            });
            // Convertimos el objeto de últimas respuestas de nuevo a un array
            var ultimasPreguntas = Object.values(ultimasFecha);
            //console.log('Últimas respuestas de cada pregunta:', ultimasPreguntas);
            /* -------------------------------------------------------------------------------------------------------- */

            /* fase 5: Suma dias a las preguntas que fueron respondidas */
            ultimasPreguntas = ultimasPreguntas.map(filtro => ({ Pregunta: filtro.idpregunta, fechaInicio: moment(filtro.fecha).add(14, 'days').format("YYYY-MM-DD") }))
            //console.log('Últimas respuestas de cada pregunta respondida:', ultimasPreguntas);
            /* -------------------------------------------------------------------------------------------- */

            /* fase 6: Función para combinar los arreglos y mostrar la pregunta correspondiente a cada última respuesta */
            const resfilpreg = ultimasPreguntas.map(respuesta => {
                const pregunta = quin.find(item => item.idForms === respuesta.Pregunta);
                return {
                    ...respuesta,
                    pregunta: pregunta ? pregunta.preguntas : 'Pregunta no encontrada'
                };
            });
            /* ------------------------------------------------------------------------------------------------------- */

            /* fase 7: agregar los datos filtrados de las preguntas que fueroon respondidas en el array final de semana */
            filtroquincena.push(...resfilpreg);
            //console.log("filtroquincena ", filtroquincena);
            /* ------------------------------------------------------------------------------------------------------- */

            /* fase 8: comparar que la fecha de inicio de todas las preguntas conincidan con la fecha actual */
            filtroquincena = filtroquincena.filter(filtro => filtro.fechaInicio === fecha);
            //console.log("Quincena ", filtroquincena);
            /* .............................................................................................. */


        } else {
            filtroquincena = quin;
            /* fase 8: comparar que la fecha de inicio de todas las preguntas conincidan con la fecha actual */
            filtroquincena = filtroquincena.filter(filtro => filtro.fechaInicio === fecha);
            console.log("Quincena ", filtroquincena);
            /* .............................................................................................. */

        }

    } else {
        console.log("No existen preguntas quincenales")
    }


}

function mensual(filPreg, filRes) {
    var mes = {};
    var filtromes = {};

    /* fase 1: Obten las preguntas mensuales */
    mes = filPreg.filter(filt => filt.periodo == "Mensual");
    //console.log(mes)
    /* --------------------------------------- */

    if (mes && mes.length >= 0) {
        /* Fase 2: Verificar las preguntas que ya fueron contestadas */
        const idmes = mes.map(item => item.idForms);
        const preguntasContestadas = filRes.filter(respuesta => idmes.includes(respuesta.idpregunta));
        //console.log("Contestadas",preguntasContestadas)
        /* --------------------------------------------------------- */

        /* fase 3: Verificar las preguntas no contestadas y guardarlas en el array final */
        const idrespuestas = filRes.map(item => item.idpregunta);
        filtromes = mes.filter(preguntas => !idrespuestas.includes(preguntas.idForms));
        //console.log("No contestadas ",filtromes)
        /* -------------------------------------------------------------------------------- */

        if (preguntasContestadas && preguntasContestadas.length > 0) {
            /* fase 4: Verificar las ultimas fechas de las preguntas que fueron contestadas y  las almacena en un nuevo array*/
            const ultimasFecha = {};
            // Recorremos las respuestas para obtener las últimas respuestas de cada pregunta
            preguntasContestadas.forEach(respuesta => {
                if (!ultimasFecha[respuesta.idpregunta] || respuesta.fecha > ultimasFecha[respuesta.idpregunta].fecha) {
                    ultimasFecha[respuesta.idpregunta] = respuesta;
                }
            });
            // Convertimos el objeto de últimas respuestas de nuevo a un array
            var ultimasPreguntas = Object.values(ultimasFecha);
            //console.log('Últimas respuestas de cada pregunta:', ultimasPreguntas);
            /* -------------------------------------------------------------------------------------------------------- */

            /* fase 5: Cambia el mes de la fecha de la pregunta por el mes actual */
            var fechames = moment().format('MM');
            ultimasPreguntas = ultimasPreguntas.map((item) => {
                var fechaMoment = moment(item.fecha);
                var fechaA = fechaMoment.format('YYYY');
                var fechaD = fechaMoment.format('DD');
                var nuevaFecha = `${fechaA}-${fechames}-${fechaD}`;
                return {
                    idRespuesta: item.idRespuesta,
                    pregunta: item.idpregunta,
                    fechaInicio: nuevaFecha
                };
            });
            //console.log(" ultimasPreguntas ", ultimasPreguntas);
            /* ---------------------------------------------------------- */

            /* fase 6: Función para combinar los arreglos y mostrar la pregunta correspondiente a cada última respuesta */
            const resfilpreg = ultimasPreguntas.map(respuesta => {
                const pregunta = mes.find(item => item.idForms === respuesta.pregunta);
                return {
                    ...respuesta,
                    idpregunta: pregunta.idForms,
                    pregunta: pregunta ? pregunta.preguntas : 'Pregunta no encontrada',

                };
            });
            /* ------------------------------------------------------------------------------------------------------- */
            //console.log("resfilpreg ",resfilpreg);

            /* Fase 7: Comparar la fecha con la actual para mostrar las preguntas que corresponden */
            filtromes.push(...resfilpreg);
            //console.log("Filtromes ",filtromes);
            filtromes = filtromes.filter(filtro => filtro.fecha === fecha)
            //console.log("Filtromes ",filtromes);
            /* -------------------------------------------------------------------------------------------- */
        }
        else {
            /* Fase 6: Comparar la fecha con la actual para mostrar las preguntas que corresponden */
            filtromes = filtromes.filter(filtro => filtro.fechaInicio === fecha)
            //console.log("Filtromes ",filtromes);
            /* -------------------------------------------------------------------------------------------- */

        }

    } else {
        console.log("No exixten preguntas mensules")
    }
}

function anual(filPreg, filRes) {
    var anual = {};
    var filtroanual = {};

    /* fase 1:  Mostrar las preguntas anuales */
    anual = filPreg.filter(filt => filt.periodo == "Anual");
    //console.log(anual)
    /* ----------------------------------------------------- */

    if (anual && anual.length > 0) {
        /* Fase 2: Verificar las preguntas que ya fueron contestadas */
        const idanual = anual.map(item => item.idForms);
        const preguntasContestadas = filRes.filter(respuesta => idanual.includes(respuesta.idpregunta));
        console.log("Contestadas",preguntasContestadas)
        /* --------------------------------------------------------- */

        /* fase 3: Verificar las preguntas no contestadas y guardarlas en el array final */
        const idrespuestas = filRes.map(item => item.idpregunta);
        filtroanual = anual.filter(preguntas => !idrespuestas.includes(preguntas.idForms));
        //console.log("No contestadas ",filtroanual)
        /* -------------------------------------------------------------------------------- */

        if (preguntasContestadas && preguntasContestadas.length > 0) {
            /* fase 4: Verificar las ultimas fechas de las preguntas que fueron contestadas y  las almacena en un nuevo array*/
            const ultimasFecha = {};
            // Recorremos las respuestas para obtener las últimas respuestas de cada pregunta
            preguntasContestadas.forEach(respuesta => {
                if (!ultimasFecha[respuesta.idpregunta] || respuesta.fecha > ultimasFecha[respuesta.idpregunta].fecha) {
                    ultimasFecha[respuesta.idpregunta] = respuesta;
                }
            });
            // Convertimos el objeto de últimas respuestas de nuevo a un array
            var ultimasPreguntas = Object.values(ultimasFecha);
            //console.log('Últimas respuestas de cada pregunta:', ultimasPreguntas);
            /* -------------------------------------------------------------------------------------------------------- */

            /* fase 5: Cambia el año de la fecha de la pregunta por el año actual */
            var fechayear = moment().format('YYYY');
            console.log(fechayear)
            ultimasPreguntas = ultimasPreguntas.map((item) => {
                var fechaMoment = moment(item.fecha);
                var fechaM = fechaMoment.format('MM');
                var fechaD = fechaMoment.format('DD');
                var nuevaFecha = `${fechayear}-${fechaM}-${fechaD}`;
                return {
                    idRespuesta: item.idRespuesta,
                    pregunta: item.idpregunta,
                    fechaInicio: nuevaFecha
                };
            });
            //console.log(" ultimasPreguntas ", ultimasPreguntas);
            /* ---------------------------------------------------------- */

            /* fase 6: Función para combinar los arreglos y mostrar la pregunta correspondiente a cada última respuesta */
            const resfilpreg = ultimasPreguntas.map(respuesta => {
                const pregunta = anual.find(item => item.idForms === respuesta.pregunta);
                return {
                    ...respuesta,
                    idpregunta: pregunta.idForms,
                    pregunta: pregunta ? pregunta.preguntas : 'Pregunta no encontrada',

                };
            });
            //console.log("resfilpreg ",resfilpreg);
            /* ------------------------------------------------------------------------------------------------------- */
            
            /* Fase 7: Comparar la fecha con la actual para mostrar las preguntas que corresponden */
            filtroanual.push(...resfilpreg);
            //console.log("filtroanual ",filtroanual);
            filtroanual = filtroanual.filter(filtro => filtro.fechaInicio === fecha)
            //console.log("filtroanual ",filtroanual);
            /* -------------------------------------------------------------------------------------------- */


        }
        else {
            /* Fase 6: Comparar la fecha con la actual para mostrar las preguntas que corresponden */
            filtroanual = filtroanual.filter(filtro => filtro.fechaInicio === fecha)
            //console.log("filtroanual ",filtroanual);
            /* -------------------------------------------------------------------------------------------- */

        }
    }
    else {
        console.log("No existen preguntas anuales");
    }



}


module.exports = mostrarpregunta;

