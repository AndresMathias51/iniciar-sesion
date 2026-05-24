"use client";

import { useMemo, useState } from "react";
import styles from "./Ventana_categoria.module.css";

import type { TemaPorCategoria, TemaCategoriaDetalle } from "@/components/estadisticas/types_estadisticas";

import Form_tema from "@/components/admin_materia/Form_tema";

// Tus temas de prueba (JSON) — aquí ya están todos los temas por idCategoria
import temasCategoriaJson from "@/app/estadisticas/moderacion.json";

type VentanaCategoriaProps = {
  categoria: TemaPorCategoria;
  onCerrar: () => void;
};

type MiniCategoria = {
  id: string;
  nombre: string;
};

const temasCategoria = temasCategoriaJson as TemaCategoriaDetalle[];

export default function VentanaCategoria({ categoria, onCerrar }: VentanaCategoriaProps) {
  const [mostrarCrearTema, setMostrarCrearTema] = useState(false);

  const temasFiltrados = useMemo(
    () => temasCategoria.filter((tema) => tema.idCategoria === categoria.id),
    [categoria.id]
  );

  const miniCategorias: MiniCategoria[] = useMemo(() => {
    return [
      {
        id: String(categoria.id),
        nombre: categoria.categoria,
      },
    ];
  }, [categoria.id, categoria.categoria]);

  const categoriaIdForFormTema = String(categoria.id);

  const abrirCrearTema = () => setMostrarCrearTema(true);
  const cerrarCrearTema = () => setMostrarCrearTema(false);

  return (
    <div className={styles.overlay}>
      {/* Modal principal: lista de temas */}
      {!mostrarCrearTema && (
        <div className={styles.modal}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{categoria.categoria}</h2>
              <p className={styles.subtitle}>Temas registrados en esta categoría</p>
            </div>

            <button type="button" className={styles.closeIconButton} onClick={onCerrar}>
              ×
            </button>
          </div>

          <div className={styles.content}>
            {temasFiltrados.length > 0 ? (
              <ul className={styles.list}>
                {temasFiltrados.map((tema) => (
                  <li key={tema.id} className={styles.item}>
                    <h3 className={styles.topicTitle}>{tema.titulo}</h3>
                    <p className={styles.topicDescription}>{tema.descripcion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMessage}>No existen temas registrados para esta categoría.</p>
            )}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.primaryButton} onClick={abrirCrearTema}>
              Crear tema
            </button>

            <button type="button" className={styles.closeButton} onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal secundario: SOLO Form_tema (tapa completamente al anterior) */}
      {mostrarCrearTema && (
        <div className={styles.createTemaModal}>
          <div className={styles.createTemaHeader}>
            <h3 className={styles.createTemaTitle}>Agregar tema</h3>

            <button type="button" className={styles.closeIconButton} onClick={cerrarCrearTema}>
              ×
            </button>
          </div>

          <div className={styles.createTemaBody}>
            <Form_tema
              categorias={miniCategorias as unknown as any[]}
              categoriaId={categoriaIdForFormTema}
              onCreate={(temaData) => {
                console.log("Crear tema:", temaData);
                cerrarCrearTema();
              }}
            />
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.closeButton} onClick={cerrarCrearTema}>
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}