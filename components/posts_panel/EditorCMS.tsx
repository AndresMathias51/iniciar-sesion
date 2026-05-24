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

export default function EditorCMS() {

  const editorRef = useRef<any>(null);

  const [titulo, setTitulo] = useState("");

  const guardarArticulo = () => {

    const contenido =
      editorRef.current
        ?.getInstance()
        .getMarkdown();

    const articulo = {
      titulo,
      contenido,
    };

    console.log(
      JSON.stringify(
        articulo,
        null,
        2
      )
    );

    alert("JSON generado");
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
              initialValue=""
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
            💾 Guardar Artículo
          </button>

        </div>

      </div>

    </div>
  );
}