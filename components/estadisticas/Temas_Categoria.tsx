"use client";

import { useMemo, useState } from "react";

import type { TemaPorCategoria } from "./types_estadisticas";

import VentanaCategoria from "@/components/estadisticas/moderacion/Ventana_categoria";
import Form_categoria from "@/components/admin_materia/Form_categoria";

import styles from "./Temas_Categoria.module.css";

type TemasPorCategoriaListProps = {
  categorias: TemaPorCategoria[];
};

export default function TemasPorCategoriaList({ categorias }: TemasPorCategoriaListProps) {
  // Copia local (para poder editar/eliminar visualmente)
  const [categoriasLocal, setCategoriasLocal] = useState<TemaPorCategoria[]>(categorias);

  // configurar -> ventana emergente temas
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<TemaPorCategoria | null>(null);

  // + -> crear categoría
  const [mostrarCrearCategoria, setMostrarCrearCategoria] = useState(false);

  // editar categoría
  const [categoriaEditar, setCategoriaEditar] = useState<TemaPorCategoria | null>(null);

  // eliminar categoría (confirmación)
  const [categoriaEliminar, setCategoriaEliminar] = useState<TemaPorCategoria | null>(null);

  const abrirVentanaCategoria = (categoria: TemaPorCategoria) => setCategoriaSeleccionada(categoria);
  const cerrarVentanaCategoria = () => setCategoriaSeleccionada(null);

  const abrirCrearCategoria = () => setMostrarCrearCategoria(true);
  const cerrarCrearCategoria = () => setMostrarCrearCategoria(false);

  const abrirEditarCategoria = (categoria: TemaPorCategoria) => setCategoriaEditar(categoria);
  const cerrarEditarCategoria = () => setCategoriaEditar(null);

  const pedirEliminarCategoria = (categoria: TemaPorCategoria) => setCategoriaEliminar(categoria);
  const cancelarEliminarCategoria = () => setCategoriaEliminar(null);

  const confirmarEliminarCategoria = () => {
    if (!categoriaEliminar) return;

    setCategoriasLocal((prev) => prev.filter((c) => c.id !== categoriaEliminar.id));

    // si justo estaba abierta
    if (categoriaSeleccionada?.id === categoriaEliminar.id) setCategoriaSeleccionada(null);
    if (categoriaEditar?.id === categoriaEliminar.id) setCategoriaEditar(null);

    setCategoriaEliminar(null);
  };

  // Si te llegan nuevas categorías por props, puedes sincronizar (opcional)
  // (Para demo normalmente no hace falta)
  const categoriasRender = useMemo(() => categoriasLocal, [categoriasLocal]);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Temas por categoría</h2>

          <button type="button" className={styles.addButton} onClick={abrirCrearCategoria}>
            +
          </button>
        </div>

        <p className={styles.description}>Cantidad de temas creados en cada categoría</p>
      </div>

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {categoriasRender.map((categoria) => (
            <li key={categoria.id} className={styles.item}>
              <div className={styles.itemLeft}>
                <span className={styles.categoryName}>{categoria.categoria}</span>
              </div>

              <div className={styles.actions}>
                {/* botones texto al lado del nombre (derecha) */}
                <button
                  type="button"
                  className={styles.editTextBtn}
                  onClick={() => abrirEditarCategoria(categoria)}
                >
                  editar
                </button>

                <button
                  type="button"
                  className={styles.deleteTextBtn}
                  onClick={() => pedirEliminarCategoria(categoria)}
                >
                  eliminar
                </button>

                <span className={styles.badge}>{categoria.cantidadTemas} temas</span>

                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => abrirVentanaCategoria(categoria)}
                >
                  configurar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ventana de temas de la categoría */}
      {categoriaSeleccionada && (
        <VentanaCategoria categoria={categoriaSeleccionada} onCerrar={cerrarVentanaCategoria} />
      )}

      {/* Modal crear categoría */}
      {mostrarCrearCategoria && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={cerrarCrearCategoria}>
              ×
            </button>

            <Form_categoria
              mode="create"
              onCreate={(data) => {
                // Demo UI: agregamos una categoría visual (id numérico)
                const nextId = Math.max(0, ...categoriasLocal.map((c) => Number(c.id))) + 1;

                setCategoriasLocal((prev) => [
                  ...prev,
                  {
                    id: nextId,
                    categoria: data.nombre,
                    cantidadTemas: 0,
                  } as any,
                ]);

                cerrarCrearCategoria();
              }}
              onUpdate={() => {}}
              onCancelEdit={cerrarCrearCategoria}
            />
          </div>
        </div>
      )}

      {/* Modal editar categoría (usa el mismo Form_categoria pero en mode update) */}
      {categoriaEditar && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={cerrarEditarCategoria}>
              ×
            </button>

            <Form_categoria
              mode="edit"
              categoriaToEdit={
                {
                  id: String(categoriaEditar.id),
                  nombre: categoriaEditar.categoria,
                  descripcion: "",
                  imagenUrl: undefined,
                } as any
              }
              onCreate={() => {}}
              onUpdate={(updated) => {
                // Demo UI: actualiza el nombre visual
                setCategoriasLocal((prev) =>
                  prev.map((c) =>
                    c.id === categoriaEditar.id
                      ? ({
                          ...c,
                          categoria: updated.nombre,
                        } as any)
                      : c
                  )
                );

                cerrarEditarCategoria();
              }}
              onCancelEdit={cerrarEditarCategoria}
            />
          </div>
        </div>
      )}

      {/* Confirmación eliminar categoría */}
      {categoriaEliminar && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmModal}>
            <h3 className={styles.confirmTitle}>Confirmar eliminación</h3>
            <p className={styles.confirmText}>
              ¿Estás seguro de que deseas eliminar la siguiente categoría?
            </p>

            <div className={styles.confirmBox}>
              <div className={styles.confirmRow}>
                <strong>Categoría:</strong> <span>{categoriaEliminar.categoria}</span>
              </div>
              <div className={styles.confirmRow}>
                <strong>ID:</strong> <span>{categoriaEliminar.id}</span>
              </div>
            </div>

            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={cancelarEliminarCategoria}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={styles.confirmAccept}
                onClick={confirmarEliminarCategoria}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}