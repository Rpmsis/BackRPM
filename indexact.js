const express = require('express')
const cors = require('cors');
const moment = require('moment');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');
const Fido2Lib = require('fido2-lib');
const faceapi = require('face-api.js');
const canvas = require('canvas');

//Hoja de actforaneas
const mostubi = require('./actividades/mostUbi');
const mostActif = require('./actividades/mostActvif');
const mostMaterial = require('./actividades/mostMaterial');
const inserActif = require('./actividades/insertActif');
const insertarMaterial = require('./actividades/insertMaterial');
const editActividades = require('./actividades/actualizarActividades');


//Hoja actdiarias
const mostStatusresponsable = require('./actividades/mostStatusresponsable'); //APUNTA A PRODUCCION (31/ene/2025))
const mostEvidencias = require('./actividades/mostEvidencias');
const mostControl = require('./actividades/mostControl');


//Hoja de asignacion
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
const mostAsignacion = require('./actividades/mostAsignactivi'); //APUNTA A PRODUCCION (31/ene/2025))
const insertarAsigactivi = require('./actividades/insertAsigactivi');
const editAsignacion = require('./actividades/actualizarAsigactivi');

//Hoja de control
/* MODIFICADO CAMBIOS DEL 2024-11-20 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
//const mostControlasignados = require('./actividades/mostControlasig'); (ELIMINADO PORQUE YA NO SE UTILIZA  29-01-2025)
const mostIdusuario = require('./actividades/mostIdusuario'); //APUNTA A PRODUCCION
const insertarControlactivi = require('./actividades/insertControlactivi');
const mostNumpersonas = require('./actividades/mostAsigactivinumpersonas');
const editNumpersonas = require('./actividades/actualizarNumpasignacion');
const mostIdcheck = require('./actividades/mostIdcheck');
const mostPDM = require('./actividades/mostPDM'); //APUNTA A PRODUCCION
const mostControlactivi = require('./actividades/mostControlactivi');
const mostIdusuarioPMateriales = require('./actividades/mostIdusuarioPMateriales'); //APUNTA A PRODUCCION


//Hoja de editeficienciakg
const mostEficienciakg = require('./actividades/mostEficienciakg');
const editStatusasignacion = require('./actividades/actualizarStatusasignacion');
const editEficacia = require('./actividades/actualizarEficaciaasignacion');
const editStatusactividadesKg = require('./actividades/actualizarStatusactividadeskg');
const mostAsignaciones = require('./actividades/mostAsignaciones');
const editControlkg = require('./actividades/actualizarControlkg');

//Hoja porusuario
/* MODIFICADO CAMBIOS DEL 2024-11-20 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
const mostControlresponsable = require('./actividades/mostControlresponsable');

const insertarTiempos = require('./actividades/insertTiempos');
const editControlstatus = require('./actividades/actualizarControlstatus');
const mostTiempocontrol = require('./actividades/mostTiempocontrol');
const mostTiempoactivi = require('./actividades/mostTiempoactivi');
const editStatustiempo = require('./actividades/actualizarStatustiempo');
const editStatuscontrol = require('./actividades/actualizarStatuscontrol');
const editStatusactividadesT = require('./actividades/actualizarStatusactividades');
const archivo_evidencias = require('./actividades/archivo_evidencias');
const insertarEvidencia = require('./actividades/insertEvidencia');
/* MODIFICADO CAMBIOS DEL 2024-11-20 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
const mostVerificarstatus = require('./actividades/mostControlverificarstatus');
const editEficienciacontrol = require('./actividades/actualizarEficienciacontrol');

//Hoja pdm
const editpdm = require('./actividades/actualizarpdm'); //APUNTA A PRODUCCION

//Hoja graficas/grafico
const mostActasignadasmes = require('./actividades/mostChartasignadas');
const mostActterminadasmes = require('./actividades/mostChartterminadas');
const mostAsigactivi_mes = require('./actividades/mostChartasigactivi_mes');
const mostControl_mes = require('./actividades/mostChartcontrol_mes');

//Hoja de eficacia
const mostAsignacioneficacia = require('./actividades/mostAsignacioneficacia');


/* INSERTAR ACTIVIDADES AUTOMATICAMENTE*/
const mostActividiarias = require('./actividades/mostActividiarias');
/* FIN DE INSERTAR ACTIVIDADES AUTOMATICAMENTE*/


/* Cronometro en controlactivi */
const editCambiartime = require('./tiempo/cambiartime');
/* Fin cronometro en controlactivi */

const verificar_Token = require('./middleware/Valida_Token');
const { errorMonitor } = require('events');
const app = express()
const port = 3005
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use('/evidenciasact', express.static(path.join(__dirname, 'evidenciasact')));
const io = require("socket.io")(3004, {
    cors: {
        methods: ["GET", "POST"]
    }
});

// Inicialización de Fido2Lib
const fido2 = new Fido2Lib.Fido2Lib();

// Ruta de los modelos
const MODEL_PATH = path.join(__dirname, 'models');
// Cargar los modelos
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    console.log('Modelos cargados');
}

/* Hoja de actForaneas */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/ubicacion', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const puesto = usuario.puesto;
    const id = usuario.id;
    //console.log(puesto)
    /* Envia las ubicaciones con base al puesto */
    if (puesto === "COORDINADOR DE PRODUCCION") {
        mostubi(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const ubicacionesPDM = respuesta.respuesta.filter(filtro => filtro.area === puesto);
                //console.log("PDM", ubicacionesPDM);
                res.status(200).json({
                    ubicacionesPDM
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        if (puesto === "GERENTE DE SISTEMAS DE RECOLECCION" || id === "RPMhztezf1lfbjn5nt") {
            const puestosdr = "GERENTE DE SISTEMAS DE RECOLECCION";
            mostubi(function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const ubicacionesPDM = respuesta.respuesta.filter(filtro => filtro.area === puestosdr);
                    //console.log("PDM", ubicacionesPDM);
                    res.status(200).json({
                        ubicacionesPDM
                    })
                }
                //console.log(respuesta);
            })
        }
    }
}
)

