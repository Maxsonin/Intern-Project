import { z } from "zod";

export const signUpSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(30, "Name must be at most 30 characters"),
	email: z.email(),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
