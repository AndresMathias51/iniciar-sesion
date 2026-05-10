"use client";
import { useState } from "react";
import Link from "next/link";
import "@/components/inicio_sesion/LoginForm.css"
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const LoginForm = () => {
  async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  return (
    <AuthLayout title="Iniciar Sesión">
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
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <Link className="forgotPassword" href="/password">
        Olvidé mi contraseña
      </Link>
      <AuthButton text="Iniciar Sesión" onClick={login}/>
      <p>
        ¿No tienes cuenta?{" "}
        <Link className="registrarseTexto" href="/register">
          Registrarse
        </Link>
      </p>

    </AuthLayout>
  );
};

export default LoginForm;