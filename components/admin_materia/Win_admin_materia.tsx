'use client';

import { useMemo, useState } from "react";
import Encabezado from "@/components/main_dashboard/Encabezado";
import Barra_lateral from "@/components/main_dashboard/Barra_lateral";
import Toast from "./Toast";

import Categoria_admin, { Categoria } from "./Categoria_admin";
import Tema_admin, { Tema } from "./Tema_admin";
import Form_categoria from "./Form_categoria";
import Form_tema from "./Form_tema";
import Modal_confirmacion from "./Modal_confirmacion";

import styles from "./Win_admin_materia.module.css";

const seedCategorias: Categoria[] = [];
const seedTemas: Tema[] = [];

export default function Win_admin_materia() {
  const [categorias, setCategorias] = useState<Categoria[]>(seedCategorias);
  const [temas, setTemas] = useState<Tema[]>(seedTemas);

  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState<string>("");
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("Confirmar");
  const [confirmMessage, setConfirmMessage] = useState("¿Estás seguro?");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  // ===== Toast =====
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "info" | "error">("success");

  function showToast(message: string, type: "success" | "info" | "error" = "success") {
    setToastMsg(message);
    setToastType(type);
    setToastOpen(true);
  }

  // Siempre tener una categoría activa si existe al menos una
  const activeCategoriaId = categoriaSeleccionadaId || categorias[0]?.id || "";

  const temasDeCategoria = useMemo(() => {
    if (!activeCategoriaId) return [];
    return temas.filter((t) => t.categoriaId === activeCategoriaId);
  }, [temas, activeCategoriaId]);

  function openConfirm(opts: { title: string; message: string; action: () => void }) {
    setConfirmTitle(opts.title);
    setConfirmMessage(opts.message);
    setConfirmAction(() => opts.action);
    setConfirmOpen(true);
  }

  // ===== Categorías =====
  function handleCreateCategoria(data: Omit<Categoria, "id">) {
    const nueva: Categoria = { id: crypto.randomUUID(), ...data };
    setCategorias((prev) => [...prev, nueva]);

    // si no había ninguna seleccionada, selecciona la primera disponible
    setCategoriaSeleccionadaId((prevSelected) => prevSelected || nueva.id);

    showToast(`Categoría creada: ${nueva.nombre}`, "success");
  }

  function handleStartEditCategoria(cat: Categoria) {
    setEditCategoria(cat);
  }

  function handleCancelEditCategoria() {
    setEditCategoria(null);
  }

  function handleUpdateCategoria(id: string, data: Omit<Categoria, "id">) {
    setCategorias((prev) => prev.map((c) => (c.id === id ? { id, ...data } : c)));
    setEditCategoria(null);
    showToast(`Categoría actualizada: ${data.nombre}`, "info");
  }

  function handleDeleteCategoria(id: string) {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    setTemas((prev) => prev.filter((t) => t.categoriaId !== id));

    // Si borraste la seleccionada, elegir otra (o vacío si no queda ninguna)
    if (activeCategoriaId === id) {
      const remaining = categorias.filter((c) => c.id !== id);
      setCategoriaSeleccionadaId(remaining[0]?.id ?? "");
    }

    showToast("Categoría eliminada", "info");
  }

  // ===== Temas =====
  function handleCreateTema(data: Omit<Tema, "id">) {
    const nuevo: Tema = { id: crypto.randomUUID(), ...data };
    setTemas((prev) => [nuevo, ...prev]);
    showToast(`Tema creado: ${nuevo.titulo}`, "success");
  }

  function handleDeleteTema(id: string) {
    setTemas((prev) => prev.filter((t) => t.id !== id));
    showToast("Tema eliminado", "info");
  }

  return (
    <div className={styles.div_admin_materia}>
      <div className={styles.admin_encabezado}>
        <Encabezado />
      </div>

      <div className={styles.contenido_central_admin}>
        <div className={styles.contenido_admin}>
          {/* 2 columnas siempre */}
          <div className={[styles.adminMateriaCentro, styles.adminMateriaCentro2].join(" ")}>
            {/* Columna Categorías */}
            <div className={styles.adminMateriaCol}>
              <h2 className={styles.adminMateriaTitle}>Administración de Categorías</h2>

              <Form_categoria
                mode={editCategoria ? "edit" : "create"}
                initialValue={editCategoria ?? undefined}
                onCreate={handleCreateCategoria}
                onCancelEdit={handleCancelEditCategoria}
                onUpdate={(data) => editCategoria && handleUpdateCategoria(editCategoria.id, data)}
              />

              <div className={styles.adminMateriaList}>
                {categorias.map((cat) => (
                  <Categoria_admin
                    key={cat.id}
                    categoria={cat}
                    selected={cat.id === activeCategoriaId}
                    onSelect={() => setCategoriaSeleccionadaId(cat.id)}
                    onEdit={() => handleStartEditCategoria(cat)}
                    onDelete={() =>
                      openConfirm({
                        title: "Eliminar categoría",
                        message: "Se eliminará la categoría y todos sus temas asociados. ¿Deseas continuar?",
                        action: () => handleDeleteCategoria(cat.id),
                      })
                    }
                  />
                ))}

                {categorias.length === 0 && (
                  <p className={styles.adminMateriaEmpty}>No hay categorías creadas.</p>
                )}
              </div>
            </div>

            {/* Columna Temas (siempre visible, pero el form se deshabilita si no hay categoría) */}
            <div className={styles.adminMateriaCol}>
              <h2 className={styles.adminMateriaTitle}>Crear / Eliminar Temas</h2>

              <Form_tema
                categorias={categorias}
                categoriaId={activeCategoriaId}
                onChangeCategoriaId={setCategoriaSeleccionadaId}
                onCreate={handleCreateTema}
              />

              <div className={styles.adminMateriaList}>
                {temasDeCategoria.map((tema) => (
                  <Tema_admin
                    key={tema.id}
                    tema={tema}
                    onSelect={() => console.log("Tema seleccionado:", tema.id)}
                    onDelete={() =>
                      openConfirm({
                        title: "Eliminar tema",
                        message: "¿Seguro que deseas eliminar este tema?",
                        action: () => handleDeleteTema(tema.id),
                      })
                    }
                  />
                ))}

                {activeCategoriaId && temasDeCategoria.length === 0 && (
                  <p className={styles.adminMateriaEmpty}>No hay temas en esta categoría.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.adminMateriaLateral}>
          <Barra_lateral />
        </div>
      </div>

      <Toast
        open={toastOpen}
        message={toastMsg}
        type={toastType}
        onClose={() => setToastOpen(false)}
      />

      <Modal_confirmacion
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          confirmAction?.();
        }}
      />
    </div>
  );
}