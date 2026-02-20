import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Card from "../../../components/ui/Card";
import OverallPointTable from "../../../components/pages/overallpoints/OverallPointTable";
import Filters from "../../../components/Filters";
import { useOverallPoints} from "../../../hooks/useOverallPoints";
import type { OverallPointResponse } from "../../../type/overallpoint.type";
import { Pagination } from "../../../components/Pagination";

export default function OverallPoints() {
  const eventId = localStorage.getItem("eventId");

  const {
    rounds,
    overallpoints,
    selectedRound,
    setSelectedRound,
    setOverallPoints,
    tablehead,

    currentPage,
    limit,
    totalPage,
    setCurrentPage,
    setLimit
  } = useOverallPoints(eventId);

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
            {overallpoints && 
              <div>
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <OverallPointTable users={overallpoints.items} tablehead={tablehead}/>
                </div>
              </div>
            }
          </div>
        </Card>

                {
        <Pagination
            currentPage={currentPage}
            limit={limit}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
          />
        }
      </PageContent>
    </PageLayout>
  );
}