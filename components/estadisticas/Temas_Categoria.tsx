"use client";

import { useState } from "react";

import type { TemaPorCategoria } from "./types_estadisticas";

import VentanaCategoria from "@/components/estadisticas/moderacion/Ventana_categoria";
import Form_categoria from "@/components/admin_materia/Form_categoria";

import styles from "./Temas_Categoria.module.css";

type TemasPorCategoriaListProps = {
  categorias: TemaPorCategoria[];
};

export default function TemasPorCategoriaList({ categorias }: TemasPorCategoriaListProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<TemaPorCategoria | null>(null);

  const [mostrarCrearCategoria, setMostrarCrearCategoria] = useState(false);

  const abrirVentanaCategoria = (categoria: TemaPorCategoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const cerrarVentanaCategoria = () => {
    setCategoriaSeleccionada(null);
  };

  const abrirCrearCategoria = () => setMostrarCrearCategoria(true);
  const cerrarCrearCategoria = () => setMostrarCrearCategoria(false);

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
          {categorias.map((categoria) => (
            <li key={categoria.id} className={styles.item}>
              <span className={styles.categoryName}>{categoria.categoria}</span>

              <div className={styles.actions}>
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

      {/* Ventana emergente "configurar" */}
      {categoriaSeleccionada && (
        <VentanaCategoria categoria={categoriaSeleccionada} onCerrar={cerrarVentanaCategoria} />
      )}

      {/* Modal para CREAR CATEGORÍA con Form_categoria */}
      {mostrarCrearCategoria && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={cerrarCrearCategoria}>
              ×
            </button>

            <Form_categoria
              mode="create"
              onCreate={(data) => {
                console.log("Crear categoría:", data);
                cerrarCrearCategoria();
              }}
              onUpdate={() => {}}
              onCancelEdit={cerrarCrearCategoria}
            />

            {/* opcional: botón abajo si quieres */}
            {/* <div className={styles.modalFooter}>
              <button className={styles.closeModalBtn} onClick={cerrarCrearCategoria}>Cerrar</button>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
}