/* MODIFICADO PARA MOSTRAR SOLO LOS DATOS DEL RESPONSABLE */
app.get('/actividades', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const nombre = usuario.nombre;
    console.log(nombre);
    mostActif(function (error, respuestaActif) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaActif);
            const respuesta = respuestaActif.respuesta.filter((nom) => nom.responsableact === nombre);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/material', (req, res) => {
    mostMaterial(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
/* MODIFICADO PARA ACTIVIDADES PERIODICAS Y KGDECISION*/
app.post('/insertarActif', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const nombre = usuario.nombre;
    const id = usuario.id;
    console.log(nombre, id);
    //const periodo = "EXTRAORDINARIO"
    const fecha = moment().format("YYYY-MM-DD");
    console.log(req.body);
    // timestandar,hora,minutos
    const fam = "NA";
    const proc = "NA";
    if (req.body.unidad && req.body.actividad && fecha && req.body.ubicacion && req.body.minutos && req.body.periodo) {
        if (req.body.unidad === "SI") {
            if (req.body.kg && req.body.familias && req.body.productos) {
                const minutos = parseFloat(req.body.minutos);
                if (req.body.hora) {
                    const hora = parseFloat(req.body.hora);
                    if (Number.isInteger(hora) && hora <= 24 && hora >= 1 && Number.isInteger(minutos) && minutos <= 55 && minutos >= 0) {
                        //console.log(req.body.hora, req.body.minutos)
                        var tiempoest = 0;
                        const kilos = req.body.kg;
                        const horaN = parseInt(req.body.hora) * 60;
                        tiempoest = horaN + parseInt(req.body.minutos);
                        const eficiencia1 = (60 * kilos) / tiempoest;
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        console.log(tiempoest);
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, tiempoest, hora, minutos, eficiencia, nombre, id, req.body.periodo, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de hora y minutos son incorrectos"
                        });

                    }

                }
                else {
                    if (Number.isInteger(minutos) && minutos <= 55 && minutos >= 1) {
                        const kilos = req.body.kg;
                        const hora = 0;
                        const eficiencia1 = (60 * kilos) / minutos;
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, eficiencia, nombre, id, req.body.periodo, function (error, respuesta) {

                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de minutos son incorrectos"
                        });

                    }
                }
            }
        }
        else {
            if (req.body.unidad === "NO") {
                const minutos = parseFloat(req.body.minutos);
                if (req.body.hora) {
                    const hora = parseFloat(req.body.hora);
                    if (Number.isInteger(hora) && req.body.hora <= 24 && req.body.hora >= 1 && Number.isInteger(minutos) && req.body.minutos <= 55 && req.body.minutos >= 0) {
                        //console.log(req.body.hora, req.body.minutos)
                        var tiempoest = 0;
                        const kilos = 0;
                        const horaN = parseInt(req.body.hora) * 60;
                        tiempoest = horaN + parseInt(req.body.minutos);
                        const eficiencia1 = 60 / tiempoest;
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        console.log(tiempoest);
                        inserActif(req.body.actividad, fecha, kilos, fam, proc, req.body.ubicacion, tiempoest, req.body.hora, req.body.minutos, eficiencia, nombre, id, req.body.periodo, function (error, respuesta) {

                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de hora y minutos son incorrectos"
                        });

                    }

                }
                else {
                    if (req.body.minutos <= 55 && req.body.minutos >= 1) {
                        const hora = 0;
                        const kilos = 0;
                        const eficiencia1 = 60 / parseInt(req.body.minutos);
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        inserActif(req.body.actividad, fecha, kilos, fam, proc, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, eficiencia, nombre, id, req.body.periodo, function (error, respuesta) {

                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de minutos son incorrectos"
                        });

                    }
                }

            }
        }

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.post('/insertarMaterial', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    if (fecha && req.body.fam && req.body.produc) {
        mostMaterial(function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //const materiales = respuesta.respuesta;
                //console.log(materiales);
                const nuevomaterial = respuesta.respuesta.find((filtro) => filtro.familia === req.body.fam && filtro.producto === req.body.produc);
                if (nuevomaterial) {
                    console.log("El material ya existe");
                    res.status(400).json({
                        mensaje: "El material ya existe"
                    });
                } else {
                    insertarMaterial(fecha, req.body.fam, req.body.produc, function (error, respuesta) {

                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })

                }
            }
            //console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})

/* MODIFICADO PARA ACTIVIDADES PERIODICAS */
app.put('/editactividad', (req, res) => {
    console.log(req.body)
    if (req.body.idactividades && req.body.periodo && req.body.kgdecision) {
        editActividades(req.body.idactividades, req.body.periodo, req.body.kgdecision, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
/* Fin de hoja de actForaneas */





/* Hoja de actdiarias */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN, MODIFICADO PARA MOSTRAR LOS DATOS DE LA ACTIVIDAD Y LOS RESPONSABLES EN LA MISMA CONSULTA*/
app.get('/actividiarias', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    const id = usuario.id;
    console.log(responsable);

    if (id === "RPM4bo70oo55jli0ooihf") {
        mostAsignacion(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                //const asignadas = respuestaAsig.respuesta.filter(filtro => filtro.responsable === responsable && filtro.fechainicio === fecha);
                //console.log(asignadas);

                const asignadas = respuestaAsig.respuesta.map((asigactivi) => {
                    if (asigactivi.kg > 0 && asigactivi.kgControl === 0) {
                        return {
                            idasigactivi: asigactivi.idasigactivi,
                            fechainicio: asigactivi.fechainicio,
                            empresa: asigactivi.empresa,
                            status: asigactivi.status,
                            timeControl: asigactivi.timeControl,
                            kgControl: asigactivi.kgControl,
                            numpersonas: asigactivi.numpersonas,
                            eficienciasig: asigactivi.eficienciasig,
                            actividad: asigactivi.actividad,
                            idactividades: asigactivi.idactividades,
                            kgactividades: asigactivi.kg
                        };
                    }
                    else {
                        if (asigactivi.fechainicio === fecha) {
                            return {
                                idasigactivi: asigactivi.idasigactivi,
                                fechainicio: asigactivi.fechainicio,
                                empresa: asigactivi.empresa,
                                status: asigactivi.status,
                                timeControl: asigactivi.timeControl,
                                kgControl: asigactivi.kgControl,
                                numpersonas: asigactivi.numpersonas,
                                eficienciasig: asigactivi.eficienciasig,
                                actividad: asigactivi.actividad,
                                idactividades: asigactivi.idactividades,
                                kgactividades: asigactivi.kg
                            };
                        }
                    }
                }).filter((items) => items);
                //console.log("asignadas ", asignadas);

                /* Mostrar actddiarias por actividad siempre y cuando la actividad no tenga kilos, sumando lo existente con lo nuevo, sin afectar registros */
                const nuevosdatos = asignadas.map((idactivi) => {
                    return idactivi.idactividades
                });
                const uniactividadesid = [...new Set(nuevosdatos)];
                //console.log(uniactividadesid);
                const asignadasnuevo = [];
                uniactividadesid.forEach((element) => {
                    //console.log(element);
                    const existe = asignadas.filter((asignaciones) => asignaciones.idactividades === element).reduce((acumulador, valor) => {
                        acumulador.timeControl += valor.timeControl;
                        acumulador.numpersonas += valor.numpersonas;

                        acumulador.idasigactivi = valor.idasigactivi;
                        acumulador.fechainicio = valor.fechainicio;
                        acumulador.empresa = valor.empresa;
                        acumulador.status = valor.status;
                        acumulador.kgControl = valor.kgControl;
                        acumulador.actividad = valor.actividad;
                        acumulador.eficienciasig = valor.eficienciasig;
                        acumulador.idasigactiviarray.push(valor.idasigactivi);
                        acumulador.kgactividades = valor.kgactividades;

                        return acumulador;
                    }, {
                        timeControl: 0,
                        numpersonas: 0,
                        idasigactivi: null,
                        fechainicio: '',
                        empresa: '',
                        status: '',
                        kgControl: 0,
                        actividad: '',
                        eficienciasig: 0,
                        idasigactiviarray: [],
                        kgactividades: ''
                    });
                    asignadasnuevo.push(existe)

                });
                //console.log("asignadasnuevo ", asignadasnuevo);



                /* Fin de mostrar actddiarias por actividad siempre y cuando la actividad no tenga kilos, sumando lo existente con lo nuevo, sin afectar registros*/
                mostStatusresponsable(function (error, respuestaResponsable) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuestaResponsable);

                        const responsables = respuestaResponsable.respuesta.filter((responsable) => responsable.fecha === fecha);
                        //console.log("responsables ",responsables);

                        const ambosdatos = responsables.map((sujeto) => {
                            const empresasujeto = asignadas.find((id) => id.idasigactivi === sujeto.idasigactivi);
                            return {
                                nombre: sujeto.responsables,
                                empresa: empresasujeto.empresa
                            }
                        });

                        const nomempresas = ambosdatos.map((datos => ([datos.empresa]))).flat();
                        const uniempresas = [...new Set(nomempresas)];


                        const respuestacard = asignadasnuevo.map(datos => {
                            const responsablesid1 = [];
                            datos.idasigactiviarray.forEach((idasig) => {
                                //console.log("idasig ", idasig);
                                const existencias = respuestaResponsable.respuesta.filter((sujeto) => sujeto.idasigactivi === idasig).map((sujetofinal) => {
                                    const hrtrans = (sujetofinal.timestandar <= 9) ? 0 : (Math.floor(sujetofinal.timestandar / 60));
                                    const mintrans = (sujetofinal.timestandar <= 9) ? sujetofinal.timestandar : (sujetofinal.timestandar % 60);
                                    const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                    const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                    return {
                                        nombre: sujetofinal.responsables,
                                        tiempo: hrtransfin + ":" + mintransfin,
                                        estatus: sujetofinal.status,
                                        kg: sujetofinal.kg,
                                        eficiencia: sujetofinal.eficienciacontrol

                                    }
                                });
                                //console.log("existencias ", existencias);
                                responsablesid1.push(existencias);

                            });
                            const responsablesid = responsablesid1.flat();
                            //console.log("responsablesid ", responsablesid);

                            const ordenadoresponsables = [];
                            // Definir el orden de los estatus
                            const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                            // Ordenar los datos antes de agregar a nuevocontrol
                            responsablesid.forEach((datos) => {
                                // Agregar los datos al arreglo, ordenados por el estatus
                                const estatusIndex = ordenEstatus.indexOf(datos.estatus);
                                if (estatusIndex !== -1) {
                                    ordenadoresponsables.push({ ...datos, estatusIndex });
                                }
                            });

                            ordenadoresponsables.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                                delete datos.estatusIndex;
                            });
                            //console.log("Ordenado: ", ordenadoresponsables);

                            //Calcular el tiempo transcurrido en asignadas
                            const hrtrans = (datos.timeControl <= 9) ? 0 : (Math.floor(datos.timeControl / 60));
                            const mintrans = (datos.timeControl <= 9) ? datos.timeControl : (datos.timeControl % 60);
                            const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                            const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                            return {
                                Id: datos.idasigactivi,
                                fecha: datos.fechainicio,
                                Empresa: datos.empresa,
                                Actividad: datos.actividad,
                                TiempoTranscurrido: hrtransfin + ":" + mintransfin,
                                KgRealizados: datos.kgControl + "kg",
                                Eficiencia: datos.eficienciasig + "%",
                                Estatus: datos.status,
                                Responsables: datos.numpersonas,
                                asignados: ordenadoresponsables,
                                kgactividades: datos.kgactividades

                            }
                        });
                        //console.log("respuestacard ", respuestacard);

                        const nuevoarray = [];
                        // Definir el orden de los estatus
                        const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                        // Ordenar los datos antes de agregar a nuevocontrol
                        respuestacard.forEach((datos) => {
                            // Agregar los datos al arreglo, ordenados por el estatus
                            const estatusIndex = ordenEstatus.indexOf(datos.Estatus);
                            if (estatusIndex !== -1) {
                                nuevoarray.push({ ...datos, estatusIndex });
                            }
                        })

                        nuevoarray.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                            delete datos.estatusIndex;
                        });


                        //console.log("Ordenado: ", nuevoarray);

                        //console.log("Sin ordenar: ", respuestacard);

                        res.status(200).json({
                            asignadas,
                            nuevoarray,
                            uniempresas,
                        })
                    }

                });

            }
            //console.log(respuesta);
        })
    }
    else {
        mostAsignacion(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                //const asignadas = respuestaAsig.respuesta.filter(filtro => filtro.responsable === responsable && filtro.fechainicio === fecha);
                //console.log(asignadas);

                const asignadas = respuestaAsig.respuesta.filter(filtro => filtro.responsable === responsable).map((asigactivi) => {
                    if (asigactivi.kg > 0 && asigactivi.kgControl === 0) {
                        return {
                            idasigactivi: asigactivi.idasigactivi,
                            fechainicio: asigactivi.fechainicio,
                            empresa: asigactivi.empresa,
                            status: asigactivi.status,
                            timeControl: asigactivi.timeControl,
                            kgControl: asigactivi.kgControl,
                            numpersonas: asigactivi.numpersonas,
                            eficienciasig: asigactivi.eficienciasig,
                            actividad: asigactivi.actividad,
                            idactividades: asigactivi.idactividades,
                            kgactividades: asigactivi.kg
                        };
                    }
                    else {
                        if (asigactivi.fechainicio === fecha) {
                            return {
                                idasigactivi: asigactivi.idasigactivi,
                                fechainicio: asigactivi.fechainicio,
                                empresa: asigactivi.empresa,
                                status: asigactivi.status,
                                timeControl: asigactivi.timeControl,
                                kgControl: asigactivi.kgControl,
                                numpersonas: asigactivi.numpersonas,
                                eficienciasig: asigactivi.eficienciasig,
                                actividad: asigactivi.actividad,
                                idactividades: asigactivi.idactividades,
                                kgactividades: asigactivi.kg
                            };
                        }
                    }
                }).filter((items) => items);
                //console.log("asignadas ", asignadas);

                /* Mostrar actddiarias por actividad siempre y cuando la actividad no tenga kilos, sumando lo existente con lo nuevo, sin afectar registros */
                const nuevosdatos = asignadas.map((idactivi) => {
                    return idactivi.idactividades
                });
                const uniactividadesid = [...new Set(nuevosdatos)];
                //console.log(uniactividadesid);
                const asignadasnuevo = [];
                uniactividadesid.forEach((element) => {
                    //console.log(element);
                    const existe = asignadas.filter((asignaciones) => asignaciones.idactividades === element).reduce((acumulador, valor) => {
                        acumulador.timeControl += valor.timeControl;
                        acumulador.numpersonas += valor.numpersonas;

                        acumulador.idasigactivi = valor.idasigactivi;
                        acumulador.fechainicio = valor.fechainicio;
                        acumulador.empresa = valor.empresa;
                        acumulador.status = valor.status;
                        acumulador.kgControl = valor.kgControl;
                        acumulador.actividad = valor.actividad;
                        acumulador.eficienciasig = valor.eficienciasig;
                        acumulador.idasigactiviarray.push(valor.idasigactivi);
                        acumulador.kgactividades = valor.kgactividades

                        return acumulador;
                    }, {
                        timeControl: 0,
                        numpersonas: 0,
                        idasigactivi: null,
                        fechainicio: '',
                        empresa: '',
                        status: '',
                        kgControl: 0,
                        actividad: '',
                        eficienciasig: 0,
                        idasigactiviarray: [],
                        kgactividades: ''
                    });
                    asignadasnuevo.push(existe)

                });
                //console.log("asignadasnuevo ", asignadasnuevo);



                /* Fin de mostrar actddiarias por actividad siempre y cuando la actividad no tenga kilos, sumando lo existente con lo nuevo, sin afectar registros*/
                mostStatusresponsable(function (error, respuestaResponsable) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuestaResponsable);

                        const responsables = respuestaResponsable.respuesta.filter((responsable) => responsable.fecha === fecha);
                        console.log("responsables ", responsables);

                        const ambosdatos = responsables.map((sujeto) => {
                            const empresasujeto = asignadas.find((id) => id.idasigactivi === sujeto.idasigactivi);
                            if (empresasujeto) {
                                return {
                                    nombre: sujeto.responsables,
                                    empresa: empresasujeto.empresa
                                }
                            }
                            return null;
                        });
                        //console.log(ambosdatos);
                        var uniempresas = [];
                        if (ambosdatos === null) {
                            const nomempresas = ambosdatos.map((datos => ([datos.empresa]))).flat();
                            uniempresas = [...new Set(nomempresas)];
                        }

                        const respuestacard = asignadasnuevo.map(datos => {
                            const responsablesid1 = [];
                            datos.idasigactiviarray.forEach((idasig) => {
                                //console.log("idasig ", idasig);
                                const existencias = respuestaResponsable.respuesta.filter((sujeto) => sujeto.idasigactivi === idasig).map((sujetofinal) => {
                                    const hrtrans = (sujetofinal.timestandar <= 9) ? 0 : (Math.floor(sujetofinal.timestandar / 60));
                                    const mintrans = (sujetofinal.timestandar <= 9) ? sujetofinal.timestandar : (sujetofinal.timestandar % 60);
                                    const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                    const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                    return {
                                        nombre: sujetofinal.responsables,
                                        tiempo: hrtransfin + ":" + mintransfin,
                                        estatus: sujetofinal.status,
                                        kg: sujetofinal.kg,
                                        eficiencia: sujetofinal.eficienciacontrol

                                    }
                                });
                                //console.log("existencias ", existencias);
                                responsablesid1.push(existencias);

                            });
                            const responsablesid = responsablesid1.flat();
                            //console.log("responsablesid ", responsablesid);

                            const ordenadoresponsables = [];
                            // Definir el orden de los estatus
                            const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                            // Ordenar los datos antes de agregar a nuevocontrol
                            responsablesid.forEach((datos) => {
                                // Agregar los datos al arreglo, ordenados por el estatus
                                const estatusIndex = ordenEstatus.indexOf(datos.estatus);
                                if (estatusIndex !== -1) {
                                    ordenadoresponsables.push({ ...datos, estatusIndex });
                                }
                            });

                            ordenadoresponsables.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                                delete datos.estatusIndex;
                            });
                            //console.log("Ordenado: ", ordenadoresponsables);

                            //Calcular el tiempo transcurrido en asignadas
                            const hrtrans = (datos.timeControl <= 9) ? 0 : (Math.floor(datos.timeControl / 60));
                            const mintrans = (datos.timeControl <= 9) ? datos.timeControl : (datos.timeControl % 60);
                            const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                            const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                            return {
                                Id: datos.idasigactivi,
                                fecha: datos.fechainicio,
                                Empresa: datos.empresa,
                                Actividad: datos.actividad,
                                TiempoTranscurrido: hrtransfin + ":" + mintransfin,
                                KgRealizados: datos.kgControl + "kg",
                                Eficiencia: datos.eficienciasig + "%",
                                Estatus: datos.status,
                                Responsables: datos.numpersonas,
                                asignados: ordenadoresponsables,
                                kgactividades: datos.kgactividades

                            }
                        });
                        //console.log("respuestacard ", respuestacard);

                        const nuevoarray = [];
                        // Definir el orden de los estatus
                        const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                        // Ordenar los datos antes de agregar a nuevocontrol
                        respuestacard.forEach((datos) => {
                            // Agregar los datos al arreglo, ordenados por el estatus
                            const estatusIndex = ordenEstatus.indexOf(datos.Estatus);
                            if (estatusIndex !== -1) {
                                nuevoarray.push({ ...datos, estatusIndex });
                            }
                        })

                        nuevoarray.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                            delete datos.estatusIndex;
                        });


                        //console.log("Ordenado: ", nuevoarray);

                        //console.log("Sin ordenar: ", respuestacard);

                        res.status(200).json({
                            asignadas,
                            nuevoarray,
                            uniempresas,
                        })
                    }

                });

            }
            //console.log(respuesta);
        })
    }
}
)
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN, MODIFICADO PARA CARCULAR HORAS POR EMPRESA ENERO2025 */
app.get('/globalstatus', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const dia = moment().format("dddd");
    //console.log(dia);
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.nombre;
    const id = usuario.id;
    const area = usuario.Area;
    //console.log(usuario);
    if (id === "RPM4bo70oo55jli0ooihf") {
        mostPDM(function (error, respuestaPDM) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                /* Calcular horas disponibles */

                //console.log(respuestaPDM.respuesta);
                const personalpdm = respuestaPDM.respuesta.filter(dato => dato.estatus === "true").map(datos => ({ Ubicacion: datos.Ubicacion }));
                //console.log(personalpdm);

                const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
                    if (acc[Ubicacion]) {
                        acc[Ubicacion] += 1;
                    } else {
                        acc[Ubicacion] = 1;
                    }
                    return acc;
                }, {});
                //console.log("personas: ", numpersonal);

                const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
                //console.log(valorhr);

                const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
                    const hhdisponibles = (personas * valorhr);
                    const hhdmin = (hhdisponibles * 60);

                    const hrentero = Math.trunc(hhdisponibles);
                    const minreales = (hhdisponibles - hrentero) * 60;

                    return {
                        ubicacion: ubicacion,
                        personas: personas,
                        minutosreales: hhdmin,
                        horareal: hrentero,
                        minreal: minreales
                    }

                });
                //console.log("timedisponible ", timedisponible);

                mostAsignacion(function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        const deldia = respuesta.respuesta.filter(filtro => filtro.fechainicio === fecha);

                        const deldiatotal = deldia.length;
                        //console.log("deldia", deldia.length);

                        const terminadas = deldia.filter((filtro) => filtro.status === "TERMINADO");
                        const terminadastotal = terminadas.length;
                        //console.log("terminadas", terminadas.length);

                        const promedio1 = terminadas.reduce((acumulador, filtro) => {
                            return acumulador + filtro.eficienciasig;
                        }, 0);
                        const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                        const promediototal1 = promedio / terminadas.length
                        const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                        //console.log(promediototal);


                        const promedioasig = (terminadastotal * 100) / deldiatotal;
                        const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                        //console.log(promedioasigtotal);


                        //Calcular horas hombre utilizadas:

                        const empresatempo = deldia.map(datos => ({ empresa: datos.empresa, tiempo: datos.timeControl }));
                        //console.log(empresatempo);

                        const Hhempresa = empresatempo.reduce((acc, { empresa, tiempo }) => {
                            if (acc[empresa]) {
                                acc[empresa] += tiempo;
                            } else {
                                acc[empresa] = tiempo;
                            }
                            return acc;
                        }, {});

                        const hhtranscurridas = Object.entries(Hhempresa).map(([empresa, tiempo]) => ({ empresa, tiempo }));
                        //console.log("hhtranscurridas ", hhtranscurridas);

                        const hhombretotal = timedisponible.map(datos => {
                            const lodehoy = hhtranscurridas.find(datos2 => datos2.empresa === datos.ubicacion);

                            const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                            const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                            if (lodehoy) {
                                //Calcular el restante en hora y minutos
                                const minutosRestantes = (lodehoy.tiempo > datos.minutosreales) ? 0 : (datos.minutosreales - lodehoy.tiempo);
                                const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                                const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                                const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                                const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                                //Calcular el tiempo transcurrido
                                const hrtrans = (lodehoy.tiempo <= 9) ? 0 : (Math.floor(lodehoy.tiempo / 60));
                                const mintrans = (lodehoy.tiempo <= 9) ? lodehoy.tiempo : (lodehoy.tiempo % 60);
                                const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                //Promedio
                                const porcentaje = (lodehoy.tiempo * 100) / datos.minutosreales;
                                const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                                return {
                                    ubicacion: datos.ubicacion,
                                    personas: datos.personas,
                                    hrrestante: hrrestantesfin,
                                    minrestante: minrestantesfin,
                                    hrtranscurrido: hrtransfin,
                                    mintranscurrido: mintransfin,
                                    horareal: hrrealfin,
                                    minreal: minrealfin,
                                    porcentaje: porcentajetotal
                                };
                            }

                            return {
                                ubicacion: datos.ubicacion,
                                personas: datos.personas,
                                hrrestante: hrrealfin,
                                minrestante: minrealfin,
                                hrtranscurrido: "00",
                                mintranscurrido: "00",
                                horareal: hrrealfin,
                                minreal: minrealfin,
                                porcentaje: 0
                            };
                        }).filter(item => item !== null);

                        //console.log("total ", hhombretotal);

                        res.status(200).json({
                            //asignaciones
                            deldiatotal,
                            //terminadas
                            terminadastotal,
                            //promedio
                            promediototal,
                            //promedioasig
                            promedioasigtotal,
                            //naves
                            hhombretotal

                        })
                    }
                    //console.log(respuesta);
                })
            }
        })
    }
    else {
        mostPDM(function (error, respuestaPDM) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                /* Calcular horas disponibles */

                //console.log(respuestaPDM.respuesta);
                const personalpdm = respuestaPDM.respuesta.filter(dato => dato.Area === area && dato.estatus === "true").map(datos => ({ Ubicacion: datos.Ubicacion }));
                //console.log(personalpdm);

                const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
                    if (acc[Ubicacion]) {
                        acc[Ubicacion] += 1;
                    } else {
                        acc[Ubicacion] = 1;
                    }
                    return acc;
                }, {});
                //console.log("personas: ", numpersonal);

                const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
                //console.log(valorhr);

                const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
                    const hhdisponibles = (personas * valorhr);
                    const hhdmin = (hhdisponibles * 60);

                    const hrentero = Math.trunc(hhdisponibles);
                    const minreales = (hhdisponibles - hrentero) * 60;

                    return {
                        ubicacion: ubicacion,
                        personas: personas,
                        minutosreales: hhdmin,
                        horareal: hrentero,
                        minreal: minreales
                    }

                });
                //console.log("timedisponible ", timedisponible);

                mostAsignacion(function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        let deldia = {};
                        if (id === "RPMhzte1p8rlfmmq44l" || id === "RPMhztezf1lfbjn5nt") {
                            deldia = respuesta.respuesta.filter(filtro => (filtro.responsable === "MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO") && filtro.fechainicio === fecha);
                        }
                        else {
                            deldia = respuesta.respuesta.filter(filtro => filtro.responsable === responsable && filtro.fechainicio === fecha);
                        }
                        const deldiatotal = deldia.length;
                        //console.log("deldia", deldia.length);

                        const terminadas = deldia.filter((filtro) => filtro.status === "TERMINADO");
                        const terminadastotal = terminadas.length;
                        //console.log("terminadas", terminadas.length);

                        const promedio1 = terminadas.reduce((acumulador, filtro) => {
                            return acumulador + filtro.eficienciasig;
                        }, 0);
                        const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                        const promediototal1 = promedio / terminadas.length
                        const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                        //console.log(promediototal);


                        const promedioasig = (terminadastotal * 100) / deldiatotal;
                        const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                        //console.log(promedioasigtotal);


                        //Calcular horas hombre utilizadas:

                        const empresatempo = deldia.map(datos => ({ empresa: datos.empresa, tiempo: datos.timeControl }));
                        //console.log(empresatempo);

                        const Hhempresa = empresatempo.reduce((acc, { empresa, tiempo }) => {
                            if (acc[empresa]) {
                                acc[empresa] += tiempo;
                            } else {
                                acc[empresa] = tiempo;
                            }
                            return acc;
                        }, {});

                        const hhtranscurridas = Object.entries(Hhempresa).map(([empresa, tiempo]) => ({ empresa, tiempo }));
                        //console.log("hhtranscurridas ", hhtranscurridas);

                        const hhombretotal = timedisponible.map(datos => {
                            const lodehoy = hhtranscurridas.find(datos2 => datos2.empresa === datos.ubicacion);

                            const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                            const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                            if (lodehoy) {
                                //Calcular el restante en hora y minutos
                                const minutosRestantes = (lodehoy.tiempo > datos.minutosreales) ? 0 : (datos.minutosreales - lodehoy.tiempo);
                                const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                                const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                                const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                                const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                                //Calcular el tiempo transcurrido
                                const hrtrans = (lodehoy.tiempo <= 9) ? 0 : (Math.floor(lodehoy.tiempo / 60));
                                const mintrans = (lodehoy.tiempo <= 9) ? lodehoy.tiempo : (lodehoy.tiempo % 60);
                                const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                //Promedio
                                const porcentaje = (lodehoy.tiempo * 100) / datos.minutosreales;
                                const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                                return {
                                    ubicacion: datos.ubicacion,
                                    personas: datos.personas,
                                    hrrestante: hrrestantesfin,
                                    minrestante: minrestantesfin,
                                    hrtranscurrido: hrtransfin,
                                    mintranscurrido: mintransfin,
                                    horareal: hrrealfin,
                                    minreal: minrealfin,
                                    porcentaje: porcentajetotal
                                };
                            }

                            return {
                                ubicacion: datos.ubicacion,
                                personas: datos.personas,
                                hrrestante: hrrealfin,
                                minrestante: minrealfin,
                                hrtranscurrido: "00",
                                mintranscurrido: "00",
                                horareal: hrrealfin,
                                minreal: minrealfin,
                                porcentaje: 0
                            };
                        }).filter(item => item !== null);

                        //console.log("total ", hhombretotal);

                        res.status(200).json({
                            //asignaciones
                            deldiatotal,
                            //terminadas
                            terminadastotal,
                            //promedio
                            promediototal,
                            //promedioasig
                            promedioasigtotal,
                            //naves
                            hhombretotal

                        })
                    }
                    //console.log(respuesta);
                })
            }
        })
    }
}
)
/*EVIDENCIAS*/
app.get('/evidencias', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const idasigactivi = req.query.idasigactivi;
    //console.log("Datos obtenidos: ", idactividad, idasigactivi);
    mostEvidencias(fecha, idasigactivi, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            console.log(respuesta);
            res.status(200).json({
                respuesta
            })
        }

    })
}
)

