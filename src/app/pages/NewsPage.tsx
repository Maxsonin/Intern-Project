import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewsCard from "@/features/news/components/NewsCard";
import { useArticleContent } from "@/features/news/hooks/useArticleContent";
import { useNewsfeed } from "@/features/news/hooks/useNewsfeed";
import type { News } from "@/features/news/types/news.type";
import Modal from "@/shared/components/ui/Modal";

const NewsPage = () => {
	const [selectedNews, setSelectedNews] = useState<News | null>(null);
	const [searchParams] = useSearchParams();
	const url = searchParams.get("url") || undefined;
	const force = searchParams.get("force") === "1";

	const iframeId = "ad-frame-3";

	const { newsfeed, isNewsfeedLoading, isNewsfeedError } = useNewsfeed(
		url,
		force,
	);

	const { articleContent, isArticleContentLoading, isArticleContentError } =
		useArticleContent(selectedNews?.link);

	useEffect(() => {
		if (isNewsfeedError || newsfeed.length === 0) {
			Sentry.captureException(new Error("Error fetching news"));
			console.error("Error fetching news");
		}
	}, [isNewsfeedError, newsfeed]);

	return (
		<div className="place-items-center">
			<iframe
				id={iframeId}
				className="mb-5"
				title="ad1"
				scrolling="no"
			></iframe>
			{isNewsfeedLoading || isNewsfeedError ? (
				<>
					{isNewsfeedError && <div className="p-4 text-red-500">Error</div>}
					{isNewsfeedLoading && <div className="p-4">Loading...</div>}
				</>
			) : (
				<section>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{newsfeed.map((news) => (
							<NewsCard
								key={news.id}
								title={news.title}
								details={news.description}
								image={news.thumbnail}
								onReadMore={() => setSelectedNews(news)}
							/>
						))}
					</div>

					{selectedNews && (
						<Modal onClose={() => setSelectedNews(null)}>
							<article>
								<h2 className="text-2xl font-bold mb-4">
									{selectedNews.title}
								</h2>

								<img
									src={selectedNews.thumbnail}
									alt={selectedNews.title}
									className="w-40 h-auto object-cover rounded-xl ml-4 mb-4 float-right"
								/>

								{isArticleContentLoading && <p>Loading content...</p>}

								{isArticleContentError && (
									<div className="p-4 text-red-500">
										Error happened when fetching news
									</div>
								)}

								{!isArticleContentLoading && (
									<p className="text-gray-700 whitespace-pre-line">
										{articleContent.content}
									</p>
								)}
							</article>
						</Modal>
					)}
				</section>
			)}
		</div>
	);
};

export default NewsPage;
