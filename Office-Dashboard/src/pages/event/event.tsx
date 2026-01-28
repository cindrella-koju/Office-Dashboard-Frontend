import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import { type Event, type EventResponse, type EventStatus } from "./event.type";
import FilterComponent from "../../components/Filters";
import { usePermissions } from "../../hooks/userPermission";
import useFetch from "../../hooks/useFetch";
import {
  CREATE_EVENT,
  RETRIEVE_EVENT,
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
import Table from "../../components/Tables";


export default function EventPage() {
  const { data: retrieve_events, loading, error } =
    useFetch<EventResponse[]>(RETRIEVE_EVENT);

  const permissions = usePermissions("event");

  const [tablehead, setTablehead] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [eventMode, setEventMode] =
    useState<"create" | "edit" | null>(null);

  const [eachEventDetail, setEachEventDetail] =
    useState<EventResponse>();
  const [originalEvent, setOriginalEvent] =
    useState<EventResponse| null>(null);

  const [eventDetail, setEventDetail] = useState<Event>({
    id: "",
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    status: "draft",
    progress_note: "",
  });


  const [submitEvent, setSubmitEvent] =
    useState<"create" | "edit" | null>(null);

  const filters: string[] = ["All", "Active", "Completed", "Draft"];
  const [filter, setFilter] = useState<"All" | EventStatus>("All");

//   Fetch events
  useEffect(() => {
    if (retrieve_events) {
      const headers = extractHeaders(retrieve_events);
      setTablehead(headers);
      setEvents(retrieve_events);
    }
  }, [retrieve_events]);

// Set Edit Data
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


// Get Changed field
  const getChangedFields = (
    original: EventResponse | null,
    current: typeof eventDetail
  ) => {
    if (!original) return {};

    const changed: Partial<typeof eventDetail> = {};

    (Object.keys(current) as (keyof typeof eventDetail)[]).forEach(
      (key) => {
        if (
          key !== "id" &&
          current[key] !== (original as any)[key]
        ) {
          changed[key] = current[key] as any;
        }
      }
    );

    return changed;
  };


//   Submit
  useCreateResource({
    trigger: submitEvent,
    method: submitEvent === "create" ? "POST" : "PATCH",
    endpoint:
      submitEvent === "create"
        ? CREATE_EVENT
        : UPDATE_EVENT(eventDetail.id),

    payload:
      submitEvent === "create"
        ? eventDetail
        : getChangedFields(originalEvent, eventDetail),

    page: "Event",

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

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <FilterComponent
            filters={filters}
            filter={filter}
            setFilter={setFilter}
          />
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="max-h-[500px] lg:max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Error loading events: {error}
              </div>
            ) : (
              <Table
                tablehead={tablehead}
                tabledata={events}
                permissions={permissions}
                showView
                setModelType={setEventMode}
                setValue={setEachEventDetail}
              />
            )}
          </div>
        </Card>

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