app.get('/datoselect', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const dia = moment().format("dddd");
    //console.log(dia);
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.nombre;
    const id = usuario.id;
    const area = usuario.Area;

    console.log(req.query);
    const empresa = (req.query.empresa === 'null') ? "" : req.query.empresa;
    const nombre = (req.query.nombre === 'null') ? "" : req.query.nombre;
    //console.log(empresa);
    if (id === "RPM4bo70oo55jli0ooihf") {
        mostPDM(function (error, respuestaPDM) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuestaPDM.respuesta);
                mostStatusresponsable(function (error, respuestaResponsable) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuestaResponsable);
                        const responsables = respuestaResponsable.respuesta.filter((responsable) => responsable.fecha === fecha);
                        //console.log("responsables ",responsables);

                        mostAsignacion(function (error, respuestaAsig) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuestaAsig.mensaje
                                })
                            }
                            else {

                                let deldia = respuestaAsig.respuesta.filter(filtro => filtro.fechainicio === fecha);

                                /* Por empresa, buscando los trabajadores y ... */
                                if (empresa && nombre) {
                                    /* Calcular horas disponibles */

                                    //console.log(respuestaPDM.respuesta);
                                    const personalpdm = respuestaPDM.respuesta.filter(dato => dato.estatus === "true" && dato.Ubicacion === req.query.empresa && dato.Nombre === req.query.nombre).map(datos => ({ Ubicacion: datos.Ubicacion }));
                                    //console.log(personalpdm);

                                    const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
                                        if (acc[Ubicacion]) {
                                            acc[Ubicacion] += 1;
                                        } else {
                                            acc[Ubicacion] = 1;
                                        }
                                        return acc;
                                    }, {});
                                    //console.log("personas: ", numpersonal);

                                    const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
                                    //console.log(valorhr);

                                    const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
                                        const hhdisponibles = (personas * valorhr);
                                        const hhdmin = (hhdisponibles * 60);

                                        const hrentero = Math.trunc(hhdisponibles);
                                        const minreales = (hhdisponibles - hrentero) * 60;

                                        return {
                                            ubicacion: ubicacion,
                                            personas: personas,
                                            minutosreales: hhdmin,
                                            horareal: hrentero,
                                            minreal: minreales
                                        }

                                    });

                                    /* MUESTRA EL LISTADO DE LOS TRABAJADORES NO EDITAR */
                                    const ambosdatos = responsables.map((sujeto) => {
                                        const empresasujeto = deldia.find((id) => id.idasigactivi === sujeto.idasigactivi);
                                        return {
                                            nombre: sujeto.responsables,
                                            empresa: empresasujeto.empresa
                                        }
                                    });
                                    //console.log(ambosdatos);
                                    const nombreresponsable = ambosdatos.filter((datos => datos.empresa === req.query.empresa)).map((sujeto) => sujeto.nombre).flat();
                                    //console.log(nombreresponsable);
                                    /* Resultado #1 */
                                    const trabajadores = [...new Set(nombreresponsable)];
                                    /* FIN DE MUESTRA EL LISTADO DE LOS TRABAJADORES NO EDITAR */

                                    mostControl(function (error, respuestaControl) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            const deldiacontrol = respuestaControl.respuesta.filter((dcontrol) => dcontrol.fecha === fecha && dcontrol.responsables === req.query.nombre);
                                            //console.log("deldiacontrol ", deldiacontrol);
                                            /* Resultado #2 */
                                            const deldiatotal = deldiacontrol.length;
                                            //console.log("deldiatotal", deldiatotal);

                                            const terminadas = deldiacontrol.filter((filtro) => filtro.status === "TERMINADO");
                                            /* Resultado #3 */
                                            const terminadastotal = terminadas.length;
                                            //console.log("terminadas", terminadastotal);

                                            const promedio1 = terminadas.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.eficienciacontrol;
                                            }, 0);
                                            const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                                            const promediototal1 = promedio / terminadas.length;
                                            /* Resultado #3 */
                                            const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                                            //console.log(promediototal);

                                            const promedioasig = (terminadastotal * 100) / deldiatotal;
                                            /* Resultado #4 */
                                            const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                                            //console.log(promedioasigtotal);

                                            //Calcular horas hombre utilizadas:
                                            const controltiempo = deldiacontrol.map(datos => ({ tiempo: datos.timestandar }));
                                            //console.log("controltiempo ",controltiempo);

                                            const hhtranscurridas = controltiempo.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.tiempo;
                                            }, 0);
                                            //console.log("hhtranscurridas ", hhtranscurridas);

                                            const hhombretotal = timedisponible.map(datos => {
                                                const lodehoy = hhtranscurridas;

                                                const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                                                const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                                                if (lodehoy) {
                                                    //Calcular el restante en hora y minutos
                                                    const minutosRestantes = (hhtranscurridas > datos.minutosreales) ? 0 : (datos.minutosreales - hhtranscurridas);
                                                    const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                                                    const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                                                    const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                                                    const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                                                    //Calcular el tiempo transcurrido
                                                    const hrtrans = (hhtranscurridas <= 9) ? 0 : (Math.floor(hhtranscurridas / 60));
                                                    const mintrans = (hhtranscurridas <= 9) ? hhtranscurridas : (hhtranscurridas % 60);
                                                    const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                                    const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                                    //Promedio
                                                    const porcentaje = (hhtranscurridas * 100) / datos.minutosreales;
                                                    const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                                                    return {
                                                        ubicacion: datos.ubicacion,
                                                        personas: datos.personas,
                                                        hrrestante: hrrestantesfin,
                                                        minrestante: minrestantesfin,
                                                        hrtranscurrido: hrtransfin,
                                                        mintranscurrido: mintransfin,
                                                        horareal: hrrealfin,
                                                        minreal: minrealfin,
                                                        porcentaje: porcentajetotal
                                                    };
                                                }

                                                return {
                                                    ubicacion: datos.ubicacion,
                                                    personas: datos.personas,
                                                    hrrestante: hrrealfin,
                                                    minrestante: minrealfin,
                                                    hrtranscurrido: "00",
                                                    mintranscurrido: "00",
                                                    horareal: hrrealfin,
                                                    minreal: minrealfin,
                                                    porcentaje: 0
                                                };
                                            }).filter(item => item !== null);

                                            //console.log("hhombretotal ", hhombretotal);

                                            res.status(200).json({
                                                //Trabajadores
                                                trabajadores,
                                                //asignaciones
                                                deldiatotal,
                                                //terminadas
                                                terminadastotal,
                                                //promedio
                                                promediototal,
                                                //promedioasig
                                                promedioasigtotal,
                                                //naves
                                                hhombretotal

                                            })

                                        }
                                    })
                                }
                                else {
                                    if (empresa) {
                                        /* Calcular horas disponibles */

                                        //console.log(respuestaPDM.respuesta);
                                        const personalpdm = respuestaPDM.respuesta.filter(dato => dato.estatus === "true" && dato.Ubicacion === req.query.empresa).map(datos => ({ Ubicacion: datos.Ubicacion }));
                                        //console.log(personalpdm);

                                        const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
                                            if (acc[Ubicacion]) {
                                                acc[Ubicacion] += 1;
                                            } else {
                                                acc[Ubicacion] = 1;
                                            }
                                            return acc;
                                        }, {});
                                        //console.log("personas: ", numpersonal);

                                        const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
                                        //console.log(valorhr);

                                        const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
                                            const hhdisponibles = (personas * valorhr);
                                            const hhdmin = (hhdisponibles * 60);

                                            const hrentero = Math.trunc(hhdisponibles);
                                            const minreales = (hhdisponibles - hrentero) * 60;

                                            return {
                                                ubicacion: ubicacion,
                                                personas: personas,
                                                minutosreales: hhdmin,
                                                horareal: hrentero,
                                                minreal: minreales
                                            }

                                        });

                                        const ambosdatos = responsables.map((sujeto) => {
                                            const empresasujeto = deldia.find((id) => id.idasigactivi === sujeto.idasigactivi);
                                            return {
                                                nombre: sujeto.responsables,
                                                empresa: empresasujeto.empresa
                                            }
                                        });

                                        const nombreresponsable = ambosdatos.filter((datos => datos.empresa === req.query.empresa)).map((sujeto) => sujeto.nombre).flat();
                                        //console.log(nombreresponsable);
                                        //RESULTADO1: TRABAJADORES OPERANDO
                                        const trabajadores = [...new Set(nombreresponsable)];


                                        //CALCULAR LAS CAJAS DE INFORMACION DE LA EMPRESA (CAMBIA EL CONCEPTO DE "deldia", por los datos obtenidos)
                                        const deldiaempresa = deldia.filter((datos => datos.empresa === req.query.empresa));
                                        //console.log("deldiaempresa", deldiaempresa);
                                        const deldiatotal = deldiaempresa.length;
                                        //console.log("deldiaempresa", deldiaempresa);

                                        const terminadas = deldiaempresa.filter((filtro) => filtro.status === "TERMINADO");
                                        const terminadastotal = terminadas.length;
                                        //console.log("terminadas", terminadas.length);

                                        const promedio1 = terminadas.reduce((acumulador, filtro) => {
                                            return acumulador + filtro.eficienciasig;
                                        }, 0);
                                        const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                                        const promediototal1 = promedio / terminadas.length
                                        const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                                        //console.log(promediototal);


                                        const promedioasig = (terminadastotal * 100) / deldiatotal;
                                        const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                                        //console.log(promedioasigtotal);


                                        //Calcular horas hombre utilizadas:

                                        const empresatempo = deldiaempresa.map(datos => ({ empresa: datos.empresa, tiempo: datos.timeControl }));
                                        //console.log(empresatempo);

                                        const Hhempresa = empresatempo.reduce((acc, { empresa, tiempo }) => {
                                            if (acc[empresa]) {
                                                acc[empresa] += tiempo;
                                            } else {
                                                acc[empresa] = tiempo;
                                            }
                                            return acc;
                                        }, {});

                                        const hhtranscurridas = Object.entries(Hhempresa).map(([empresa, tiempo]) => ({ empresa, tiempo }));
                                        //console.log("hhtranscurridas ", hhtranscurridas);

                                        const hhombretotal = timedisponible.map(datos => {
                                            const lodehoy = hhtranscurridas.find(datos2 => datos2.empresa === datos.ubicacion);

                                            const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                                            const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                                            if (lodehoy) {
                                                //Calcular el restante en hora y minutos
                                                const minutosRestantes = (lodehoy.tiempo > datos.minutosreales) ? 0 : (datos.minutosreales - lodehoy.tiempo);
                                                const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                                                const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                                                const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                                                const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                                                //Calcular el tiempo transcurrido
                                                const hrtrans = (lodehoy.tiempo <= 9) ? 0 : (Math.floor(lodehoy.tiempo / 60));
                                                const mintrans = (lodehoy.tiempo <= 9) ? lodehoy.tiempo : (lodehoy.tiempo % 60);
                                                const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                                const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                                //Promedio
                                                const porcentaje = (lodehoy.tiempo * 100) / datos.minutosreales;
                                                const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                                                return {
                                                    ubicacion: datos.ubicacion,
                                                    personas: datos.personas,
                                                    hrrestante: hrrestantesfin,
                                                    minrestante: minrestantesfin,
                                                    hrtranscurrido: hrtransfin,
                                                    mintranscurrido: mintransfin,
                                                    horareal: hrrealfin,
                                                    minreal: minrealfin,
                                                    porcentaje: porcentajetotal
                                                };
                                            }

                                            return {
                                                ubicacion: datos.ubicacion,
                                                personas: datos.personas,
                                                hrrestante: hrrealfin,
                                                minrestante: minrealfin,
                                                hrtranscurrido: "00",
                                                mintranscurrido: "00",
                                                horareal: hrrealfin,
                                                minreal: minrealfin,
                                                porcentaje: 0
                                            };
                                        }).filter(item => item !== null);

                                        //console.log("total ", hhombretotal);

                                        res.status(200).json({
                                            //Trabajadores
                                            trabajadores,
                                            //asignaciones
                                            deldiatotal,
                                            //terminadas
                                            terminadastotal,
                                            //promedio
                                            promediototal,
                                            //promedioasig
                                            promedioasigtotal,
                                            //naves
                                            hhombretotal

                                        })
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        /* Editar todo lo de globa estatus en esta consulta, sin dejar de lado la division por id */
        mostPDM(function (error, respuestaPDM) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuestaPDM.respuesta);
                mostStatusresponsable(function (error, respuestaResponsable) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuestaResponsable);
                        const responsables = respuestaResponsable.respuesta.filter((responsable) => responsable.fecha === fecha);
                        //console.log("responsables ",responsables);

                        mostAsignacion(function (error, respuestaAsig) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuestaAsig.mensaje
                                })
                            }
                            else {

                                let deldia = {};
                                if (id === "RPMhzte1p8rlfmmq44l" || id === "RPMhztezf1lfbjn5nt") {
                                    deldia = respuestaAsig.respuesta.filter(filtro => (filtro.responsable === "MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO") && filtro.fechainicio === fecha);
                                }
                                else {
                                    deldia = respuestaAsig.respuesta.filter(filtro => filtro.responsable === responsable && filtro.fechainicio === fecha);
                                }

                                /* Por empresa, buscando los trabajadores y ... */
                                if (empresa && nombre) {
                                    /* Calcular horas disponibles */

                                    //console.log(respuestaPDM.respuesta);
                                    const personalpdm = respuestaPDM.respuesta.filter(dato => dato.Area === area && dato.estatus === "true" && dato.Ubicacion === req.query.empresa && dato.Nombre === req.query.nombre).map(datos => ({ Ubicacion: datos.Ubicacion }));
                                    //console.log(personalpdm);

                                    const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
                                        if (acc[Ubicacion]) {
                                            acc[Ubicacion] += 1;
                                        } else {
                                            acc[Ubicacion] = 1;
                                        }
                                        return acc;
                                    }, {});
                                    //console.log("personas: ", numpersonal);

                                    const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
                                    //console.log(valorhr);

                                    const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
                                        const hhdisponibles = (personas * valorhr);
                                        const hhdmin = (hhdisponibles * 60);

                                        const hrentero = Math.trunc(hhdisponibles);
                                        const minreales = (hhdisponibles - hrentero) * 60;

                                        return {
                                            ubicacion: ubicacion,
                                            personas: personas,
                                            minutosreales: hhdmin,
                                            horareal: hrentero,
                                            minreal: minreales
                                        }

                                    });

                                    /* MUESTRA EL LISTADO DE LOS TRABAJADORES NO EDITAR */
                                    const ambosdatos = responsables.map((sujeto) => {
                                        const empresasujeto = deldia.find((id) => id.idasigactivi === sujeto.idasigactivi);
                                        return {
                                            nombre: sujeto.responsables,
                                            empresa: empresasujeto.empresa
                                        }
                                    });
                                    //console.log(ambosdatos);
                                    const nombreresponsable = ambosdatos.filter((datos => datos.empresa === req.query.empresa)).map((sujeto) => sujeto.nombre).flat();
                                    //console.log(nombreresponsable);
                                    /* Resultado #1 */
                                    const trabajadores = [...new Set(nombreresponsable)];
                                    /* FIN DE MUESTRA EL LISTADO DE LOS TRABAJADORES NO EDITAR */

                                    mostControl(function (error, respuestaControl) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            const deldiacontrol = respuestaControl.respuesta.filter((dcontrol) => dcontrol.fecha === fecha && dcontrol.responsables === req.query.nombre);
                                            //console.log("deldiacontrol ", deldiacontrol);
                                            /* Resultado #2 */
                                            const deldiatotal = deldiacontrol.length;
                                            //console.log("deldiatotal", deldiatotal);

                                            const terminadas = deldiacontrol.filter((filtro) => filtro.status === "TERMINADO");
                                            /* Resultado #3 */
                                            const terminadastotal = terminadas.length;
                                            //console.log("terminadas", terminadastotal);

                                            const promedio1 = terminadas.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.eficienciacontrol;
                                            }, 0);
                                            const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                                            const promediototal1 = promedio / terminadas.length;
                                            /* Resultado #3 */
                                            const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                                            //console.log(promediototal);

                                            const promedioasig = (terminadastotal * 100) / deldiatotal;
                                            /* Resultado #4 */
                                            const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                                            //console.log(promedioasigtotal);

                                            //Calcular horas hombre utilizadas:
                                            const controltiempo = deldiacontrol.map(datos => ({ tiempo: datos.timestandar }));
                                            //console.log("controltiempo ",controltiempo);

                                            const hhtranscurridas = controltiempo.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.tiempo;
                                            }, 0);
                                            //console.log("hhtranscurridas ", hhtranscurridas);

                                            const hhombretotal = timedisponible.map(datos => {
                                                const lodehoy = hhtranscurridas;

                                                const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                                                const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                                                if (lodehoy) {
                                                    //Calcular el restante en hora y minutos
                                                    const minutosRestantes = (hhtranscurridas > datos.minutosreales) ? 0 : (datos.minutosreales - hhtranscurridas);
                                                    const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                                                    const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                                                    const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                                                    const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                                                    //Calcular el tiempo transcurrido
                                                    const hrtrans = (hhtranscurridas <= 9) ? 0 : (Math.floor(hhtranscurridas / 60));
                                                    const mintrans = (hhtranscurridas <= 9) ? hhtranscurridas : (hhtranscurridas % 60);
                                                    const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                                    const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                                    //Promedio
                                                    const porcentaje = (hhtranscurridas * 100) / datos.minutosreales;
                                                    const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                                                    return {
                                                        ubicacion: datos.ubicacion,
                                                        personas: datos.personas,
                                                        hrrestante: hrrestantesfin,
                                                        minrestante: minrestantesfin,
                                                        hrtranscurrido: hrtransfin,
                                                        mintranscurrido: mintransfin,
                                                        horareal: hrrealfin,
                                                        minreal: minrealfin,
                                                        porcentaje: porcentajetotal
                                                    };
                                                }

                                                return {
                                                    ubicacion: datos.ubicacion,
                                                    personas: datos.personas,
                                                    hrrestante: hrrealfin,
                                                    minrestante: minrealfin,
                                                    hrtranscurrido: "00",
                                                    mintranscurrido: "00",
                                                    horareal: hrrealfin,
                                                    minreal: minrealfin,
                                                    porcentaje: 0
                                                };
                                            }).filter(item => item !== null);

                                            //console.log("hhombretotal ", hhombretotal);

                                            res.status(200).json({
                                                //Trabajadores
                                                trabajadores,
                                                //asignaciones
                                                deldiatotal,
                                                //terminadas
                                                terminadastotal,
                                                //promedio
                                                promediototal,
                                                //promedioasig
                                                promedioasigtotal,
                                                //naves
                                                hhombretotal

                                            })

                                        }
                                    })
                                }
                                else {
                                    if (empresa) {
                                        /* Calcular horas disponibles */

                                        //console.log(respuestaPDM.respuesta);
                                        const personalpdm = respuestaPDM.respuesta.filter(dato => dato.Area === area && dato.estatus === "true" && dato.Ubicacion === req.query.empresa).map(datos => ({ Ubicacion: datos.Ubicacion }));
                                        //console.log(personalpdm);

                                        const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
                                            if (acc[Ubicacion]) {
                                                acc[Ubicacion] += 1;
                                            } else {
                                                acc[Ubicacion] = 1;
                                            }
                                            return acc;
                                        }, {});
                                        //console.log("personas: ", numpersonal);

                                        const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
                                        //console.log(valorhr);

                                        const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
                                            const hhdisponibles = (personas * valorhr);
                                            const hhdmin = (hhdisponibles * 60);

                                            const hrentero = Math.trunc(hhdisponibles);
                                            const minreales = (hhdisponibles - hrentero) * 60;

                                            return {
                                                ubicacion: ubicacion,
                                                personas: personas,
                                                minutosreales: hhdmin,
                                                horareal: hrentero,
                                                minreal: minreales
                                            }

                                        });

                                        const ambosdatos = responsables.map((sujeto) => {
                                            const empresasujeto = deldia.find((id) => id.idasigactivi === sujeto.idasigactivi);
                                            return {
                                                nombre: sujeto.responsables,
                                                empresa: empresasujeto.empresa
                                            }
                                        });

                                        const nombreresponsable = ambosdatos.filter((datos => datos.empresa === req.query.empresa)).map((sujeto) => sujeto.nombre).flat();
                                        //console.log(nombreresponsable);
                                        //RESULTADO1: TRABAJADORES OPERANDO
                                        const trabajadores = [...new Set(nombreresponsable)];


                                        //CALCULAR LAS CAJAS DE INFORMACION DE LA EMPRESA (CAMBIA EL CONCEPTO DE "deldia", por los datos obtenidos)
                                        const deldiaempresa = deldia.filter((datos => datos.empresa === req.query.empresa));
                                        //console.log("deldiaempresa", deldiaempresa);
                                        const deldiatotal = deldiaempresa.length;
                                        //console.log("deldiaempresa", deldiaempresa);

                                        const terminadas = deldiaempresa.filter((filtro) => filtro.status === "TERMINADO");
                                        const terminadastotal = terminadas.length;
                                        //console.log("terminadas", terminadas.length);

                                        const promedio1 = terminadas.reduce((acumulador, filtro) => {
                                            return acumulador + filtro.eficienciasig;
                                        }, 0);
                                        const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                                        const promediototal1 = promedio / terminadas.length
                                        const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                                        //console.log(promediototal);


                                        const promedioasig = (terminadastotal * 100) / deldiatotal;
                                        const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                                        //console.log(promedioasigtotal);


                                        //Calcular horas hombre utilizadas:

                                        const empresatempo = deldiaempresa.map(datos => ({ empresa: datos.empresa, tiempo: datos.timeControl }));
                                        //console.log(empresatempo);

                                        const Hhempresa = empresatempo.reduce((acc, { empresa, tiempo }) => {
                                            if (acc[empresa]) {
                                                acc[empresa] += tiempo;
                                            } else {
                                                acc[empresa] = tiempo;
                                            }
                                            return acc;
                                        }, {});

                                        const hhtranscurridas = Object.entries(Hhempresa).map(([empresa, tiempo]) => ({ empresa, tiempo }));
                                        //console.log("hhtranscurridas ", hhtranscurridas);

                                        const hhombretotal = timedisponible.map(datos => {
                                            const lodehoy = hhtranscurridas.find(datos2 => datos2.empresa === datos.ubicacion);

                                            const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                                            const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                                            if (lodehoy) {
                                                //Calcular el restante en hora y minutos
                                                const minutosRestantes = (lodehoy.tiempo > datos.minutosreales) ? 0 : (datos.minutosreales - lodehoy.tiempo);
                                                const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                                                const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                                                const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                                                const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                                                //Calcular el tiempo transcurrido
                                                const hrtrans = (lodehoy.tiempo <= 9) ? 0 : (Math.floor(lodehoy.tiempo / 60));
                                                const mintrans = (lodehoy.tiempo <= 9) ? lodehoy.tiempo : (lodehoy.tiempo % 60);
                                                const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                                const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                                //Promedio
                                                const porcentaje = (lodehoy.tiempo * 100) / datos.minutosreales;
                                                const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                                                return {
                                                    ubicacion: datos.ubicacion,
                                                    personas: datos.personas,
                                                    hrrestante: hrrestantesfin,
                                                    minrestante: minrestantesfin,
                                                    hrtranscurrido: hrtransfin,
                                                    mintranscurrido: mintransfin,
                                                    horareal: hrrealfin,
                                                    minreal: minrealfin,
                                                    porcentaje: porcentajetotal
                                                };
                                            }

                                            return {
                                                ubicacion: datos.ubicacion,
                                                personas: datos.personas,
                                                hrrestante: hrrealfin,
                                                minrestante: minrealfin,
                                                hrtranscurrido: "00",
                                                mintranscurrido: "00",
                                                horareal: hrrealfin,
                                                minreal: minrealfin,
                                                porcentaje: 0
                                            };
                                        }).filter(item => item !== null);

                                        //console.log("total ", hhombretotal);

                                        res.status(200).json({
                                            //Trabajadores
                                            trabajadores,
                                            //asignaciones
                                            deldiatotal,
                                            //terminadas
                                            terminadastotal,
                                            //promedio
                                            promediototal,
                                            //promedioasig
                                            promedioasigtotal,
                                            //naves
                                            hhombretotal

                                        })
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
    }
}
)
/* Fin de hoja de actdiarias */



