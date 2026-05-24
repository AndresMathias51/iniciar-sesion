import EstadisticasPanel from "@/components/estadisticas/Estadisticas_Panel";
import type { EstadisticasData } from "@/components/estadisticas/types_estadisticas";


async function getEstadisticasData() {
  const res = await fetch("http://localhost:3000/api/estadisticas", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los datos de estadísticas");
  }

  return res.json();
}

const estadisticas = await getEstadisticasData();
const data = estadisticas as EstadisticasData;

export default function EstadisticasPage() {
  return <EstadisticasPanel data={data} />;
}