import styles from "./Ventana_categoria.module.css";

import type {
  TemaPorCategoria,
  TemaCategoriaDetalle,
} from "@/components/estadisticas/types_estadisticas";

import temasCategoriaJson from "@/app/estadisticas/moderacion.json";

type VentanaCategoriaProps = {
  categoria: TemaPorCategoria;
  onCerrar: () => void;
};

const temasCategoria = temasCategoriaJson as TemaCategoriaDetalle[];

export default function VentanaCategoria({
  categoria,
  onCerrar,
}: VentanaCategoriaProps) {
  const temasFiltrados = temasCategoria.filter(
    (tema) => tema.idCategoria === categoria.id
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{categoria.categoria}</h2>
            <p className={styles.subtitle}>
              Temas registrados en esta categoría
            </p>
          </div>

          <button
            type="button"
            className={styles.closeIconButton}
            onClick={onCerrar}
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {temasFiltrados.length > 0 ? (
            <ul className={styles.list}>
              {temasFiltrados.map((tema) => (
                <li key={tema.id} className={styles.item}>
                  <h3 className={styles.topicTitle}>{tema.titulo}</h3>
                  <p className={styles.topicDescription}>
                    {tema.descripcion}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>
              No existen temas registrados para esta categoría.
            </p>
          )}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onCerrar}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}