/* Hoja de asignacion */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/asignacion', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    //console.log(usuario);
    const responsable = usuario.nombre;
    const id = usuario.id;
    //console.log(responsable);
    if (id === "RPMhzte1p8rlfmmq44l" || id === "RPMhztezf1lfbjn5nt") {
        mostAsignacion(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const nuevarespuesta = respuesta.respuesta.filter(filtro => filtro.status != "TERMINADO" && (filtro.responsable === "MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO") && filtro.fechainicio >= fecha);
                //console.log(nuevarespuesta);
                res.status(200).json({
                    nuevarespuesta
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        mostAsignacion(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const nuevarespuesta = respuesta.respuesta.filter(filtro => filtro.status != "TERMINADO" && filtro.responsable === responsable && filtro.fechainicio >= fecha);
                //console.log(nuevarespuesta);
                res.status(200).json({
                    nuevarespuesta
                })
            }
            //console.log(respuesta);
        })
    }
})
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.post('/insertarAsigactividad', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    //console.log(usuario)  
    //const responsable = usuario.nombre;
    const kg = 0;
    const numpersonas = 0;
    const eficacia = 0;
    const eficienciasig = 0;
    //console.log(responsable)
    mostAsignacion(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log("Asignación de actividades ",respuesta.respuesta);
            //console.log("Datos del formulario", req.body)
            if (fecha && usuario.nombre && req.body.fechainicio && req.body.empresa && req.body.idactividad) {
                const datos = respuesta.respuesta.find((filtro) => filtro.fechainicio === req.body.fechainicio && filtro.empresa === req.body.empresa && filtro.idactividad === req.body.idactividad);
                //console.log("Datos filtrados ", datos);
                if (datos) {
                    console.log("");
                    res.status(400).json({
                        mensaje: "La actividad ya existe.."
                    });
                }
                else {
                    console.log("No existe esta actividad");
                    const status = "INICIAR"
                    const timecontrol = 0;
                    insertarAsigactivi(fecha, usuario.nombre, req.body.fechainicio, req.body.empresa, req.body.idactividad, status, timecontrol, kg, numpersonas, eficacia, eficienciasig, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            io.emit('escuchando', respuesta.mensaje);
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })

                }
            }
            else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });
            }
        }
        //console.log(respuesta);
    })
})
app.put('/actualizarAsig', (req, res) => {
    /* idasigactivi, fechainicio, empresa,idactividad,status */
    const status = "INACTIVO";
    if (req.body.motivo) {
        editAsignacion(req.body.idasigactivi, status, req.body.motivo, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                io.emit('escuchando', respuesta.mensaje);
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
/* Fin de hoja de asinacion */


/* Hoja de control */
//MODIFICADO PARA TENER EL MISMO ESTILO QUE ACTDIARIAS (29/01/2025)
app.get('/Controlasignados', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    var idcheck = req.query.nombre;
    var empresa = req.query.empresa;
    //console.log(empresa);
    mostAsignacion(function (error, respuestaAsig) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuestaAsig.mensaje
            })
        }
        else {
            const asignadas = respuestaAsig.respuesta.filter(filtro => filtro.empresa === empresa && filtro.fechainicio === fecha);
            //console.log("asignadas", asignadas);
            const deldiatotal = asignadas.length;

            const terminadas = asignadas.filter((filtro) => filtro.status === "TERMINADO");
            /* Resultado #2 */
            const terminadastotal = terminadas.length;
            //console.log("terminadas", terminadastotal);

            const promedio1 = terminadas.reduce((acumulador, filtro) => {
                return acumulador + filtro.eficienciacontrol;
            }, 0);
            const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
            const promediototal1 = promedio / terminadas.length;
            /* Resultado #3 */
            const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
            //console.log(promediototal);

            const promedioasig = (terminadastotal * 100) / deldiatotal;
            /* Resultado #4 */
            const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
            //console.log(promedioasigtotal);

            mostStatusresponsable(function (error, respuestaResponsable) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    //console.log(respuestaResponsable);

                    const responsables = respuestaResponsable.respuesta.filter((responsable) => responsable.fecha === fecha && responsable.idchecksupervisor === idcheck);
                    //console.log("responsables ",responsables);

                    const nombres = responsables.map((sujeto) => {
                        return {
                            nombre: sujeto.responsables,
                        }
                    });
                    //console.log("nombres ",nombres);
                    const nomempresas = nombres.map((datos => ([datos.nombre]))).flat();
                    const uninombre = [...new Set(nomempresas)];
                    //console.log("uninombre ",uninombre);


                    const respuestacard = asignadas.map(datos => {
                        const responsablesid = responsables.filter((sujeto) => sujeto.idasigactivi === datos.idasigactivi).map((sujetofinal) => {
                            const hrtrans = (sujetofinal.timestandar <= 9) ? 0 : (Math.floor(sujetofinal.timestandar / 60));
                            const mintrans = (sujetofinal.timestandar <= 9) ? sujetofinal.timestandar : (sujetofinal.timestandar % 60);
                            const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                            const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                            return {
                                nombre: sujetofinal.responsables,
                                tiempo: hrtransfin + ":" + mintransfin,
                                estatus: sujetofinal.status,
                                kgresponsable: sujetofinal.kg,
                                kg: sujetofinal.kg,
                                eficiencia: sujetofinal.eficienciacontrol

                            }
                        });
                        //console.log("responsablesid ", responsablesid);
                        const ordenadoresponsables = [];
                        // Definir el orden de los estatus
                        const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                        // Ordenar los datos antes de agregar a nuevocontrol
                        responsablesid.forEach((datos) => {
                            // Agregar los datos al arreglo, ordenados por el estatus
                            const estatusIndex = ordenEstatus.indexOf(datos.estatus);
                            if (estatusIndex !== -1) {
                                ordenadoresponsables.push({ ...datos, estatusIndex });
                            }
                        });

                        ordenadoresponsables.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                            delete datos.estatusIndex;
                        });
                        //console.log("Ordenado: ", ordenadoresponsables);

                        //Calcular el tiempo transcurrido en asignadas
                        const hrtrans = (datos.timeControl <= 9) ? 0 : (Math.floor(datos.timeControl / 60));
                        const mintrans = (datos.timeControl <= 9) ? datos.timeControl : (datos.timeControl % 60);
                        const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                        const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                        return {
                            Id: datos.idasigactivi,
                            Empresa: datos.empresa,
                            Actividad: datos.actividad,
                            TiempoTranscurrido: hrtransfin + ":" + mintransfin,
                            KgRealizados: datos.kgControl + "kg",
                            Eficiencia: datos.eficienciasig + "%",
                            Estatus: datos.status,
                            Responsables: datos.numpersonas,
                            asignados: ordenadoresponsables,
                            kgactividades: datos.kg


                        }
                    });
                    //console.log("respuestacard ", respuestacard);

                    const nuevoarray = [];
                    // Definir el orden de los estatus
                    const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                    // Ordenar los datos antes de agregar a nuevocontrol
                    respuestacard.forEach((datos) => {
                        // Agregar los datos al arreglo, ordenados por el estatus
                        const estatusIndex = ordenEstatus.indexOf(datos.Estatus);
                        if (estatusIndex !== -1) {
                            nuevoarray.push({ ...datos, estatusIndex });
                        }
                    })

                    nuevoarray.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                        delete datos.estatusIndex;
                    });


                    //console.log("Ordenado: ", nuevoarray);

                    //console.log("Sin ordenar: ", respuestacard);

                    res.status(200).json({
                        asignadas,
                        nuevoarray,
                        uninombre,

                        //asignaciones
                        deldiatotal,
                        //terminadas
                        terminadastotal,
                        //promedio
                        promediototal,
                        //promedioasig
                        promedioasigtotal,
                    })
                }

            });

        }
        //console.log(respuesta);
    })
})
//SE AGREGAN MODIFICACIONES PDE MEJORA 21/01
app.post('/insertarControl', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    if (req.body.idactividades && fecha && req.body.responsables && req.body.idasigactivi && req.body.idchecksupervisor) {
        const timestandar = 0;
        const kg = 0;
        const lon = 0;
        const lat = 0;
        const status = "INICIAR";
        //console.log(req.body);
        mostStatusresponsable(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje

                })
            }
            else {
                //console.log(req.body)
                //console.log(respuesta.respuesta)
                const datosFil = respuesta.respuesta.find((filtro) => filtro.fecha === fecha && filtro.idactividades === req.body.idactividades && filtro.responsables === req.body.responsables);
                //console.log(datosFil);
                if (datosFil) {
                    //console.log("El responsable ya esta asignado en la actividad");
                    res.status(400).json({
                        mensaje: "El responsable ya esta asignado en la actividad"
                    });

                } else {
                    //console.log(req.body.idasigactivi,);
                    mostIdusuario(function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            //console.log(req.body.responsables);
                            const searchidcheck = respuesta.respuesta.find(filtro => filtro.NombreCompleto === req.body.responsables);
                            //console.log(searchidcheck);
                            if (searchidcheck) {
                                const idcheck = searchidcheck.idCheck;
                                //console.log(idcheck);
                                insertarControlactivi(req.body.idactividades, fecha, req.body.responsables, timestandar, kg, lon, lat, status, req.body.idasigactivi, idcheck, req.body.idchecksupervisor, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        io.emit('escuchando', respuesta.mensaje);
                                        mostNumpersonas(req.body.idasigactivi, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                //console.log(respuesta.respuesta[0].numpersonas);
                                                const personastotales = respuesta.respuesta[0].numpersonas + 1;
                                                //console.log(personastotales);
                                                editNumpersonas(req.body.idasigactivi, personastotales, function (error, respuesta) {
                                                    if (error) {
                                                        console.log(error)
                                                        res.status(404).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    else {
                                                        io.emit('escuchando', respuesta.mensaje);
                                                        res.status(200).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    //console.log(respuesta);
                                                })
                                            }
                                            //console.log(respuesta);
                                        })

                                    }
                                    //console.log(respuesta);
                                })
                            }
                            else {
                                console.log("Solicite ayuda al equipo de desarrollo");
                                res.status(400).json({
                                    mensaje: "Solicite ayuda al equipo de desarrollo."
                                });
                            }
                        }
                        //console.log(respuesta);
                    })
                }
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.get('/buscar_Supervisor/:id', async (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    var idcheck = req.params.id
    //console.log(idcheck)
    mostIdcheck(idcheck, function (error, respuestaidCheck) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaidCheck);
            if (respuestaidCheck.respuesta && respuestaidCheck.respuesta.length > 0) {
                const responsable = respuestaidCheck.respuesta[0].NombreCompleto;
                //console.log(responsable);

                mostPDM(function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuesta.respuesta);
                        const supervisor = respuesta.respuesta.find(filtro => filtro.Nombre === responsable && filtro.Puesto === "SUPERVISOR");
                        const resultadosupervisor = supervisor ? "es supervisor" : "no es supervisor";
                        //console.log(resultadosupervisor);
                        if (resultadosupervisor === "no es supervisor") {
                            res.status(400).json({
                                mensaje: "No tienes los permisos para esta actividad"
                            })
                        }
                        else {
                            const empresa = supervisor.Ubicacion;
                            //console.log(supervisor.Ubicacion);
                            //console.log(fecha);
                            //console.log(respuesta.respuesta);
                            mostControlactivi(supervisor.Ubicacion, fecha, function (error, respuestaActividades) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    //console.log("Actividades asignadas: ", respuestaActividades.respuesta.length);
                                    mostIdusuarioPMateriales(supervisor.Ubicacion, function (error, respuestaMateriales) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            const responsables = respuestaMateriales.respuesta.filter((estatus) => estatus.estatus === "true");
                                            //console.log(responsables.length);
                                            res.status(200).json({
                                                empresa: empresa,
                                                actividades: respuestaActividades,
                                                responsables: responsables,
                                                asignadas: respuestaActividades.respuesta.length
                                            })
                                        }
                                        //console.log(respuesta);
                                    })
                                }
                                //console.log(respuesta);
                            })
                        }


                    }
                    //console.log(respuesta);
                })
            } else {
                res.status(400).json({
                    mensaje: "No existe el usuario que intenta buscar"
                })
            }
        }
    })
})
app.get('/datoselectcontrol', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const dia = moment().format("dddd");
    //console.log(dia);

    //console.log(req.query);
    const empresa = (req.query.nave === 'null') ? "" : req.query.nave;
    const nombre = (req.query.trabajador === 'null') ? "" : req.query.trabajador;

    if (nombre) {
        /* Calcular horas disponibles */
        /* //console.log(respuestaPDM.respuesta);
        const personalpdm = respuestaPDM.respuesta.filter(dato => dato.Area === area && dato.estatus === "true" && dato.Ubicacion === req.query.empresa && dato.Nombre === req.query.nombre).map(datos => ({ Ubicacion: datos.Ubicacion }));
        //console.log(personalpdm);

        const numpersonal = personalpdm.reduce((acc, { Ubicacion }) => {
            if (acc[Ubicacion]) {
                acc[Ubicacion] += 1;
            } else {
                acc[Ubicacion] = 1;
            }
            return acc;
        }, {});
        //console.log("personas: ", numpersonal);

        const valorhr = (dia === "Saturday" || dia === "Sunday") ? 4.5 : 8.5;
        //console.log(valorhr);

        const timedisponible = Object.entries(numpersonal).map(([ubicacion, personas]) => {
            const hhdisponibles = (personas * valorhr);
            const hhdmin = (hhdisponibles * 60);

            const hrentero = Math.trunc(hhdisponibles);
            const minreales = (hhdisponibles - hrentero) * 60;

            return {
                ubicacion: ubicacion,
                personas: personas,
                minutosreales: hhdmin,
                horareal: hrentero,
                minreal: minreales
            }

        }); */

        mostControl(function (error, respuestaControl) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const deldiacontrol = respuestaControl.respuesta.filter((dcontrol) => dcontrol.fecha === fecha && dcontrol.responsables === req.query.trabajador);
                //console.log("deldiacontrol ", deldiacontrol);
                /* Resultado #1 */
                const deldiatotal = deldiacontrol.length;
                //console.log("deldiatotal", deldiatotal);

                const terminadas = deldiacontrol.filter((filtro) => filtro.status === "TERMINADO");
                /* Resultado #2 */
                const terminadastotal = terminadas.length;
                //console.log("terminadas", terminadastotal);

                const promedio1 = terminadas.reduce((acumulador, filtro) => {
                    return acumulador + filtro.eficienciacontrol;
                }, 0);
                const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
                const promediototal1 = promedio / terminadas.length;
                /* Resultado #3 */
                const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
                //console.log(promediototal);

                const promedioasig = (terminadastotal * 100) / deldiatotal;
                /* Resultado #4 */
                const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
                //console.log(promedioasigtotal);

                //Calcular horas hombre utilizadas (CALCULAR HORAS HOMBRE Y MOSTRAR CUADRO):
                /* const controltiempo = deldiacontrol.map(datos => ({ tiempo: datos.timestandar }));
                //console.log("controltiempo ",controltiempo);

                const hhtranscurridas = controltiempo.reduce((acumulador, filtro) => {
                    return acumulador + filtro.tiempo;
                }, 0);
                //console.log("hhtranscurridas ", hhtranscurridas);

                const hhombretotal = timedisponible.map(datos => {
                    const lodehoy = hhtranscurridas;

                    const hrrealfin = (datos.horareal <= 9) ? "0" + datos.horareal : datos.horareal;
                    const minrealfin = (datos.minreal <= 9) ? "0" + datos.minreal : datos.minreal;

                    if (lodehoy) {
                        //Calcular el restante en hora y minutos
                        const minutosRestantes = (hhtranscurridas > datos.minutosreales) ? 0 : (datos.minutosreales - hhtranscurridas);
                        const hrrestantes = (minutosRestantes != 0 && minutosRestantes < 59) ? 0 : Math.floor(minutosRestantes / 60);
                        const minrestantes = (minutosRestantes < 59) ? minutosRestantes : (minutosRestantes % 60);
                        const hrrestantesfin = (hrrestantes <= 9) ? "0" + hrrestantes : hrrestantes;
                        const minrestantesfin = (minrestantes <= 9) ? "0" + minrestantes : minrestantes;

                        //Calcular el tiempo transcurrido
                        const hrtrans = (hhtranscurridas <= 9) ? 0 : (Math.floor(hhtranscurridas / 60));
                        const mintrans = (hhtranscurridas <= 9) ? hhtranscurridas : (hhtranscurridas % 60);
                        const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                        const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                        //Promedio
                        const porcentaje = (hhtranscurridas * 100) / datos.minutosreales;
                        const porcentajetotal = Math.round((porcentaje + Number.EPSILON) * 100) / 100;

                        return {
                            ubicacion: datos.ubicacion,
                            personas: datos.personas,
                            hrrestante: hrrestantesfin,
                            minrestante: minrestantesfin,
                            hrtranscurrido: hrtransfin,
                            mintranscurrido: mintransfin,
                            horareal: hrrealfin,
                            minreal: minrealfin,
                            porcentaje: porcentajetotal
                        };
                    }

                    return {
                        ubicacion: datos.ubicacion,
                        personas: datos.personas,
                        hrrestante: hrrealfin,
                        minrestante: minrealfin,
                        hrtranscurrido: "00",
                        mintranscurrido: "00",
                        horareal: hrrealfin,
                        minreal: minrealfin,
                        porcentaje: 0
                    };
                }).filter(item => item !== null);

                //console.log("hhombretotal ", hhombretotal); */

                res.status(200).json({
                    //asignaciones
                    deldiatotal,
                    //terminadas
                    terminadastotal,
                    //promedio
                    promediototal,
                    //promedioasig
                    promedioasigtotal,

                });

            }
        })
    }
}
)

