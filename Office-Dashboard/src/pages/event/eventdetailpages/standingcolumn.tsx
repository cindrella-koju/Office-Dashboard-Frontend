import { useEffect, useState } from "react";
import EventNavBar from "../../../components/EventNavbar";
import Card from "../../../components/ui/Card";
import useFetch from "../../../hooks/useFetch";
import { usePermissions } from "../../../hooks/userPermission";
import StandingColumnModel, { type RoundType } from "../../../components/Model/StandingColumnModel";
import { GET_ROUNDS_BY_EVENT, RETRIEVE_ROUNDS, RETRIEVE_STANDING_COLUMN } from "../../../constants/urls";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import extractHeaders from "../../../utils/extractHeader";

import EmptyMessage from "../../../components/ui/EmptyMessage";
import { FaChartBar } from "react-icons/fa";
import type { StandingColumnType } from "../../../type/standingcolumn.type";
import Filters from "../../../components/Filters";
import { type Round } from "../../../type/group.type";
import Table from "../../../components/table/Tables";

export default function StandingColumn() {
  const eventId = localStorage.getItem("eventId");
  const permissions = usePermissions("standingcolumn");
  const [viewMode, setViewMode] = useState<"create" | "edit" | null>(null);
  

  const { data : round_by_event } = useFetch<Round[]>(GET_ROUNDS_BY_EVENT(eventId ? eventId : ""))
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);

  // Fetch rounds data and get roundId from the first round
  const { data: rounds } = useFetch<RoundType[]>(eventId ? RETRIEVE_ROUNDS(eventId) : "");
  const roundId = selectedRound ? selectedRound.id : rounds?.[0]?.id;

  // Fetch standing column data based on the selected roundId
  const { data: standingColumnData, loading, error } = useFetch<StandingColumnType[]>(
    roundId ? RETRIEVE_STANDING_COLUMN(roundId) : ""
  );

    useEffect(() => {
    if (round_by_event && round_by_event.length > 0) {
      setSelectedRound(round_by_event[0]);
    }
  }, [round_by_event]);

  const [tableHead, setTableHead] = useState<string[]>([]);
  const [standingColumn, setStandingColumn] = useState<StandingColumnType[]>([]);
  const [colVal, setColVal] = useState<StandingColumnType>();

  // Update table header and standing column data once standingColumnData is fetched
  useEffect(() => {
    if (!standingColumnData) return;

    const headers = extractHeaders(standingColumnData);
    setTableHead(headers);
    setStandingColumn(standingColumnData);
  }, [standingColumnData]);

  return (
    <PageLayout sidebar={<EventNavBar />}>
      <PageContent>
        <PageHeader
          title="Standing Columns"
          actions={permissions.canCreate && (
            <Button onClick={() => setViewMode("create")}>Add Column</Button>
          )}
        />
        
        <Card className="mb-6">
          <div className="p-4 sm:p-6">
            {/* Filters Component */}
            {
              selectedRound && round_by_event&& (
                <Filters<StandingColumnType[]>
                  defaultVal={selectedRound}
                  urlFunction={RETRIEVE_STANDING_COLUMN}
                  filters={round_by_event}
                  label="Select Round"
                  setSelectVal={setStandingColumn}
                  onSelectFilter={setSelectedRound} // Pass setSelectedRound to handle filter changes
                />

              )
            }
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          {rounds && (
            <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  Error loading users: {error}
                </div>
              ) : (
                standingColumn.length > 0 ? (
                  <Table
                    tablehead={tableHead}
                    tabledata={standingColumn}
                    permissions={permissions}
                    setModelType={setViewMode}
                    setValue={setColVal}
                  />
                ) : (
                  <EmptyMessage 
                    message="No Standing Column Yet" 
                    submessage="Create Standing Column Based on Round" 
                    icon={<FaChartBar size={80} />}
                  />
                )
              )}
            </div>
          )}
        </Card>

        {viewMode != null && (
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