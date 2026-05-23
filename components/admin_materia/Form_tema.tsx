'use client';

import { useEffect, useMemo, useState } from "react";
import type { Categoria } from "./Categoria_admin";
import type { Tema } from "./Tema_admin";

import styles from "./Form_tema.module.css";
import formShared from "./Form_categoria.module.css"; // reutilizamos clases comunes

type FormValue = Omit<Tema, "id">;

type Props = {
  categorias: Categoria[];
  categoriaId: string;
  onChangeCategoriaId: (id: string) => void;
  onCreate: (data: FormValue) => void;
};

export default function Form_tema({
  categorias,
  categoriaId,
  onChangeCategoriaId,
  onCreate,
}: Props) {
  const canCreate = categorias.length > 0 && !!categoriaId;

  const categoriaSeleccionada = useMemo(
    () => categorias.find((c) => c.id === categoriaId),
    [categorias, categoriaId]
  );

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  useEffect(() => {
    setTitulo("");
    setDescripcion("");
    setImagenUrl("");
  }, [categoriaId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canCreate) return;
    if (!titulo.trim() || !descripcion.trim()) return;

    onCreate({
      categoriaId,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      imagenUrl: imagenUrl.trim() || undefined,
    });

    setTitulo("");
    setDescripcion("");
    setImagenUrl("");
  }

  return (
    <form className={styles.formTema} onSubmit={handleSubmit}>
      <div className={formShared.formRow}>
        <label className={formShared.formLabel}>Categoría</label>
        <select
          className={styles.formSelect}
          value={categoriaId}
          onChange={(e) => onChangeCategoriaId(e.target.value)}
        >
          {categorias.length === 0 ? (
            <option value="">Primero crea una categoría</option>
          ) : (
            <>
              {/* OJO: si quieres que el usuario pueda “des-seleccionar”, agrega una opción vacía */}
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </>
          )}
        </select>

        {categoriaSeleccionada && (
          <p className={styles.formHintSmall}>
            Temas para: <strong>{categoriaSeleccionada.nombre}</strong>
          </p>
        )}
      </div>

      <div className={formShared.formRow}>
        <label className={formShared.formLabel}>Título del tema</label>
        <input
          className={formShared.formInput}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Trabajo Práctico 1"
          disabled={!canCreate}
        />
      </div>

      <div className={formShared.formRow}>
        <label className={formShared.formLabel}>Descripción</label>
        <textarea
          className={formShared.formInput}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción breve"
          rows={2}
          disabled={!canCreate}
        />
      </div>

      <div className={formShared.formRow}>
        <label className={formShared.formLabel}>Imagen (URL) (opcional)</label>
        <input
          className={formShared.formInput}
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="https://..."
          disabled={!canCreate}
        />
      </div>

      <div className={formShared.formActions}>
        <button className={formShared.btnPrimary} type="submit" disabled={!canCreate}>
          Crear tema
        </button>
      </div>

      {!canCreate && (
        <p className={formShared.formHint}>* Debes tener al menos una categoría.</p>
      )}
    </form>
  );
}