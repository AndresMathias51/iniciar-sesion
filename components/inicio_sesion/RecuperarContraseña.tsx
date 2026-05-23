"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/inicio_sesion/RecuperarContraseña.module.css"
import AuthButton from "./AuthButton";
import AuthLayout from "./AuthLayout";

const RecuperarContraseña = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const passwordsMatch =
    password === confirmPassword;
  async function recuperarContraseña() {
    if(
      !password ||
      !confirmPassword
    ){
      setErrorMessage(
        "Debe llenar todos los campos"
      );
      return;
    }
    if(!passwordsMatch){
      setErrorMessage(
        "Las contraseñas no coinciden"
      );
      return;
    }
    try {
      const correo = localStorage.getItem(
        "correoRecuperacion"
      );
      const response = await fetch(
        "/api/auth/recuperar",
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
        return;
      }
      setErrorMessage("");
      setSuccessMessage(data.message);
      localStorage.removeItem(
        "correoRecuperacion"
      );
      router.push("/login");
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
          Contraseña Nueva
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
        text="Actualizar Contraseña"
        onClick={recuperarContraseña}
      />
    </AuthLayout>
  );
};
export default RecuperarContraseña;