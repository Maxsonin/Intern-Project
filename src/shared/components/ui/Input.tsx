import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
	label: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
	type?: string;
	placeholder?: string;
};

const Input = ({
	label,
	error,
	register,
	type = "text",
	placeholder,
}: InputProps) => (
	<div className="mb-2">
		<label htmlFor={register.name}>{label}</label>
		<input
			id={register.name}
			{...register}
			type={type}
			placeholder={placeholder}
			className="border p-2 rounded w-full"
		/>
		{error && <div className="text-red-500">{error.message}</div>}
	</div>
);

export default Input;
