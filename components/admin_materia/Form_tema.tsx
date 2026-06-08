"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

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

const ICONS = [
  { value: "/ico_pc.svg" },
  { value: "/ico_conf.svg" },
  { value: "/ico_internet.svg" },
  { value: "/ico_bug.svg" },
];

export default function Form_tema({ categorias, categoriaId, onCreate }: Props) {
  const hasCategorias = categorias.length > 0;
  const hasCategoriaActiva = !!categoriaId;
  const canCreate = hasCategorias && hasCategoriaActiva;

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const [iconOpen, setIconOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iconWrapRef = useRef<HTMLDivElement | null>(null);

  const categoriaNombre = useMemo(() => {
    if (!categoriaId) return "";
    return categorias.find((c) => c.id === categoriaId)?.nombre ?? "";
  }, [categorias, categoriaId]);

  const selectedIcon = ICONS.find((i) => i.value === imagenUrl);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!iconOpen) return;

      const el = iconWrapRef.current;
      if (!el) return;

      if (e.target instanceof Node && !el.contains(e.target)) {
        setIconOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);

    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
    };
  }, [iconOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canCreate) return;

    const tituloLimpio = titulo.trim();
    const descripcionLimpia = descripcion.trim();
    const imagenSeleccionada = imagenUrl.trim() || "/ico_pc.svg";

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
        imagenUrl: imagenSeleccionada,
      });

      setTitulo("");
      setDescripcion("");
      setImagenUrl("");
      setIconOpen(false);
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

      <div className={formShared.formRow}>
        <label className={formShared.formLabel}>Icono</label>

        <div className={formShared.iconSelectWrap} ref={iconWrapRef}>
          <button
            type="button"
            className={`${formShared.iconSelectButton} ${
              iconOpen ? formShared.iconSelectOpen : ""
            }`}
            onClick={() => setIconOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={iconOpen}
            title="Seleccionar icono"
            disabled={!canCreate || enviando}
          >
            <span className={formShared.iconSelectValue}>
              {selectedIcon ? (
                <Image
                  src={selectedIcon.value}
                  alt="icono"
                  width={18}
                  height={18}
                />
              ) : (
                <span className={formShared.iconPlaceholder}>
                  Selecciona un icono
                </span>
              )}
            </span>

            <span className={formShared.iconChevron}>▾</span>
          </button>

          {iconOpen && (
            <div className={formShared.iconDropdown} role="listbox">
              {ICONS.map((ico) => {
                const selected = imagenUrl === ico.value;

                return (
                  <button
                    key={ico.value}
                    type="button"
                    className={`${formShared.iconDropdownItem} ${
                      selected ? formShared.iconDropdownItemSelected : ""
                    }`}
                    onClick={() => {
                      setImagenUrl(ico.value);
                      setIconOpen(false);
                    }}
                    title={ico.value.replace("/", "").replace(".svg", "")}
                    disabled={enviando}
                  >
                    <Image
                      src={ico.value}
                      alt="icono"
                      width={20}
                      height={20}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <p className={formShared.formHintSmall}>
          {imagenUrl
            ? `Seleccionado: ${imagenUrl}`
            : "Si no seleccionas uno, se usará /ico_pc.svg"}
        </p>
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