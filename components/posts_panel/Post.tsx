"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Post.module.css";

import type { Publicacion } from "@/components/busqueda/types";


type Props = {
  post: Publicacion;

  usuarioActual:any;

  onEliminar:(id:number)=>void;

  onEditar:(post:Publicacion)=>void;
};
const Post = ({ post, usuarioActual, onEliminar, onEditar }: Props) => {
  return (
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

      {usuarioActual?.correo === post.correo && (
        <div className={styles.botones_post}>
          <button
  className={styles.btn_editar}
  onClick={() => onEditar(post)}
>
  Editar
</button>

          <button
            className={styles.btn_eliminar}
            onClick={() => onEliminar(post.id)}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;