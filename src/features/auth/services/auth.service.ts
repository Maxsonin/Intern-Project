import type { SignInSchema, SignUpSchema } from "../schemas/authForm.schema";
import type { User } from "../types/user.type";

export const signup = async (data: SignUpSchema): Promise<User> => {
	try {
		const response = await fetch("http://localhost:3000/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		});

		if (!response.ok) {
			const errData = await response.json();
			throw new Error(errData.message || "Sign up failed");
		}

		const res = await response.json();
		return res as User;
	} catch (error) {
		console.error("SignUp error:", error);
		throw error;
	}
};

export const signin = async (data: SignInSchema): Promise<User> => {
	try {
		const response = await fetch("http://localhost:3000/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		});

		if (!response.ok) {
			const errData = await response.json();
			throw new Error(errData.message || "Sign in failed");
		}

		const res = await response.json();
		return res as User;
	} catch (error) {
		console.error("SignIn error:", error);
		throw error;
	}
};

export const me = async (): Promise<User | null> => {
	try {
		const response = await fetch("http://localhost:3000/auth/me", {
			credentials: "include",
		});

		if (!response.ok) return null;

		const res = await response.json();
		return res as User;
	} catch (error) {
		console.error("Fetch current user error:", error);
		return null;
	}
};

export const logout = async (): Promise<void> => {
	try {
		const response = await fetch("http://localhost:3000/auth/logout", {
			method: "POST",
			credentials: "include",
		});
		if (!response.ok) throw new Error("Logout failed");
	} catch (error) {
		console.error("Logout error:", error);
		throw error;
	}
};
