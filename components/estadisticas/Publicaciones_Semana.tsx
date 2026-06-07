"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import type { PublicacionSemana } from "./types_estadisticas";
import styles from "./Publicaciones_Semana.module.css";

type PublicacionesSemanaChartProps = {
  publicaciones: PublicacionSemana[];
};

export default function PublicacionesSemanaChart({
  publicaciones,
}: PublicacionesSemanaChartProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Publicaciones por categoría</h2>
        <p className={styles.description}>
          Cantidad de publicaciones realizadas por categoría
        </p>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={publicaciones}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="cantidad"
              name="Publicaciones"
              fill="#FFA81C"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}