import { create } from "zustand";
import type { User } from "../types/user.type";

type AuthStore = {
	isSignedIn: boolean;
	user: User | null;
	isAuthLoading: boolean;
	saveAuthData: (user: User | null) => void;
	setAuthLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isSignedIn: false,
	user: null,
	isAuthLoading: true,
	saveAuthData: (user) =>
		set(() => ({
			user,
			isSignedIn: !!user && !!user.id,
			isAuthLoading: false,
		})),
	setAuthLoading: (loading) => set({ isAuthLoading: loading }),
}));
