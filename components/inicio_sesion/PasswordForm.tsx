"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const PasswordForm = () => {

  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function enviarCodigo() {

    if (!correo) {
      setErrorMessage("Debe ingresar un correo");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo,
      }),
    });

    const data = await response.json();

    setSuccessMessage(data.message);

    console.log(data);
  }

  async function verificarCodigo() {

    if (!codigo) {
      setErrorMessage("Debe ingresar el código");
      return;
    }

    const response = await fetch("/api/auth/verificar-codigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo,
        codigo,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      setErrorMessage(data.message);
      return;
    }

    setErrorMessage("");

    router.push("/recuperar");
  }

  return (
    <AuthLayout title="Actualizar Contraseña">

      <div className="inputGroup">
        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="correo@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="inputGroup">
        <label>Código</label>
        <input
          type="text"
          placeholder="Ingrese el código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>

      {
        errorMessage && (
          <p className="errorText">
            {errorMessage}
          </p>
        )
      }

      {
        successMessage && (
          <p className="successText">
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
        className="registrarseTexto"
        href="/login"
      >
        Regresar
      </Link>

    </AuthLayout>
  );
};

export default PasswordForm;