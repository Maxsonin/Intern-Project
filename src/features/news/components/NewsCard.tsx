import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type NewsCardProps = {
	title: string;
	details: string;
	image: string;
	onReadMore: () => void;
};

const getSummary = (text: string, maxLength = 80) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const NewsCard = ({ title, details, image, onReadMore }: NewsCardProps) => {
	const summary = getSummary(details);

	return (
		<div className="shadow-md rounded-2xl overflow-hidden flex flex-col w-90">
			<LazyLoadImage
				src={image}
				alt={title}
				className="w-full h-40 object-cover"
				effect="blur"
			/>

			<div className="p-4 flex flex-col">
				<h2 className="text-lg font-semibold">{title}</h2>
				<p className="text-gray-600 mb-3">{summary}</p>
				<button
					type="button"
					onClick={onReadMore}
					className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					Read More
				</button>
			</div>
		</div>
	);
};

export default NewsCard;
