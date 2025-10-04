const deviceType = getDeviceType();
let eventsToSend = [];
let hasLoadPage = false;
let hasLoadAdModule = false;

window.addEventListener("load", () => {
	eventsToSend.push({ eventType: "LoadPage", deviceType });
	hasLoadPage = true;

	if (hasLoadPage && hasLoadAdModule) {
		sendEvents(eventsToSend);
		eventsToSend = [];
	}
});

window.addEventListener("LoadAdModule", () => {
	eventsToSend.push({ eventType: "LoadAdModule", deviceType });
	hasLoadAdModule = true;

	if (hasLoadPage && hasLoadAdModule) {
		sendEvents(eventsToSend);
		eventsToSend = [];
	}
});

["auctionInit", "auctionEnd", "bidRequested"].forEach((eventType) => {
	document.addEventListener(eventType, () => {
		eventsToSend.push({ eventType: eventType, deviceType });
		sendEvents(eventsToSend);
		eventsToSend = [];
	});
});

["bidResponse", "bidWon"].forEach((eventType) => {
	document.addEventListener(eventType, (e) => {
		var detail = e.detail || {};
		eventsToSend.push({
			eventType: eventType,
			deviceType: deviceType,
			adapter: detail.adapterCode,
			creativeId: detail.creativeId,
			cpm: detail.cpm,
		});
		sendEvents(eventsToSend);
		eventsToSend = [];
	});
});

function sendEvents(events) {
	if (!events.length) return;

	const payload = JSON.stringify(events);

	const blob = new Blob([payload], { type: "application/json" });

	navigator.sendBeacon(
		"https://intern-project-server-production.up.railway.app/events",
		blob,
	);
}

function getDeviceType() {
	const regex =
		/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return regex.test(navigator.userAgent) ? "mobile" : "desktop";
}
