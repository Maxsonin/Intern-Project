import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { type SignUpSchema, signUpSchema } from "../schemas/authForm.schema";
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

	const onSubmit: SubmitHandler<SignUpSchema> = async (data: SignUpSchema) => {
		try {
			saveAuthData({ name: data.name, email: data.email });
			console.log("SignUp Data Saved:", data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError("root", { message: error.message });
			} else {
				setError("root", { message: "An unexpected error occurred" });
			}
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
