import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

const Navbar = () => {
	const links = [{ name: "News", path: "/news" }];

	const { user, isAuthLoading } = useAuthStore();

	return (
		<header className="bg-blue-500 shadow-lg py-4 px-6 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-white">
				<Link to="/">Intern News</Link>
			</h1>

			{isAuthLoading ? (
				<div>Loading...</div>
			) : (
				<nav className="flex space-x-6">
					{links.map((link) => (
						<NavLink
							key={link.name}
							to={link.path}
							className={({ isActive }) =>
								`font-medium hover:text-blue-300 ${
									isActive ? "text-blue-900 underline" : "text-white"
								}`
							}
						>
							{link.name}
						</NavLink>
					))}

					{user ? (
						<div className="flex items-center space-x-4">
							<span className="text-white font-medium">Hi, {user.name}</span>
						</div>
					) : (
						<NavLink
							to="/signin"
							className="font-medium text-white hover:text-blue-300"
						>
							Sign In
						</NavLink>
					)}
				</nav>
			)}
		</header>
	);
};

export default Navbar;
