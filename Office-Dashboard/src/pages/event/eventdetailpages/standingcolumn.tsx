import EventNavBar from "../../../components/EventNavbar";
import Card from "../../../components/ui/Card";
import { usePermissions } from "../../../hooks/userPermission";
import StandingColumnModel from "../../../components/Model/StandingColumnModel";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { FaChartBar } from "react-icons/fa";
import type { StandingColumnType } from "../../../type/standingcolumn.type";
import Filters from "../../../components/Filters";
import Table from "../../../components/table/Tables";
import { useStandingColumn } from "../../../hooks/useStandingColumn";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";


export default function StandingColumn() {
  const { eventId }= useParams();
  const permissions = usePermissions({});

  const {
    round_by_event,
    rounds,
    standingColumn,
    selectedRound,
    tableHead,
    viewMode,
    loading,
    error,
    showDeleteColumn,
    setShowDeleteColumn,
    setSelectedRound,
    setStandingColumn,
    setViewMode,
    setColVal,
    colVal,
    createColumn,
    editColumn,
    deleteColumn,
    columnDetail,
    setColumnDetail,
  } = useStandingColumn(eventId ? eventId : "");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()

    if (viewMode === "create") createColumn(columnDetail)
    if (viewMode === "edit") editColumn(columnDetail.id, columnDetail)
    setViewMode(null)
  }
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
                filters={round_by_event}
                label="Select Round"
                setSelectVal={setStandingColumn}
                onSelectFilter={setSelectedRound}
                setStatus={setSelectedRound}
                currentPage={1}
                totalPage={5}
                limit={10}
              />
            </div>
          </Card>
        )}

        <Card className="p-4 sm:p-6">
          {rounds && (
            <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <LoadingSpinner size="md" />
                  <span className="text-gray-500">Loading columns...</span>
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
                  tablefor="WithinEvent"
                  setOnDelete={setShowDeleteColumn}
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
            setViewMode={setViewMode}
            rounds={rounds}
            handleSubmit={handleSubmit}
            columnDetail={columnDetail}
            setColumnDetail={setColumnDetail}
          />
        )}

        {colVal && (
          <ConfirmationModal
            isOpen={showDeleteColumn}
            title="Delete Column"
            message={`Are you sure you want to delete column "${colVal.column_field}"?`}
            onCancel={() => {
              setShowDeleteColumn(false);
            }}
            onConfirm={() => {
              deleteColumn(colVal.id);
              setShowDeleteColumn(false);
            }}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}