/* Fin de hoja de control */




/* Hoja de editeficienciakg */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN, MODIFICADO PARA MOSTRAR RESULTADOS POR CARD */
app.get('/EficienciaKg', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    const id = usuario.id;
    //console.log(responsable);
    mostEficienciakg(function (error, respuestaEficienciakg) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaEficienciakg.respuesta);
            let respuesta = {};
            if (id === "RPMhzte1p8rlfmmq44l" || id === "RPMhztezf1lfbjn5nt") {
                respuesta = respuestaEficienciakg.respuesta.filter(filtro => (filtro.responsable === "MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO"));
            }
            else {
                respuesta = respuestaEficienciakg.respuesta.filter((filtro) => filtro.responsable === responsable);
            }
            const asignadas = respuesta;
            mostStatusresponsable(function (error, respuestaResponsable) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    //console.log(respuestaResponsable);
                    const respuestacard = asignadas.map(datos => {
                        const responsablesid = respuestaResponsable.respuesta.filter((sujeto) => sujeto.idasigactivi === datos.idasigactivi).map((sujetofinal) => {
                            const hrtrans = (sujetofinal.timestandar <= 9) ? 0 : (Math.floor(sujetofinal.timestandar / 60));
                            const mintrans = (sujetofinal.timestandar <= 9) ? sujetofinal.timestandar : (sujetofinal.timestandar % 60);
                            const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                            const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                            return {
                                idcontrol: sujetofinal.idcontrolactivi,
                                nombre: sujetofinal.responsables,
                                tiempo: hrtransfin + ":" + mintransfin,
                                estatus: sujetofinal.status,
                                KgRealizados: sujetofinal.kg,
                                kg: sujetofinal.kg

                            }
                        });
                        //console.log("responsablesid ", responsablesid);
                        const ordenadoresponsables = [];
                        // Definir el orden de los estatus
                        const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                        // Ordenar los datos antes de agregar a nuevocontrol
                        responsablesid.forEach((datos) => {
                            // Agregar los datos al arreglo, ordenados por el estatus
                            const estatusIndex = ordenEstatus.indexOf(datos.estatus);
                            if (estatusIndex !== -1) {
                                ordenadoresponsables.push({ ...datos, estatusIndex });
                            }
                        });

                        ordenadoresponsables.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                            delete datos.estatusIndex;
                        });
                        //console.log("Ordenado: ", ordenadoresponsables);

                        //Calcular el tiempo transcurrido en asignadas
                        const hrtrans = (datos.timeControl <= 9) ? 0 : (Math.floor(datos.timeControl / 60));
                        const mintrans = (datos.timeControl <= 9) ? datos.timeControl : (datos.timeControl % 60);
                        const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                        const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                        return {
                            Id: datos.idasigactivi,
                            fecha: datos.fechainicio,
                            Empresa: datos.empresa,
                            Actividad: datos.actividad,
                            TiempoTranscurrido: hrtransfin + ":" + mintransfin,
                            KgRealizados: datos.kgControl + "kg",
                            Eficiencia: datos.eficienciasig + "%",
                            Estatus: datos.status,
                            Responsables: datos.numpersonas,
                            asignados: ordenadoresponsables,
                            individualestatus: datos.individualkg,
                            kg: datos.kgControl,

                        }
                    });
                    //console.log("respuestacard ", respuestacard);

                    const nuevoarray = [];
                    // Definir el orden de los estatus
                    const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

                    // Ordenar los datos antes de agregar a nuevocontrol
                    respuestacard.forEach((datos) => {
                        // Agregar los datos al arreglo, ordenados por el estatus
                        const estatusIndex = ordenEstatus.indexOf(datos.Estatus);
                        if (estatusIndex !== -1) {
                            nuevoarray.push({ ...datos, estatusIndex });
                        }
                    })

                    nuevoarray.sort((a, b) => a.estatusIndex - b.estatusIndex).forEach((datos) => {
                        delete datos.estatusIndex;
                    });


                    //console.log("Ordenado: ", nuevoarray);

                    //console.log("Sin ordenar: ", respuestacard);

                    res.status(200).json({
                        nuevoarray,
                    })
                }

            });

            /* res.status(200).json({
                respuesta
            }) */
        }
        //console.log(respuesta);
    })
}
)
app.put('/actualizarAsignacionkg', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* idasigactivi, status, timestandar, kg */
    const status = "TERMINADO";
    if (req.body.idasigactivi) {
        //console.log(req.body);
        mostEficienciakg(function (error, respuestaEficienciakg) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const idasigactivi = parseInt(req.body.idasigactivi);
                const asignacion = respuestaEficienciakg.respuesta.find(filtro => filtro.idasigactivi === idasigactivi);
                //console.log(asignacion);
                const idactividades = asignacion.idactividades;
                const kgrecord = parseInt(asignacion.kg);

                mostAsignaciones(idasigactivi, function (error, respuestaAsignaciones) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuesta.respuesta);
                        const todasasignaciones = respuestaAsignaciones.respuesta;
                        if (asignacion.individualkg === "true") {
                            if (req.body.kgcontrol && req.body.idcontrolactivi) {
                                const kgcontrol = parseFloat(req.body.kgcontrol);
                                //CALCULAR EFICIENCIA POR CONTROL
                                const timecontrol = respuestaAsignaciones.respuesta.find((sujeto) => sujeto.idcontrolactivi === req.body.idcontrolactivi);
                                const porhora = (kgcontrol / timecontrol.timestandar) * 60;
                                const eficienciasig1 = (porhora * 100) / kgrecord;
                                const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                //console.log(eficienciatotal);
                                //FIN DE CALCULAR EFICIENCIA POR CONTROL

                                //console.log(req.body.idcontrolactivi, req.body.kgcontrol, eficienciatotal);
                                editControlkg(req.body.idcontrolactivi, req.body.kgcontrol, eficienciatotal, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        io.emit('escuchando', respuesta);
                                        mostAsignaciones(idasigactivi, function (error, respuestaAsignaciones) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                const todosconkg = respuestaAsignaciones.respuesta.every(control => control.kg > 0);
                                                if (!todosconkg) {
                                                    res.status(200).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    const kgcontrolsumado = respuestaAsignaciones.respuesta.reduce((acumulador, filtro) => {
                                                        return acumulador + filtro.kg;
                                                    }, 0);
                                                    //console.log("kgcontrolsumado ",kgcontrolsumado);
                                                    if (kgcontrolsumado) {
                                                        const timecontrol = asignacion.timeControl;
                                                        //console.log("timecontrol ", timecontrol);

                                                        //CALCULAR EFICIENCIA POR ASIGNACION
                                                        const porhora = (kgcontrolsumado / timecontrol) * 60;
                                                        const eficienciasig1 = (porhora * 100) / asignacion.kg;
                                                        const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                                        //console.log(eficienciatotal);
                                                        //FIN DE CALCULAR EFICIENCIA POR ASIGNACION
                                                        const eficacia = 0;
                                                        console.log(req.body.idasigactivi, eficacia, eficienciatotal, asignacion.individualkg,);
                                                        editStatusasignacion(req.body.idasigactivi, status, timecontrol, kgcontrolsumado, function (error, respuesta) {
                                                            if (error) {
                                                                console.log(error)
                                                                res.status(404).json({
                                                                    mensaje: respuesta.mensaje
                                                                })
                                                            }
                                                            else {
                                                                io.emit('escuchando', respuesta);
                                                                editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, asignacion.individualkg, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error)
                                                                        res.status(404).json({
                                                                            mensaje: respuesta.mensaje
                                                                        })
                                                                    }
                                                                    else {
                                                                        io.emit('escuchando', respuesta.mensaje);
                                                                        if (eficienciatotal >= 100) {
                                                                            const hora = 1;
                                                                            const minutos = 0;
                                                                            const timecontrol = 60;
                                                                            const kilos = Math.round((porhora + Number.EPSILON) * 100) / 100;
                                                                            console.log(kilos);
                                                                            editStatusactividadesKg(idactividades, kilos, hora, minutos, timecontrol, eficienciatotal, function (error, respuesta) {
                                                                                if (error) {
                                                                                    console.log(error)
                                                                                    res.status(404).json({
                                                                                        mensaje: respuesta.mensaje
                                                                                    })
                                                                                }
                                                                                else {
                                                                                    io.emit('escuchando', respuesta.mensaje);
                                                                                    res.status(200).json({
                                                                                        mensaje: respuesta.mensaje
                                                                                    })
                                                                                }
                                                                                console.log(respuesta);
                                                                            })
                                                                        }
                                                                        else {
                                                                            res.status(200).json({
                                                                                mensaje: "Actividad terminada"
                                                                            });
                                                                        }
                                                                    }
                                                                })


                                                            }
                                                            //console.log(respuesta);
                                                        })
                                                    }
                                                    else {
                                                        res.status(400).json({
                                                            mensaje: "Solicita ayuda del desarrollador"
                                                        })
                                                    }

                                                }
                                            }
                                        })

                                    }
                                })

                            }
                            else {
                                res.status(400).json({
                                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                                })
                            }

                        }
                        else {
                            if (req.body.kg) {
                                const timecontrol = asignacion.timeControl;
                                //console.log("timecontrol ", timecontrol);
                                const porminuto = req.body.kg / timecontrol;
                                //console.log(req.body.idasigactivi, status, timecontrol, req.body.kg);
                                editStatusasignacion(req.body.idasigactivi, status, timecontrol, req.body.kg, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        todasasignaciones.forEach((datos) => {
                                            const kgrealizados1 = porminuto * datos.timestandar;
                                            const kgrealizados = Math.round((kgrealizados1 + Number.EPSILON) * 100) / 100;
                                            //console.log("datos.timestandar ",kgrealizados);
                                            //console.log("kgrealizados ",kgrealizados);

                                            //CALCULAR EFICIENCIA POR CONTROL
                                            const porhora = (kgrealizados / datos.timestandar) * 60;
                                            const eficienciasig1 = (porhora * 100) / kgrecord;
                                            const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                            //console.log("eficienciatotal ",eficienciatotal);
                                            //FIN DE CALCULAR EFICIENCIA POR CONTROL

                                            //console.log(datos.idcontrolactivi, kgrealizados, eficienciatotal,);
                                            editControlkg(datos.idcontrolactivi, kgrealizados, eficienciatotal, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta);
                                                    console.log(respuesta);
                                                }
                                            })
                                        })

                                        //CALCULAR EFICIENCIA POR ASIGNACION
                                        const timecontrol = asignacion.timeControl;
                                        const porhora = (req.body.kg / timecontrol) * 60;
                                        const eficienciasig1 = (porhora * 100) / asignacion.kg;
                                        const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                        //console.log(eficienciatotal);
                                        //FIN DE CALCULAR EFICIENCIA POR ASIGNACION
                                        const eficacia = 0;
                                        editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, req.body.condicionglobal, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                io.emit('escuchando', respuesta.mensaje);
                                                if (eficienciatotal >= 100) {
                                                    const hora = 1;
                                                    const minutos = 0;
                                                    const timecontrol = 60;
                                                    const kilos = Math.round((porhora + Number.EPSILON) * 100) / 100;
                                                    //console.log(kilos);
                                                    editStatusactividadesKg(idactividades, kilos, hora, minutos, timecontrol, eficienciatotal, function (error, respuesta) {
                                                        if (error) {
                                                            console.log(error)
                                                            res.status(404).json({
                                                                mensaje: respuesta.mensaje
                                                            })
                                                        }
                                                        else {
                                                            io.emit('escuchando', respuesta.mensaje);
                                                            res.status(200).json({
                                                                mensaje: respuesta.mensaje
                                                            })
                                                        }
                                                        console.log(respuesta);
                                                    })
                                                }
                                                else {
                                                    res.status(200).json({
                                                        mensaje: "Actividad terminada"
                                                    });
                                                }
                                            }
                                        })


                                    }
                                    //console.log(respuesta);
                                })
                            }
                            else {
                                res.status(400).json({
                                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                                })
                            }
                        }

                    }
                })


            }
            //console.log(respuesta);
        })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/editestatusasig', (req, res) => {
    //console.log(req.body);
    if (req.body.idasigactivi) {
        const eficacia = 0;
        const eficienciatotal = 0;
        editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, req.body.condicionglobal, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                io.emit('escuchando', respuesta.mensaje);
                res.status(200).json({
                    mensaje: "Actividad terminada"
                });
            }
        })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
