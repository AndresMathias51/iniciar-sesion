"use client";

import { useMemo, useState } from "react";
import styles from "./Ventana_categoria.module.css";

import type { TemaPorCategoria, TemaCategoriaDetalle } from "@/components/estadisticas/types_estadisticas";

import Form_tema from "@/components/admin_materia/Form_tema";
import temasCategoriaJson from "@/app/estadisticas/moderacion.json";

type VentanaCategoriaProps = {
  categoria: TemaPorCategoria;
  onCerrar: () => void;
};

type MiniCategoria = {
  id: string;
  nombre: string;
};

const temasCategoria = temasCategoriaJson as TemaCategoriaDetalle[];

export default function VentanaCategoria({ categoria, onCerrar }: VentanaCategoriaProps) {
  const [mostrarCrearTema, setMostrarCrearTema] = useState(false);

  // Copia local (el JSON no se puede modificar desde el browser)
  const [temasLocal, setTemasLocal] = useState<TemaCategoriaDetalle[]>(temasCategoria);

  // Confirmación eliminar
  const [temaAEliminar, setTemaAEliminar] = useState<TemaCategoriaDetalle | null>(null);

  const temasFiltrados = useMemo(() => {
    return temasLocal.filter((tema) => tema.idCategoria === categoria.id);
  }, [temasLocal, categoria.id]);

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
    setTemaAEliminar(tema);
  };

  const cancelarEliminar = () => setTemaAEliminar(null);

  const confirmarEliminar = () => {
    if (!temaAEliminar) return;

    setTemasLocal((prev) => prev.filter((t) => t.id !== temaAEliminar.id));
    setTemaAEliminar(null);
  };

  return (
    <div className={styles.overlay}>
      {/* ================= Modal principal: lista de temas ================= */}
      {!mostrarCrearTema && (
        <div className={styles.modal}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{categoria.categoria}</h2>
              <p className={styles.subtitle}>Temas registrados en esta categoría</p>
            </div>

            <button type="button" className={styles.closeIconButton} onClick={onCerrar}>
              ×
            </button>
          </div>

          <div className={styles.content}>
            {temasFiltrados.length > 0 ? (
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

                    <p className={styles.topicDescription}>{tema.descripcion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMessage}>No existen temas registrados para esta categoría.</p>
            )}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.primaryButton} onClick={abrirCrearTema}>
              Crear tema
            </button>

            <button type="button" className={styles.closeButton} onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ================= Modal secundario: SOLO Form_tema ================= */}
      {mostrarCrearTema && (
        <div className={styles.createTemaModal}>
          <div className={styles.createTemaHeader}>
            <h3 className={styles.createTemaTitle}>Agregar tema</h3>

            <button type="button" className={styles.closeIconButton} onClick={cerrarCrearTema}>
              ×
            </button>
          </div>

          <div className={styles.createTemaBody}>
            <Form_tema
              categorias={miniCategorias as unknown as any[]}
              categoriaId={categoriaIdForFormTema}
              onCreate={(temaData) => {
                // Demo: lo agregamos al estado local para verlo al volver
                const nextId = Math.max(0, ...temasLocal.map((t) => t.id)) + 1;

                setTemasLocal((prev) => [
                  ...prev,
                  {
                    id: nextId,
                    idCategoria: categoria.id,
                    titulo: temaData.titulo,
                    descripcion: temaData.descripcion,
                  } as TemaCategoriaDetalle,
                ]);

                cerrarCrearTema();
              }}
            />
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.closeButton} onClick={cerrarCrearTema}>
              Volver
            </button>
          </div>
        </div>
      )}

      {/* ================= Confirmación eliminar (modal encima) ================= */}
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
                <strong>Descripción:</strong> <span>{temaAEliminar.descripcion}</span>
              </div>
            </div>

            <div className={styles.confirmActions}>
              <button type="button" className={styles.confirmCancel} onClick={cancelarEliminar}>
                Cancelar
              </button>
              <button type="button" className={styles.confirmAccept} onClick={confirmarEliminar}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}