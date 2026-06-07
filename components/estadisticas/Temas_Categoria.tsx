"use client";

import { useEffect, useState } from "react";

import type { TemaPorCategoria } from "./types_estadisticas";

import VentanaCategoria from "@/components/estadisticas/moderacion/Ventana_categoria";
import Form_categoria from "@/components/admin_materia/Form_categoria";

import styles from "./Temas_Categoria.module.css";

type TemasPorCategoriaListProps = {
  categorias: TemaPorCategoria[];
};

type CrearCategoriaData = {
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  idMateria: string;
};

type CategoriaCreadaApi = {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  idMateria: number;
};

const API_CATEGORIAS = "/api/categorias";

/*
  Valor temporal solo para probar.
  Luego este valor debería venir desde la materia seleccionada.
*/
const ID_MATERIA_PRUEBA = 1;

export default function TemasPorCategoriaList({
  categorias,
}: TemasPorCategoriaListProps) {
  const [categoriasVista, setCategoriasVista] =
    useState<TemaPorCategoria[]>(categorias);

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<TemaPorCategoria | null>(null);

  const [mostrarCrearCategoria, setMostrarCrearCategoria] = useState(false);
  const [errorCrearCategoria, setErrorCrearCategoria] = useState<string | null>(
    null
  );

  useEffect(() => {
    setCategoriasVista(categorias);
  }, [categorias]);

  const abrirVentanaCategoria = (categoria: TemaPorCategoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const cerrarVentanaCategoria = () => {
    setCategoriaSeleccionada(null);
  };

  const abrirCrearCategoria = () => {
    setErrorCrearCategoria(null);
    setMostrarCrearCategoria(true);
  };

  const cerrarCrearCategoria = () => {
    setErrorCrearCategoria(null);
    setMostrarCrearCategoria(false);
  };

  async function crearCategoriaEnBD(data: CrearCategoriaData) {
    try {
      setErrorCrearCategoria(null);

      const res = await fetch(API_CATEGORIAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.nombre,
          descripcion: data.descripcion,
          imagenUrl: data.imagenUrl,
          idMateria: data.idMateria,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error ?? "No se pudo crear la categoría.");
      }

      const nuevaCategoria = (await res.json()) as CategoriaCreadaApi;

      const nuevaCategoriaVista: TemaPorCategoria = {
        id: nuevaCategoria.id,
        categoria: nuevaCategoria.nombre,
        cantidadTemas: 0,
      };

      setCategoriasVista((prevCategorias) => [
        ...prevCategorias,
        nuevaCategoriaVista,
      ]);

      cerrarCrearCategoria();
    } catch (error) {
      console.error("Error al crear categoría:", error);
      setErrorCrearCategoria("No se pudo crear la categoría.");
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Temas por categoría</h2>

          <button
            type="button"
            className={styles.addButton}
            onClick={abrirCrearCategoria}
          >
            +
          </button>
        </div>

        <p className={styles.description}>
          Cantidad de temas creados en cada categoría
        </p>
      </div>

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {categoriasVista.map((categoria) => (
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

      {/* Ventana emergente "configurar" */}
      {categoriaSeleccionada && (
        <VentanaCategoria
          categoria={categoriaSeleccionada}
          onCerrar={cerrarVentanaCategoria}
        />
      )}

      {/* Modal para CREAR CATEGORÍA con Form_categoria */}
      {mostrarCrearCategoria && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={cerrarCrearCategoria}
            >
              ×
            </button>

            {errorCrearCategoria && (
              <p className={styles.errorMessage}>{errorCrearCategoria}</p>
            )}

            <Form_categoria
              mode="create"
              idMateria={String(ID_MATERIA_PRUEBA)}
              onCreate={crearCategoriaEnBD}
              onUpdate={async () => {}}
              onCancelEdit={cerrarCrearCategoria}
            />
          </div>
        </div>
      )}
    </section>
  );
}