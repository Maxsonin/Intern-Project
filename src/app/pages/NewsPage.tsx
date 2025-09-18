import { useState } from "react";
import NewsCard from "@/features/news/components/NewsCard";
import Modal from "@/shared/components/ui/Modal";

type News = {
	id: number;
	title: string;
	details: string;
	image: string;
};

const newsData: News[] = [
	{
		id: 1,
		title: "New AI breakthrough",
		details: `lorem ipsum dolor sit amet, consectetur adipiscing elit.
			 Sed do eiusmod tempor incididunt ut labore et dolore magna 
			 aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
			 ullamco laboris nisi ut aliquip ex ea commodo consequat. 
			 Duis aute irure dolor in reprehenderit in voluptate velit
			  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
			  occaecat cupidatat non proident, sunt in culpa qui officia
			   deserunt mollit anim id est laborum.`,
		image: `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`,
	},
	{
		id: 2,
		title: "New elephant sanctuary opens",
		details: `lorem ipsum dolor sit amet, consectetur adipiscing elit.
			 Sed do eiusmod tempor incididunt ut labore et dolore magna 
			 aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
			 ullamco laboris nisi ut aliquip ex ea commodo consequat. 
			 Duis aute irure dolor in reprehenderit in voluptate velit
			  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
			  occaecat cupidatat non proident, sunt in culpa qui officia
			   deserunt mollit anim id est laborum.`,
		image: `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`,
	},
];

const NewsPage = () => {
	const [selectedNews, setSelectedNews] = useState<News | null>(null);

	return (
		<div className="justify-self-center">
			<div className="grid grid-cols-5 gap-6">
				{newsData.map((news) => (
					<NewsCard
						key={news.id}
						title={news.title}
						details={news.details}
						image={news.image}
						onReadMore={() => setSelectedNews(news)}
					/>
				))}
			</div>

			{selectedNews && (
				<Modal onClose={() => setSelectedNews(null)}>
					<div>
						<img
							src={selectedNews.image}
							alt={selectedNews.title}
							className="w-full h-64 object-cover rounded-xl mb-4"
						/>
						<h2 className="text-2xl font-bold mb-2">{selectedNews.title}</h2>
						<p className="text-gray-700">{selectedNews.details}</p>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default NewsPage;
