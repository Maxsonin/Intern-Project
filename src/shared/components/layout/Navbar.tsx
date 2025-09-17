import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	const links = [
		{ name: "News", path: "/news" },
		{ name: "Signup", path: "/signup" },
	];

	return (
		<header className="bg-blue-500 shadow-md py-4 px-6 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-white">
				<Link to="/">Intern News</Link>
			</h1>

			<nav className="flex space-x-6">
				{links.map((link) => (
					<NavLink
						key={link.name}
						to={link.path}
						className={({ isActive }) =>
							`font-medium text-gray-300 hover:text-white ${
								isActive ? "text-blue-200 underline decoration-white" : ""
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
