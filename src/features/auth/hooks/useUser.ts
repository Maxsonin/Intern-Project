import { useQuery } from "@tanstack/react-query";
import { me } from "../services/auth.service";

export const useUser = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["user"],
		queryFn: me,
		staleTime: 15 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	return {
		user: data,
		isUserLoading: isLoading,
		isUserError: isError,
		userError: error,
	};
};
