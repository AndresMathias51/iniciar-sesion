'use client';

import { useEffect, useMemo, useState } from "react";
import type { Categoria } from "./Categoria_admin";
import type { Tema } from "./Tema_admin";

import styles from "./Form_tema.module.css";
import formShared from "./Form_categoria.module.css";

type FormValue = Omit<Tema, "id">;

type Props = {
  categorias: Categoria[];
  categoriaId: string; // categoria activa
  onCreate: (data: FormValue) => void;
};

export default function Form_tema({ categorias, categoriaId, onCreate }: Props) {
  const hasCategorias = categorias.length > 0;
  const hasCategoriaActiva = !!categoriaId;
  const canCreate = hasCategorias && hasCategoriaActiva;

  const categoriaNombre = useMemo(() => {
    if (!categoriaId) return "";
    return categorias.find((c) => c.id === categoriaId)?.nombre ?? "";
  }, [categorias, categoriaId]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Ya NO limpiamos al cambiar categoriaId porque te puede borrar lo que estabas escribiendo.
  // Si quieres limpiar igual, dímelo y lo reactivamos.
  useEffect(() => {
    // no-op
  }, [categoriaId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canCreate) return;
    if (!titulo.trim() || !descripcion.trim()) return;

    onCreate({
      categoriaId,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      imagenUrl: undefined,
    });

    setTitulo("");
    setDescripcion("");
  }

  return (
    <form className={styles.formTema} onSubmit={handleSubmit}>
      <h2 className={styles.sectionTitle}>Agregar tema</h2>

      {!canCreate && (
        <div className={styles.notice}>
          {!hasCategorias
            ? "Primero crea una categoría para poder crear temas."
            : "Selecciona una categoría para poder crear temas."}
        </div>
      )}

      {canCreate && categoriaNombre && (
        <p className={styles.activeCategoria}>
          Creando tema en: <strong>{categoriaNombre}</strong>
        </p>
      )}

      <div className={formShared.formRow}>
        <label className={formShared.formLabel}>Título del tema</label>
        <input
          className={formShared.formInput}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Trabajo Práctico 1"
          /* IMPORTANTE: ya no lo deshabilitamos para que puedas escribir */
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
          /* IMPORTANTE: ya no lo deshabilitamos para que puedas escribir */
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