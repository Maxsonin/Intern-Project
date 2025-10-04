import Button from "@/shared/components/ui/Button";

const HomePage = () => {
	const adId = "ad-frame-0";

	return (
		<>
			<div className="text-xl font-bold">Welcome to №1 news website!</div>
			<iframe id={adId} title="ad0" scrolling="no" frameBorder="0"></iframe>

			<Button
				className="mt-4 bg-pink-500 hover:bg-pink-700"
				onClick={() => {
					throw new Error("This is your first error!");
				}}
			>
				Sentry Showcase
			</Button>
		</>
	);
};
export default HomePage;
