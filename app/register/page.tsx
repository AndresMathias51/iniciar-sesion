"use client";

import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState("");
  return (
    <main className="authPage">
      {
        selectedRole === "" ? (
          <div className="authContainer">
            <h1>Selecciona un Rol</h1>
            <div className="roleButtons">
              <button
                className="authButton"
                onClick={() => setSelectedRole("Docente")}
              >
                Docente
              </button>
              <button
                className="authButton"
                onClick={() => setSelectedRole("Estudiante")}
              >
                Estudiante
              </button>
              <button
                className="authButton"
                onClick={() => setSelectedRole("Invitado")}
              >
                Invitado
              </button>
            </div>
          </div>
        ) : (
          <RegisterForm role={selectedRole} />
        )
      }
    </main>
  );
}