import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

const ProtectedRoute = () => {
	const { isSignedIn, isAuthLoading } = useAuthStore();

	if (isAuthLoading) {
		return <div>Loading...</div>;
	}

	return isSignedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
