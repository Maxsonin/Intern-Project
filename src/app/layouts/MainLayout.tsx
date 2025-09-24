import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/ui/Navbar";

const MainLayout = () => {
	const leftAdId = "ad-frame-1";
	const rightAdId = "ad-frame-2";

	return (
		<div>
			<Navbar />

			<div
				style={{
					display: "flex",
					padding: "2rem",
					gap: "4rem",
				}}
			>
				<iframe
					id={leftAdId}
					title="ad1"
					scrolling="no"
					className="sticky top-100 "
				></iframe>

				<main style={{ flex: 1 }}>
					<Outlet />
				</main>

				<iframe
					id={rightAdId}
					title="ad2"
					scrolling="no"
					className="sticky top-100 "
				></iframe>
			</div>
		</div>
	);
};

export default MainLayout;
