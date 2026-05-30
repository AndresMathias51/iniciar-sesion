"use client";

import { useMemo, useState } from "react";

import BarraBusqueda from "./BarraBusqueda";
import FrameResultados from "./FrameResultados";
import styles from "./BusquedaModulo.module.css";

import categoriasTemasData from "@/app/dashboard/dashboardData.json";

import { generarSugerenciasBusqueda } from "./busqueda.helpers";
import { usePublicacionesBusqueda } from "./usePublicacionesBusqueda";

import type {
  Categoria,
  Publicacion
} from "./types";

export default function BusquedaModulo() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [busquedaConfirmada, setBusquedaConfirmada] = useState("");

  const categorias = categoriasTemasData.categorias as Categoria[];

  const {
    publicaciones,
    setPublicaciones,
    cargando,
    error
  } = usePublicacionesBusqueda();

  const sugerencias = useMemo(() => {
    return generarSugerenciasBusqueda({
      textoBusqueda,
      publicaciones,
      categorias,
      limite: 8
    });
  }, [textoBusqueda, publicaciones, categorias]);

  function confirmarBusqueda(valor: string) {
    const busquedaFinal = valor.trim();

    if (!busquedaFinal) return;

    setBusquedaConfirmada(busquedaFinal);
    setTextoBusqueda(busquedaFinal);
  }

  function eliminarPost(id: number) {
    setPublicaciones((postsActuales) =>
      postsActuales.filter((post) => post.id !== id)
    );
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
        cargandoPublicaciones={cargando}
        errorPublicaciones={error}
        onEliminarPost={eliminarPost}
        onSeleccionarTema={() => {}}
      />
    </section>
  );
}