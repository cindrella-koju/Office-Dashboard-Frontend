import React, {  useState } from "react";
import NavBar from "../../components/Navbar";
import { type Event, type EventResponse } from "../../type/event.type";
import { usePermissions, type Permission } from "../../hooks/userPermission";
import {
  PageContent,
  PageHeader,
  PageLayout,
} from "../../components/layout/PageLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyMessage from "../../components/ui/EmptyMessage";
import Table from "../../components/table/Tables";
import Filters from "../../components/Filters";
import { FaTrophy } from "react-icons/fa";
import { useEvent } from "../../hooks/event/useEvent";
import { useEventForm } from "../../hooks/event/useEventForm";
import EventModel from "../../components/Model/EventModel";
import ConfirmationModal from "../../components/Model/ConfirmationPopUp";
import { Pagination } from "../../components/Pagination";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function EventPage() {

  const permissions = usePermissions<Permission>({});
  const {
    events,
    setEvents,
    createEvent,
    updateEvent,
    loading,
    error,
    tablehead,
    deleteEvent,

    currentPage,
    limit, 
    totalPage,
    setCurrentPage,
    setLimit,
    setStatus
  } = useEvent()

  const [eventMode, setEventMode] = useState<"create" | "edit" | null>(null);
  const [ editEvent, setEditEvent] = useState<Event | undefined>(undefined);
  const [popUpDelete, setPopUpDelete] = useState<boolean>(false)

  const {
    eventDetail,
    setEventDetail,
    getChangedFields, 
    closeFunction,
    handleChange
  } = useEventForm(editEvent)

  // Filter setup
  const filterOptions = [
    { id: "all", name: "All" },
    { id: "active", name: "Active" },
    { id: "completed", name: "Completed" },
    { id: "draft", name: "Draft" },
  ];


  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault()
    if (eventMode === "create") await createEvent(eventDetail);
    if (eventMode === "edit") {
      if (!editEvent?.id) return;
      await updateEvent(editEvent.id, getChangedFields());
    }
    setEventMode(null)
    setEditEvent(undefined)
    closeFunction()
  }

  const onClose = () => {
    setEventMode(null)
    closeFunction()
  }


  return (
    <PageLayout sidebar={<NavBar />}>
      <PageContent>
        <PageHeader
          title="📅 Events"
          actions={
            permissions.canCreateEvents  && (
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
          <div className="p-4 sm:p-6">
            <Filters<EventResponse>
              defaultVal={filterOptions[0]}
              filters={filterOptions}
              label="Select Status"
              setSelectVal={setEvents}
              currentPage = {
                currentPage
              }
              totalPage = {totalPage}
              limit = {limit}
              setStatus={setStatus}
              setCurrentPage={setCurrentPage}
              setLimit={setLimit}
            />
          </div>
        </Card>

        {/* Table Section */}
        <Card className="p-4 sm:p-6">
          <div className="max-h-[500px] lg:max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12 gap-3">
                <LoadingSpinner size="md" />
                <span className="text-gray-500">Loading events...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Error loading events
              </div>
            ) : events && events.items.length > 0 ? (
              <Table
                tablefor="Event"
                tablehead={tablehead}
                tabledata={events.items}
                permissions={permissions}
                showView
                setModelType={setEventMode}
                setValue={setEditEvent}
                setOnDelete={setPopUpDelete}
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
        {eventMode  && (
          <EventModel
            mode={eventMode}
            onClose={onClose}
            formData={eventDetail}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFormData={setEventDetail}
          />
        )}

        {
          editEvent &&
          <ConfirmationModal
            isOpen={popUpDelete}
            title="Delete"
            message={`Are you sure you want to delete ${editEvent.title}`}
            onCancel={() => setPopUpDelete(false)}
            onConfirm={() => {
              deleteEvent(editEvent.id)
              setPopUpDelete(false)
            }}
          />
        }

        {
          events && events.items.length > 0 && 
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
