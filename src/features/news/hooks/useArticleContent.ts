import { useQuery } from "@tanstack/react-query";
import { getArticleContent } from "@/features/news/services/news.service";
import type { ArticleContent } from "@/features/news/types/news.type";

export const useArticleContent = (url?: string) => {
	const {
		data = { content: "" },
		isLoading,
		isError,
		error,
	} = useQuery<ArticleContent, Error>({
		queryKey: ["parsedNews", url],
		queryFn: () => getArticleContent(url || ""),
		enabled: !!url,
	});

	return {
		articleContent: data,
		isArticleContentLoading: isLoading,
		isArticleContentError: isError,
		articleContentError: error,
	};
};
