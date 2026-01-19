import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { CREATE_EVENT, UPDATE_EVENT } from '../../../constants/urls';

interface EventModelType {
  eventMode: 'create' | 'edit' | null;
  setEventMode: Dispatch<SetStateAction<'create' | 'edit' | null>>;
  editEventData?: EventData | null; // Optional prop when editing
  onEventSaved?: () => void; // callback to refresh parent data
}

interface EventData {
  id: string;
  title: string;
  description: string;
  startdate: string;
  enddate: string;
  status: string;
  progress_note: string;
}

export default function EventModel({ eventMode, setEventMode, editEventData, onEventSaved }: EventModelType) {
  const statusOptions = ["Draft","Active","Completed"];
  
  const [eventDetail, setEventDetail] = useState({
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    status: 'draft',
    progress_note: ''
  });

  // Populate form when editing
  useEffect(() => {
    if (eventMode === 'edit' && editEventData) {
      setEventDetail({
        title: editEventData.title,
        description: editEventData.description,
        startdate: editEventData.startdate,
        enddate: editEventData.enddate,
        status: editEventData.status,
        progress_note: editEventData.progress_note
      });
    } else {
      setEventDetail({
        title: '',
        description: '',
        startdate: '',
        enddate: '',
        status: 'draft',
        progress_note: ''
      });
    }
  }, [eventMode, editEventData]);

  useEffect(() => {
    console.log("Each Ecent Detail:",editEventData)
  },[editEventData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = eventMode === 'create' ? CREATE_EVENT : `${UPDATE_EVENT(editEventData?.id)}`;
      const method = eventMode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventDetail)
      });

      if (response.ok) {
        alert(`Event ${eventMode === 'create' ? 'created' : 'updated'} successfully!`);
        setEventMode(null);
        onEventSaved?.(); 
        window.location.reload()
      } else {
        alert(`Failed to ${eventMode === 'create' ? 'create' : 'update'} event.`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save Event. Please try again.');
    }
  };

  return eventMode && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {eventMode === 'edit' ? 'Edit Event' : 'Create Event'}
          </h2>
          <button onClick={() => setEventMode(null)} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <ReUseFields label="Event Name" type="text" value={eventDetail.title} setVal={setEventDetail} to_update="title" placeholder_info="Enter event title" isRequired={true}/>
          <ReUseFields label="Description" type="text" value={eventDetail.description} setVal={setEventDetail} to_update="description" placeholder_info="Enter event description" isRequired={false}/>
          <ReUseFields label="Start Date" type="date" value={eventDetail.startdate} setVal={setEventDetail} to_update="startdate" placeholder_info="" isRequired={true}/>
          <ReUseFields label="End Date" type="date" value={eventDetail.enddate} setVal={setEventDetail} to_update="enddate" placeholder_info="" isRequired={true}/>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold text-sm">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
              value={eventDetail.status}
              onChange={(e) => setEventDetail(prev => ({ ...prev, status: e.target.value }))}
              required
            >
              <option value="">Select Status</option>
              {statusOptions.map((statusItem, idx) => (
                <option key={idx} value={statusItem.toLowerCase()}>{statusItem}</option>
              ))}
            </select>
          </div>
        
          {
            eventMode === "edit" && (
                <ReUseFields label="Progress Note" type="text" value={eventDetail.progress_note} setVal={setEventDetail} to_update="progress_note" placeholder_info="Enter Progress Note" isRequired={false}/>
            )
          }

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {eventMode === 'create' ? 'Create Event' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  type: string;
  setVal: React.Dispatch<React.SetStateAction<any>>;
  to_update: string;
  placeholder_info: string | null;
  isRequired: boolean;
  value : string
}

const ReUseFields: React.FC<FieldProps> = ({ label, type, setVal, to_update, placeholder_info, isRequired,value }) => (
  <div className="mb-4">
    <label className="block mb-2 text-gray-700 font-semibold text-sm">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
      onChange={(e) => setVal((prev: any) => ({ ...prev, [to_update]: e.target.value }))}
      value = {value}
      placeholder={placeholder_info ?? ""}
      required={isRequired}
    //   value={(setVal as any)[to_update] ?? ''}
    />
  </div>
);

