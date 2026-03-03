import {  type Dispatch, type SetStateAction } from "react"
import ModalWrapper from "../pages/shared/ModelWrapper"
import MultiSelect from "../pages/shared/MultiSelect"
import type { ModelType } from "../../type/main.type"
import { useParticipants } from "../../hooks/participants/useParticipants"


interface ParticipantsModuleType {
  selected : string[],
  setSelected : Dispatch<SetStateAction<string[]>>,
  setModelType : Dispatch<SetStateAction<ModelType>>;
  handleSubmit : (e:React.FormEvent) => void;
  eventID : string,
}

export interface User {
  id: string
  username: string
}

export default function ParticipantsModule({ selected, setSelected, setModelType, handleSubmit, eventID }: ParticipantsModuleType) {


  const {
    users
  } = useParticipants(eventID)



  return (
    <ModalWrapper title="Add Participants" onClose={() => {
      setModelType(null)
      setSelected([])
    }}>
      <form onSubmit={handleSubmit}>
        <MultiSelect
          label="Players"
          options={users?.map(u => ({
            id: u.id,
            label: u.username
          }))}
          value={selected}
          onChange={setSelected}
          required
        />

        <div className="flex justify-end">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}
