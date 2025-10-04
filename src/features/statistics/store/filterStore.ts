import { create } from "zustand";
import { usePaginationStore } from "./paginationStore";

type Filters = {
	eventType?: string[];
	deviceType?: string[];
	adapter?: string[];
	creativeId?: string;
	countryCode?: string;
	cpm?: { eq?: number; gte?: number; lte?: number };
	timestamp?: { from?: string; to?: string };
};

type Sort = {
	field: string;
	order: "asc" | "desc";
};

type FilterStore = {
	activeColumns: string[];
	filters: Filters;
	sort: Sort;
	setActiveColumns: (columns: string[]) => void;
	toggleColumn: (field: string) => void;
	setFilter: (field: string, value: any) => void;
	resetFilters: () => void;
	setSort: (field: string, order: "asc" | "desc") => void;
};

export const useFilterStore = create<FilterStore>((set, get) => ({
	activeColumns: [
		"eventType",
		"timestamp",
		"countryCode",
		"deviceType",
		"adapter",
		"creativeId",
		"cpm",
	],
	filters: {},

	sort: {
		field: "timestamp",
		order: "desc",
	},

	setActiveColumns: (columns) => set({ activeColumns: columns }),
	toggleColumn: (field) => {
		const { activeColumns } = get();
		set({
			activeColumns: activeColumns.includes(field)
				? activeColumns.filter((c) => c !== field)
				: [...activeColumns, field],
		});
	},

	setFilter: (field, value) => {
		usePaginationStore.getState().setPage(1);

		set((state) => ({
			filters: { ...state.filters, [field]: value },
		}));
	},

	resetFilters: () => {
		usePaginationStore.getState().setPage(1);
		set({ filters: {} });
	},

	setSort: (field, order) => {
		set({ sort: { field, order } });
	},
}));
