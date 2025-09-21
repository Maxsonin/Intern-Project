import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/ui/Navbar";

const MainLayout = () => {
	return (
		<div>
			<Navbar />

			<main style={{ padding: "2rem" }}>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
