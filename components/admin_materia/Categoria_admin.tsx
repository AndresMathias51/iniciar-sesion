'use client';

import styles from "./Categoria_admin.module.css";

export type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
};

type Props = {
  categoria: Categoria;
  selected?: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function Categoria_admin({
  categoria,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className={`${styles.categoriaAdminCard} ${selected ? styles.isSelected : ""}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
    >
      <div>
        <h3 className={styles.categoriaAdminNombre}>{categoria.nombre}</h3>
        <p className={styles.categoriaAdminDesc}>{categoria.descripcion}</p>
      </div>

      <div className={styles.categoriaAdminActions} onClick={(e) => e.stopPropagation()}>
        <button className={styles.btnSmall} onClick={onEdit}>
          Editar
        </button>
        <button className={`${styles.btnSmall} ${styles.danger}`} onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}