import { useEffect, useState } from "react";

export default function LineItemPage() {
	const [formHtml, setFormHtml] = useState<string>("");

	useEffect(() => {
		fetch("http://localhost:3000/lineitemformpage", {
			credentials: "include",
		})
			.then((res) => res.text())
			.then((html) => setFormHtml(html))
			.catch((err) => console.error("Failed to load form:", err));
	}, []);

	useEffect(() => {
		if (!formHtml) return;

		const form = document.querySelector(
			".line-item-form form",
		) as HTMLFormElement;
		if (!form) return;

		const handleSubmit = async (e: Event) => {
			e.preventDefault();

			const formData = new FormData(form);

			for (const [k, v] of formData.entries()) {
				console.log("FormData:", k, v);
			}

			try {
				const response = await fetch("http://localhost:3000/lineitemformpage", {
					method: "POST",
					body: formData,
					credentials: "include",
				});

				if (!response.ok) throw new Error("Network response was not ok");

				const result = await response.json();
				console.log("Server response:", result);
				alert("Form submitted successfully!");
			} catch (err) {
				console.error(err);
				alert("Error submitting form. Check console for details.");
			}
		};

		form.addEventListener("submit", handleSubmit);

		return () => {
			form.removeEventListener("submit", handleSubmit);
		};
	}, [formHtml]);

	return (
		<div className="w-full max-w-4xl mx-auto mt-8">
			{formHtml ? (
				<div
					className="line-item-form"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <This is SSR content>
					dangerouslySetInnerHTML={{ __html: formHtml }}
				/>
			) : (
				<p>Loading form...</p>
			)}
		</div>
	);
}
