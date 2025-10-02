import Button from "@/shared/components/ui/Button";

function PaginationControls({ pagination, setPage, setLimit }: any) {
	return (
		<div className="flex items-center m-3 px-2 gap-15">
			<span>
				Page {pagination.page} of {pagination.totalPages} | Total:{" "}
				{pagination.total}
			</span>

			<div className="flex gap-2">
				<Button
					disabled={pagination.page <= 1}
					onClick={() => setPage(pagination.page - 1)}
				>
					Prev
				</Button>
				<Button
					disabled={pagination.page >= pagination.totalPages}
					onClick={() => setPage(pagination.page + 1)}
				>
					Next
				</Button>
			</div>

			<div>
				<span className="mr-2">Items per page(max: 100):</span>
				<input
					type="number"
					value={pagination.limit}
					min={1}
					max={100}
					onChange={(e) => {
						const newLimit = parseInt(e.target.value, 10);
						if (!Number.isNaN(newLimit)) setLimit(newLimit);
					}}
					className="border rounded px-2 w-20"
				/>
			</div>
		</div>
	);
}

export default PaginationControls;
