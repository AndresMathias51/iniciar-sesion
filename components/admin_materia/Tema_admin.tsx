'use client';

import styles from "./Tema_admin.module.css";
import btn from "./Categoria_admin.module.css"; // reutiliza btnSmall y danger

export type Tema = {
  id: string;
  categoriaId: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
};

type Props = {
  tema: Tema;
  onSelect: () => void;   // NUEVO: click en todo el tema
  onDelete: () => void;
};

export default function Tema_admin({ tema, onSelect, onDelete }: Props) {
  return (
    <button
      type="button"
      className={styles.temaAdminButton}
      onClick={onSelect}
    >
      <div className={styles.temaAdminInfo}>
        <h3 className={styles.temaAdminTitulo}>{tema.titulo}</h3>
        <p className={styles.temaAdminDesc}>{tema.descripcion}</p>
      </div>

      <div className={styles.temaAdminActions} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`${btn.btnSmall} ${btn.danger}`}
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </button>
  );
}