/* Fin de hoja de editeficienciakg */




/* Hoja de eficacia */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/Eficacia', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    const id = usuario.id;
    //console.log(responsable);
    if (id === "RPMhzte1p8rlfmmq44l" || id === "RPMhztezf1lfbjn5nt") {
        mostAsignacion(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const respuesta = respuestaAsig.respuesta.filter(filtro => (filtro.responsable === "MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO"));
                //console.log(nuevarespuesta);
                res.status(200).json({
                    respuesta
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        mostAsignacioneficacia(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const todasasignadas = respuestaAsig.respuesta.filter(filtro => filtro.responsable === responsable);
                //console.log("todasasignadas ",respuesta);

                mostStatusresponsable(function (error, respuestaResponsable) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log("respuestaResponsable ", respuestaResponsable);
                        const respuesta = todasasignadas.map((asignado) => {
                            const responsables = respuestaResponsable.respuesta.filter((control) => control.idasigactivi === asignado.idasigactivi).length;

                            const hrtrans = (asignado.timeControl <= 9) ? 0 : (Math.floor(asignado.timeControl / 60));
                            const mintrans = (asignado.timeControl <= 9) ? asignado.timeControl : (asignado.timeControl % 60);
                            const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                            const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                            const responsablesid = respuestaResponsable.respuesta.filter((sujeto) => sujeto.idasigactivi === asignado.idasigactivi).map((sujetofinal) => {
                                const hrtrans = (sujetofinal.timestandar <= 9) ? 0 : (Math.floor(sujetofinal.timestandar / 60));
                                const mintrans = (sujetofinal.timestandar <= 9) ? sujetofinal.timestandar : (sujetofinal.timestandar % 60);
                                const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                return {
                                    nombre: sujetofinal.responsables,
                                    tiempo: hrtransfin + ":" + mintransfin,
                                    estatus: sujetofinal.status

                                }
                            });

                            return {
                                idasigactivi: asignado.idasigactivi,
                                fecha: asignado.fechainicio,
                                empresa: asignado.empresa,
                                timeControl: hrtransfin + ":" + mintransfin,
                                kgControl: asignado.kgControl,
                                eficienciasig: asignado.eficienciasig,
                                actividad: asignado.actividad,
                                numpersonas: responsables,
                                asignados: responsablesid,
                                kgactividad: asignado.kg,
                            }
                        })
                        //console.log(respuesta);
                        res.status(200).json({
                            respuesta
                        })
                    }
                })
            }
            //console.log(respuesta);
        })
    }
}
)
app.get('/buscafechas', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(responsable);
    const id = usuario.id;
    console.log(req.query);
    if (id === "RPMhzte1p8rlfmmq44l" || id === "RPMhztezf1lfbjn5nt") {
        mostAsignacion(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const respuesta = respuestaAsig.respuesta.filter(filtro => (filtro.responsable === "MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO"));
                //console.log(nuevarespuesta);
                res.status(200).json({
                    respuesta
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        mostAsignacioneficacia(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const todasasignadas = respuestaAsig.respuesta.filter(filtro => filtro.responsable === responsable);
                console.log("todasasignadas ", todasasignadas);

                /* mostStatusresponsable(function (error, respuestaResponsable) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        console.log("respuestaResponsable ", respuestaResponsable);
                        const respuesta = todasasignadas.map((asignado) => {
                            const responsables = respuestaResponsable.respuesta.filter((control) => control.idasigactivi === asignado.idasigactivi).length;

                            const hrtrans = (asignado.timeControl <= 9) ? 0 : (Math.floor(asignado.timeControl / 60));
                            const mintrans = (asignado.timeControl <= 9) ? asignado.timeControl : (asignado.timeControl % 60);
                            const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                            const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                            const responsablesid = respuestaResponsable.respuesta.filter((sujeto) => sujeto.idasigactivi === asignado.idasigactivi).map((sujetofinal) => {
                                const hrtrans = (sujetofinal.timestandar <= 9) ? 0 : (Math.floor(sujetofinal.timestandar / 60));
                                const mintrans = (sujetofinal.timestandar <= 9) ? sujetofinal.timestandar : (sujetofinal.timestandar % 60);
                                const hrtransfin = (hrtrans <= 9) ? "0" + hrtrans : hrtrans;
                                const mintransfin = (mintrans <= 9) ? "0" + mintrans : mintrans;

                                return {
                                    nombre: sujetofinal.responsables,
                                    tiempo: hrtransfin + ":" + mintransfin,
                                    estatus: sujetofinal.status

                                }
                            });

                            return {
                                idasigactivi: asignado.idasigactivi,
                                fecha: asignado.fechainicio,
                                empresa: asignado.empresa,
                                timeControl: hrtransfin + ":" + mintransfin,
                                kgControl: asignado.kgControl,
                                eficienciasig: asignado.eficienciasig,
                                actividad: asignado.actividad,
                                numpersonas: responsables,
                                asignados: responsablesid,
                                kgactividad: asignado.kg,
                            }
                        })
                        console.log(respuesta);
                        res.status(200).json({
                            respuesta
                        })
                    }
                }) */
            }
            //console.log(respuesta);
        })
    }
}
)
/* Fin de hoja de eficacia */



