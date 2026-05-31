"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import RegisterDocenteForm from "@/components/inicio_sesion/RegisterDocenteForm"
import AuthButton from "@/components/inicio_sesion/AuthButton"
import styles from "./CrearForoForm.module.css"
import ForoForm from "./ForoForm"

export default function CrearForoForm() {
    // =========================
    // DOCENTE
    // =========================
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // =========================
    // FORO
    // =========================
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    // =========================
    // MENSAJES
    // =========================
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    async function crearForo() {
        // =========================
        // VALIDACIONES
        // =========================
        if(
            !nombre ||
            !correo ||
            !password ||
            !confirmPassword ||
            !titulo ||
            !descripcion
        ){
            setErrorMessage(
                "Debe llenar todos los campos"
            );
            return;
        }
        if(password !== confirmPassword){
            setErrorMessage(
                "Las contraseñas no coinciden"
            );
            return;
        }
        try {
            // =========================
            // REGISTRAR DOCENTE
            // =========================
            const responseRegister = await fetch(
                "/api/auth/register-docente",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre,
                        correo,
                        password,
                    }),
                }
            );
            const dataRegister = await responseRegister.json();
            if(!responseRegister.ok){
                setErrorMessage(
                    dataRegister.message
                );
                return;
            }
            // =========================
            // CREAR FORO
            // =========================
            const responseForo = await fetch(
                "/api/forum/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        titulo,
                        descripcion,
                        creadorCorreo: correo
                    }),
                }
            );
            const dataForo = await responseForo.json();
            if(!responseForo.ok){
                setErrorMessage(
                    dataForo.message
                );
                return;
            }
            setErrorMessage("");
            setSuccessMessage(
                "Cuenta y foro creados correctamente"
            );
            console.log(dataRegister);
            console.log(dataForo);
            router.push("/posts");
        } catch(error){
            console.log(error);
            setErrorMessage(
                "Error al conectar con el servidor"
            );
        }
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>
                CREA TU FORO GRATIS
            </h1>
            <div className={styles.forms_container}>
                <div className={styles.form_box}>
                    <RegisterDocenteForm
                        nombre={nombre}
                        setNombre={setNombre}
                        correo={correo}
                        setCorreo={setCorreo}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                    />
                </div>
                <div className={styles.form_box}>
                    <ForoForm
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                    />
                </div>
            </div>
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
            <div className={styles.boton_container}>
                <AuthButton
                    text="CREAR FORO"
                    onClick={crearForo}
                />
            </div>
        </div>
    )
}