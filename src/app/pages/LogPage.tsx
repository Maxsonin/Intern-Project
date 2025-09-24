import { usePrebidLogger } from "@/features/log/hooks/usePrebidLogger";

const adId1 = "ad-frame-100";
const adId2 = "ad-frame-101";

const LogPage = () => {
	const logs = usePrebidLogger();

	return (
		<>
			<iframe id={adId1} title="ad0" scrolling="no" frameBorder="0"></iframe>
			<iframe id={adId2} title="ad1" scrolling="no" frameBorder="0"></iframe>

			<div style={{ padding: "20px", fontFamily: "monospace" }}>
				<h1>Prebid.js Logs</h1>
				<div
					style={{
						maxHeight: "80vh",
						overflowY: "scroll",
						border: "1px solid #ccc",
						padding: "10px",
					}}
				>
					{logs.map((log, idx) => {
						let color = "black";
						if (log.event === "bidResponse") color = "red";
						if (log.event === "bidWon") color = "blue";

						return (
							<pre key={log.id} style={{ color }}>
								{idx + 1}. [{log.event}] {log.message}
							</pre>
						);
					})}
				</div>
			</div>
			<div className="pl-6">
				Ми маємо в загальному 6 реклам у нашому аукціоці та 2 бідера bidmatic та
				adtelligent.
				<br />
				Звідси у нас має бути 12 <b>bidResponse</b> (bidmatic зазвичай потребує
				більше часу на обробку запиту тому якщо збільшити timeout то ми точно
				побачимо всі 12, а так зазвичай буде 1)
				<br />
				Так як у нас тільки може бути 2 переможця на 2 iframe ми маємо два
				повідомлення <b>bidWon</b>.
				<br />
				<br />
				<i>
					Можна впровадити оптимізацію яка буде робити аукціон тільки на ті
					юніти які є на сторінці, але з такою кількістю реклам можна й покищо
					залишити так
				</i>
			</div>
		</>
	);
};

export default LogPage;
