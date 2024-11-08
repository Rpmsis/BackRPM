const mysql = require('./database/index');
const express = require('express')
const cors = require('cors');
const moment = require('moment');

const mostUserasistencia = require('./query/mostUserasistencia');
const mostEventosbio = require('./query/mostEventosbio');
const mostEventostodos = require('./query/mostEventostodos');
const insertarAsistencia = require('./query/insertAsistencia');
const editAsistencia = require('./query/actualizarAsistenciastatus');


const app = express();
const port = 3005;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const fecha = moment().format("YYYY-MM-DD");
const io = require("socket.io")(3004, {
    cors: {
        methods: ["GET", "POST"]
    }
});

/* ZKHLIB asistencias */
const ZKHLIB = require("zkh-lib");
let obj = new ZKHLIB("192.168.1.201", 4370, 5200, 5000);
//console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));


/* Registrar asistencias del biometrico*/
async function registrarAsistencias() {
    const diasemana = moment().format("dddd");
    //console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
    try {
        await obj.createSocket();
        //console.log(await obj.createSocket());
        console.log(await obj.getInfo());
        const info = await obj.getInfo();
        //console.log(info.logCounts); 

        // Get all logs in the machine
        if (info && info.logCounts > 0) {
            const logs = await obj.getAttendances();
            //console.log("logs: ", logs.data);
            mostUserasistencia(function (error, respuestaUsuarios) {
                if (error) {
                    console.log(error);
                }
                else {
                    //console.log(respuestaUsuarios.respuesta);
                    const resUsuarios = respuestaUsuarios.respuesta;
                    //console.log("logs: ", logs.data);
                    logs.data.forEach(log => {
                        const Datesinformat = log.recordTime;
                        const fechaMoment = moment(Datesinformat, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
                        const fechaForm = fechaMoment.format('YYYY-MM-DD');
                        const horaForm = fechaMoment.format('HH:mm:ss');
                        const horabio = fechaMoment.format('HH:mm');
                        //console.log(fechaForm);
                        //console.log(horaForm);
                        //console.log(idusuario); 

                        const verificar = resUsuarios.find((filtro) => filtro.userid === log.deviceUserId);
                        if (verificar) {
                            //console.log(diasemana);
                            if (verificar.turno === "PRIMERO") {
                                mostEventosbio(fecha, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                    }
                                    else {
                                        //console.log("registrados:", respuesta.respuesta);
                                        const registrados = respuesta.respuesta;
                                        //console.log(verificar.turno);
                                        if (fechaForm === fecha) {
                                            if (registrados && registrados.length > 0) {
                                                //console.log("Si existen registros");

                                                //console.log(diasemana);
                                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                                    //console.log("algo esta mal");
                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                    //console.log("HORA SALIDA ", verificar.horasalida);
                                                    if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                                        //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                        if (horabio > verificar.horaentradaMD) {
                                                            const estatus = "RETARDO";
                                                            const motivo = "NA";
                                                            const horafin = "NA";
                                                            //console.log("Estatus RETARDO");
                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                if (error) {
                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                } else {
                                                                    //console.log(respuesta);
                                                                    io.emit('escuchando', respuesta);

                                                                }
                                                            });
                                                        }
                                                        else {
                                                            const estatus = "ENTRADA";
                                                            const motivo = "NA";
                                                            const horafin = "NA";
                                                            //console.log("estatus ENTRADA");
                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                if (error) {
                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                } else {
                                                                    //console.log(respuesta);
                                                                    io.emit('escuchando', respuesta);

                                                                }
                                                            });
                                                        }
                                                    } else {
                                                        const verificar2 = registrados.find((filtro) => filtro.idusuario === log.deviceUserId);
                                                        //console.log(verificar2);
                                                        //console.log("Se supone que aqui verificas la hora de salida");
                                                        if (verificar2.horafin != "NA") {
                                                            //console.log("NO NECESITAS GUARDARLO");
                                                        } else {
                                                            if (verificar2.estatus === "RETARDO") {
                                                                if (horabio >= verificar.horasalidaMD) {
                                                                    console.log(horabio);
                                                                    const motivo = "NA";
                                                                    editAsistencia(verificar2.idasistencia, horaForm, verificar2.estatus, motivo, function (error, respuesta) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            //console.log(respuesta);
                                                                            io.emit('escuchando', respuesta);
                                                                        }
                                                                        //console.log(respuesta);
                                                                    })
                                                                } else {
                                                                    console.log("NO TIENE HORA DE SALIDA");

                                                                }
                                                            } else {
                                                                if (verificar2.estatus === "ENTRADA") {
                                                                    if (horabio >= verificar.horasalidaMD) {
                                                                        const estatus = "ASISTENCIA";
                                                                        //console.log(horabio);
                                                                        const motivo = "NA";
                                                                        editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                //console.log(respuesta);
                                                                                io.emit('escuchando', respuesta);
                                                                            }
                                                                            //console.log(respuesta);
                                                                        })
                                                                    } else {
                                                                        //console.log("NO TIENE HORA DE SALIDA");

                                                                    }
                                                                }
                                                                else {
                                                                    //console.log("TIENE UN ESTATUS DESCONOCIDO");
                                                                }

                                                            }
                                                        }
                                                    }

                                                }
                                                else {

                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                    //console.log("HORA SALIDA ", verificar.horasalida);
                                                    if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                                        //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                        if (horabio > verificar.horaentrada) {
                                                            const estatus = "RETARDO";
                                                            const motivo = "NA";
                                                            const horafin = "NA";
                                                            //console.log("Estatus RETARDO");
                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                if (error) {
                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                } else {
                                                                    //console.log(respuesta);
                                                                    io.emit('escuchando', respuesta);

                                                                }
                                                            });
                                                        }
                                                        else {
                                                            const estatus = "ENTRADA";
                                                            const motivo = "NA";
                                                            const horafin = "NA";
                                                            //console.log("estatus ENTRADA");
                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                if (error) {
                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                } else {
                                                                    //console.log(respuesta);
                                                                    io.emit('escuchando', respuesta);

                                                                }
                                                            });
                                                        }
                                                    } else {
                                                        const verificar2 = registrados.find((filtro) => filtro.idusuario === log.deviceUserId);
                                                        //console.log(verificar2);
                                                        //console.log("Se supone que aqui verificas la hora de salida");
                                                        if (verificar2.horafin != "NA") {
                                                            //console.log("NO NECESITAS GUARDARLO");
                                                        } else {
                                                            if (verificar2.estatus === "RETARDO") {
                                                                if (horabio >= verificar.horasalida) {
                                                                    const estatus = verificar2.estatus;
                                                                    //console.log(horabio);
                                                                    const motivo = "NA";
                                                                    editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            //console.log(respuesta);
                                                                            io.emit('escuchando', respuesta);
                                                                        }
                                                                        //console.log(respuesta);
                                                                    })
                                                                } else {
                                                                    //console.log("NO TIENE HORA DE SALIDA");

                                                                }
                                                            } else {
                                                                if (verificar2.estatus === "ENTRADA") {
                                                                    if (horabio >= verificar.horasalida) {
                                                                        const estatus = "ASISTENCIA";
                                                                        //console.log(horabio);
                                                                        const motivo = "NA";
                                                                        editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                //console.log(respuesta);
                                                                                io.emit('escuchando', respuesta);
                                                                            }
                                                                            //console.log(respuesta);
                                                                        })
                                                                    } else {
                                                                        //console.log("NO TIENE HORA DE SALIDA");

                                                                    }
                                                                }
                                                                else {
                                                                    //console.log("NO un estatus comparable");
                                                                }

                                                            }
                                                        }
                                                    }

                                                }

                                            }
                                            else {
                                                //console.log("no existen registros");

                                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                    //console.log("HORA SALIDA ", verificar.horasalida);

                                                    if (horabio > verificar.horaentradaMD) {
                                                        const estatus = "RETARDO";
                                                        const motivo = "NA";
                                                        const horafin = "NA";
                                                        //console.log("Estatus RETARDO");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }
                                                    else {
                                                        const estatus = "ENTRADA";
                                                        const motivo = "NA";
                                                        const horafin = "NA";
                                                        //console.log("estatus ENTRADA");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }


                                                }
                                                else {
                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                    //console.log("HORA SALIDA ", verificar.horasalida);
                                                    if (horabio > verificar.horaentrada) {
                                                        const estatus = "RETARDO";
                                                        const motivo = "NA";
                                                        const horafin = "NA";
                                                        //console.log("Estatus RETARDO");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }
                                                    else {
                                                        const estatus = "ENTRADA";
                                                        const motivo = "NA";
                                                        const horafin = "NA";
                                                        //console.log("estatus ENTRADA");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }


                                                }


                                            }

                                        }
                                    }
                                })
                            }
                            else {
                                if (verificar.turno === "TERCERO") {
                                    //console.log(verificar.turno);
                                    if (fechaForm === fecha) {
                                        mostEventostodos(function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                            }
                                            else {
                                                //console.log("registrados:", respuesta.respuesta);
                                                const registrados = respuesta.respuesta;
                                                const verificar2 = registrados.find((filtro) => filtro.idusuario === log.deviceUserId && filtro.horafin === "NA");
                                                //console.log(verificar2);
                                                //console.log("Hora del biometrico", horabio);
                                                //console.log("Se supone que aqui verificas la hora de salida");
                                                if (verificar2) {
                                                    const fechafinal = moment(verificar2.fecha).add(1, 'days').format('YYYY-MM-DD');
                                                    if (fechaForm === fechafinal) {
                                                        if (diasemana === "Saturday" || diasemana === "Sunday") {
                                                            if (verificar2.estatus === "RETARDO") {
                                                                if (horabio >= verificar.horasalidaMD) {
                                                                    console.log(horabio);
                                                                    const motivo = "NA";
                                                                    editAsistencia(verificar2.idasistencia, horaForm, verificar2.estatus, motivo, function (error, respuesta) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            //console.log(respuesta);
                                                                            io.emit('escuchando', respuesta);
                                                                        }
                                                                        //console.log(respuesta);
                                                                    })
                                                                } else {
                                                                    console.log("NO TIENE HORA DE SALIDA");

                                                                }
                                                            } else {
                                                                if (verificar2.estatus === "ENTRADA") {
                                                                    if (horabio >= verificar.horasalidaMD) {
                                                                        const estatus = "ASISTENCIA";
                                                                        //console.log(horabio);
                                                                        const motivo = "NA";
                                                                        editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                //console.log(respuesta);
                                                                                io.emit('escuchando', respuesta);
                                                                            }
                                                                            //console.log(respuesta);
                                                                        })
                                                                    } else {
                                                                        //console.log("NO TIENE HORA DE SALIDA");

                                                                    }
                                                                }
                                                                else {
                                                                    //console.log("TIENE UN ESTATUS DESCONOCIDO");
                                                                }

                                                            }
                                                        }
                                                        else {
                                                            if (verificar2.estatus === "RETARDO") {
                                                                if (horabio >= verificar.horasalida) {
                                                                    console.log(horabio);
                                                                    const motivo = "NA";
                                                                    editAsistencia(verificar2.idasistencia, horaForm, verificar2.estatus, motivo, function (error, respuesta) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            //console.log(respuesta);
                                                                            io.emit('escuchando', respuesta);
                                                                        }
                                                                        //console.log(respuesta);
                                                                    })
                                                                } else {
                                                                    console.log("NO TIENE HORA DE SALIDA");

                                                                }
                                                            } else {
                                                                if (verificar2.estatus === "ENTRADA") {
                                                                    if (horabio >= verificar.horasalida) {
                                                                        const estatus = "ASISTENCIA";
                                                                        //console.log(horabio);
                                                                        const motivo = "NA";
                                                                        editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
                                                                            if (error) {
                                                                                console.log(error);
                                                                            }
                                                                            else {
                                                                                //console.log(respuesta);
                                                                                io.emit('escuchando', respuesta);
                                                                            }
                                                                            //console.log(respuesta);
                                                                        })
                                                                    } else {
                                                                        //console.log("NO TIENE HORA DE SALIDA");

                                                                    }
                                                                }
                                                                else {
                                                                    //console.log("TIENE UN ESTATUS DESCONOCIDO");
                                                                }

                                                            }
                                                        }
                                                    }
                                                } else {
                                                    mostEventosbio(fecha, function (error, respuesta) {
                                                        if (error) {
                                                            console.log(error)
                                                        }
                                                        else {
                                                            console.log("registrados tercero:", respuesta.respuesta);
                                                            const registrados = respuesta.respuesta;
                                                            console.log(verificar.turno);
                                                            if (registrados && registrados.length > 0) {
                                                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                                                    //console.log("algo esta mal");
                                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                                    //console.log("HORA SALIDA ", verificar.horasalida);
                                                                    if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {

                                                                        const horaguardada = verificar.horaentradaMD.split(":");
                                                                        var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                                                        //console.log("Minutos una hora antes ", minutos);

                                                                        const menoshora = minutos - 60;
                                                                        //console.log("Menos una hora : ", menoshora);
                                                                        const horantes = Math.floor(menoshora / 60);
                                                                        const minutosantes = menoshora % 60;

                                                                        const unahorantes = horantes + ':' + minutosantes;

                                                                        //console.log("Hora a comprar: ", unahorantes);

                                                                        if (horabio > unahorantes) {
                                                                            //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                                            if (horabio <= verificar.horaentradaMD) {

                                                                                const estatus = "ENTRADA";
                                                                                const motivo = "NA";
                                                                                const horafin = "NA";
                                                                                //console.log("estatus ENTRADA");
                                                                                insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                    if (error) {
                                                                                        console.error('Error al insertar asistencia:', error.mensaje);
                                                                                    } else {
                                                                                        //console.log(respuesta);
                                                                                        io.emit('escuchando', respuesta);

                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                const estatus = "RETARDO";
                                                                                const motivo = "NA";
                                                                                const horafin = "NA";
                                                                                //console.log("Estatus RETARDO");
                                                                                insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                    if (error) {
                                                                                        console.error('Error al insertar asistencia:', error.mensaje);
                                                                                    } else {
                                                                                        //console.log(respuesta);
                                                                                        io.emit('escuchando', respuesta);

                                                                                    }
                                                                                });

                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                                                        const horaguardada = verificar.horaentrada.split(":");
                                                                        var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                                                        //console.log("Minutos una hora antes ", minutos);

                                                                        const menoshora = minutos - 60;

                                                                        const horantes = Math.floor(menoshora / 60);
                                                                        const minutosantes = menoshora % 60;

                                                                        const unahorantes = horantes + ':' + minutosantes;

                                                                        //console.log("Hora antes: ", unahorantes);
                                                                        if (horabio > unahorantes) {
                                                                            //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                                            if (horabio <= verificar.horaentrada) {
                                                                                const estatus = "ENTRADA";
                                                                                const motivo = "NA";
                                                                                const horafin = "NA";
                                                                                //console.log("estatus ENTRADA");
                                                                                insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                    if (error) {
                                                                                        console.error('Error al insertar asistencia:', error.mensaje);
                                                                                    } else {
                                                                                        //console.log(respuesta);
                                                                                        io.emit('escuchando', respuesta);

                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                const estatus = "RETARDO";
                                                                                const motivo = "NA";
                                                                                const horafin = "NA";
                                                                                //console.log("Estatus RETARDO");
                                                                                insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                    if (error) {
                                                                                        console.error('Error al insertar asistencia:', error.mensaje);
                                                                                    } else {
                                                                                        //console.log(respuesta);
                                                                                        io.emit('escuchando', respuesta);

                                                                                    }
                                                                                });

                                                                            }
                                                                        }

                                                                    }

                                                                }

                                                            }
                                                            else {
                                                                //console.log("no existen registros");

                                                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                                    //console.log("HORA SALIDA ", verificar.horasalida);

                                                                    const horaguardada = verificar.horaentradaMD.split(":");
                                                                    var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                                                    console.log("Minutos unahora antes ", minutos);

                                                                    const menoshora = minutos - 60;

                                                                    const horantes = Math.floor(menoshora / 60);
                                                                    const minutosantes = menoshora % 60;

                                                                    const unahorantes = horantes + ':' + minutosantes;

                                                                    if (horabio > unahorantes) {
                                                                        if (horabio <= verificar.horaentradaMD) {
                                                                            const estatus = "ENTRADA";
                                                                            const motivo = "NA";
                                                                            const horafin = "NA";
                                                                            //console.log("estatus ENTRADA");
                                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                if (error) {
                                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                                } else {
                                                                                    //console.log(respuesta);
                                                                                    io.emit('escuchando', respuesta);

                                                                                }
                                                                            });

                                                                        }
                                                                        else {
                                                                            const estatus = "RETARDO";
                                                                            const motivo = "NA";
                                                                            const horafin = "NA";
                                                                            //console.log("Estatus RETARDO");
                                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                if (error) {
                                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                                } else {
                                                                                    //console.log(respuesta);
                                                                                    io.emit('escuchando', respuesta);

                                                                                }
                                                                            });
                                                                        }
                                                                    }



                                                                }
                                                                else {
                                                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                                    //console.log("HORA SALIDA ", verificar.horasalida);
                                                                    const horaguardada = verificar.horaentrada.split(":");
                                                                    var minutos = parseInt(horaguardada[0]) * 60 + parseInt(horaguardada[1]);
                                                                    console.log("Minutos unahora antes ", minutos);

                                                                    const menoshora = minutos - 60;

                                                                    const horantes = Math.floor(menoshora / 60);
                                                                    const minutosantes = menoshora % 60;

                                                                    const unahorantes = horantes + ':' + minutosantes;

                                                                    if (horabio > unahorantes) {
                                                                        if (horabio <= verificar.horaentrada) {
                                                                            const estatus = "ENTRADA";
                                                                            const motivo = "NA";
                                                                            const horafin = "NA";
                                                                            //console.log("estatus ENTRADA");
                                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                if (error) {
                                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                                } else {
                                                                                    //console.log(respuesta);
                                                                                    io.emit('escuchando', respuesta);

                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            const estatus = "RETARDO";
                                                                            const motivo = "NA";
                                                                            const horafin = "NA";
                                                                            //console.log("Estatus RETARDO");
                                                                            insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
                                                                                if (error) {
                                                                                    console.error('Error al insertar asistencia:', error.mensaje);
                                                                                } else {
                                                                                    //console.log(respuesta);
                                                                                    io.emit('escuchando', respuesta);

                                                                                }
                                                                            });
                                                                        }

                                                                    }

                                                                }


                                                            }
                                                        }
                                                    })

                                                }

                                            }
                                        })
                                    }

                                }
                                else {
                                    console.log("Verificar el turno");
                                }
                            }
                        }
                        else {
                            console.log("No esta registrado como usuario");
                            //console.log("userId: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);

                        }


                    });
                }
            }
            )


        } else {
            console.log('No se encontraron logs de asistencia');
        }

        await obj.disconnect();
    } catch (e) {
        console.log(e);
    }
};


app.get('/regisAsistencia', (req, res) => {
    registrarAsistencias();
});
setInterval(registrarAsistencias, 2000);
/* fin de mostrar asistencias */


app.get("/Brisa", (req, res) => {
    io.emit('escuchando', "HOLAA MUNDO");
})

//Que hace esta funcion?
io.on('connection', (socket) => {

})
/* Fin de explicacion de socket -------------------------- */



app.listen(port, () => {
    console.log(`Port => ${port}`)
    console.log(`Fecha => ${fecha}`)
})
