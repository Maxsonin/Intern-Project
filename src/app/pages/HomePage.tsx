const HomePage = () => {
	const adId = "ad-frame-0";

	return (
		<>
			<div className="text-xl font-bold">Welcome to №1 news website!</div>
			<iframe id={adId} title="ad0" scrolling="no" frameBorder="0"></iframe>
		</>
	);
};
export default HomePage;
