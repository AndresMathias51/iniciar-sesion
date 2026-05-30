"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/components/inicio_sesion/LoginForm.module.css"
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const LoginForm = () => {

  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");
  async function ingresarInvitado(){

    // =========================
    // CERRAR SESIÓN SI EXISTE
    // =========================
    await fetch(
      "/api/auth/logout",
      {
        method:"POST"
      }
    );
    // =========================
    // ENTRAR COMO INVITADO
    // =========================

    router.refresh();

    router.push("/dashboard");

  }
  async function login() {

    if(!correo || !password){

      setErrorMessage(
        "Debe llenar todos los campos"
      );

      setSuccessMessage("");

      return;

    }

    try {

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo,
            password,
          }),
        }
      );

      const data = await response.json();

      if(!response.ok){

        setErrorMessage(data.message);

        setSuccessMessage("");

        return;

      }

      setErrorMessage("");

      setSuccessMessage(
        "Inicio de sesión exitoso"
      );

      router.refresh();

      router.push("/dashboard");

    } catch(error){

      console.log(error);

      setErrorMessage(
        "Error al conectar con el servidor"
      );

      setSuccessMessage("");

    }

  }

  return (

    <AuthLayout title="Iniciar Sesión">

      <div className={styles.inputGroup}>

        <label>
          Correo Electrónico
        </label>

        <input
          type="email"
          placeholder="correo@gmail.com"
          value={correo}
          onChange={(e)=>setCorreo(e.target.value)}
        />

      </div>

      <div className={styles.inputGroup}>

        <label>
          Contraseña
        </label>

        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

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

      <Link
        className={styles.forgotPassword}
        href="/password"
      >
        Olvidé mi contraseña
      </Link>

      <AuthButton
        text="Iniciar Sesión"
        onClick={login}
      />

      <AuthButton
        text="Ingresar Como Invitado"
        onClick={ingresarInvitado}
      />

      <p>
        ¿No tienes cuenta?{" "}

        <Link
          className={styles.registrarseTexto}
          href="/register"
        >
          Registrarse
        </Link>

      </p>

    </AuthLayout>

  );

};

export default LoginForm;