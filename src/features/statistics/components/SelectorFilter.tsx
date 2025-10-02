import { useState } from "react";
import Button from "@/shared/components/ui/Button";

function SelectorFilter({ column, filters, handleFilterChange }: any) {
	const [open, setOpen] = useState(false);
	if (!column.options) return null;

	const current = filters[column.field] ?? [...column.options];

	return (
		<div className="relative inline-block">
			<Button onClick={() => setOpen((prev) => !prev)} className="text-xs">
				Filter
			</Button>

			{open && (
				<div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-xl">
					{column.options.map((opt: string) => (
						<label key={opt} className="flex items-center gap-y-1 gap-1">
							<input
								type="checkbox"
								checked={current.includes(opt)}
								onChange={() => {
									const newValue = current.includes(opt)
										? current.filter((v: string) => v !== opt)
										: [...current, opt];
									handleFilterChange(column.field, newValue);
								}}
								className="accent-blue-500"
							/>
							<span className="text-sm">{opt}</span>
						</label>
					))}
				</div>
			)}
		</div>
	);
}

export default SelectorFilter;
