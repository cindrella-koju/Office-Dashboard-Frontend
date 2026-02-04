import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import { type Event, type EventResponse, type EventStatus } from "./event.type";
import { usePermissions } from "../../hooks/userPermission";
import useFetch from "../../hooks/useFetch";
import {
  CREATE_EVENT,
  RETRIEVE_EVENT,
  RETRIEVE_EVENT_BY_STATUS,
  UPDATE_EVENT,
} from "../../constants/urls";
import extractHeaders from "../../utils/extractHeader";
import {
  PageContent,
  PageHeader,
  PageLayout,
} from "../../components/layout/PageLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import CreateModel from "../../components/Model/CreateModel";
import useCreateResource from "../../hooks/useSubmit";
import { editEventFields, eventFields } from "../../constants/fields";
import EmptyMessage from "../../components/ui/EmptyMessage";
import Table from "../../components/table/Tables";
import Filters from "../../components/Filters";
import { FaTrophy } from "react-icons/fa";

export default function EventPage() {
  // Fetch events
  const { data: retrieve_events, loading, error, refetch } =
    useFetch<EventResponse[]>(RETRIEVE_EVENT);

  const permissions = usePermissions();

  const [tablehead, setTablehead] = useState<string[]>([]);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [eventMode, setEventMode] = useState<"create" | "edit" | null>(null);

  const [eachEventDetail, setEachEventDetail] = useState<EventResponse>();
  const [originalEvent, setOriginalEvent] = useState<EventResponse | null>(null);

  const [eventDetail, setEventDetail] = useState<Event>({
    id: "",
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    status: "draft",
    progress_note: "",
  });

  const [submitEvent, setSubmitEvent] = useState<"create" | "edit" | null>(null);

  // Filter setup
  const filterOptions = [
    { id: "all", name: "All" },
    { id: "active", name: "Active" },
    { id: "completed", name: "Completed" },
    { id: "draft", name: "Draft" },
  ];
  const [filter, setFilter] = useState<"All" | EventStatus>("All");

  // Populate table headers and events
  useEffect(() => {
    if (retrieve_events) {
      const headers = extractHeaders(retrieve_events);
      setTablehead(headers);
      setEvents(retrieve_events);
    }
  }, [retrieve_events]);

  // Set edit data when user selects an event
  useEffect(() => {
    if (!eachEventDetail) return;

    setOriginalEvent(eachEventDetail);

    setEventDetail({
      id: eachEventDetail.id,
      title: eachEventDetail.title,
      description: eachEventDetail.description,
      startdate: eachEventDetail.startdate,
      enddate: eachEventDetail.enddate,
      status: eachEventDetail.status,
      progress_note: eachEventDetail.progress_note,
    });
  }, [eachEventDetail]);

  // Get changed fields for PATCH request
  const getChangedFields = (
    original: EventResponse | null,
    current: typeof eventDetail
  ) => {
    if (!original) return {};

    const changed: Partial<typeof eventDetail> = {};

    (Object.keys(current) as (keyof typeof eventDetail)[]).forEach((key) => {
      if (key !== "id" && current[key] !== (original as any)[key]) {
        changed[key] = current[key] as any;
      }
    });

    return changed;
  };

  // Submit create or edit event
  useCreateResource({
    trigger: submitEvent,
    method: submitEvent === "create" ? "POST" : "PATCH",
    endpoint: submitEvent === "create" ? CREATE_EVENT : UPDATE_EVENT(eventDetail.id),
    payload:
      submitEvent === "create"
        ? eventDetail
        : getChangedFields(originalEvent, eventDetail),
    page: "Event",
    refetch: () => {
      refetch();
    },
    onSuccess: () => {
      setEventDetail({
        id: "",
        title: "",
        description: "",
        startdate: "",
        enddate: "",
        status: "draft",
        progress_note: "",
      });
      setEventMode(null);
      setOriginalEvent(null);
    },
    resetTrigger: () => setSubmitEvent(null),
  });

  return (
    <PageLayout sidebar={<NavBar />}>
      <PageContent>
        <PageHeader
          title="📅 Events"
          actions={
            permissions.canCreate && (
              <Button
                varient="primary"
                size="lg"
                onClick={() => setEventMode("create")}
              >
                Create Event
              </Button>
            )
          }
        />

        {/* Filter Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="p-4 sm:p-6">
            <Filters<EventResponse[]>
              defaultVal={filterOptions[0]}
              filters={filterOptions}
              urlFunction={RETRIEVE_EVENT_BY_STATUS}
              label="Select Status"
              setSelectVal={setEvents}
              onSelectFilter={(f:any) =>
                setFilter(f.id as "All" | EventStatus)
              }
            />
          </div>
        </Card>

        {/* Table Section */}
        <Card className="p-4 sm:p-6">
          <div className="max-h-[500px] lg:max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Error loading events
              </div>
            ) : events.length > 0 ? (
              <Table
                tablehead={tablehead}
                tabledata={events}
                permissions={permissions}
                showView
                setModelType={setEventMode}
                setValue={setEachEventDetail}
              />
            ) : (
              <EmptyMessage
                message="No Event Yet"
                submessage="Create event to see here"
                icon = {<FaTrophy size={80} />}
              />
            )}
          </div>
        </Card>

        {/* Create/Edit Modal */}
        {eventMode && (
          <CreateModel
            modelType={eventMode}
            setModelType={setEventMode}
            title="Event"
            formData={eventDetail}
            setFormData={setEventDetail}
            fields={eventMode === "edit" ? editEventFields : eventFields}
            setSubmit={setSubmitEvent}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}
