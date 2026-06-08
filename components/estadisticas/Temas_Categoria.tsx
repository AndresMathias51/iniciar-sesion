"use client";

import { useEffect, useState } from "react";

import type { TemaPorCategoria } from "./types_estadisticas";
import type { Categoria } from "@/components/admin_materia/Categoria_admin";

import VentanaCategoria from "@/components/estadisticas/moderacion/Ventana_categoria";
import Form_categoria from "@/components/admin_materia/Form_categoria";

import styles from "./Temas_Categoria.module.css";

type TemasPorCategoriaListProps = {
  categorias: TemaPorCategoria[];
};

type CategoriaVista = TemaPorCategoria & {
  descripcion?: string;
  imagenUrl?: string;
  idMateria?: number;
};

type CategoriaFormData = {
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  idMateria: string;
};

type CategoriaApi = {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  idMateria: number;
  cantidadTemas: number;
};

type BorrarCategoriaRespuesta = {
  eliminado: boolean;
  mensaje: string;
  categoria?: CategoriaApi;
};

const API_CATEGORIAS = "/api/categorias";

/*
  Valor temporal solo para probar.
  Luego debe venir desde la materia seleccionada.
*/
const ID_MATERIA_PRUEBA = 1;

export default function TemasPorCategoriaList({
  categorias,
}: TemasPorCategoriaListProps) {
  const [categoriasVista, setCategoriasVista] = useState<CategoriaVista[]>(
    categorias
  );

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<TemaPorCategoria | null>(null);

  const [mostrarCrearCategoria, setMostrarCrearCategoria] = useState(false);

  const [categoriaEditar, setCategoriaEditar] =
    useState<CategoriaVista | null>(null);

  const [categoriaEliminar, setCategoriaEliminar] =
    useState<CategoriaVista | null>(null);

  const [eliminandoCategoria, setEliminandoCategoria] = useState(false);

  const [errorCategoria, setErrorCategoria] = useState<string | null>(null);

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
    setErrorCategoria(null);
    setMostrarCrearCategoria(true);
  };

  const cerrarCrearCategoria = () => {
    setErrorCategoria(null);
    setMostrarCrearCategoria(false);
  };

  const abrirEditarCategoria = (categoria: CategoriaVista) => {
    setErrorCategoria(null);
    setCategoriaEditar(categoria);
  };

  const cerrarEditarCategoria = () => {
    setErrorCategoria(null);
    setCategoriaEditar(null);
  };

  const pedirEliminarCategoria = (categoria: CategoriaVista) => {
    setErrorCategoria(null);
    setCategoriaEliminar(categoria);
  };

  const cancelarEliminarCategoria = () => {
    if (eliminandoCategoria) return;

    setErrorCategoria(null);
    setCategoriaEliminar(null);
  };

  async function crearCategoriaEnBD(data: CategoriaFormData) {
    try {
      setErrorCategoria(null);

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

      const respuesta = await res.json();

      if (!res.ok) {
        throw new Error(
          respuesta.error ?? "No se pudo crear la categoría."
        );
      }

      const nuevaCategoria = respuesta as CategoriaApi;

      const nuevaCategoriaVista: CategoriaVista = {
        id: nuevaCategoria.id,
        categoria: nuevaCategoria.nombre,
        cantidadTemas: nuevaCategoria.cantidadTemas ?? 0,
        descripcion: nuevaCategoria.descripcion,
        imagenUrl: nuevaCategoria.imagenUrl,
        idMateria: nuevaCategoria.idMateria,
      };

      setCategoriasVista((prevCategorias) => [
        ...prevCategorias,
        nuevaCategoriaVista,
      ]);

      cerrarCrearCategoria();
    } catch (error) {
      console.error("Error al crear categoría:", error);
      setErrorCategoria("No se pudo crear la categoría.");
      throw error;
    }
  }

  async function editarCategoriaEnBD(data: CategoriaFormData) {
    if (!categoriaEditar) return;

    try {
      setErrorCategoria(null);

      const res = await fetch(`${API_CATEGORIAS}?id=${categoriaEditar.id}`, {
        method: "PATCH",
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

      const respuesta = await res.json();

      if (!res.ok) {
        throw new Error(
          respuesta.error ?? "No se pudo editar la categoría."
        );
      }

      const categoriaActualizada = respuesta as CategoriaApi;

      setCategoriasVista((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === categoriaEditar.id
            ? {
                ...categoria,
                categoria: categoriaActualizada.nombre,
                cantidadTemas: categoriaActualizada.cantidadTemas,
                descripcion: categoriaActualizada.descripcion,
                imagenUrl: categoriaActualizada.imagenUrl,
                idMateria: categoriaActualizada.idMateria,
              }
            : categoria
        )
      );

      if (categoriaSeleccionada?.id === categoriaEditar.id) {
        setCategoriaSeleccionada({
          ...categoriaSeleccionada,
          categoria: categoriaActualizada.nombre,
          cantidadTemas: categoriaActualizada.cantidadTemas,
        });
      }

      cerrarEditarCategoria();
    } catch (error) {
      console.error("Error al editar categoría:", error);
      setErrorCategoria("No se pudo editar la categoría.");
      throw error;
    }
  }

  async function confirmarEliminarCategoria() {
    if (!categoriaEliminar) return;

    try {
      setEliminandoCategoria(true);
      setErrorCategoria(null);

      const res = await fetch(`${API_CATEGORIAS}?id=${categoriaEliminar.id}`, {
        method: "DELETE",
      });

      const respuesta = (await res.json()) as
        | BorrarCategoriaRespuesta
        | { error: string };

      if (!res.ok) {
        throw new Error(
          "error" in respuesta
            ? respuesta.error
            : "No se pudo eliminar la categoría."
        );
      }

      setCategoriasVista((prevCategorias) =>
        prevCategorias.filter(
          (categoria) => categoria.id !== categoriaEliminar.id
        )
      );

      if (categoriaSeleccionada?.id === categoriaEliminar.id) {
        setCategoriaSeleccionada(null);
      }

      if (categoriaEditar?.id === categoriaEliminar.id) {
        setCategoriaEditar(null);
      }

      setCategoriaEliminar(null);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      setErrorCategoria("No se pudo eliminar la categoría.");
    } finally {
      setEliminandoCategoria(false);
    }
  }

  function getCategoriaInitialValue(categoria: CategoriaVista): Categoria {
    return {
      id: String(categoria.id),
      nombre: categoria.categoria,
      descripcion: categoria.descripcion ?? "",
      imagenUrl: categoria.imagenUrl ?? "/ico_pc.svg",
    } as Categoria;
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
              <div className={styles.itemLeft}>
                <span className={styles.categoryName}>
                  {categoria.categoria}
                </span>
              </div>

              <div className={styles.actions}>
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

            {errorCategoria && (
              <p className={styles.errorMessage}>{errorCategoria}</p>
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

      {categoriaEditar && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={cerrarEditarCategoria}
            >
              ×
            </button>

            {errorCategoria && (
              <p className={styles.errorMessage}>{errorCategoria}</p>
            )}

            <Form_categoria
              mode="edit"
              idMateria={String(
                categoriaEditar.idMateria ?? ID_MATERIA_PRUEBA
              )}
              initialValue={getCategoriaInitialValue(categoriaEditar)}
              onCreate={async () => {}}
              onUpdate={editarCategoriaEnBD}
              onCancelEdit={cerrarEditarCategoria}
            />
          </div>
        </div>
      )}

      {categoriaEliminar && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmModal}>
            <h3 className={styles.confirmTitle}>Confirmar eliminación</h3>

            <p className={styles.confirmText}>
              ¿Estás seguro de que deseas eliminar la siguiente categoría?
            </p>

            <div className={styles.confirmBox}>
              <div className={styles.confirmRow}>
                <strong>Categoría:</strong>{" "}
                <span>{categoriaEliminar.categoria}</span>
              </div>

              <div className={styles.confirmRow}>
                <strong>ID:</strong> <span>{categoriaEliminar.id}</span>
              </div>
            </div>

            {errorCategoria && (
              <p className={styles.errorMessage}>{errorCategoria}</p>
            )}

            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={cancelarEliminarCategoria}
                disabled={eliminandoCategoria}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirmAccept}
                onClick={confirmarEliminarCategoria}
                disabled={eliminandoCategoria}
              >
                {eliminandoCategoria ? "Eliminando..." : "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}