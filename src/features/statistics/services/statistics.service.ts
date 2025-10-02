const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchEvents(payload: any) {
	const response = await fetch(`${BASE_URL}/stat/events`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch events");
	}

	return response.json();
}

export async function downloadEvents(payload: any, format: "csv" | "xlsx") {
	const response = await fetch(`${BASE_URL}/stat/events/export/${format}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to download file");
	}

	const blob = await response.blob();
	const downloadUrl = window.URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = downloadUrl;
	document.body.appendChild(link);
	link.click();
	link.remove();

	window.URL.revokeObjectURL(downloadUrl);
}
