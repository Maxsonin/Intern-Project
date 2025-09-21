import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { type SignInSchema, signInSchema } from "../schemas/authForm.schema";
import { useAuthStore } from "../store/authStore";

const SignInForm = () => {
	const saveAuthData = useAuthStore((state) => state.saveAuthData);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
	});

	const fields: {
		name: keyof SignInSchema;
		label: string;
		type?: string;
		placeholder: string;
	}[] = [
		{
			name: "email",
			label: "Email",
			type: "email",
			placeholder: "Enter your email",
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			placeholder: "Enter your password",
		},
	];

	const onSubmit: SubmitHandler<SignInSchema> = async (data: SignInSchema) => {
		try {
			saveAuthData({ email: data.email, name: data.email });
			console.log("SignIn Data Saved:", data);
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
				Sign In
			</Button>
		</form>
	);
};

export default SignInForm;
