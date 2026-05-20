import type { TemaPorCategoria } from "./types_estadisticas";
import styles from "./Temas_Categoria.module.css";


type TemasPorCategoriaListProps = {
  categorias: TemaPorCategoria[];
};

export default function TemasPorCategoriaList({
  categorias,
}: TemasPorCategoriaListProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Temas por categoría</h2>
        <p className={styles.description}>
          Cantidad de temas creados en cada categoría
        </p>
      </div>

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {categorias.map((categoria) => (
            <li key={categoria.id} className={styles.item}>
              <span className={styles.categoryName}>
                {categoria.categoria}
              </span>

              <span className={styles.badge}>
                {categoria.cantidadTemas} temas
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}