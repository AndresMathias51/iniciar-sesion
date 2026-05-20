import type { EstudianteInscrito } from "./types_estadisticas";
import styles from "./Estudiantes_Inscritos.module.css";

type EstudiantesInscritosListProps = {
  estudiantes: EstudianteInscrito[];
};

export default function EstudiantesInscritosList({
  estudiantes,
}: EstudiantesInscritosListProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Estudiantes inscritos</h2>
        <p className={styles.description}>
          Lista de estudiantes registrados en la materia
        </p>
      </div>

      <div className={styles.scrollArea}>
        <ul className={styles.list}>
          {estudiantes.map((estudiante) => (
            <li key={estudiante.id} className={styles.item}>
              <div>
                <p className={styles.studentName}>{estudiante.nombre}</p>
                <p className={styles.studentEmail}>{estudiante.email}</p>
              </div>

              <span className={styles.badge}>Estudiante</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}