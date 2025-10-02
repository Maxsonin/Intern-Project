import { useState } from "react";

const DateTimeFilter = ({ column, filters, handleFilterChange }: any) => {
	const current = filters[column.field] || {};

	const [from, setFrom] = useState(current.from || "");

	const updateFilter = (newDate: string) => {
		if (!newDate) {
			setFrom("");
			handleFilterChange(column.field, { from: undefined, to: undefined });
			return;
		}

		const start = new Date(`${newDate}T00:00:00`);
		const end = new Date(`${newDate}T23:59:59`);

		const fromISO = start.toISOString();
		const toISO = end.toISOString();

		setFrom(newDate);
		handleFilterChange(column.field, { from: fromISO, to: toISO });
	};

	return (
		<div className="mt-1">
			<input
				type="date"
				value={from}
				onChange={(e) => updateFilter(e.target.value)}
				className="border px-1 py-0.5 rounded w-36"
			/>
		</div>
	);
};

export default DateTimeFilter;
