import Button from "@/shared/components/ui/Button";
import type { EventData } from "../hooks/useStatsData";
import type { Column } from "./Table";

interface SortControlsProps {
	sort: { field: string; order: "asc" | "desc" };
	setSort: (field: string, order: "asc" | "desc") => void;
	loadData: () => void;
	tableColumns: Column<EventData>[];
}

const SortControls = ({
	sort,
	setSort,
	loadData,
	tableColumns,
}: SortControlsProps) => (
	<div className="flex items-center gap-4 mb-4">
		<label className="flex items-center gap-2">
			<span className="text-sm font-medium">Sort by:</span>
			<select
				value={sort.field}
				onChange={(e) => setSort(e.target.value, sort.order)}
				className="border rounded px-2 py-1"
			>
				{tableColumns.map((col) => (
					<option key={col.field} value={col.field}>
						{col.headerName}
					</option>
				))}
			</select>
		</label>

		<label className="flex items-center gap-2">
			<span className="text-sm font-medium">Order:</span>
			<select
				value={sort.order}
				onChange={(e) => setSort(sort.field, e.target.value as "asc" | "desc")}
				className="border rounded px-2 py-1"
			>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>
		</label>

		<Button onClick={loadData} className="bg-indigo-600 hover:bg-indigo-700">
			Load Table
		</Button>
	</div>
);

export default SortControls;
