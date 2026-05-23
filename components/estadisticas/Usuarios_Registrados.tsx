import type { UsuariosRegistrados } from "./types_estadisticas";
import  styles from "./Usuarios_Registrados.module.css";

type UsuariosRegistradosCardProps = {
  usuarios: UsuariosRegistrados;
};

export default function UsuariosRegistradosCard({
  usuarios,
}: UsuariosRegistradosCardProps) {
  return (
    <section className={styles.card}>
      <p className={styles.title}>{usuarios.titulo}</p>

      <h2 className={styles.amount}>{usuarios.cantidad}</h2>

      <p className={styles.description}>{usuarios.descripcion}</p>
    </section>
  );
}