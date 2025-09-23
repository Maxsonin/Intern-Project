import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { type SignUpSchema, signUpSchema } from "../schemas/authForm.schema";
import { signin, signup } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

const SignUpForm = () => {
	const saveAuthData = useAuthStore((state) => state.saveAuthData);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});
	const navigate = useNavigate();

	const fields: {
		name: keyof SignUpSchema;
		label: string;
		type?: string;
		placeholder: string;
	}[] = [
		{ name: "name", label: "Name", placeholder: "Enter your name" },
		{ name: "email", label: "Email", placeholder: "Enter your email" },
		{
			name: "password",
			label: "Password",
			type: "password",
			placeholder: "Enter your password",
		},
	];

	const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
		try {
			await signup(data);
			const user = await signin({ email: data.email, password: data.password });
			saveAuthData(user);
			navigate(-1);
		} catch (error: unknown) {
			if (error instanceof Error) setError("root", { message: error.message });
			else setError("root", { message: "An unexpected error occurred" });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{fields.map(({ name, label, type, placeholder }) => (
				<Input
					key={name}
					label={label}
					type={type}
					register={register(name)}
					error={errors[name]}
					placeholder={placeholder}
				/>
			))}

			<Button type="submit" disabled={isSubmitting} fullWidth>
				Sign Up
			</Button>
		</form>
	);
};

export default SignUpForm;
