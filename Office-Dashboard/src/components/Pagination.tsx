import Button from "./ui/Button"

export const Pagination = () => {
    return(
        <div className="flex justify-between items-center mt-4 p-2 border-t">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <Button varient="outline" size="sm">
            Previous
          </Button>
          <span className="text-sm text-gray-700">Page 1 of 10</span>
          <Button varient="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    )
}