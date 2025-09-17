import NewsCard from "@/features/news/components/NewsCard";

const newsData = [
	{
		id: 1,
		title: "New AI breakthrough",
		details:
			"Researchers at XYZ University have created a groundbreaking AI model that surpasses previous benchmarks in natural language understanding...",
		image: "https://picsum.photos/400/200?random=1",
	},
];

const NewsPage = () => {
	return (
		<div className="justify-self-center">
			<div className="grid grid-cols-5 gap-6">
				{newsData.map((news) => (
					<NewsCard
						key={news.id}
						title={news.title}
						details={news.details}
						image={news.image}
					/>
				))}
			</div>
		</div>
	);
};

export default NewsPage;
