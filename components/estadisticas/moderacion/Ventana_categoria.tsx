"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Ventana_categoria.module.css";

import type {
  TemaPorCategoria,
  TemaCategoriaDetalle,
} from "@/components/estadisticas/types_estadisticas";

import Form_tema from "@/components/admin_materia/Form_tema";

type VentanaCategoriaProps = {
  categoria: TemaPorCategoria;
  onCerrar: () => void;
};

type MiniCategoria = {
  id: string;
  nombre: string;
};

type BorrarTemaRespuesta = {
  eliminado: boolean;
  mensaje: string;
  tema?: TemaCategoriaDetalle;
};

const API_TEMAS = "/api/moderacion";

export default function VentanaCategoria({
  categoria,
  onCerrar,
}: VentanaCategoriaProps) {
  const [mostrarCrearTema, setMostrarCrearTema] = useState(false);
  const [temasCategoria, setTemasCategoria] = useState<TemaCategoriaDetalle[]>([]);
  const [cargandoTemas, setCargandoTemas] = useState(true);
  const [errorTemas, setErrorTemas] = useState<string | null>(null);

  const [temaAEliminar, setTemaAEliminar] =
    useState<TemaCategoriaDetalle | null>(null);

  const [eliminandoTema, setEliminandoTema] = useState(false);
  const [errorEliminarTema, setErrorEliminarTema] = useState<string | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();

    async function cargarTemas() {
      try {
        setCargandoTemas(true);
        setErrorTemas(null);

        const res = await fetch(API_TEMAS, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("No se pudieron obtener los temas.");
        }

        const data = (await res.json()) as TemaCategoriaDetalle[];

        setTemasCategoria(Array.isArray(data) ? data : []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error al cargar temas:", error);
          setErrorTemas("No se pudieron cargar los temas.");
        }
      } finally {
        setCargandoTemas(false);
      }
    }

    cargarTemas();

    return () => {
      controller.abort();
    };
  }, []);

  const temasFiltrados = useMemo(
    () => temasCategoria.filter((tema) => tema.idCategoria === categoria.id),
    [temasCategoria, categoria.id]
  );

  const miniCategorias: MiniCategoria[] = useMemo(() => {
    return [
      {
        id: String(categoria.id),
        nombre: categoria.categoria,
      },
    ];
  }, [categoria.id, categoria.categoria]);

  const categoriaIdForFormTema = String(categoria.id);

  const abrirCrearTema = () => setMostrarCrearTema(true);
  const cerrarCrearTema = () => setMostrarCrearTema(false);

  const pedirConfirmacionEliminar = (tema: TemaCategoriaDetalle) => {
    setErrorEliminarTema(null);
    setTemaAEliminar(tema);
  };

  const cancelarEliminar = () => {
    if (eliminandoTema) return;

    setErrorEliminarTema(null);
    setTemaAEliminar(null);
  };

  async function confirmarEliminar() {
    if (!temaAEliminar) return;

    try {
      setEliminandoTema(true);
      setErrorEliminarTema(null);

      const res = await fetch(
        `${API_TEMAS}?tipo=tema&id=${temaAEliminar.id}`,
        {
          method: "DELETE",
        }
      );

      const data = (await res.json()) as BorrarTemaRespuesta | { error: string };

      if (!res.ok) {
        throw new Error(
          "error" in data ? data.error : "No se pudo eliminar el tema."
        );
      }

      setTemasCategoria((prevTemas) =>
        prevTemas.filter((tema) => tema.id !== temaAEliminar.id)
      );

      setTemaAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar tema:", error);
      setErrorEliminarTema("No se pudo eliminar el tema.");
    } finally {
      setEliminandoTema(false);
    }
  }

  async function crearTemaEnBD(temaData: {
    categoriaId: string;
    titulo: string;
    descripcion: string;
    imagenUrl?: string;
  }) {
    try {
      setErrorTemas(null);

      const res = await fetch(API_TEMAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: temaData.titulo,
          descripcion: temaData.descripcion,
          categoriaId: temaData.categoriaId,
          imagenUrl: temaData.imagenUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error ?? "No se pudo crear el tema.");
      }

      const nuevoTema = (await res.json()) as TemaCategoriaDetalle;

      setTemasCategoria((prevTemas) => [...prevTemas, nuevoTema]);

      cerrarCrearTema();
    } catch (error) {
      console.error("Error al crear tema:", error);
      setErrorTemas("No se pudo crear el tema.");
    }
  }

  return (
    <div className={styles.overlay}>
      {!mostrarCrearTema && (
        <div className={styles.modal}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{categoria.categoria}</h2>
              <p className={styles.subtitle}>
                Temas registrados en esta categoría
              </p>
            </div>

            <button
              type="button"
              className={styles.closeIconButton}
              onClick={onCerrar}
            >
              ×
            </button>
          </div>

          <div className={styles.content}>
            {cargandoTemas ? (
              <p className={styles.emptyMessage}>Cargando temas...</p>
            ) : errorTemas ? (
              <p className={styles.emptyMessage}>{errorTemas}</p>
            ) : temasFiltrados.length > 0 ? (
              <ul className={styles.list}>
                {temasFiltrados.map((tema) => (
                  <li key={tema.id} className={styles.item}>
                    <div className={styles.itemTop}>
                      <h3 className={styles.topicTitle}>{tema.titulo}</h3>

                      <button
                        type="button"
                        className={styles.trashButton}
                        onClick={() => pedirConfirmacionEliminar(tema)}
                        aria-label="Eliminar tema"
                        title="Eliminar"
                      >
                        🗑
                      </button>
                    </div>

                    <p className={styles.topicDescription}>
                      {tema.descripcion}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMessage}>
                No existen temas registrados para esta categoría.
              </p>
            )}
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={abrirCrearTema}
            >
              Crear tema
            </button>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onCerrar}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {mostrarCrearTema && (
        <div className={styles.createTemaModal}>
          <div className={styles.createTemaHeader}>
            <h3 className={styles.createTemaTitle}>Agregar tema</h3>

            <button
              type="button"
              className={styles.closeIconButton}
              onClick={cerrarCrearTema}
            >
              ×
            </button>
          </div>

          <div className={styles.createTemaBody}>
            <Form_tema
              categorias={miniCategorias as unknown as any[]}
              categoriaId={categoriaIdForFormTema}
              onCreate={crearTemaEnBD}
            />
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={cerrarCrearTema}
            >
              Volver
            </button>
          </div>
        </div>
      )}

      {temaAEliminar && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmModal}>
            <h3 className={styles.confirmTitle}>Confirmar eliminación</h3>

            <p className={styles.confirmText}>
              ¿Estás seguro de que deseas eliminar el siguiente tema?
            </p>

            <div className={styles.confirmBox}>
              <div className={styles.confirmRow}>
                <strong>Título:</strong> <span>{temaAEliminar.titulo}</span>
              </div>

              <div className={styles.confirmRow}>
                <strong>Descripción:</strong>{" "}
                <span>{temaAEliminar.descripcion}</span>
              </div>
            </div>

            {errorEliminarTema && (
              <p className={styles.emptyMessage}>{errorEliminarTema}</p>
            )}

            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={cancelarEliminar}
                disabled={eliminandoTema}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirmAccept}
                onClick={confirmarEliminar}
                disabled={eliminandoTema}
              >
                {eliminandoTema ? "Eliminando..." : "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}