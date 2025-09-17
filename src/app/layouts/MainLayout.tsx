import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			<header>
				<h1>
					<Link to="/">Intern News</Link>
				</h1>
				<nav>
					<Link to="news">News</Link>
					<Link to="signup">Signup</Link>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
