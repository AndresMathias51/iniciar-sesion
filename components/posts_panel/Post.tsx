"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Post.module.css";

import type { Publicacion } from "@/components/busqueda/types";

type Props = {
  post: Publicacion;
  usuarioActual: any;
  onEliminar: (id: number) => void;
  onEditar: (post: Publicacion) => void;
};

type EliminarPublicacionRespuesta = {
  eliminado: boolean;
  mensaje: string;
  publicacion?: {
    id: number;
    autor: string;
    id_autor: number;
    titulo: string;
    id_tema: number | null;
  };
  eliminadoPor?: {
    id: number;
    nombre: string;
    rol: string;
    nivel: number;
  };
};

const API_PUBLICACIONES = "/api/publicaciones";

const Post = ({
  post,
  usuarioActual,
  onEliminar,
  onEditar,
}: Props) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  const esAutor = usuarioActual?.id === post.id_autor;
  const esDocente = usuarioActual?.nivel === 1;

  const puedeEditar = esAutor;
  const puedeEliminar = esAutor || esDocente;

  function abrirConfirmacionEliminar() {
    setErrorEliminar(null);
    setMostrarConfirmacion(true);
  }

  function cerrarConfirmacionEliminar() {
    if (eliminando) return;

    setErrorEliminar(null);
    setMostrarConfirmacion(false);
  }

  async function confirmarEliminarPublicacion() {
    if (!puedeEliminar) return;

    try {
      setEliminando(true);
      setErrorEliminar(null);

      const res = await fetch(
        `${API_PUBLICACIONES}?idPublicacion=${post.id}&idUsuario=${usuarioActual.id}`,
        {
          method: "DELETE",
        }
      );

      const data = (await res.json()) as
        | EliminarPublicacionRespuesta
        | { error: string };

      if (!res.ok) {
        throw new Error(
          "error" in data
            ? data.error
            : "No se pudo eliminar la publicación."
        );
      }

      onEliminar(post.id);
      setMostrarConfirmacion(false);
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
      setErrorEliminar("No se pudo eliminar la publicación.");
    } finally {
      setEliminando(false);
    }
  }

  return (
    <>
      <div className={styles.post_card}>
        <div className={styles.encabezado_post}>
          <div className={styles.encabezado_iz}>
            <Image
              src="/dashboard/perfil.svg"
              alt="perfil"
              width={20}
              height={20}
            />

            <h4>{post.autor}</h4>
          </div>

          <div className={styles.encabezado_der}>
            <span>{post.fecha}</span>
          </div>
        </div>

        {post.titulo && (
          <h2 className={styles.titulo_post}>
            {post.titulo}
          </h2>
        )}

        <div className={styles.contenido_post}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.contenido}
          </ReactMarkdown>
        </div>

        {errorEliminar && (
          <p className={styles.error_post}>
            {errorEliminar}
          </p>
        )}

        {puedeEliminar && (
          <div className={styles.botones_post}>
            {puedeEditar && (
              <button
                type="button"
                className={styles.btn_editar}
                onClick={() => onEditar(post)}
                disabled={eliminando}
              >
                Editar
              </button>
            )}

            <button
              type="button"
              className={styles.btn_eliminar}
              onClick={abrirConfirmacionEliminar}
              disabled={eliminando}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {mostrarConfirmacion && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmModal}>
            <h3 className={styles.confirmTitle}>
              Confirmar eliminación
            </h3>

            <p className={styles.confirmText}>
              ¿Estás seguro de que deseas eliminar esta publicación?
            </p>

            <div className={styles.confirmBox}>
              <div className={styles.confirmRow}>
                <strong>Título:</strong>
                <span>{post.titulo || "Sin título"}</span>
              </div>

              <div className={styles.confirmRow}>
                <strong>Autor:</strong>
                <span>{post.autor}</span>
              </div>
            </div>

            {errorEliminar && (
              <p className={styles.error_post}>
                {errorEliminar}
              </p>
            )}

            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={cerrarConfirmacionEliminar}
                disabled={eliminando}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirmAccept}
                onClick={confirmarEliminarPublicacion}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;