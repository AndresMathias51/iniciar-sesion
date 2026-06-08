"use client";

import { useEffect, useState } from "react";

import Bloque_barra_lateral from "./Bloque_barra_lateral";
import "./Barra_lateral.css";

type Publicacion = {
  id:number;
  titulo:string;
  contenido:string;
  fecha:string;
};

export default function Barra_lateral() {

  const [posts,setPosts] =
    useState<Publicacion[]>([]);

  useEffect(() => {

    async function obtenerPosts() {

      try {

        const response =
          await fetch("/api/posts");

        const data =
          await response.json();

        const recientes =
          data.slice(0,5);

        setPosts(recientes);

      } catch(error) {

        console.log(error);

      }

    }

    obtenerPosts();

  }, []);

  return (
    <div className="barra_lateral">

      {
        posts.map((post) => (

          <Bloque_barra_lateral
            key={post.id}
            titulo={post.titulo}
            contenido={
              post.contenido.length > 100
                ? post.contenido.substring(0,100) + "..."
                : post.contenido
            }
          />

        ))
      }

    </div>
  );

}