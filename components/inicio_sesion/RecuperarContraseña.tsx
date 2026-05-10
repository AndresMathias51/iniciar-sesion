"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/components/inicio_sesion/LoginForm.css";
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const RecuperarContraseña = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const passwordsMatch = password === confirmPassword;
  async function recuperarContraseña() {
    if (!password || !confirmPassword) {
      setErrorMessage("Debe llenar todos los campos");
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    setErrorMessage("");
    const response = await fetch("/api/auth/recuperar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      router.push("/login");
    }
  }

  return (
    <AuthLayout title="Actualizar Contraseña">
      <div className="inputGroup">
        <label>Contraseña Nueva</label>
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
      <AuthButton
        text="Actualizar Contraseña"
        onClick={recuperarContraseña}
      />
    </AuthLayout>
  );
};

export default RecuperarContraseña;