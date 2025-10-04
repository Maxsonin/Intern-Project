const InputFilter = ({ column, handleFilterChange, filters }: any) => {
	return (
		<input
			type="text"
			placeholder="equal to"
			value={filters[String(column.field)] || ""}
			onChange={(e) =>
				handleFilterChange(column.field as string, e.target.value)
			}
			className="border px-1 rounded w-24"
		/>
	);
};

export default InputFilter;
