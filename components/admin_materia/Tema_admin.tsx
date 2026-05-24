'use client';

import styles from "./Tema_admin.module.css";
import btn from "./Categoria_admin.module.css";

export type Tema = {
  id: string;
  categoriaId: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
};

type Props = {
  tema: Tema;
  onSelect: () => void;
  onDelete: () => void;
};

export default function Tema_admin({ tema, onSelect, onDelete }: Props) {
  return (
    <div
      className={styles.temaAdminButton}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
    >
      <div className={styles.temaAdminInfo}>
        <h3 className={styles.temaAdminTitulo}>{tema.titulo}</h3>
        <p className={styles.temaAdminDesc}>{tema.descripcion}</p>
      </div>

      {/* Evita que el click en Eliminar dispare onSelect */}
      <div className={styles.temaAdminActions} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`${btn.btnSmall} ${btn.danger}`}
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}