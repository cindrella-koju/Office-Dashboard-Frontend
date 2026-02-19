import type { Dispatch, SetStateAction } from "react"
import Button from "./ui/Button"

interface PaginationProps{
  currentPage : number,
  limit : number,
  totalPage : number,
  setCurrentPage : Dispatch<SetStateAction<number>>
  setLimit : Dispatch<SetStateAction<number>>
}

export const Pagination = ({currentPage, limit, totalPage, setCurrentPage, setLimit}:PaginationProps) => {
    return(
        <div className="flex justify-between items-center mt-4 p-2 border-t">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>

        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <Button varient="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Button>
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPage}</span>
          <Button varient="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    )
}