"use client";

import { useMemo, useState } from "react";
import BarraBusqueda from "./BarraBusqueda";
import FrameResultados from "./FrameResultados";
import styles from "./BusquedaModulo.module.css";

import categoriasTemasData from "@/app/dashboard/dashboardData.json";
import publicacionesData from "@/components/busqueda/ejemplo.json";

export type Publicacion = {
  id: number;
  autor: string;
  fecha: string;
  titulo: string;
  contenido: string;
};

export type Tema = {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
};

export type Categoria = {
  id: number;
  nombre: string;
  temas: Tema[];
};

export type TemaConCategoria = Tema & {
  categoriaId: number;
  categoriaNombre: string;
};

export default function BusquedaModulo() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [busquedaConfirmada, setBusquedaConfirmada] = useState("");

  const publicaciones = publicacionesData as Publicacion[];
  const categorias = categoriasTemasData.categorias as Categoria[];

  const temasConCategoria: TemaConCategoria[] = useMemo(() => {
    return categorias.flatMap((categoria) =>
      categoria.temas.map((tema) => ({
        ...tema,
        categoriaId: categoria.id,
        categoriaNombre: categoria.nombre
      }))
    );
  }, [categorias]);

  const sugerencias = useMemo(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (!texto) return [];

    const sugerenciasPublicaciones = publicaciones
      .filter(
        (publicacion) =>
          publicacion.titulo.toLowerCase().includes(texto) ||
          publicacion.autor.toLowerCase().includes(texto)
      )
      .map((publicacion) => ({
        id: `publicacion-${publicacion.id}`,
        tipo: "Publicación",
        texto: publicacion.titulo,
        detalle: `Autor: ${publicacion.autor}`
      }));

    const sugerenciasTemas = temasConCategoria
      .filter(
        (tema) =>
          tema.nombre.toLowerCase().includes(texto) ||
          tema.descripcion.toLowerCase().includes(texto) ||
          tema.categoriaNombre.toLowerCase().includes(texto)
      )
      .map((tema) => ({
        id: `tema-${tema.id}`,
        tipo: "Tema",
        texto: tema.nombre,
        detalle: `Categoría: ${tema.categoriaNombre}`
      }));

    const sugerenciasCategorias = categorias
      .filter((categoria) => categoria.nombre.toLowerCase().includes(texto))
      .map((categoria) => ({
        id: `categoria-${categoria.id}`,
        tipo: "Categoría",
        texto: categoria.nombre,
        detalle: "Categoría de la materia"
      }));

    return [
      ...sugerenciasPublicaciones,
      ...sugerenciasTemas,
      ...sugerenciasCategorias
    ].slice(0, 8);
  }, [textoBusqueda, publicaciones, temasConCategoria, categorias]);

  function confirmarBusqueda(valor?: string) {
    const busquedaFinal = valor ?? textoBusqueda;
    setBusquedaConfirmada(busquedaFinal.trim());
    setTextoBusqueda(busquedaFinal.trim());
  }

  return (
    <section className={styles.moduloBusqueda}>
      <div className={styles.encabezado}>
        <p className={styles.etiqueta}>Módulo de búsqueda</p>
        <h1>Buscar contenido</h1>
        <p>
          Busca publicaciones por título o autor. También puedes buscar temas y
          categorías de la materia.
        </p>
      </div>

      <BarraBusqueda
        valor={textoBusqueda}
        sugerencias={sugerencias}
        onChange={setTextoBusqueda}
        onBuscar={confirmarBusqueda}
      />

      <FrameResultados
        busqueda={busquedaConfirmada}
        publicaciones={publicaciones}
        categorias={categorias}
      />
    </section>
  );
}