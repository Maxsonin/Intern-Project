import { useEffect, useState } from "react";
import { fetchEvents } from "../services/statistics.service";
import { useFilterStore } from "../store/filterStore";
import { usePaginationStore } from "../store/paginationStore";

export type EventData = {
	eventType: string;
	timestamp: string;
	countryCode: string;
	deviceType: string;
	adapter: string;
	creativeId: string;
	cpm: number;
};

interface Pagination {
	total: number;
	limit: number;
	page: number;
	totalPages: number;
}

interface ApiResponse {
	data: EventData[];
	pagination: Pagination;
}

const useStatsData = () => {
	const { activeColumns, filters, sort } = useFilterStore();
	const { pagination, setPagination } = usePaginationStore();
	const [tableData, setTableData] = useState<EventData[]>([]);

	const loadData = async () => {
		try {
			const res: ApiResponse = await fetchEvents({
				columns: activeColumns,
				filters,
				sort,
				pagination: { page: pagination.page, limit: pagination.limit },
			});
			setPagination(res.pagination);
			setTableData(res.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		loadData();
	}, [pagination.page, pagination.limit]);

	return { tableData, loadData };
};

export default useStatsData;
