const express = require('express')
const cors = require('cors');
const moment = require('moment');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

//Hoja de actforaneas
const mostubi = require('./actividades/mostUbi');
const mostActif = require('./actividades/mostActvif');
const mostMaterial = require('./actividades/mostMaterial');
const inserActif = require('./actividades/insertActif');
const insertarMaterial = require('./actividades/insertMaterial');


//Hoja actdiarias
const mostStatusresponsable = require('./actividades/mostStatusresponsable');
const mostEvidencias = require('./actividades/mostEvidencias');


//Hoja de asignacion
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
const mostAsignacion = require('./actividades/mostAsignactivi');
const insertarAsigactivi = require('./actividades/insertAsigactivi');
const editAsignacion = require('./actividades/actualizarAsigactivi');

//Hoja de control
/* MODIFICADO CAMBIOS DEL 2024-11-20 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
const mostControlasignados = require('./actividades/mostControlasig');

const mostIdusuario = require('./actividades/mostIdusuario');
const insertarControlactivi = require('./actividades/insertControlactivi');
const mostNumpersonas = require('./actividades/mostAsigactivinumpersonas');
const editNumpersonas = require('./actividades/actualizarNumpasignacion');
const mostIdcheck = require('./actividades/mostIdcheck');
const mostPDM = require('./actividades/mostPDM');
const mostControlactivi = require('./actividades/mostControlactivi');
const mostIdusuarioPMateriales = require('./actividades/mostIdusuarioPMateriales');


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


//Hoja graficas/grafico
const mostActasignadasmes = require('./actividades/mostChartasignadas');
const mostActterminadasmes = require('./actividades/mostChartterminadas');
const mostAsigactivi_mes = require('./actividades/mostChartasigactivi_mes');
const mostControl_mes = require('./actividades/mostChartcontrol_mes');

const verificar_Token = require('./middleware/Valida_Token');
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
        if (puesto === "GERENTE DE SISTEMAS DE RECOLECCION" || id==="RPMhztezf1lfbjn5nt") {
            const puestosdr= "GERENTE DE SISTEMAS DE RECOLECCION";
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


app.get('/actividades', (req, res) => {
    mostActif(function (error, respuesta) {
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
app.post('/insertarActif', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const nombre = usuario.nombre;
    const id = usuario.id;
    console.log(nombre, id);
    const periodo = "EXTRAORDINARIO"
    const fecha = moment().format("YYYY-MM-DD");
    console.log(req.body);
    // timestandar,hora,minutos
    const fam = "NA";
    const proc = "NA";
    if (req.body.unidad && req.body.actividad && fecha && req.body.ubicacion && req.body.minutos) {
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
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, tiempoest, hora, minutos, eficiencia,nombre, id, periodo, function (error, respuesta) {
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
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, eficiencia,nombre, id, periodo, function (error, respuesta) {

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
                        inserActif(req.body.actividad, fecha, kilos, fam, proc, req.body.ubicacion, tiempoest, req.body.hora, req.body.minutos, eficiencia,nombre, id, periodo, function (error, respuesta) {

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
                        inserActif(req.body.actividad, fecha, kilos, fam, proc, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, eficiencia,nombre, id, periodo, function (error, respuesta) {

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
/* Fin de hoja de actForaneas */





/* Hoja de actdiarias */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/actividiarias', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    const id = usuario.id;
    //console.log(responsable);
    if(id==="RPMhzte1p8rlfmmq44l" || id==="RPMhztezf1lfbjn5nt"){
        mostAsignacion( function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const respuesta = respuestaAsig.respuesta.filter(filtro => (filtro.responsable==="MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO") && filtro.fechainicio === fecha);
                //console.log(nuevarespuesta);
                res.status(200).json({
                    respuesta
                })
            }
            //console.log(respuesta);
        })
    }
    else{
        mostAsignacion(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const respuesta = respuestaAsig.respuesta.filter(filtro => filtro.responsable===responsable && filtro.fechainicio === fecha);
                //console.log(nuevarespuesta);
                res.status(200).json({
                    respuesta
                })
            }
            //console.log(respuesta);
        })
    }
}
)
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/globalstatus', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.nombre;
    const id = usuario.id;
    //console.log(responsable);
    mostAsignacion(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            let deldia= {};
            if(id==="RPMhzte1p8rlfmmq44l" || id==="RPMhztezf1lfbjn5nt"){
                deldia = respuesta.respuesta.filter(filtro => (filtro.responsable==="MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO") && filtro.fechainicio === fecha);
            }
            else{
                deldia = respuesta.respuesta.filter(filtro => filtro.responsable===responsable && filtro.fechainicio === fecha);
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

            res.status(200).json({
                deldiatotal,
                terminadastotal,
                promediototal,
                promedioasigtotal
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Statusresponsables', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const idasigactivi = req.query.idasigactivi;
    //console.log("Datos obtenidos: ", idactividad, idasigactivi);
    mostStatusresponsable(fecha, idasigactivi, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta);
            res.status(200).json({
                respuesta
            })
        }

    })
}
)
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
/* Fin de hoja de actdiarias */



