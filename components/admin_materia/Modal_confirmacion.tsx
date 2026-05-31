'use client';

import styles from "./Modal_confirmacion.module.css";

type Props = {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function Modal_confirmacion({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className={styles.mcOverlay} onClick={onCancel}>
      <div className={styles.mcDialog} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.mcTitle}>{title}</h3>
        <p className={styles.mcMessage}>{message}</p>

        <div className={styles.mcActions}>
          <button className={`${styles.mcBtn} ${styles.mcBtnSecondary}`} onClick={onCancel}>
            Cancelar
          </button>
          <button className={`${styles.mcBtn} ${styles.mcBtnDanger}`} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}