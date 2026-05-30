"use client";

import styles from "@/components/inicio_sesion/RegisterDocenteForm.module.css"
import AuthLayout from "./AuthLayout";

type Props = {
  nombre: string,
  setNombre: (value:string)=>void,
  correo: string,
  setCorreo: (value:string)=>void,
  password: string,
  setPassword: (value:string)=>void,
  confirmPassword: string,
  setConfirmPassword: (value:string)=>void
};
const RegisterDocenteForm = ({
  nombre,
  setNombre,
  correo,
  setCorreo,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword
}: Props) => {
  const passwordsMatch =
    password === confirmPassword;
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
          onChange={(e)=>setPassword(e.target.value)}
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
          onChange={(e)=>setConfirmPassword(e.target.value)}
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
    </AuthLayout>
  );
};
export default RegisterDocenteForm;