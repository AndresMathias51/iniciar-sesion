"use client";

import { useState } from "react";

import Link from "next/link";

import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

type Props = {
  role: string;
  onBack?: () => void;
};



const RegisterForm = ({ role, onBack }: Props) => {
  async function register() {
    if (
      !nombre ||
      !correo ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Debe llenar todos los campos");
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    setErrorMessage("");
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMatch = password === confirmPassword;
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <AuthLayout title={`Registro ${role}`}>
      {
        onBack && (
          <button
            className="forgotPassword"
            onClick={onBack}
          >
            ← Cambiar Rol
          </button>
        )
      }
      <div className="inputGroup">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="correo@gmail.com"
          value={correo}
          onChange={(e)=>setCorreo(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {
        confirmPassword.length > 0 && !passwordsMatch && (
          <p className="errorText">
            Las contraseñas no coinciden
          </p>
        )
      }
      {
        confirmPassword.length > 0 && passwordsMatch && (
          <p className="successText">
            Las contraseñas coinciden
          </p>
        )
      }
      {
        errorMessage && (
          <p className="errorText">
            {errorMessage}
          </p>
        )
      }
      <AuthButton text="Registrarse" onClick={register}/>
      <p>
        ¿Ya tienes cuenta?{" "}
        <Link className="registrarseTexto" href="/login">
          Iniciar Sesión
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterForm;