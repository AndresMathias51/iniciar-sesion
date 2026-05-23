"use client";

import { useState } from "react";

import type { EstudianteInscrito } from "./types_estadisticas";
import Confirmar_eliminar_usuario from "@/components/estadisticas/moderacion/Confirmar_eliminar_usuario";
import styles from "./Estudiantes_Inscritos.module.css";

type EstudiantesInscritosListProps = {
  estudiantes: EstudianteInscrito[];
};

export default function EstudiantesInscritosList({
  estudiantes,
}: EstudiantesInscritosListProps) {
  const [estudianteSeleccionado, setEstudianteSeleccionado] =
    useState<EstudianteInscrito | null>(null);

  const abrirModalEliminar = (estudiante: EstudianteInscrito) => {
    setEstudianteSeleccionado(estudiante);
  };

  const cerrarModalEliminar = () => {
    setEstudianteSeleccionado(null);
  };

  const aceptarEliminarEstudiante = (estudiante: EstudianteInscrito) => {
    console.log("Estudiante seleccionado para eliminar:", estudiante);

    // Aquí irá el procedimiento real más adelante.
    // Ejemplo futuro:
    // await eliminarEstudiante(estudiante.id);

    setEstudianteSeleccionado(null);
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Estudiantes inscritos</h2>
        <p className={styles.description}>
          Lista de estudiantes registrados en la materia
        </p>
      </div>

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {estudiantes.map((estudiante) => (
            <li key={estudiante.id} className={styles.item}>
              <div>
                <p className={styles.studentName}>{estudiante.nombre}</p>
                <p className={styles.studentEmail}>{estudiante.email}</p>
              </div>

              <div>
                <span className={styles.badge}>Estudiante</span>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => abrirModalEliminar(estudiante)}
                >
                  Eliminar Estudiante
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {estudianteSeleccionado && (
        <Confirmar_eliminar_usuario
          estudiante={estudianteSeleccionado}
          onCancelar={cerrarModalEliminar}
          onAceptar={aceptarEliminarEstudiante}
        />
      )}
    </section>
  );
}