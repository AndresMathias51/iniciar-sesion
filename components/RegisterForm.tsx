"use client";

import { useState } from "react";

import Link from "next/link";

import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

type Props = {
  role: string;
  onBack?: () => void;
};

async function register() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
    });

    const data = await response.json();

    console.log(data);
}

const RegisterForm = ({ role, onBack }: Props) => {

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword;

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
        />
      </div>

      <div className="inputGroup">
        <label>Correo Electrónico</label>

        <input
          type="email"
          placeholder="correo@gmail.com"
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

      <AuthButton text="Registrarse" onClick={register}/>

      <p>
        ¿Ya tienes cuenta?{" "}

        <Link href="/login">
          Iniciar Sesión
        </Link>
      </p>

    </AuthLayout>
  );
};

export default RegisterForm;