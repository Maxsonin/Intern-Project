import type { ArticleContent, News } from "../types/news.type";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchNewsfeed = async (
	url?: string,
	force?: boolean,
): Promise<News[]> => {
	try {
		const endpoint = new URL(`${BASE_URL}/newsfeed`);

		if (url) endpoint.searchParams.set("url", url);
		if (force) endpoint.searchParams.set("force", "1");

		const response = await fetch(endpoint.toString());
		if (!response.ok) {
			throw new Error(
				`Failed to fetch news: ${response.status} ${response.statusText}`,
			);
		}

		const data = await response.json();
		return data.data as News[];
	} catch (error) {
		console.error("Error fetching news:", error);
		throw error;
	}
};

export const getArticleContent = async (
	url: string,
): Promise<ArticleContent> => {
	try {
		const response = await fetch(`${BASE_URL}/newsfeed/parse-url?url=${url}`);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch parsed content: ${response.status} ${response.statusText}`,
			);
		}

		const data = await response.json();
		return data as ArticleContent;
	} catch (error) {
		console.error("Error fetching parsed content:", error);
		throw error;
	}
};
