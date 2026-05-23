"use client";

import { useState } from "react";

import type { TemaPorCategoria } from "./types_estadisticas";
import VentanaCategoria from "@/components/estadisticas/moderacion/Ventana_categoria";
import styles from "./Temas_Categoria.module.css";

type TemasPorCategoriaListProps = {
  categorias: TemaPorCategoria[];
};

export default function TemasPorCategoriaList({
  categorias,
}: TemasPorCategoriaListProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<TemaPorCategoria | null>(null);

  const abrirVentanaCategoria = (categoria: TemaPorCategoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const cerrarVentanaCategoria = () => {
    setCategoriaSeleccionada(null);
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Temas por categoría</h2>
        <p className={styles.description}>
          Cantidad de temas creados en cada categoría
        </p>
      </div>

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {categorias.map((categoria) => (
            <li key={categoria.id} className={styles.item}>
              <span className={styles.categoryName}>
                {categoria.categoria}
              </span>

              <div className={styles.actions}>
                <span className={styles.badge}>
                  {categoria.cantidadTemas} temas
                </span>

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

      {categoriaSeleccionada && (
        <VentanaCategoria
          categoria={categoriaSeleccionada}
          onCerrar={cerrarVentanaCategoria}
        />
      )}
    </section>
  );
}