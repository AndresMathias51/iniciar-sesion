'use client';

import { useEffect } from "react";
import styles from "./Toast.module.css";

type Props = {
  open: boolean;
  message: string;
  type?: "success" | "info" | "error";
  durationMs?: number;
  onClose: () => void;
};

function getIcon(type: "success" | "info" | "error") {
  if (type === "success") return "✓";
  if (type === "info") return "i";
  return "!";
}

export default function Toast({
  open,
  message,
  type = "success",
  durationMs = 2600,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(t);
  }, [open, durationMs, onClose]);

  if (!open) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="status" aria-live="polite">
      <div className={styles.icon}>{getIcon(type)}</div>
      <div className={styles.msg}>{message}</div>
      <button className={styles.close} onClick={onClose} aria-label="Cerrar">×</button>
    </div>
  );
}