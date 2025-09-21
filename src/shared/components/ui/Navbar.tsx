import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	const links = [
		{ name: "News", path: "/news" },
		{ name: "Signup", path: "/signup" },
	];

	return (
		<header className="bg-blue-500 shadow-lg py-4 px-6 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-white">
				<Link to="/">Intern News</Link>
			</h1>

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
			</nav>
		</header>
	);
};

export default Navbar;
