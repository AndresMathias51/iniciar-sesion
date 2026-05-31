"use client";

import { useEffect, useState } from "react";
import type { Publicacion } from "./types";

export function usePublicacionesBusqueda() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarPublicaciones() {
      try {
        setCargando(true);

        const respuesta = await fetch("/api/posts", {
          cache: "no-store"
        });

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las publicaciones");
        }

        const data: Publicacion[] = await respuesta.json();

        setPublicaciones(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error desconocido al cargar publicaciones"
        );
      } finally {
        setCargando(false);
      }
    }

    cargarPublicaciones();
  }, []);

  return {
    publicaciones,
    setPublicaciones,
    cargando,
    error
  };
}