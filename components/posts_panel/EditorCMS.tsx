"use client";

import { useRef, useState } from "react";

import dynamic from "next/dynamic";

const Editor = dynamic(
  () =>
    import("@toast-ui/react-editor").then(
      (mod) => mod.Editor
    ),
  {
    ssr: false,
  }
);

import "@toast-ui/editor/dist/toastui-editor.css";

import "./EditorCMS.css";

type Props = {

  temaSeleccionado:number;

  usuario:any;

  postEditar:any;

  onCancelar:()=>void;

};
export default function EditorCMS({
  temaSeleccionado,
  usuario,
  postEditar,
  onCancelar
}:Props) {

  const editorRef = useRef<any>(null);

  const [titulo, setTitulo] =
  useState(postEditar?.titulo || "");
  
const guardarArticulo = async () => {

  const contenido =
    editorRef.current
      ?.getInstance()
      .getMarkdown();

  const body = {

    autor:usuario.nombre,

    correo:usuario.correo,

    titulo,

    id_tema:temaSeleccionado,

    contenido,

  };

  const endpoint =
    postEditar
      ? "/api/posts/update"
      : "/api/posts/create";

  const response = await fetch(
    endpoint,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        ...body,

        id:postEditar?.id

      })
    }
  );

  if(!response.ok){

    return;

  }

  onCancelar();

};

  return (

    <div className="cms-container">

      <div className="cms-wrapper">

        <h1 className="cms-title">
          Sistema de Gestión de Contenido
        </h1>

        <p className="cms-subtitle">
          Publica artículos, imágenes
        </p>

        <div className="cms-card">

          <h2 className="cms-card-title">
            Crear nuevo artículo
          </h2>

          <input
            type="text"
            placeholder="Título del artículo"
            value={titulo}
            onChange={(e) =>
              setTitulo(e.target.value)
            }
            className="cms-input"
          />

          <div className="cms-editor">

            <Editor
              ref={editorRef}
              initialValue={
  postEditar?.contenido || ""
}
              previewStyle="vertical"
              height="500px"
              initialEditType="wysiwyg"
              hideModeSwitch={true}
              useCommandShortcut={true}

              toolbarItems={[
                ["heading", "bold", "italic"],
                ["ul", "ol"],
                ["image", "link"],
              ]}

              hooks={{
                addImageBlobHook: async (
                  blob: Blob,
                  callback: (
                    url: string,
                    text?: string
                  ) => void
                ) => {

                  const formData = new FormData();

                  formData.append("file", blob);

                  const response = await fetch(
                    "/api/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  const data = await response.json();

                  callback(
                    data.url,
                    "imagen"
                  );
                },
              }}
            />

          </div>
            
                  <button
                    onClick={guardarArticulo}
                    className="cms-button"
                  >
                    Guardar Artículo
                  </button>
                  <button
          onClick={onCancelar}
          className="cms-button cancelar"
        >
          Cancelar
        </button> 

        </div>

      </div>

    </div>
  );
}