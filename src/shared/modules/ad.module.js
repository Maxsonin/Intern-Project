import "/public/pbjs.js";

const adUnits = [
	{
		code: "ad-frame-0",
		mediaTypes: { banner: { sizes: [[300, 250]] } },
		bids: [
			{ bidder: "adtelligent", params: { aid: 350975 } },
			{ bidder: "bidmatic", params: { source: 886409 } },
			{ bidder: "lesko", params: { leskoid: 12345 } },
		],
	},
	{
		code: "ad-frame-1",
		mediaTypes: { banner: { sizes: [[300, 600]] } },
		bids: [
			{ bidder: "adtelligent", params: { aid: 350975 } },
			{ bidder: "bidmatic", params: { source: 886409 } },
			{ bidder: "lesko", params: { leskoid: 12345 } },
		],
	},
	{
		code: "ad-frame-2",
		mediaTypes: { banner: { sizes: [[300, 600]] } },
		bids: [
			{ bidder: "adtelligent", params: { aid: 350975 } },
			{ bidder: "bidmatic", params: { source: 886409 } },
			{ bidder: "lesko", params: { leskoid: 12345 } },
		],
	},
	{
		code: "ad-frame-3",
		mediaTypes: { banner: { sizes: [[728, 90]] } },
		bids: [
			{ bidder: "adtelligent", params: { aid: 350975 } },
			{ bidder: "bidmatic", params: { source: 886409 } },
			{ bidder: "lesko", params: { leskoid: 12345 } },
		],
	},
	{
		code: "ad-frame-100",
		mediaTypes: { banner: { sizes: [[300, 250]] } },
		bids: [
			{ bidder: "adtelligent", params: { aid: 350975 } },
			{ bidder: "bidmatic", params: { source: 886409 } },
			{ bidder: "lesko", params: { leskoid: 12345 } },
		],
	},
	{
		code: "ad-frame-101",
		mediaTypes: { banner: { sizes: [[300, 250]] } },
		bids: [
			{ bidder: "adtelligent", params: { aid: 350975 } },
			{ bidder: "bidmatic", params: { source: 886409 } },
			{ bidder: "lesko", params: { leskoid: 12345 } },
		],
	},
];

window.pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.onEvent("auctionInit", (auction) => {
	document.dispatchEvent(new CustomEvent("auctionInit", { detail: auction }));
});

function reqBids() {
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
	pbjs.onEvent("bidRequested", (requestedBid) => {
		document.dispatchEvent(
			new CustomEvent("bidRequested", { detail: requestedBid }),
		);
	});

	pbjs.onEvent("bidResponse", (bid) => {
		document.dispatchEvent(new CustomEvent("bidResponse", { detail: bid }));
	});

	pbjs.onEvent("bidWon", (winningBid) => {
		document.dispatchEvent(new CustomEvent("bidWon", { detail: winningBid }));
	});

	pbjs.onEvent("auctionEnd", (auction) => {
		document.dispatchEvent(new CustomEvent("auctionEnd", { detail: auction }));
	});
}

// Track URL changes
let lastUrl = location.href;
function checkUrlChange() {
	if (location.href !== lastUrl) {
		lastUrl = location.href;
		pbjs.que.push(reqBids);
	}
}

// Observe SPA navigation
["pushState", "replaceState"].forEach((method) => {
	const orig = history[method];
	history[method] = function (...args) {
		const result = orig.apply(this, args);
		checkUrlChange();
		return result;
	};
});
window.addEventListener("popstate", checkUrlChange);

pbjs.que.push(() => {
	pbjs.addAdUnits(adUnits);
	lastUrl = location.href;
	reqBids();
});

window.dispatchEvent(new Event("LoadAdModule"));
