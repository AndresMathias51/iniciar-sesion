import EstadisticasPanel from "@/components/estadisticas/Estadisticas_Panel";

async function getEstadisticasData() {
  const res = await fetch("http://localhost:3000/api/estadisticas", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los datos de estadísticas");
  }

  return res.json();
}

export default async function EstadisticasPage() {
  const estadisticaData = await getEstadisticasData();

  return (
    <main className="authPage"> 
      <EstadisticasPanel data={estadisticaData} />
    </main>
  );
}