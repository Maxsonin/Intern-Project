import { useQuery } from "@tanstack/react-query";
import { fetchNewsfeed } from "@/features/news/services/news.service";
import type { News } from "@/features/news/types/news.type";

export const useNewsfeed = (url?: string, force?: boolean) => {
	const {
		data = [],
		isLoading,
		isError,
		error,
	} = useQuery<News[], Error>({
		queryKey: ["newsfeed", url],
		queryFn: () => fetchNewsfeed(url, force),
		staleTime: 1000 * 60 * 5,
	});

	return {
		newsfeed: data,
		isNewsfeedLoading: isLoading,
		isNewsfeedError: isError,
		newsfeedError: error,
	};
};
