import { type ReactNode, useEffect } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useAuthStore } from "@/features/auth/store/authStore";

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { user, isUserLoading } = useUser();
	const saveAuthData = useAuthStore((state) => state.saveAuthData);
	const setLoading = useAuthStore((state) => state.setAuthLoading);

	useEffect(() => {
		if (isUserLoading) {
			setLoading(true);
		} else {
			saveAuthData(user || null);
		}
	}, [user, isUserLoading, saveAuthData, setLoading]);

	return <>{children}</>;
};
