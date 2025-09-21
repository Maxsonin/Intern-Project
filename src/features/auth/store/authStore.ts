import { create } from "zustand";

type User = {
	name: string;
	email: string;
};

type AuthStore = {
	isSignedIn: boolean;
	user: User | null;
	isLoading: boolean;
	saveAuthData: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isSignedIn: false,
	user: null,
	isLoading: false,

	// save auth data (e.g., on login/signup)
	saveAuthData: (user) =>
		set(() => ({
			user,
			isSignedIn: !!user,
		})),
}));
