import EstadisticasPanel from "@/components/estadisticas/Estadisticas_Panel";
import estadisticas from "./prueba.json";

import type { EstadisticasData } from "@/components/estadisticas/types_estadisticas";

const data = estadisticas as EstadisticasData;

export default function EstadisticasPage() {
  return <EstadisticasPanel data={data} />;
}