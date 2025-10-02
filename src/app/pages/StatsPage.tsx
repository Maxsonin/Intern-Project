import SortControls from "@/features/statistics/components/SortControlls";
import { type Column, Table } from "@/features/statistics/components/Table";
import useStatsData, {
	type EventData,
} from "@/features/statistics/hooks/useStatsData";
import { downloadEvents } from "@/features/statistics/services/statistics.service";
import { useFilterStore } from "@/features/statistics/store/filterStore";
import { usePaginationStore } from "@/features/statistics/store/paginationStore";
import Button from "@/shared/components/ui/Button";

const tableColumns: Column<EventData>[] = [
	{
		field: "eventType",
		headerName: "Event Type",
		filterType: "select",
		options: [
			"LoadPage",
			"LoadAdModule",
			"auctionInit",
			"auctionEnd",
			"bidRequested",
			"bidResponse",
			"bidWon",
		],
	},
	{ field: "timestamp", headerName: "Timestamp", filterType: "data" },
	{ field: "countryCode", headerName: "Country", filterType: "input" },
	{
		field: "deviceType",
		headerName: "Device Type",
		filterType: "select",
		options: ["mobile", "desktop"],
	},
	{
		field: "adapter",
		headerName: "Adapter",
		filterType: "select",
		options: ["lesko", "adtelligent", "bidmatic"],
	},
	{ field: "creativeId", headerName: "Creative ID", filterType: "input" },
	{ field: "cpm", headerName: "CPM", filterType: "number" },
];

const StatsPage = () => {
	const { activeColumns, filters, toggleColumn, sort, setSort } =
		useFilterStore();
	const { pagination } = usePaginationStore();
	const { tableData, loadData } = useStatsData();

	const fetchAndDownload = async (format: "csv" | "xlsx") => {
		try {
			const payload = {
				columns: activeColumns,
				filters,
				sort,
				pagination: { page: pagination.page, limit: pagination.limit },
			};

			await downloadEvents(payload, format);
		} catch (err) {
			console.error("Download failed:", err);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Statistics</h1>

			<div className="flex gap-2 mb-4">
				<Button
					className="bg-cyan-500 hover:bg-cyan-600"
					onClick={() => fetchAndDownload("csv")}
				>
					Export CSV
				</Button>
				<Button
					className="bg-green-500 hover:bg-green-600"
					onClick={() => fetchAndDownload("xlsx")}
				>
					Export Excel
				</Button>
			</div>

			<div className="flex flex-wrap gap-2 mb-4">
				{tableColumns.map((col) => (
					<Button
						key={col.field}
						onClick={() => toggleColumn(col.field)}
						variant={activeColumns.includes(col.field) ? "primary" : "inactive"}
					>
						{col.headerName}
					</Button>
				))}
			</div>

			<SortControls
				sort={sort}
				setSort={setSort}
				loadData={loadData}
				tableColumns={tableColumns}
			/>

			<Table
				data={tableData}
				columns={tableColumns.filter((c) => activeColumns.includes(c.field))}
			/>
		</div>
	);
};

export default StatsPage;
