import EventNavBar from "../../../components/EventNavbar";
import Card from "../../../components/ui/Card";
import { usePermissions } from "../../../hooks/userPermission";
import StandingColumnModel from "../../../components/Model/StandingColumnModel";
import { RETRIEVE_STANDING_COLUMN } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { FaChartBar } from "react-icons/fa";
import type { StandingColumnType } from "../../../type/standingcolumn.type";
import Filters from "../../../components/Filters";
import Table from "../../../components/table/Tables";
import { useStandingColumn } from "../../../hooks/useStandingColumn";


export default function StandingColumn() {
  const eventId = localStorage.getItem("eventId");
  const permissions = usePermissions({});

  const {
    round_by_event,
    rounds,
    standingColumn,
    selectedRound,
    tableHead,
    viewMode,
    colVal,
    loading,
    error,
    setSelectedRound,
    setStandingColumn,
    setViewMode,
    setColVal,
  } = useStandingColumn(eventId);

  return (
    <PageLayout sidebar={<EventNavBar />}>
      <PageContent>
        <PageHeader
          title="Standing Columns"
          actions={permissions.canCreate && (
            <Button onClick={() => setViewMode("create")}>Add Column</Button>
          )}
        />

        {selectedRound && round_by_event && (
          <Card className="mb-6">
            <div className="p-4 sm:p-6">
              <Filters<StandingColumnType[]>
                defaultVal={selectedRound}
                urlFunction={RETRIEVE_STANDING_COLUMN}
                filters={round_by_event}
                label="Select Round"
                setSelectVal={setStandingColumn}
                onSelectFilter={setSelectedRound}
              />
            </div>
          </Card>
        )}

        <Card className="p-4 sm:p-6">
          {rounds && (
            <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  Error loading standing columns: {error}
                </div>
              ) : standingColumn.length > 0 ? (
                <Table
                  tablehead={tableHead}
                  tabledata={standingColumn}
                  permissions={permissions}
                  setModelType={setViewMode}
                  setValue={setColVal}
                  tablefor={null}
                  setOnDelete={() => { }}
                />
              ) : (
                <EmptyMessage
                  message="No Standing Column Yet"
                  submessage="Create Standing Column Based on Round"
                  icon={<FaChartBar size={80} />}
                />
              )}
            </div>
          )}
        </Card>

        {viewMode && (
          <StandingColumnModel
            viewMode={viewMode}
            eventId={eventId}
            setViewMode={setViewMode}
            colVal={colVal}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}