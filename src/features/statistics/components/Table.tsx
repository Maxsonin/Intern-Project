import type React from "react";
import { useFilterStore } from "../store/filterStore";
import { usePaginationStore } from "../store/paginationStore";
import DateTimeFilter from "./DateTimeFilter";
import InputFilter from "./InputFilter";
import NumericFilter from "./NumericFilter";
import PaginationControls from "./PaginationControls";
import SelectorFilter from "./SelectorFilter";

export type Column<T> = {
	field: keyof T;
	headerName: string;
	width?: number | string;
	filterType?: "number" | "input" | "select" | "data";
	options?: string[];
};

type TableProps<T> = {
	data: T[];
	columns: Column<T>[];
};

function renderFilter<T>(
	col: Column<T>,
	filters: any,
	setFilter: (field: string, value: any) => void,
) {
	switch (col.filterType) {
		case "number":
			return (
				<NumericFilter
					column={col}
					filters={filters}
					handleFilterChange={setFilter}
				/>
			);
		case "data":
			return (
				<DateTimeFilter
					column={col}
					filters={filters}
					handleFilterChange={setFilter}
				/>
			);
		case "input":
			return (
				<InputFilter
					column={col}
					filters={filters}
					handleFilterChange={setFilter}
				/>
			);
		case "select":
			return col.options ? (
				<SelectorFilter
					column={col}
					filters={filters}
					handleFilterChange={setFilter}
				/>
			) : null;
		default:
			return null;
	}
}

export function Table<T>({ data, columns }: TableProps<T>) {
	const filters = useFilterStore((state) => state.filters);
	const setFilter = useFilterStore((state) => state.setFilter);

	const { pagination, setPage, setLimit } = usePaginationStore();

	return (
		<div className=" border rounded">
			<table className="min-w-full table-auto border-collapse border">
				<thead className="bg-gray-100">
					<tr>
						{columns.map((col) => (
							<th
								key={String(col.field)}
								className="border border-gray-300 px-3 py-2 text-left"
							>
								<div>{col.headerName}</div>
								{renderFilter(col, filters, setFilter)}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, idx) => (
						<tr key={idx} className="hover:bg-gray-100">
							{columns.map((col) => (
								<td
									key={String(col.field)}
									className="border border-gray-300 px-3 py-2"
								>
									{row[col.field] as React.ReactNode}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			<PaginationControls
				pagination={pagination}
				setPage={setPage}
				setLimit={setLimit}
			/>
		</div>
	);
}
