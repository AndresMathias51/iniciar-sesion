"use client";

import { useMemo, useState } from "react";
import type { Categoria } from "./Categoria_admin";
import type { Tema } from "./Tema_admin";

import styles from "./Form_tema.module.css";
import formShared from "./Form_categoria.module.css";

type FormValue = Omit<Tema, "id">;

type Props = {
  categorias: Categoria[];
  categoriaId: string;
  onCreate: (data: FormValue) => void | Promise<void>;
};

export default function Form_tema({ categorias, categoriaId, onCreate }: Props) {
  const hasCategorias = categorias.length > 0;
  const hasCategoriaActiva = !!categoriaId;
  const canCreate = hasCategorias && hasCategoriaActiva;

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoriaNombre = useMemo(() => {
    if (!categoriaId) return "";
    return categorias.find((c) => c.id === categoriaId)?.nombre ?? "";
  }, [categorias, categoriaId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canCreate) return;

    const tituloLimpio = titulo.trim();
    const descripcionLimpia = descripcion.trim();

    if (!tituloLimpio || !descripcionLimpia) {
      setError("Debes llenar el título y la descripción.");
      return;
    }

    try {
      setEnviando(true);
      setError(null);

      await onCreate({
        categoriaId,
        titulo: tituloLimpio,
        descripcion: descripcionLimpia,
        imagenUrl: "/ico_pc.svg",
      });

      setTitulo("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al crear tema:", error);
      setError("No se pudo crear el tema.");
    } finally {
      setEnviando(false);
    }
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
          disabled={enviando}
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
          disabled={enviando}
        />
      </div>

      {error && <p className={formShared.formHint}>{error}</p>}

      <div className={formShared.formActions}>
        <button
          className={formShared.btnPrimary}
          type="submit"
          disabled={!canCreate || enviando}
        >
          {enviando ? "Creando..." : "Crear tema"}
        </button>
      </div>

      {!canCreate && (
        <p className={formShared.formHint}>
          * Debes tener al menos una categoría.
        </p>
      )}
    </form>
  );
}