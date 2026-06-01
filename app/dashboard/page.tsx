import Win_main_dashboard from "@/components/main_dashboard/Win_main_dashboard";

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/dashboard?idMateria=1", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los datos del dashboard");
  }

  return res.json();
}

export default async function Dashboard() {
  const dashboardData = await getDashboardData();

  return (
    <main className="authPage">
      <Win_main_dashboard data={dashboardData} />
    </main>
  );
}