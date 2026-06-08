"use client";

import { useEffect, useState } from "react";

import styles from "./Win_posts_panel.module.css";

import Post from "./Post";
import Descripcion from "@/components/main_dashboard/Descripcion";
import ModalEliminar from "./ModalEliminar";

import type { Publicacion } from "@/components/busqueda/types";

type Props = {
  descripcion:string;

  temaSeleccionado:number;

  volverCategorias:() => void;

  usuarioActual:any;

  onCrearPost:() => void;

  onEditarPost:(post:Publicacion)=>void;
};

export default function Win_posts_panel({
  descripcion,
  temaSeleccionado,
  volverCategorias,
  usuarioActual,
  onCrearPost,
  onEditarPost
}: Props) {
  const [posts, setPosts] = useState<Publicacion[]>([]);
  const [ascendente, setAscendente] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEliminar, setIdEliminar] = useState<number | null>(null);

  const abrirModalEliminar = (id: number) => {
    setMostrarModal(true);
    setIdEliminar(id);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setIdEliminar(null);
  };

  const confirmarEliminar = async () => {

  if(idEliminar === null) return;

  try{

    // =========================
    // BUSCAR POST
    // =========================

    const postEliminar =
      posts.find(
        (post)=>post.id === idEliminar
      );

    if(!postEliminar) return;

    // =========================
    // BACKEND
    // =========================

    const response = await fetch(
      "/api/posts/delete",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          id:idEliminar

        })
      }
    );

    const data =
      await response.json();

    if(!response.ok){

      alert(data.message);

      return;

    }

    // =========================
    // ELIMINAR VISUALMENTE
    // =========================

    const nuevosPosts =
      posts.filter(
        (post)=>post.id !== idEliminar
      );

    setPosts(nuevosPosts);

    cerrarModal();

  }catch(error){

    console.log(error);

    alert("Error al eliminar");

  }

};

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        setCargando(true);
        setError(null);

        const response = await fetch("/api/posts", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar las publicaciones");
        }

        const data: Publicacion[] = await response.json();

        setPosts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error desconocido al cargar publicaciones"
        );
      } finally {
        setCargando(false);
      }
    };

    obtenerPosts();
  }, []);

  const ordenarPorFecha = () => {

  const postsOrdenados = [...posts].sort((a,b) => {

    const fechaA =
      new Date(a.fecha).getTime();

    const fechaB =
      new Date(b.fecha).getTime();

    return ascendente
      ? fechaA - fechaB
      : fechaB - fechaA;

  });

  setPosts(postsOrdenados);

  setAscendente(!ascendente);

};

  const postsFiltrados = posts.filter(
    (post) => post.id_tema === temaSeleccionado
  );

  return (
    <div>
      <div className={styles.contenido_central}>
        <div className={styles.contenido_posts}>
          <Descripcion descripcion={descripcion} />

          <div className={styles.bloque_botones}>
            <button
              className={styles.btn_ordenar}
              onClick={volverCategorias}
            >
              ← Volver
            </button>
            {
              usuarioActual && (

                <button
                  className={styles.btn_ordenar}
                  onClick={onCrearPost}
                >
                  + Subir Post
                </button>

              )
            }
            <button
              className={styles.btn_ordenar}
              onClick={ordenarPorFecha}
            >
              Ordenar por fecha {ascendente ? "↑" : "↓"}
            </button>
          </div>

          {cargando && (
            <p className={styles.mensaje_estado}>
              Cargando publicaciones...
            </p>
          )}

          {error && (
            <p className={styles.mensaje_estado}>
              {error}
            </p>
          )}

          {!cargando && !error && postsFiltrados.length === 0 && (
            <p className={styles.mensaje_estado}>
              No hay publicaciones registradas para este tema.
            </p>
          )}

          {!cargando &&
            !error &&
            postsFiltrados.map((post) => (
              <Post
                key={post.id}
                post={post}
                usuarioActual={usuarioActual}
                onEliminar={abrirModalEliminar}
                onEditar={onEditarPost}
              />
            ))}
        </div>
      </div>

      <ModalEliminar
        visible={mostrarModal}
        onClose={cerrarModal}
        onConfirmar={confirmarEliminar}
      />
    </div>
  );
}