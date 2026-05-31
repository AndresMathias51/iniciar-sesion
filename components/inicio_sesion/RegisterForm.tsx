"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/components/inicio_sesion/RegisterForm.module.css"
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const passwordsMatch = password === confirmPassword;
  async function register() {
    // =========================
    // VALIDACIONES FRONTEND
    // =========================
    if (
      !nombre ||
      !correo ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Debe llenar todos los campos");
      setSuccessMessage("");
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage("Las contraseñas no coinciden");
      setSuccessMessage("");
      return;
    }
    try {
      // =========================
      // FETCH BACKEND
      // =========================
      const response = await fetch(
        "/api/auth/register",
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
      const data = await response.json();
      // =========================
      // SI EL BACKEND FALLA
      // =========================
      if (!response.ok) {
        setErrorMessage(data.message);
        setSuccessMessage("");
        return;
      }
      // =========================
      // REGISTRO EXITOSO
      // =========================
      setErrorMessage("");
      setSuccessMessage(
        "Cuenta registrada correctamente"
      );
      console.log(data);
      // limpiar inputs
      setNombre("");
      setCorreo("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Error al conectar con el servidor"
      );
      setSuccessMessage("");
    }
  }

  return (
    <AuthLayout title={`Registrarse`}>
      <div className={styles.inputGroup}>
        <label>
          Nombre
        </label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
        />
      </div>
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>
          Confirmar Contraseña
        </label>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {
        confirmPassword.length > 0 &&
        !passwordsMatch && (
          <p className={styles.errorText}>
            Las contraseñas no coinciden
          </p>
        )
      }
      {
        confirmPassword.length > 0 &&
        passwordsMatch && (
          <p className={styles.successText}>
            Las contraseñas coinciden
          </p>
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
      <AuthButton
        text="Registrarse"
        onClick={register}
      />
      <p>
        ¿Ya tienes cuenta?{" "}
        <Link
          className={styles.iniciarSesionTexto}
          href="/login"
        >
          Iniciar Sesión
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterForm;