'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Categoria } from "./Categoria_admin";
import styles from "./Form_categoria.module.css";

type FormValue = {
  nombre: string;
  descripcion: string;
  imagenUrl?: string; // guardamos "/ico_pc.svg", etc.
};

type Props = {
  mode: "create" | "edit";
  initialValue?: Categoria;
  onCreate: (data: FormValue) => void;
  onUpdate: (data: FormValue) => void;
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
  initialValue,
  onCreate,
  onUpdate,
  onCancelEdit,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const [iconOpen, setIconOpen] = useState(false);
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
  }, [mode, initialValue]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!iconOpen) return;
      const el = iconWrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setIconOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [iconOpen]);

  const selectedIcon = ICONS.find((i) => i.value === imagenUrl);

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
      setNombre("");
      setDescripcion("");
      setImagenUrl("");
      setIconOpen(false);
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
          <label className={styles.formLabel}>Icono (opcional)</label>

          <div className={styles.iconSelectWrap} ref={iconWrapRef}>
            <button
              type="button"
              className={`${styles.iconSelectButton} ${iconOpen ? styles.iconSelectOpen : ""}`}
              onClick={() => setIconOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={iconOpen}
              title="Seleccionar icono"
            >
              <span className={styles.iconSelectValue}>
                {selectedIcon ? (
                  <Image src={selectedIcon.value} alt="icono" width={18} height={18} />
                ) : (
                  <span className={styles.iconPlaceholder}>Selecciona un icono</span>
                )}
              </span>

              <span className={styles.iconChevron}>▾</span>
            </button>

            {iconOpen && (
              <div className={styles.iconDropdown} role="listbox">
                {/* Sin icono */}
                <button
                  type="button"
                  className={`${styles.iconDropdownItem} ${!imagenUrl ? styles.iconDropdownItemSelected : ""}`}
                  onClick={() => {
                    setImagenUrl("");
                    setIconOpen(false);
                  }}
                  title="Sin icono"
                >
                  <span className={styles.iconNone}>—</span>
                </button>

                {/* Iconos verticales, sin texto */}
                {ICONS.map((ico) => {
                  const selected = imagenUrl === ico.value;
                  return (
                    <button
                      key={ico.value}
                      type="button"
                      className={`${styles.iconDropdownItem} ${selected ? styles.iconDropdownItemSelected : ""}`}
                      onClick={() => {
                        setImagenUrl(ico.value);
                        setIconOpen(false);
                      }}
                      title={ico.value.replace("/", "").replace(".svg", "")}
                    >
                      <Image src={ico.value} alt="icono" width={20} height={20} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <p className={styles.formHintSmall}>
            {imagenUrl ? `Seleccionado: ${imagenUrl}` : "Sin icono seleccionado"}
          </p>
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