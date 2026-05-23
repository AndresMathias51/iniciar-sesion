'use client';

import { useEffect, useState } from "react";
import type { Categoria } from "./Categoria_admin";
import styles from "./Form_categoria.module.css";

type FormValue = {
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
};

type Props = {
  mode: "create" | "edit";
  initialValue?: Categoria;
  onCreate: (data: FormValue) => void;
  onUpdate: (data: FormValue) => void;
  onCancelEdit: () => void;
};

export default function Form_categoria({
  mode,
  initialValue,
  onCreate,
  onUpdate,
  onCancelEdit,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialValue) {
      setNombre(initialValue.nombre);
      setDescripcion(initialValue.descripcion);
      setImagenUrl(initialValue.imagenUrl ?? "");
    } else {
      setNombre("");
      setDescripcion("");
      setImagenUrl("");
    }
  }, [mode, initialValue]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) return;

    const payload: FormValue = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      imagenUrl: imagenUrl.trim() || undefined,
    };

    if (mode === "edit") {
    onUpdate(payload);
    } else {
      onCreate(payload);

    // limpiar campos al crear
      setNombre("");
      setDescripcion("");
      setImagenUrl("");
    }
  }

  return (
    <div>
      <h2>Agregar Categorías</h2>
      <form className={styles.formCategoria} onSubmit={handleSubmit}>
        
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Nombre</label>
          <input
            className={styles.formInput}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Unidad 1"
          />
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Descripción</label>
          <textarea
            className={styles.formInput}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción breve"
            rows={2}
          />
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Imagen (URL) (opcional)</label>
          <input
            className={styles.formInput}
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className={styles.formActions}>
          {mode === "edit" ? (
            <>
              <button className={styles.btnPrimary} type="submit">
                Guardar cambios
              </button>
              <button className={styles.btnSecondary} type="button" onClick={onCancelEdit}>
                Cancelar
              </button>
            </>
          ) : (
            <button className={styles.btnPrimary} type="submit">
              Crear categoría
            </button>
          )}
        </div>

        <p className={styles.formHint}>* Campos obligatorios: nombre y descripción.</p>
      </form>
    </div>
  );
}