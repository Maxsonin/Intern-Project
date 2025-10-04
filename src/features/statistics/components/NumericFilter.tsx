const NumericFilter = ({ column, filters, handleFilterChange }: any) => {
	const current = filters[column.field] || {};

	const setEq = (value: string) => {
		handleFilterChange(column.field, {
			eq: value ? Number(value) : undefined,
			gte: undefined,
			lte: undefined,
		});
	};

	const setGte = (value: string) => {
		handleFilterChange(column.field, {
			eq: undefined,
			gte: value ? Number(value) : undefined,
			lte: current.lte,
		});
	};

	const setLte = (value: string) => {
		handleFilterChange(column.field, {
			eq: undefined,
			gte: current.gte,
			lte: value ? Number(value) : undefined,
		});
	};

	return (
		<div className="flex flex-col gap-y-1">
			<input
				type="number"
				placeholder="equal to"
				value={current.eq ?? ""}
				onChange={(e) => setEq(e.target.value)}
				className="border px-1 rounded w-22"
			/>
			<div className="flex gap-1">
				<input
					type="number"
					placeholder="greater then"
					value={current.gte ?? ""}
					onChange={(e) => setGte(e.target.value)}
					className="border px-1 rounded w-30"
				/>
				<input
					type="number"
					placeholder="less then"
					value={current.lte ?? ""}
					onChange={(e) => setLte(e.target.value)}
					className="border px-1 rounded w-23"
				/>
			</div>
		</div>
	);
};

export default NumericFilter;