/* Hoja de porusuario */
app.get('/Controlresponsable', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    //console.log(req.query.responsable);
    mostControlresponsable(fecha, req.query.responsable, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta);
            const uniqueControls = {};
            // Iterar sobre la respuesta
            respuesta.respuesta.forEach(item => {
                // Verificar si ya existe un registro con el mismo idcontrolactivi
                if (!uniqueControls[item.idcontrolactivi] || uniqueControls[item.idcontrolactivi].idtiempos < item.idtiempos) {
                    uniqueControls[item.idcontrolactivi] = item; // Guardar el registro con el idtiempos más alto para cerrarlo 
                }
            })
            // Convertir el objeto a un array
            const result = Object.values(uniqueControls);
            //console.log("result ",result);
            res.status(200).json({
                result
            })
        }
        //console.log(respuesta);
    })
})
//AGREGA UN NUEVO QUERY PARA MODIFICAR LA EFIFIENCIA POR CONTROL EN ACT DE TIEMPO
app.put('/actualizarTimefin', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* id, estatus, */
    const horafin = moment().format('HH:mm');
    const status = "TERMINADO";
    const motivo = "NA";
    var timestandar = 0;
    //console.log(req.body);
    if (req.body.idcontrolactivi) {
        //console.log(req.body.idcontrolactivi);
        mostTiempoactivi(function (error, respuestaTiempo) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaTiempo.mensaje
                })
            }
            else {
                const idcontrol = parseInt(req.body.idcontrolactivi);
                const tiemponuevo = respuestaTiempo.respuesta.filter(filtro => filtro.idcontrolactivi === idcontrol);
                const datosOrdenados = tiemponuevo.sort((a, b) => b.idtiempos - a.idtiempos);
                // Obtén el último dato (el que tiene el mayor idtiempos)
                const ultimoDato = datosOrdenados[0];
                const idTiempos = ultimoDato.idtiempos;
                const hinicio = ultimoDato.horainicio;
                var desde = hinicio.split(":");
                var hasta = horafin.split(":");
                var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                //console.log("Minutos hora inicio ", minutosDesde)
                var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                if (minutosHasta < minutosDesde) {
                    minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                }
                //console.log("Mintos de hora final ", minutosHasta)
                var diferenciaMinutos = minutosHasta - minutosDesde;
                timestandar = diferenciaMinutos;
                //console.log("Timestandar ", timestandar);

                const tiempocontrolsumado = tiemponuevo.reduce((acumulador, filtro) => {
                    return acumulador + filtro.timestandar;
                }, 0);

                //console.log("tiempocontrolsumado: ", tiempocontrolsumado);

                editStatustiempo(idTiempos, horafin, timestandar, status, motivo, function (error, respuestaStatustiempo) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuestaStatustiempo.mensaje
                        })
                    }
                    else {
                        editControlstatus(req.body.idcontrolactivi, status, function (error, respuestaStatuscontrol) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuestaStatuscontrol.mensaje
                                })
                            }
                            else {
                                mostTiempocontrol(req.body.idactividades, fecha, function (error, respuestaTiempocontrol) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuestaTiempocontrol.mensaje
                                        })
                                    }
                                    else {
                                        const todosTerminado = respuestaTiempocontrol.respuesta.every(item => item.status === "TERMINADO");
                                        //console.log(todosTerminado);
                                        // Generar la respuesta si existen datos sin el status TERMINADO es false y se envia un "sinrespuesta", en caso de todos esten en estatus TERMINADO envia un ...

                                        const resultado = todosTerminado ? "todosterminados" : "sinrespuesta";
                                        if (resultado === "sinrespuesta") {
                                            //console.log("No todos estan terminados ", resultado);
                                            //console.log(respuestaTiempocontrol.respuesta);

                                            const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.timestandar;
                                            }, 0);

                                            //console.log("Tiempo asignacion: ", timeasignacion);
                                            const kg = 0;
                                            editStatusasignacion(req.body.idasigactivi, req.body.status, timeasignacion, kg, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta);
                                                    mostActif(function (error, respuesta) {
                                                        if (error) {
                                                            console.log(error)
                                                            res.status(404).json({
                                                                mensaje: respuesta.mensaje
                                                            })
                                                        }
                                                        else {
                                                            //console.log(req.body);
                                                            const actividadRealizada = respuesta.respuesta.find((filtro) => filtro.idactividades === req.body.idactividades);
                                                            const tiemporecord = actividadRealizada.timestandar;
                                                            // CALCULAR EFICIENCIA CONTROL
                                                            const eficienciacontrol = (tiemporecord / tiempocontrolsumado) * 100;
                                                            const eficienciacontroltotal = Math.round((eficienciacontrol + Number.EPSILON) * 100) / 100;
                                                            console.log("eficienciacontroltotal ", eficienciacontroltotal);
                                                            console.log("idcontrol", idcontrol);

                                                            editEficienciacontrol(idcontrol, eficienciacontroltotal, function (error, respuesta) {
                                                                if (error) {
                                                                    console.log(error)
                                                                    res.status(404).json({
                                                                        mensaje: respuesta.mensaje
                                                                    })
                                                                }
                                                                else {
                                                                    console.log("respuesta ", respuesta);
                                                                    res.status(200).json({
                                                                        mensaje: "El responsable finalizó su actividad"
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })

                                        }
                                        else {
                                            /* res.status(200).json({
                                                mensaje: respuesta.mensaje
                                            }) */
                                            const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.timestandar;
                                            }, 0);

                                            //console.log("Tiempo asignacion: ", timeasignacion);
                                            const kg = 0;
                                            const status = "TERMINADO"
                                            editStatusasignacion(req.body.idasigactivi, status, timeasignacion, kg, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta);
                                                    mostActif(function (error, respuesta) {
                                                        if (error) {
                                                            console.log(error)
                                                            res.status(404).json({
                                                                mensaje: respuesta.mensaje
                                                            })
                                                        }
                                                        else {
                                                            //console.log(req.body);
                                                            const actividadRealizada = respuesta.respuesta.find((filtro) => filtro.idactividades === req.body.idactividades);
                                                            //console.log(actividadRealizada);
                                                            //console.log(actividadRealizada.kg);
                                                            if (actividadRealizada.kg === 0) {
                                                                /* Calculo de la eficaciona de la actividad */
                                                                const tiemporecord = actividadRealizada.timestandar;
                                                                mostNumpersonas(req.body.idasigactivi, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error)
                                                                        res.status(404).json({
                                                                            mensaje: respuesta.mensaje
                                                                        })
                                                                    }
                                                                    else {
                                                                        /* Calculo del tiempo esperado */
                                                                        const numpersonas = respuesta.respuesta[0].numpersonas;
                                                                        const tiempoesperado = tiemporecord / numpersonas;
                                                                        //console.log(tiempoesperado);

                                                                        /* Calculo de la eficacia de la actividad */
                                                                        const eficacia1 = (tiempoesperado / timeasignacion) * 100;
                                                                        //console.log(eficacia1);

                                                                        const eficacia = Math.round((eficacia1 + Number.EPSILON) * 100) / 100;
                                                                        //console.log(eficacia);

                                                                        const eficienciasig1 = (tiemporecord / timeasignacion) * 100;
                                                                        const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                                                        //console.log(eficienciatotal);

                                                                        // CALCULAR EFICIENCIA CONTROL
                                                                        const eficienciacontrol = (tiemporecord / tiempocontrolsumado) * 100;
                                                                        const eficienciacontroltotal = Math.round((eficienciacontrol + Number.EPSILON) * 100) / 100;
                                                                        console.log("eficienciacontroltotal ", eficienciacontroltotal);
                                                                        console.log("idcontrol", idcontrol);

                                                                        editEficienciacontrol(idcontrol, eficienciacontroltotal, function (error, respuesta) {
                                                                            if (error) {
                                                                                console.log(error)
                                                                                res.status(404).json({
                                                                                    mensaje: respuesta.mensaje
                                                                                })
                                                                            }
                                                                            else {
                                                                                console.log("respuesta ", respuesta);
                                                                                const estatusindividual = "false";
                                                                                editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, estatusindividual, function (error, respuesta) {
                                                                                    if (error) {
                                                                                        console.log(error)
                                                                                        res.status(404).json({
                                                                                            mensaje: respuesta.mensaje
                                                                                        })
                                                                                    }
                                                                                    else {
                                                                                        io.emit('escuchando', respuesta.mensaje);
                                                                                        if (actividadRealizada.timestandar > timeasignacion) {
                                                                                            //console.log(timeasignacion);
                                                                                            if (timeasignacion <= 59) {
                                                                                                const horafinal = 0;
                                                                                                const eficienciafinal1 = 60 / timeasignacion;
                                                                                                const eficienciafinal = Math.round((eficienciafinal1 + Number.EPSILON) * 100) / 100;
                                                                                                editStatusactividadesT(req.body.idactividades, horafinal, timeasignacion, timeasignacion, eficienciafinal, function (error, respuestaStatusactividadesT) {
                                                                                                    if (error) {
                                                                                                        console.log(error)
                                                                                                        res.status(404).json({
                                                                                                            mensaje: respuesta.mensaje
                                                                                                        })
                                                                                                    }
                                                                                                    else {
                                                                                                        io.emit('escuchando', respuestaStatusactividadesT.mensaje);
                                                                                                        res.status(200).json({
                                                                                                            mensaje: respuestaStatusactividadesT.mensaje
                                                                                                        })
                                                                                                    }
                                                                                                    console.log(respuestaStatusactividadesT);
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                //console.log("convertir el tiempo asignacion en horas y minutos");
                                                                                                const eficienciafinal1 = 60 / timeasignacion;
                                                                                                const eficienciafinal = Math.round((eficienciafinal1 + Number.EPSILON) * 100) / 100;

                                                                                                const horas = Math.floor(timeasignacion / 60);
                                                                                                const minutos = timeasignacion % 60;
                                                                                                editStatusactividadesT(req.body.idactividades, horas, minutos, timeasignacion, eficienciafinal, function (error, respuestaStatusactividadesT) {
                                                                                                    if (error) {
                                                                                                        console.log(error)
                                                                                                        res.status(404).json({
                                                                                                            mensaje: respuesta.mensaje
                                                                                                        })
                                                                                                    }
                                                                                                    else {
                                                                                                        io.emit('escuchando', respuestaStatusactividadesT.mensaje);
                                                                                                        res.status(200).json({
                                                                                                            mensaje: respuestaStatusactividadesT.mensaje
                                                                                                        })
                                                                                                    }
                                                                                                    console.log(respuestaStatusactividadesT);
                                                                                                })
                                                                                            }

                                                                                        } else {
                                                                                            res.status(200).json({
                                                                                                mensaje: "Excedieron el tiempo de la actividad.."
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                    //console.log(respuesta);
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                    //console.log(respuesta);
                                                                })

                                                            }
                                                            else {
                                                                res.status(200).json({
                                                                    mensaje: "No olvides! validar los kilogramos"
                                                                })
                                                            }
                                                        }
                                                        //console.log(respuesta);
                                                    })
                                                }
                                            })

                                        }
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
/* MODIFICADO CAMBIOS DEL 2024-11-20 ++++++++++++++++++++++++++++++++++++++++++++++++CREO QUE YA QUEDO CON EL CRONOMETRO+++++++++++++ */
app.put('/actualizarTimepausa', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* id, estatus, */
    //console.log(req.body);
    const horafin = moment().format('HH:mm');
    const status = "EN PAUSA";
    var timestandar = 0;

    if (req.body.idcontrolactivi && req.body.motivoselec && req.body.motivodes) {
        //console.log(req.body.idcontrolactivi);
        const motivo = "Motivo: " + req.body.motivoselec + ", Descripción: " + req.body.motivodes;
        mostTiempoactivi(function (error, respuestaTiempo) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const idcontrol = parseInt(req.body.idcontrolactivi);
                const tiemponuevo = respuestaTiempo.respuesta.filter(filtro => filtro.idcontrolactivi === idcontrol);
                const datosOrdenados = tiemponuevo.sort((a, b) => b.idtiempos - a.idtiempos);
                // Obtén el último dato (el que tiene el mayor idtiempos)
                const ultimoDato = datosOrdenados[0];
                const idTiempos = ultimoDato.idtiempos;
                const hinicio = ultimoDato.horainicio;
                var desde = hinicio.split(":");
                var hasta = horafin.split(":");
                var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                //console.log("Minutos hora inicio ", minutosDesde)
                var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                if (minutosHasta < minutosDesde) {
                    minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                }
                //console.log("Mintos de hora final ", minutosHasta)
                var diferenciaMinutos = minutosHasta - minutosDesde;
                timestandar = diferenciaMinutos;
                //console.log("Timestandar ", timestandar);

                editStatustiempo(idTiempos, horafin, timestandar, status, motivo, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        mostTiempocontrol(req.body.idactividades, fecha, function (error, respuestaTiempocontrol) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuestaTiempocontrol.mensaje
                                })
                            }
                            else {
                                console.log("respuestaTiempocontrol ", respuestaTiempocontrol);
                                const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                    return acumulador + filtro.timestandar;
                                }, 0);

                                console.log("Tiempo asignacion: ", timeasignacion);
                                const kg = 0;
                                editControlstatus(req.body.idcontrolactivi, status, function (error, respuestaStatuscontrol) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        editStatusasignacion(req.body.idasigactivi, status, timeasignacion, kg, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    mensaje: respuestaStatuscontrol.mensaje
                                                })
                                            }
                                        })
                                    }
                                    //console.log(respuesta);
                                })
                            }
                        })
                    }
                    console.log(respuesta);
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
app.post('/insertarTiempo', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const horainicio = moment().format('HH:mm');
    const horafin = "NA";
    const timestandar = 0;
    const status = "EN PROCESO";
    const motivo = "NA";

    //console.log(req.body);
    mostVerificarstatus(req.body.responsables, fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            if (respuesta.respuesta && respuesta.respuesta.length > 0 && respuesta.respuesta[0].idcontrolactivi != req.body.idcontrolactivi) {
                console.log("Finaliza la actividad que tienes pendiente!!");
                res.status(400).json({
                    mensaje: "Finaliza la actividad que tienes pendiente!!"
                });
            }
            else {
                console.log("Puedes comenzar una actividad")

                if (fecha && horainicio && req.body.idcontrolactivi) {
                    insertarTiempos(fecha, horainicio, horafin, timestandar, status, motivo, req.body.idcontrolactivi, function (error, respuestaTiempo) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            io.emit('escuchando', respuesta.mensaje);
                            editControlstatus(req.body.idcontrolactivi, status, function (error, respuesta) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    mostTiempocontrol(req.body.idactividades, fecha, function (error, respuestaTiempocontrol) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuestaTiempocontrol.mensaje
                                            })
                                        }
                                        else {
                                            const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.timestandar;
                                            }, 0);

                                            //console.log("Tiempo asignacion: ", timeasignacion);
                                            const kilos = 0;
                                            editStatusasignacion(req.body.idasigactivi, req.body.status, timeasignacion, kilos, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta);
                                                    res.status(200).json({
                                                        mensaje: respuestaTiempo.mensaje
                                                    })
                                                }
                                            })

                                        }
                                    })
                                }
                                console.log(respuesta);
                            })
                        }
                        //console.log(respuesta);
                    })
                }
                else {
                    console.log("Existen datos vacíos");
                    res.status(400).json({
                        mensaje: "Existen datos vacíos"
                    });
                }
            }
        }
    })

})
/*EVIDENCIAS*/
app.post('/guardarevidencia', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const hora = moment().format('LTS');
    //console.log(req.body);
    //console.log(req.files);
    //console.log(fecha, hora);
    if (!req.files || Object.keys(req.files).length === 0 && req.body.idcontrolactivi && req.body.idasigactivi && req.body.responsable) {
        // No se proporcionaron archivos
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
    else {
        //idcontrolactivi,idasigactivi,responsable,fecha, hora, archivo,
        archivo_evidencias(req, res, (err, archivo) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al cargar el archivo');
            } else {
                //console.log("Respuesta img guardadas ", archivo);
                insertarEvidencia(req.body.idcontrolactivi, req.body.idasigactivi, req.body.responsable, fecha, hora, archivo, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        io.emit('newevidencia', req.body.idasigactivi);
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            }
        })
    }
})
/* Fin de hoja porusuario */

