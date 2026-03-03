import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Card from "../../../components/ui/Card";
import OverallPointTable from "../../../components/pages/overallpoints/OverallPointTable";
import Filters from "../../../components/Filters";
import { useOverallPoints} from "../../../hooks/useOverallPoints";
import type { OverallPointResponse } from "../../../type/overallpoint.type";
import { Pagination } from "../../../components/Pagination";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { FaChartBar } from "react-icons/fa";

export default function OverallPoints() {
  const { eventId }= useParams();

  const {
    rounds,
    overallpoints,
    selectedRound,
    setSelectedRound,
    setOverallPoints,
    tablehead,
    loading,
    error,

    currentPage,
    limit,
    totalPage,
    setCurrentPage,
    setLimit
  } = useOverallPoints(eventId ? eventId : "");

  return (
    <PageLayout sidebar={<EventNavBar />}>
      <PageContent>
        <PageHeader title="Overall Points" />

        {selectedRound && rounds && (
          <Card className="mb-6">
            <div className="p-4 sm:p-6">
              <Filters<OverallPointResponse[]>
                defaultVal={selectedRound}
                filters={rounds}
                label="Select Round"
                setSelectVal={setOverallPoints}
                onSelectFilter={setSelectedRound}
                setStatus={setSelectedRound}
                currentPage={1}
                totalPage={5}
                limit={10}
              />
            </div>
          </Card>
        )}

        <Card className="flex-1 h-[70%]">
          <div className="p-4 sm:p-6 h-full overflow-y-auto space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-12 gap-3">
                <LoadingSpinner size="md" />
                <span className="text-gray-500">Loading points...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Error loading points: {error}
              </div>
            ) : overallpoints && overallpoints.items.length > 0 ? (
              <div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <OverallPointTable users={overallpoints.items} tablehead={tablehead}/>
                </div>
              </div>
            ) : (
              <EmptyMessage
                message="No Points Data Yet"
                submessage="Points will appear here once matches are played"
                icon={<FaChartBar size={80} />}
              />
            )}
          </div>
        </Card>

        {overallpoints && overallpoints.items.length > 0 && (
          <Pagination
            currentPage={currentPage}
            limit={limit}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}