/* Hoja de asignacion */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/asignacion', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    console.log(usuario);
    const responsable = usuario.nombre;
    const id = usuario.id;
    //console.log(responsable);
    if(id==="RPMhzte1p8rlfmmq44l" || id==="RPMhztezf1lfbjn5nt"){
        mostAsignacion( function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const nuevarespuesta = respuesta.respuesta.filter(filtro => filtro.status != "TERMINADO" && (filtro.responsable==="MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO") && filtro.fechainicio >= fecha);
                //console.log(nuevarespuesta);
                res.status(200).json({
                    nuevarespuesta
                })
            }
            //console.log(respuesta);
        })
    }
    else{
        mostAsignacion(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const nuevarespuesta = respuesta.respuesta.filter(filtro => filtro.status != "TERMINADO" && filtro.responsable===responsable && filtro.fechainicio >= fecha);
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
app.get('/Controlasignados/:id', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    var idcheck = req.params.id
    console
    mostControlasignados(idcheck, fecha, function (error, respuesta) {
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
                    uniqueControls[item.idcontrolactivi] = item; // Guardar el registro con el idtiempos más alto
                }
            })
            // Convertir el objeto a un array
            const result = Object.values(uniqueControls);
            //console.log(result);
            res.status(200).json({
                result
            })
        }
        //console.log(respuesta);
    })
})
app.post('/insertarControl', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    if (req.body.idactividades && fecha && req.body.responsables && req.body.idasigactivi && req.body.idchecksupervisor) {
        const timestandar = 0;
        const kg = 0;
        const lon = 0;
        const lat = 0;
        const status = "INICIAR";
        //console.log(req.body);
        mostControlasignados(req.body.idchecksupervisor, fecha, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje

                })
            }
            else {
                console.log(req.body)
                //console.log(respuesta.respuesta)
                const datosFil = respuesta.respuesta.find((filtro) => filtro.idactividades === req.body.idactividades && filtro.responsables === req.body.responsables);
                console.log(datosFil);
                if (datosFil) {
                    console.log("El responsable ya esta asignado en la actividad");
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
                            console.log(req.body.responsables);
                            const searchidcheck = respuesta.respuesta.find(filtro => filtro.NombreCompleto === req.body.responsables);
                            console.log(searchidcheck);
                            const idcheck = searchidcheck.idCheck;

                            console.log(idcheck);


                            insertarControlactivi(req.body.idactividades, fecha, req.body.responsables, timestandar, kg, lon, lat, status, req.body.idasigactivi, idcheck, req.body.idchecksupervisor, function (error, respuesta) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    mostNumpersonas(req.body.idasigactivi, function (error, respuesta) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            console.log(respuesta.respuesta[0].numpersonas);
                                            const personastotales = respuesta.respuesta[0].numpersonas + 1;
                                            console.log(personastotales);
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
                console.log(responsable);

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
                            const ayudantes = respuesta.respuesta.filter(filtro => filtro.Ubicacion === supervisor.Ubicacion);
                            //const resultado = Object.values(ayudantes);

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
                                    //console.log("Actividades asignadas: ", respuestaActividades);
                                    mostIdusuarioPMateriales(supervisor.Ubicacion, function (error, respuestaMateriales) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            //console.log(respuesta.respuesta);
                                            res.status(200).json({
                                                actividades: respuestaActividades,
                                                responsables: respuestaMateriales
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
/* Fin de hoja de control */




/* Hoja de editeficienciakg */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/EficienciaKg', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    const id = usuario.id;
    console.log(responsable);
    mostEficienciakg(function (error, respuestaEficienciakg) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaEficienciakg.respuesta);
            let respuesta= {};
            if(id==="RPMhzte1p8rlfmmq44l" || id==="RPMhztezf1lfbjn5nt"){
                respuesta = respuestaEficienciakg.respuesta.filter(filtro => (filtro.responsable==="MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO"));
            }
            else{
                respuesta = respuestaEficienciakg.respuesta.filter((filtro) => filtro.responsable === responsable);
            }
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.put('/actualizarAsignacionkg', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* idasigactivi, status, timestandar, kg */
    const status = "TERMINADO";
    if (req.body.idasigactivi && req.body.kg) {
        mostEficienciakg(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const idasigactivi = parseInt(req.body.idasigactivi);
                const asignacion = respuesta.respuesta.find(filtro => filtro.idasigactivi === idasigactivi);
                //console.log(asignacion);
                const idactividades = asignacion.idactividades;
                const timecontrol = parseInt(asignacion.timeControl);
                mostAsignaciones(idasigactivi, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        console.log(respuesta.respuesta[0].kg);
                        const totaldatos = respuesta.respuesta.length - 1;
                        const kilos = parseFloat(req.body.kg) + parseFloat(respuesta.respuesta[0].kg);
                        respuesta.respuesta.forEach((datos, index) => {
                            editControlkg(datos.idcontrolactivi, kilos, function (error, respuesta) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    if (totaldatos === index) {
                                        editStatusasignacion(req.body.idasigactivi, status, timecontrol, kilos, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                io.emit('escuchando', respuesta);

                                                const eficacia = 0;
                                                console.log(eficacia);

                                                const porhora = (kilos / timecontrol) * 60;
                                                const eficienciasig1 = (porhora * 100) / asignacion.kg;
                                                const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                                console.log(eficienciatotal);

                                                editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, function (error, respuesta) {
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
                                }
                            })
                        });

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
/* Fin de hoja de editeficienciakg */




/* Hoja de eficacia */
/* MODIFICADO PARA PERMISO DE ING. CHRISTIAN */
app.get('/Eficacia', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    const id = usuario.id;
    //console.log(responsable);
    if(id==="RPMhzte1p8rlfmmq44l" || id==="RPMhztezf1lfbjn5nt"){
        mostAsignacion( function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const respuesta = respuestaAsig.respuesta.filter(filtro => (filtro.responsable==="MIGUEL DE LA CRUZ PUEBLITA" || filtro.responsable === " CHRISTIAN ELEAZAR AGUILAR CABALLERO"));
                //console.log(nuevarespuesta);
                res.status(200).json({
                    respuesta
                })
            }
            //console.log(respuesta);
        })
    }
    else{
        mostAsignacion(function (error, respuestaAsig) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaAsig.mensaje
                })
            }
            else {
                const respuesta = respuestaAsig.respuesta.filter(filtro => filtro.responsable===responsable);
                //console.log(nuevarespuesta);
                res.status(200).json({
                    respuesta
                })
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

                editStatustiempo(idTiempos, horafin, timestandar, status, motivo, function (error, respuestaStatustiempo) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuestaStatustiempo.mensaje
                        })
                    }
                    else {
                        const totalTiempo = tiemponuevo.reduce((acumulador, filtro) => {
                            return acumulador + filtro.timestandar;
                        }, 0);
                        //console.log("Tiempos guardados= ", totalTiempo)
                        const timecontrol = timestandar + totalTiempo;
                        //console.log("Tiempo total estandar= ", timecontrol)
                        editStatuscontrol(idcontrol, timecontrol, status, function (error, respuestaStatuscontrol) {
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
                                                    res.status(200).json({
                                                        mensaje: "El responsable finalizó su actividad"
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


                                                                        editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, function (error, respuesta) {
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
/* MODIFICADO CAMBIOS DEL 2024-11-20 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
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
                                const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                    return acumulador + filtro.timestandar;
                                }, 0);

                                console.log("Tiempo asignacion: ", timeasignacion);
                                const controlytiempo = timeasignacion + timestandar;
                                const kg = 0;
                                editStatuscontrol(idcontrol, controlytiempo, status, function (error, respuestaStatuscontrol) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        editStatusasignacion(req.body.idasigactivi, status, controlytiempo, kg, function (error, respuesta) {
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



/* Hoja de grafica/grafica */
app.get('/asignadasmes/:empresa', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    //console.log("asignadasmes",req.params.empresa);
    mostActasignadasmes(responsable, req.params.empresa, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
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
            //console.log(mes);


            const casignadas = respuesta.respuesta.map((filtro) => [
                filtro.Cantidad
            ]);
            //console.log(casignadas);
            const asignados = casignadas.flat();
            //console.log(asignados);

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
app.get('/controlmes', (req, res) => {
    const idactividad = req.query.id;
    const mes = req.query.mes;
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
            console.log(responsables);

            let nombre = [];
            responsables.forEach((filtro) => { const separado = filtro.split(' '); nombre.push(separado[0]); })
            console.log(nombre);

            const tiempo1 = respuesta.respuesta.map((datos) => [datos.tiempo_total]);
            const tiempo = tiempo1.flat();
            //console.log(tiempo);

            res.status(200).json({
                responsables,
                tiempo,
                nombre
            })
        }
        //console.log(respuesta);
    })
}
)

/* Fin hoja de grafica/grafica */


app.listen(port, () => {
    console.log(`Port => ${port}`);
})