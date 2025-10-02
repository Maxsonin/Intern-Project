import { create } from "zustand";

type Pagination = {
	total: number;
	limit: number;
	page: number;
	totalPages: number;
};

type PaginationStore = {
	pagination: Pagination;
	setPagination: (pagination: Pagination) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
};

export const usePaginationStore = create<PaginationStore>((set, get) => ({
	pagination: {
		total: 0,
		limit: 50,
		page: 1,
		totalPages: 0,
	},

	setPagination: (pagination) => set({ pagination }),
	setPage: (page) => {
		const { pagination } = get();
		if (page > 0 && page <= pagination.totalPages) {
			set({ pagination: { ...pagination, page } });
		}
	},
	setLimit: (limit) => {
		const { pagination } = get();
		if (limit > 0 && limit <= 100) {
			set({
				pagination: {
					...pagination,
					limit,
					page: 1,
				},
			});
		}
	},
}));
