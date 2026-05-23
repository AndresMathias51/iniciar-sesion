'use client';

import { useMemo, useState } from "react";
import Encabezado from "@/components/main_dashboard/Encabezado";
import Barra_lateral from "@/components/main_dashboard/Barra_lateral";

import Categoria_admin, { Categoria } from "./Categoria_admin";
import Tema_admin, { Tema } from "./Tema_admin";
import Form_categoria from "./Form_categoria";
import Form_tema from "./Form_tema";
import Modal_confirmacion from "./Modal_confirmacion";

import styles from "./Win_admin_materia.module.css";

const seedCategorias: Categoria[] = [
  { id: "cat-1", nombre: "Unidad 1", descripcion: "Introducción a Programación III", imagenUrl: "" },
  { id: "cat-2", nombre: "Unidad 2", descripcion: "API y buenas prácticas", imagenUrl: "" },
];

const seedTemas: Tema[] = [
  { id: "tema-1", categoriaId: "cat-1", titulo: "Bienvenida", descripcion: "Reglas del foro académico y guía general.", imagenUrl: "" },
  { id: "tema-2", categoriaId: "cat-1", titulo: "Recursos", descripcion: "Links y material de estudio.", imagenUrl: "" },
  { id: "tema-3", categoriaId: "cat-2", titulo: "Trabajo Práctico 1", descripcion: "Enunciado y dudas.", imagenUrl: "" },
];

export default function Win_admin_materia() {
  const [categorias, setCategorias] = useState<Categoria[]>(seedCategorias);
  const [temas, setTemas] = useState<Tema[]>(seedTemas);

  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState<string>("");
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("Confirmar");
  const [confirmMessage, setConfirmMessage] = useState("¿Estás seguro?");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const temasDeCategoria = useMemo(() => {
    if (!categoriaSeleccionadaId) return [];
    return temas.filter((t) => t.categoriaId === categoriaSeleccionadaId);
  }, [temas, categoriaSeleccionadaId]);

  function openConfirm(opts: { title: string; message: string; action: () => void }) {
    setConfirmTitle(opts.title);
    setConfirmMessage(opts.message);
    setConfirmAction(() => opts.action);
    setConfirmOpen(true);
  }

  // ===== Categorías =====
  function handleCreateCategoria(data: Omit<Categoria, "id">) {
    const nueva: Categoria = { id: crypto.randomUUID(), ...data };
    // Agregar al final (abajo) y NO seleccionar automáticamente
    setCategorias((prev) => [...prev, nueva]);
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
  }

  function handleDeleteCategoria(id: string) {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    setTemas((prev) => prev.filter((t) => t.categoriaId !== id));

    if (categoriaSeleccionadaId === id) {
      const remaining = categorias.filter((c) => c.id !== id);
      setCategoriaSeleccionadaId(remaining[0]?.id ?? "");
    }
  }

  // ===== Temas =====
  function handleCreateTema(data: Omit<Tema, "id">) {
    const nuevo: Tema = { id: crypto.randomUUID(), ...data };
    setTemas((prev) => [nuevo, ...prev]);
  }

  function handleDeleteTema(id: string) {
    setTemas((prev) => prev.filter((t) => t.id !== id));
  }

  function clearSeleccionCategoria() {
    setCategoriaSeleccionadaId("");
    setEditCategoria(null);
  }

  const twoCols = Boolean(categoriaSeleccionadaId);

  return (
    <div className={styles.div_admin_materia}>
      <div className={styles.admin_encabezado}>
        <Encabezado />
      </div>

      {/* IMPORTANTE: overlay global acá para cerrar también desde el lateral */}
      <div className={styles.contenido_central_admin}>
        {twoCols && (
          <div
            className={styles.clickOutsideOverlayGlobal}
            onClick={clearSeleccionCategoria}
          />
        )}

        <div className={styles.contenido_admin}>
          <div
            className={[
              styles.adminMateriaCentro,
              twoCols ? styles.adminMateriaCentro2 : styles.adminMateriaCentro1,
            ].join(" ")}
          >
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
                    selected={cat.id === categoriaSeleccionadaId}
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
              </div>
            </div>

            {/* Columna Temas: solo aparece si hay categoría seleccionada */}
            {twoCols && (
              <div className={styles.adminMateriaCol}>
                <h2 className={styles.adminMateriaTitle}>Crear / Eliminar Temas</h2>

                <Form_tema
                  categorias={categorias}
                  categoriaId={categoriaSeleccionadaId}
                  onChangeCategoriaId={setCategoriaSeleccionadaId}
                  onCreate={handleCreateTema}
                />

                <div className={styles.adminMateriaList}>
                  {temasDeCategoria.map((tema) => (
                    <Tema_admin
                      key={tema.id}
                      tema={tema}
                      onSelect={() => {
                      // aquí decides qué pasa al hacer click en el tema
                      // ejemplo: alert, abrir modal, navegar, etc.
                        console.log("Tema seleccionado:", tema.id);
                      }}
                      onDelete={() =>
                        openConfirm({
                          title: "Eliminar tema",
                          message: "¿Seguro que deseas eliminar este tema?",
                          action: () => handleDeleteTema(tema.id),
                      })
                    }
                  />
                  ))}

                  {temasDeCategoria.length === 0 && (
                    <p className={styles.adminMateriaEmpty}>No hay temas en esta categoría.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.adminMateriaLateral}>
          <Barra_lateral />
        </div>
      </div>

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