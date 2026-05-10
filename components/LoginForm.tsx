"use client";
import Link from "next/link";
import "@/components/LoginForm.css"
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

async function contraseña() {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    });
    const data = await response.json();
    console.log(data)
}

async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
}

const LoginForm = () => {
  return (
    <AuthLayout title="Iniciar Sesión">
      <InputField
        label="Correo Electrónico"
        type="email"
        placeholder="correo@gmail.com"
      />
      <InputField
        label="Contraseña"
        type="password"
        placeholder="********"
      />
      <button className="forgotPassword" onClick={contraseña}>
        Olvidé mi contraseña
      </button>
      <AuthButton text="Iniciar Sesión" onClick={login}/>
      <p>
        ¿No tienes cuenta?{" "}
        <Link href="/register">
          Registrarse
        </Link>
      </p>

    </AuthLayout>
  );
};

export default LoginForm;