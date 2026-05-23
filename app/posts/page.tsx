import Win_posts_panel from "@/components/posts_panel/Win_posts_panel";
import dashboardData from "@/app/dashboard/dashboardData.json";

export default function Posts_panel_page() {
    return (
        <main className="authPage">
            <Win_posts_panel data={dashboardData}/>
        </main>
    );
}