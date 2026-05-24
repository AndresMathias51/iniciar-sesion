"use client";

import { useMemo, useState } from "react";

import Categoria from "@/components/main_dashboard/Categoria";

import styles from "./FrameResultados.module.css";

import type {
  Categoria as CategoriaType,
  Publicacion
} from "./types";

type FrameResultadosProps = {
  busqueda: string;
  publicaciones?: Publicacion[];
  categorias?: CategoriaType[];
  mostrarTabs?: boolean;
  tabInicial?: "publicaciones" | "temasCategorias";

  onSeleccionarTema: (id: number) => void;
};

type TabActiva = "publicaciones" | "temasCategorias";

export default function FrameResultados({
  busqueda,
  publicaciones = [],
  categorias = [],
  mostrarTabs = true,
  tabInicial = "publicaciones",
  onSeleccionarTema
}: FrameResultadosProps) {
  const [tabActiva, setTabActiva] = useState<TabActiva>(tabInicial);

  const texto = busqueda.trim().toLowerCase();

  const publicacionesFiltradas = useMemo(() => {
    if (!texto) return publicaciones;

    return publicaciones.filter(
      (publicacion) =>
        publicacion.titulo.toLowerCase().includes(texto) ||
        publicacion.autor.toLowerCase().includes(texto)
    );
  }, [texto, publicaciones]);

  const categoriasFiltradas = useMemo(() => {
    if (!texto) return categorias;

    return categorias
      .map((categoria) => {
        const coincideCategoria =
          categoria.nombre.toLowerCase().includes(texto);

        const temasFiltrados = categoria.temas.filter(
          (tema) =>
            tema.nombre.toLowerCase().includes(texto) ||
            tema.descripcion.toLowerCase().includes(texto)
        );

        return {
          ...categoria,
          temas: coincideCategoria ? categoria.temas : temasFiltrados
        };
      })
      .filter((categoria) => categoria.temas.length > 0);
  }, [texto, categorias]);

  const totalTemasEncontrados = categoriasFiltradas.reduce(
    (total, categoria) => total + categoria.temas.length,
    0
  );

  return (
    <section className={styles.frameResultados}>
      <div className={styles.superior}>
        <div>
          <h2>Resultados</h2>
          <p>
            {busqueda
              ? `Búsqueda actual: "${busqueda}"`
              : "Mostrando resultados generales"}
          </p>
        </div>

        {mostrarTabs && (
          <div className={styles.tabs}>
            <button
              type="button"
              className={
                tabActiva === "publicaciones"
                  ? styles.tabActiva
                  : styles.tab
              }
              onClick={() => setTabActiva("publicaciones")}
            >
              Publicaciones
            </button>

            <button
              type="button"
              className={
                tabActiva === "temasCategorias"
                  ? styles.tabActiva
                  : styles.tab
              }
              onClick={() => setTabActiva("temasCategorias")}
            >
              Temas / Categorías
            </button>
          </div>
        )}
      </div>

      {tabActiva === "publicaciones" && (
        <div className={styles.contenido}>
          <div className={styles.resumen}>
            <strong>{publicacionesFiltradas.length}</strong>
            <span>publicaciones encontradas</span>
          </div>

          {publicacionesFiltradas.length > 0 ? (
            <div className={styles.listaPublicaciones}>
              {publicacionesFiltradas.map((publicacion) => (
                <article
                  key={publicacion.id}
                  className={styles.cardPublicacion}
                >
                  <div className={styles.metaPublicacion}>
                    <span>{publicacion.autor}</span>
                    <span>{publicacion.fecha}</span>
                  </div>

                  <h3>{publicacion.titulo}</h3>

                  <p>
                    {limitarTexto(
                      limpiarMarkdown(publicacion.contenido),
                      190
                    )}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.sinResultados}>
              No se encontraron publicaciones para esta búsqueda.
            </p>
          )}
        </div>
      )}

      {tabActiva === "temasCategorias" && (
        <div className={styles.contenido}>
          <div className={styles.resumen}>
            <strong>{totalTemasEncontrados}</strong>
            <span>temas encontrados</span>
          </div>

          {categoriasFiltradas.length > 0 ? (
            <div className={styles.listaCategoriasComponentes}>
              {categoriasFiltradas.map((categoria) => (
                <Categoria
                  key={categoria.id}
                  id={categoria.id}
                  nombre={categoria.nombre}
                  temas={categoria.temas}
                  onSeleccionarTema={onSeleccionarTema}
                />
              ))}
            </div>
          ) : (
            <p className={styles.sinResultados}>
              No se encontraron temas o categorías para esta búsqueda.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function limpiarMarkdown(texto: string) {
  return texto
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/[#>*_~`-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

function limitarTexto(texto: string, limite: number) {
  if (texto.length <= limite) return texto;
  return `${texto.slice(0, limite)}...`;
}