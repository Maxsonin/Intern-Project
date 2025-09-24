import { useEffect, useState } from "react";

declare global {
	interface Window {
		pbjs?: {
			onEvent: (event: string, callback: (data: any) => void) => void;
		};
	}
}

export type PrebidLog = {
	id: string;
	event: string;
	message: string;
};

export const usePrebidLogger = () => {
	const [logs, setLogs] = useState<PrebidLog[]>([]);

	useEffect(() => {
		if (!window.pbjs) return;

		const events = ["bidResponse", "bidWon"];

		const addLog = (event: string, message: string) => {
			setLogs((prev) => [
				...prev,
				{ id: Date.now().toString() + Math.random(), event, message },
			]);
		};

		const listeners: { event: string; callback: (data: any) => void }[] = [];

		events.forEach((event) => {
			const callback = (data: any) => addLog(event, JSON.stringify(data));
			listeners.push({ event, callback });
			window.pbjs?.onEvent(event, callback);
		});

		return () => {
			listeners.forEach(({ event, callback }) => {
				if (window.pbjs && "offEvent" in window.pbjs) {
					// If Prebid supports removing listeners
					// @ts-expect-error
					window.pbjs.offEvent(event, callback);
				}
			});
		};
	}, []);

	return logs;
};
