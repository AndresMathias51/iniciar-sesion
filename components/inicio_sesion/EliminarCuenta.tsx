"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import AuthButton from "./AuthButton";
import styles from "@/components/inicio_sesion/EliminarCuenta.module.css"
export default function EliminarCuenta(){

    const router = useRouter();

    const [correo,setCorreo] =
        useState("");

    const [password,setPassword] =
        useState("");

    const [codigo,setCodigo] =
        useState("");

    const [codigoVerificado,
        setCodigoVerificado] =
            useState(false);

    const [mostrarConfirmacion,
        setMostrarConfirmacion] =
            useState(false);

    const [errorMessage,
        setErrorMessage] =
            useState("");

    const [successMessage,
        setSuccessMessage] =
            useState("");

    // =========================
    // ENVIAR CÓDIGO
    // =========================
    async function enviarCodigo(){

        try{

            const response = await fetch(
                "/api/auth/eliminar-cuenta/verificar",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                            "application/json"
                    },

                    body:JSON.stringify({

                        accion:"enviar",

                        correo,

                        password
                    })
                }
            );

            const data =
                await response.json();

            if(!response.ok){

                setErrorMessage(
                    data.message
                );

                setSuccessMessage("");

                return;

            }

            setErrorMessage("");

            setSuccessMessage(
                data.message
            );

        }catch(error){

            console.log(error);

            setErrorMessage(
                "Error interno"
            );

        }

    }

    // =========================
    // VERIFICAR CÓDIGO
    // =========================
    async function verificarCodigo(){

        try{

            const response = await fetch(
                "/api/auth/eliminar-cuenta/verificar",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                            "application/json"
                    },

                    body:JSON.stringify({

                        accion:"verificar",

                        codigo
                    })
                }
            );

            const data =
                await response.json();

            if(!response.ok){

                setErrorMessage(
                    data.message
                );

                return;

            }

            setErrorMessage("");

            setSuccessMessage(
                "Código correcto"
            );

            setCodigoVerificado(true);

            setMostrarConfirmacion(true);

        }catch(error){

            console.log(error);

            setErrorMessage(
                "Error interno"
            );

        }

    }

    // =========================
    // ELIMINAR CUENTA
    // =========================
    async function eliminarCuenta(){

        try{

            const response = await fetch(
                "/api/auth/eliminar-cuenta/confirmar",
                {
                    method:"DELETE"
                }
            );

            const data =
                await response.json();

            if(!response.ok){

                setErrorMessage(
                    data.message
                );

                return;

            }

            router.push("/login");

        }catch(error){

            console.log(error);

            setErrorMessage(
                "Error interno"
            );

        }

    }

    return (

        <AuthLayout title="Eliminar Cuenta">
            {
                !codigoVerificado && (
                    <>
                        <div className={styles.inputGroup}>
                            <label>
                                Correo
                            </label>
                            <input
                                type="email"
                                placeholder=
                                "correo@gmail.com"

                                value={correo}

                                onChange={(e)=>
                                    setCorreo(
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder=
                                "********"

                                value={password}

                                onChange={(e)=>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <AuthButton
                            text="Enviar Código"
                            onClick={enviarCodigo}
                        />

                        <div className={styles.inputGroup}>

                            <label>
                                Código
                            </label>

                            <input
                                type="text"

                                placeholder=
                                "Ingrese código"

                                value={codigo}

                                onChange={(e)=>
                                    setCodigo(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <AuthButton
                            text="Verificar Código"
                            onClick={
                                verificarCodigo
                            }
                        />
                    </>
                )
            }

            {
                mostrarConfirmacion && (
                    <div
                        className={
                            styles.confirmacion
                        }
                    >

                        <h3>
                            ¿Seguro que desea
                            eliminar la cuenta?
                        </h3>

                        <AuthButton
                            text="Eliminar Cuenta"

                            onClick={
                                eliminarCuenta
                            }
                        />

                    </div>
                )
            }

            {
                errorMessage && (
                    <p className={styles.errorText}>
                        {errorMessage}
                    </p>
                )
            }

            {
                successMessage && (
                    <p className={styles.successText}>
                        {successMessage}
                    </p>
                )
            }

        </AuthLayout>

    );

}