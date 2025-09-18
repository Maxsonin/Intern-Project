import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "@/shared/components/ui/Input";
import { type SignUpSchema, signUpSchema } from "../schemas/authForm.schema";

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
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
				label="Name"
				register={register("name")}
				error={errors.name}
				placeholder="Enter your name"
			/>
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
				{isSubmitting ? "Loading..." : "Sign Up"}
			</button>
		</form>
	);
};

export default SignUpForm;
