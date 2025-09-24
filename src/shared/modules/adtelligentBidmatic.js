(() => {
	const adUnits = [
		{
			code: "ad-frame-1",
			mediaTypes: { banner: { sizes: [[300, 600]] } },
			bids: [
				{ bidder: "adtelligent", params: { aid: 350975 } },
				{ bidder: "bidmatic", params: { source: 886409 } },
			],
		},
		{
			code: "ad-frame-2",
			mediaTypes: { banner: { sizes: [[300, 600]] } },
			bids: [
				{ bidder: "adtelligent", params: { aid: 350975 } },
				{ bidder: "bidmatic", params: { source: 886409 } },
			],
		},
		{
			code: "ad-frame-3",
			mediaTypes: { banner: { sizes: [[728, 90]] } },
			bids: [
				{ bidder: "adtelligent", params: { aid: 350975 } },
				{ bidder: "bidmatic", params: { source: 886409 } },
			],
		},
	];

	window.pbjs = window.pbjs || {};
	pbjs.que = pbjs.que || [];

	function initPrebid() {
		pbjs.addAdUnits(adUnits);

		pbjs.requestBids({
			timeout: 1000,
			bidsBackHandler: () => {
				const winningBids = pbjs.getHighestCpmBids();
				winningBids.forEach((bid) => {
					const iframe = document.getElementById(bid.adUnitCode);
					if (iframe?.contentWindow) {
						const doc = iframe.contentWindow.document;
						pbjs.renderAd(doc, bid.adId);
					}
				});
			},
		});
	}

	let lastUrl = location.href;
	function checkUrlChange() {
		if (location.href !== lastUrl) {
			lastUrl = location.href;
			pbjs.que.push(initPrebid);
		}
	}

	["pushState", "replaceState"].forEach((method) => {
		const orig = history[method];
		history[method] = function () {
			const result = orig.apply(this, arguments);
			checkUrlChange();
			return result;
		};
	});
	window.addEventListener("popstate", checkUrlChange);

	pbjs.que.push(initPrebid);
})();
