import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Card from "../../../components/ui/Card";
import { RETRIEVE_OVERALL_TIESHEET_BY_ROUND } from "../../../constants/urls";
import OverallPointTable from "../../../components/pages/overallpoints/OverallPointTable";
import Filters from "../../../components/Filters";
import { useOverallPoints, type OverallPointResponse } from "../../../hooks/useOverallPoints";

export default function OverallPoints() {
  const eventId = localStorage.getItem("eventId");

  const {
    rounds,
    overallpoints,
    selectedRound,
    setSelectedRound,
    setOverallPoints,
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
                twoIdUrlFunction={RETRIEVE_OVERALL_TIESHEET_BY_ROUND}
                filters={rounds}
                label="Select Round"
                setSelectVal={setOverallPoints}
                onSelectFilter={setSelectedRound}
              />
            </div>
          </Card>
        )}

        <Card className="flex-1 h-[70%]">
          <div className="p-4 sm:p-6 h-full overflow-y-auto space-y-8">
            {overallpoints && overallpoints.map((round, roundIndex) => (
              <div key={roundIndex}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {round.round_name}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <OverallPointTable users={round.users} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </PageContent>
    </PageLayout>
  );
}