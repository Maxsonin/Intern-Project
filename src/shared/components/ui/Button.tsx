type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	isLoading?: boolean;
	variant?: "primary" | "link" | "inactive";
	fullWidth?: boolean;
	className?: string;
};

export default function Button({
	children,
	onClick,
	type = "button",
	disabled = false,
	isLoading = false,
	variant = "primary",
	fullWidth = false,
	className = "",
}: ButtonProps) {
	const baseStyles =
		"px-4 py-2 rounded focus:outline-none transition-colors duration-200";
	const variants = {
		primary: "bg-blue-500 text-white hover:bg-blue-600",
		link: "text-blue-500 underline bg-transparent hover:text-blue-700",
		inactive: "bg-white border border-black text-black hover:opacity-80",
	};

	const classes =
		baseStyles +
		" " +
		variants[variant] +
		(fullWidth ? " w-full" : "") +
		(disabled || isLoading ? " opacity-50 cursor-not-allowed" : "") +
		(className ? ` ${className}` : "");

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			className={classes}
		>
			{isLoading ? "Loading..." : children}
		</button>
	);
}
