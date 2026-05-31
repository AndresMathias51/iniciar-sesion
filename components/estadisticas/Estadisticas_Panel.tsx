import UsuariosRegistradosCard from "./Usuarios_Registrados";
import EstudiantesInscritosList from "./Estudiantes_Inscritos";
import PublicacionesSemanaChart from "./Publicaciones_Semana";
import TemasPorCategoriaList from "./Temas_Categoria";
import Encabezado from "@/components/main_dashboard/Encabezado";
import type { EstadisticasData } from "./types_estadisticas";

import styles from "./Estadisticas_Panel.module.css";

type EstadisticasPanelProps = {
  data: EstadisticasData;
};

export default function EstadisticasPanel({ data }: EstadisticasPanelProps) {
  return (
    <main className={styles.page}>
      <Encabezado nombre=""/>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Panel de estadísticas</h1>
          <p className={styles.description}>
            Resumen general dase usuarios, estudiantes, publicaciones y temas de la materia.
          </p>
        </header>
        <section className={styles.grid}>
          <div className={styles.usersCard}>
            <UsuariosRegistradosCard usuarios={data.usuariosRegistrados} />
          </div>

          <div className={styles.categoriesCard}>
            <TemasPorCategoriaList categorias={data.temasPorCategoria} />
          </div>

          <div className={styles.chartCard}>
            <PublicacionesSemanaChart
              publicaciones={data.publicacionesPorSemana}
            />
          </div>

          <div className={styles.studentsCard}>
            <EstudiantesInscritosList
              estudiantes={data.estudiantesInscritos}
            />
          </div>
        </section>
      </div>
    </main>
  );
}