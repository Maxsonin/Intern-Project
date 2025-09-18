import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "@/shared/components/ui/Input";
import { type SignInSchema, signInSchema } from "../schemas/authForm.schema";

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log(data);
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
			<Input
				label="Email"
				register={register("email")}
				error={errors.email}
				placeholder="Enter your email"
			/>
			<Input
				label="Password"
				type="password"
				register={register("password")}
				error={errors.password}
				placeholder="Enter your password"
			/>

			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-blue-500 text-white px-4 py-2 rounded w-full"
			>
				{isSubmitting ? "Loading..." : "Sign In"}
			</button>
		</form>
	);
};

export default SignInForm;