/* Hoja pdm */
app.get('/pdm', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const area = usuario.Area;
    //console.log(area);

    mostPDM(function (error, respuestaPDM) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const respuesta = respuestaPDM.respuesta.filter(datos => datos.Area === area);
            //console.log(respuesta);
            res.status(200).json({
                mensaje: respuesta
            })
        }

    })
})
app.put('/updatepdm', (req, res) => {
    /* idasigactivi, fechainicio, empresa,idactividad,status */
    if (req.body.id) {
        editpdm(req.body.id, req.body.puesto, req.body.ubicacion, req.body.estatus, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                io.emit('escuchando', respuesta.mensaje);
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})

/* Fin de hoja pdm */

/* Hoja de grafica/grafica */
app.get('/asignadasmes/:empresa', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    console.log("asignadasmes", req.params.empresa);
    mostActasignadasmes(responsable, req.params.empresa, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            console.log(respuesta.respuesta);
            const masignadas = respuesta.respuesta.map((filtro) => [
                filtro.mes
            ]);
            //console.log(casignadas);
            const mesobj = masignadas.flat();
            //console.log(mes);
            let mes = [];
            mesobj.forEach((datos) => {
                moment.locale('es');
                const mesnum = datos - 1;
                const mesnombre = moment().month(mesnum).format('MMMM');
                mes.push(mesnombre);
            });
            console.log(mes);


            const casignadas = respuesta.respuesta.map((filtro) => [
                filtro.Cantidad
            ]);
            //console.log(casignadas);
            const asignados = casignadas.flat();
            console.log(asignados);

            res.status(200).json({
                asignados,
                mes
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/terminadasmes/:empresa', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    //console.log("terminadasmes ",req.params.empresa);
    mostActterminadasmes(responsable, req.params.empresa, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const mterminadas = respuesta.respuesta.map((filtro) => [
                filtro.mes
            ]);
            //console.log(casignadas);
            const mesobj = mterminadas.flat();
            //console.log(mes);
            let mes = [];
            mesobj.forEach((datos) => {
                moment.locale('es');
                const mesnum = datos - 1;
                const mesnombre = moment().month(mesnum).format('MMMM');
                mes.push(mesnombre);
            });
            //console.log(mes);


            const cterminadas = respuesta.respuesta.map((filtro) => [
                filtro.Cantidad
            ]);
            //console.log(casignadas);
            const terminadas = cterminadas.flat();
            //console.log(asignados);

            res.status(200).json({
                terminadas,
                mes
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/asigactivimes', verificar_Token, (req, res) => {
    /* responsable,idactividad,mes, */
    const usuario = req.usuario;
    const responsable = usuario.nombre;

    const idactividad = req.query.id;
    const mes = req.query.mes;
    //console.log(idactividad);
    mostAsigactivi_mes(responsable, idactividad, mes, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            let tiempo = respuesta.respuesta[0].tiempo_total;
            let kilos = respuesta.respuesta[0].kg_total;

            //console.log(tiempo);
            //console.log(kilos);
            const horas = Math.floor(tiempo / 60);
            const minutos = tiempo % 60;
            res.status(200).json({
                horas,
                minutos,
                kilos
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/controlmes', verificar_Token, (req, res) => {
    /* responsable,idactividad,mes, */
    const usuario = req.usuario;
    const responsable = usuario.nombre;

    const idactividad = req.query.id;
    const mes = req.query.mes;
    //const kilos = req.query.kilos;
    //console.log(kilos);
    mostAsigactivi_mes(responsable, idactividad, mes, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            let kilos = respuesta.respuesta[0].kg_total;
            let tiempo = respuesta.respuesta[0].tiempo_total;
            console.log(kilos, tiempo);
            const kgmin = kilos / tiempo;
            console.log(kgmin);
            mostControl_mes(idactividad, mes, function (error, respuesta) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    //console.log("Controlmes ",respuesta.respuesta);
                    const responsables1 = respuesta.respuesta.map((datos) => [datos.responsables]);
                    const responsables = responsables1.flat();
                    //console.log(responsables);

                    let nombre = [];
                    responsables.forEach((filtro) => { const separado = filtro.split(' '); nombre.push(separado[0]); })
                    //console.log(nombre);

                    const tiempo1 = respuesta.respuesta.map((datos) => [datos.tiempo_total]);
                    const tiempo = tiempo1.flat();
                    console.log(tiempo);
                    let kilos = [];
                    tiempo.forEach((dato) => {
                        const kg = Math.round(((dato * kgmin) + Number.EPSILON) * 100) / 100;
                        kilos.push(kg);
                    });
                    console.log(kilos);

                    res.status(200).json({
                        responsables,
                        tiempo,
                        kilos,
                        nombre
                    })
                }
                //console.log(respuesta);
            })
        }
        //console.log(respuesta);
    })
}
)
/* Fin hoja de grafica/grafica */




/* INSERTAR ACTIVIDADES AUTOMATICAMENTE*/
//fechacreacion, responsable, fechainicio, empresa, idactividad, status, timeControl, kgControl, motivo, numpersonas, eficacia, eficienciasig
async function asignacionaut() {
    const fecha = moment().format("YYYY-MM-DD");
    const kg = 0;
    const numpersonas = 0;
    const eficacia = 0;
    const eficienciasig = 0;
    const status = "INICIAR"
    const timecontrol = 0;

    mostActividiarias(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuestaAsig.mensaje
            })
        }
        else {
            console.log(respuesta.respuesta);
            const datosneed = respuesta.respuesta.map((filtro) => ({
                id: filtro.idactividades,
                empresa: filtro.ubicacion,
                nombre: filtro.responsableact
            }));

            const activiasignar = datosneed.flat();
            //console.log(activiasignar);
            activiasignar.forEach((datos, index) => {
                insertarAsigactivi(fecha, datos.nombre, fecha, datos.empresa, datos.id, status, timecontrol, kg, numpersonas, eficacia, eficienciasig, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        io.emit('escuchando', respuesta.mensaje);
                        //console.log("Datos guardados", index);
                    }

                })
            })
            //console.log(arraynadatos);
        }
    })
}
app.get('/actividadesaut', (req, res) => {
    asignacionaut();
});
// Tarea programada para ejecutarse todos los días a la hora que le indiques
schedule.scheduleJob('01 10 * * *', function () {
    console.log('¡La tarea diaria se ejecutó a las 10:47 AM UTC!');
    asignacionaut();
});
/* Estructura de los *:
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */

/* FIN DE INSERTAR ACTIVIDADES AUTOMATICAMENTE*/



/* Comparar rasgos faciales*/
app.get('/reconocedorfacial', async (req, res) => {
    try {
        // Asegúrate de que la ruta de la imagen esté correcta
        const imagePath = path.join(__dirname, 'fotoperfil', '1725903679349-fotoperfil.PNG');

        // Cargar la imagen con canvas
        const img = await canvas.loadImage(imagePath);
        console.log("img= ", img instanceof canvas.Image);

        // Crear un lienzo (HTMLCanvasElement) a partir de la imagen cargada
        const imgCanvas = canvas.createCanvas(img.width, img.height);
        const ctx = imgCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        console.log("imgCanvas=  ", imgCanvas instanceof canvas.Canvas);

        const detections = await faceapi
            .detectAllFaces(imgCanvas)
            .withFaceLandmarks()
            .withFaceDescriptors();

        console.log("detections=>   ", detections);
        /* // Detectar rostros en la imagen del lienzo
        const detections = await faceapi.detectAllFaces(imgCanvas)
            .withFaceLandmarks()
            .withFaceDescriptors();

        // Enviar detecciones al cliente
        res.json(detections); */
    } catch (err) {
        console.error('Error al procesar la imagen:', err);
        res.status(500).send('Error en la detección de rostros');
    }
});

/* FIN de comparar rasgos faciales*/


/* Contador para actividades */
async function tiempo() {
    const fecha = moment().format("YYYY-MM-DD");
    const horaactual = moment().format('HH:mm');
    mostAsignacion(function (error, respuestaAsignacion) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaAsignacion);
            const asignacionesdia = respuestaAsignacion.respuesta.filter((asignada) => asignada.fechainicio === fecha);
            //console.log("asignacionesdia ",asignacionesdia);
            mostTiempoactivi(function (error, respuestaTiempo) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    //console.log(respuestaTiempo);
                    const tiemporesponsable = respuestaTiempo.respuesta.filter((time) => time.fecha === fecha);
                    //console.log("tiemporesponsable ", tiemporesponsable);
                    asignacionesdia.forEach((asignadas) => {
                        mostTiempocontrol(asignadas.idactividades, fecha, function (error, respuestaTiempocontrol) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                //console.log(respuestaTiempocontrol);
                                const responsables = respuestaTiempocontrol.respuesta;
                                //console.log("responsables ",responsables);
                                const tiemresponsables = responsables.reduce((acumulador, filtro) => {
                                    return acumulador + filtro.timestandar;
                                }, 0);

                                responsables.forEach((sujeto) => {
                                    const numtiempos = tiemporesponsable.filter((tiempos) => tiempos.idcontrolactivi === sujeto.idcontrolactivi);
                                    //console.log(numtiempos);
                                    if (numtiempos && numtiempos.length === 1) {
                                        const tiempotrabajando = numtiempos.find((time) => time.status === "EN PROCESO");
                                        if (tiempotrabajando) {
                                            var desde = tiempotrabajando.horainicio.split(":");
                                            var hasta = horaactual.split(":");
                                            //console.log(desde, hasta);

                                            // Convertir a minutos desde la medianoche
                                            var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                                            //console.log("Minutos hora inicio ", minutosDesde)
                                            var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                                            //console.log("Mintos de hora final ", minutosHasta)

                                            // Si la hora "hasta" es menor que la hora "desde", es porque es del día siguiente
                                            if (minutosHasta < minutosDesde) {
                                                minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                                            }

                                            // Calcular la diferencia de minutos
                                            var diferenciaMinutos = minutosHasta - minutosDesde;
                                            //console.log("diferenciaMinutos ", diferenciaMinutos);
                                            //console.log("sujeto.timestandar ", sujeto.timestandar);
                                            if (sujeto.timestandar != diferenciaMinutos) {
                                                editCambiartime(sujeto.idcontrolactivi, diferenciaMinutos, function (error, respuesta) {

                                                    if (error) {
                                                        console.log(error)
                                                        res.status(404).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    else {
                                                        io.emit('escuchando', respuesta.mensaje);
                                                        //console.log(respuesta);
                                                        mostTiempocontrol(asignadas.idactividades, fecha, function (error, respuestaTiempocontrol) {
                                                            if (error) {
                                                                console.log(error)
                                                                res.status(404).json({
                                                                    mensaje: respuesta.mensaje
                                                                })
                                                            }
                                                            else {
                                                                //console.log(respuestaTiempocontrol);
                                                                const responsables = respuestaTiempocontrol.respuesta;
                                                                //console.log("responsables ",responsables);
                                                                const tiemresponsables = responsables.reduce((acumulador, filtro) => {
                                                                    return acumulador + filtro.timestandar;
                                                                }, 0);
                                                                editStatusasignacion(asignadas.idasigactivi, asignadas.status, tiemresponsables, asignadas.kgControl, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error)
                                                                        res.status(404).json({
                                                                            mensaje: respuesta.mensaje
                                                                        })
                                                                    }
                                                                    else {
                                                                        io.emit('escuchando', respuesta);
                                                                        console.log(respuesta);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }

                                                })
                                            }
                                        }
                                    } else {
                                        const timeasignacion = numtiempos.reduce((acumulador, filtro) => {
                                            return acumulador + filtro.timestandar;
                                        }, 0);

                                        const tiempotrabajando = numtiempos.find((time) => time.status === "EN PROCESO");
                                        if (tiempotrabajando) {
                                            var desde = tiempotrabajando.horainicio.split(":");
                                            var hasta = horaactual.split(":");
                                            //console.log(desde, hasta);

                                            // Convertir a minutos desde la medianoche
                                            var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                                            //console.log("Minutos hora inicio ", minutosDesde)
                                            var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                                            //console.log("Mintos de hora final ", minutosHasta)

                                            // Si la hora "hasta" es menor que la hora "desde", es porque es del día siguiente
                                            if (minutosHasta < minutosDesde) {
                                                minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                                            }

                                            // Calcular la diferencia de minutos
                                            var diferenciaMinutos = (minutosHasta - minutosDesde) + timeasignacion;
                                            //console.log("diferenciaMinutos ", diferenciaMinutos);
                                            //console.log("sujeto.timestandar ", sujeto.timestandar);
                                            if (sujeto.timestandar != diferenciaMinutos) {
                                                editCambiartime(sujeto.idcontrolactivi, diferenciaMinutos, function (error, respuesta) {

                                                    if (error) {
                                                        console.log(error)
                                                        res.status(404).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    else {
                                                        io.emit('escuchando', respuesta.mensaje);
                                                        console.log(respuesta);
                                                        mostTiempocontrol(asignadas.idactividades, fecha, function (error, respuestaTiempocontrol) {
                                                            if (error) {
                                                                console.log(error)
                                                                res.status(404).json({
                                                                    mensaje: respuesta.mensaje
                                                                })
                                                            }
                                                            else {
                                                                //console.log(respuestaTiempocontrol);
                                                                const responsables = respuestaTiempocontrol.respuesta;
                                                                //console.log("responsables ",responsables);
                                                                const tiemresponsables = responsables.reduce((acumulador, filtro) => {
                                                                    return acumulador + filtro.timestandar;
                                                                }, 0);
                                                                editStatusasignacion(asignadas.idasigactivi, asignadas.status, tiemresponsables, asignadas.kgControl, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error)
                                                                        res.status(404).json({
                                                                            mensaje: respuesta.mensaje
                                                                        })
                                                                    }
                                                                    else {
                                                                        io.emit('escuchando', respuesta);
                                                                        console.log(respuesta);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }

                                                })
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    })

    /* mostTiempoactivi(function (error, respuestaTiempo) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaTiempo);
            const estatustiempo = respuestaTiempo.respuesta.filter((time) => time.fecha === fecha && time.status === "EN PROCESO");
            estatustiempo.forEach((tiempos) => {
                var desde = tiempos.horainicio.split(":");
                var hasta = horaactual.split(":");
                console.log(desde, hasta);

                // Convertir a minutos desde la medianoche
                var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                console.log("Minutos hora inicio ", minutosDesde)
                var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                console.log("Mintos de hora final ", minutosHasta)

                // Si la hora "hasta" es menor que la hora "desde", es porque es del día siguiente
                if (minutosHasta < minutosDesde) {
                    minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                }

                // Calcular la diferencia de minutos
                var diferenciaMinutos = minutosHasta - minutosDesde;
                console.log(diferenciaMinutos);
                editCambiartime(tiempos.idcontrolactivi, diferenciaMinutos, function (error, respuesta) {

                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        io.emit('escuchando', respuesta.mensaje);
                        console.log(respuesta);
                    }

                })
            })
            console.log(estatustiempo);
            console.log(horaactual);
        }
    }) */
};
app.get('/tiempo', async (req, res) => {
    tiempo();
})
setInterval(tiempo, 1000);
/* Fin de Contador para actividades */



app.listen(port, () => {
    //loadModels();
    console.log(`Port => ${port}`);
})