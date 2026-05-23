import type { EstudianteInscrito } from "@/components/estadisticas/types_estadisticas";
import styles from "./Confirmar_eliminar_usuario.module.css";

type ConfirmarEliminarEstudianteProps = {
  estudiante: EstudianteInscrito;
  onCancelar: () => void;
  onAceptar: (estudiante: EstudianteInscrito) => void;
};

export default function ConfirmarEliminarEstudiante({
  estudiante,
  onCancelar,
  onAceptar,
}: ConfirmarEliminarEstudianteProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirmar eliminación</h2>

        <p className={styles.message}>
          ¿Estás seguro de que deseas eliminar al siguiente estudiante?
        </p>

        <div className={styles.userInfo}>
          <p>
            <strong>Nombre:</strong> {estudiante.nombre}
          </p>

          <p>
            <strong>Email:</strong> {estudiante.email}
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={styles.acceptButton}
            onClick={() => onAceptar(estudiante)}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}