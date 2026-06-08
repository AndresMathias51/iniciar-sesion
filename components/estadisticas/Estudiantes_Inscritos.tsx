"use client";

import { useEffect, useState } from "react";

import type { EstudianteInscrito } from "./types_estadisticas";
import Confirmar_eliminar_usuario from "@/components/estadisticas/moderacion/Confirmar_eliminar_usuario";
import styles from "./Estudiantes_Inscritos.module.css";

type EstudiantesInscritosListProps = {
  estudiantes: EstudianteInscrito[];
};

type EliminarEstudianteRespuesta = {
  eliminado: boolean;
  mensaje: string;
  publicacionesReasignadas?: number;
  usuario?: {
    id: number;
    nombre: string;
    correo: string;
    rolAnterior: string;
    rolNuevo: string;
  };
  usuarioDefault?: {
    id: number;
    nombre: string;
    correo: string;
  };
};

const API_ESTUDIANTES = "/api/estudiantes";

export default function EstudiantesInscritosList({
  estudiantes,
}: EstudiantesInscritosListProps) {
  const [estudiantesVista, setEstudiantesVista] =
    useState<EstudianteInscrito[]>(estudiantes);

  const [estudianteSeleccionado, setEstudianteSeleccionado] =
    useState<EstudianteInscrito | null>(null);

  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  useEffect(() => {
    setEstudiantesVista(estudiantes);
  }, [estudiantes]);

  const abrirModalEliminar = (estudiante: EstudianteInscrito) => {
    setErrorEliminar(null);
    setEstudianteSeleccionado(estudiante);
  };

  const cerrarModalEliminar = () => {
    if (eliminando) return;

    setErrorEliminar(null);
    setEstudianteSeleccionado(null);
  };

  async function aceptarEliminarEstudiante(estudiante: EstudianteInscrito) {
    try {
      setEliminando(true);
      setErrorEliminar(null);

      const res = await fetch(`${API_ESTUDIANTES}?id=${estudiante.id}`, {
        method: "DELETE",
      });

      const data = (await res.json()) as
        | EliminarEstudianteRespuesta
        | { error: string };

      if (!res.ok) {
        throw new Error(
          "error" in data
            ? data.error
            : "No se pudo eliminar el estudiante."
        );
      }

      setEstudiantesVista((prevEstudiantes) =>
        prevEstudiantes.filter((item) => item.id !== estudiante.id)
      );

      setEstudianteSeleccionado(null);
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      setErrorEliminar("No se pudo eliminar el estudiante.");
    } finally {
      setEliminando(false);
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Estudiantes inscritos</h2>
        <p className={styles.description}>
          Lista de estudiantes registrados en la materia
        </p>
      </div>

      {errorEliminar && (
        <p className={styles.errorMessage}>{errorEliminar}</p>
      )}

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {estudiantesVista.map((estudiante) => (
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
                  disabled={eliminando}
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