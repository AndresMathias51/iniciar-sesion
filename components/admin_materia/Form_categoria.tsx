'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Categoria } from "./Categoria_admin";
import styles from "./Form_categoria.module.css";

type FormValue = {
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  idMateria: string;
};

type Props = {  
  mode: "create" | "edit";
  idMateria: string;
  initialValue?: Categoria;
  onCreate: (data: FormValue) => void | Promise<void>;
  onUpdate: (data: FormValue) => void | Promise<void>;
  onCancelEdit: () => void;
};

const ICONS = [
  { value: "/ico_pc.svg" },
  { value: "/ico_conf.svg" },
  { value: "/ico_internet.svg" },
  { value: "/ico_bug.svg" },
];

export default function Form_categoria({
  mode,
  idMateria,
  initialValue,
  onCreate,
  onUpdate,
  onCancelEdit,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const [iconOpen, setIconOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iconWrapRef = useRef<HTMLDivElement | null>(null);

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

    setIconOpen(false);
    setError(null);
  }, [mode, initialValue]);

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

    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [iconOpen]);

  const selectedIcon = ICONS.find((i) => i.value === imagenUrl);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const descripcionLimpia = descripcion.trim();

    if (!nombreLimpio || !descripcionLimpia) {
      setError("Debes llenar el nombre y la descripción.");
      return;
    }

    if (!idMateria) {
      setError("No se encontró la materia activa.");
      return;
    }

    const payload: FormValue = {
      nombre: nombreLimpio,
      descripcion: descripcionLimpia,
      imagenUrl: imagenUrl.trim() || "/ico_pc.svg",
      idMateria,
    };

    try {
      setEnviando(true);
      setError(null);

      if (mode === "edit") {
        await onUpdate(payload);
      } else {
        await onCreate(payload);

        setNombre("");
        setDescripcion("");
        setImagenUrl("");
        setIconOpen(false);
      }
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      setError("No se pudo guardar la categoría.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <h2 className={styles.sectionTitle}>
        {mode === "edit" ? "Editar categoría" : "Agregar Categorías"}
      </h2>

      <form className={styles.formCategoria} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Nombre</label>

          <input
            className={styles.formInput}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Unidad 1"
            disabled={enviando}
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
            disabled={enviando}
          />
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Icono</label>

          <div className={styles.iconSelectWrap} ref={iconWrapRef}>
            <button
              type="button"
              className={`${styles.iconSelectButton} ${
                iconOpen ? styles.iconSelectOpen : ""
              }`}
              onClick={() => setIconOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={iconOpen}
              title="Seleccionar icono"
              disabled={enviando}
            >
              <span className={styles.iconSelectValue}>
                {selectedIcon ? (
                  <Image
                    src={selectedIcon.value}
                    alt="icono"
                    width={18}
                    height={18}
                  />
                ) : (
                  <span className={styles.iconPlaceholder}>
                    Selecciona un icono
                  </span>
                )}
              </span>

              <span className={styles.iconChevron}>▾</span>
            </button>

            {iconOpen && (
              <div className={styles.iconDropdown} role="listbox">
                {ICONS.map((ico) => {
                  const selected = imagenUrl === ico.value;

                  return (
                    <button
                      key={ico.value}
                      type="button"
                      className={`${styles.iconDropdownItem} ${
                        selected ? styles.iconDropdownItemSelected : ""
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

          <p className={styles.formHintSmall}>
            {imagenUrl
              ? `Seleccionado: ${imagenUrl}`
              : "Si no seleccionas uno, se usará /ico_pc.svg"}
          </p>
        </div>

        {error && <p className={styles.formHint}>{error}</p>}

        <div className={styles.formActions}>
          {mode === "edit" ? (
            <>
              <button
                className={styles.btnPrimary}
                type="submit"
                disabled={enviando}
              >
                {enviando ? "Guardando..." : "Guardar cambios"}
              </button>

              <button
                className={styles.btnSecondary}
                type="button"
                onClick={onCancelEdit}
                disabled={enviando}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className={styles.btnPrimary}
              type="submit"
              disabled={enviando}
            >
              {enviando ? "Creando..." : "Crear categoría"}
            </button>
          )}
        </div>

        <p className={styles.formHint}>
          * Campos obligatorios: nombre y descripción.
        </p>
      </form>
    </div>
  );
}