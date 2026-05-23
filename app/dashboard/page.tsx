import Win_main_dashboard from "@/components/main_dashboard/Win_main_dashboard";
import dashboardData from "@/app/dashboard/dashboardData.json";

export default function Dashboard() {
  return (
    <main className="authPage">
      <Win_main_dashboard data={dashboardData} />
    </main>
  );
}