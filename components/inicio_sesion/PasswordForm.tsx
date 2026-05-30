"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/components/inicio_sesion/PasswordForm.module.css"
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const PasswordForm = () => {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  async function enviarCodigo() {
    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo,
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
      setSuccessMessage(data.message);
    } catch(error){
      console.log(error);
      setErrorMessage(
        "Error al enviar código"
      );
    }
  }
  async function verificarCodigo() {
    try {
      const response = await fetch(
        "/api/auth/verificar-codigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo,
            codigo,
          }),
        }
      );
      const data = await response.json();
      if(!response.ok){
        setErrorMessage(data.message);
        return;
      }
      setErrorMessage("");
      // guardar correo
      localStorage.setItem(
        "correoRecuperacion",
        correo
      );
      router.push("/recuperar");
    } catch(error){
      console.log(error);
      setErrorMessage(
        "Error interno"
      );
    }
  }
  return (
    <AuthLayout title="Actualizar Contraseña">
      <div className={styles.inputGroup}>
        <label>
          Correo Electrónico
        </label>
        <input
          type="email"
          placeholder="correo@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>
          Código
        </label>
        <input
          type="text"
          placeholder="Ingrese el código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
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
      <AuthButton
        text="Enviar Código"
        onClick={enviarCodigo}
      />
      <AuthButton
        text="Verificar Codigo"
        onClick={verificarCodigo}
      />
      <Link
        className={styles.registrarseTexto}
        href="/login"
      >
        Regresar
      </Link>
    </AuthLayout>
  );
};
export default PasswordForm;