import {  type Dispatch, type SetStateAction } from "react"
import ModalWrapper from "../pages/shared/ModelWrapper"
import MultiSelect from "../pages/shared/MultiSelect"
import type { ModelType } from "../../type/main.type"
import { useQualifier } from "../../hooks/qualifier/useQualifier"

interface QualifierModelType {
  selected : string[],
  setModelType : Dispatch<SetStateAction<ModelType>>,
  handleSubmit : (e:React.FormEvent) => void;
  setSelected : Dispatch<SetStateAction<string[]>>
}


export default function QualifierModule({ selected,setModelType, setSelected, handleSubmit }: QualifierModelType) {

  const {
    rounds,
    participants,
    roundId,
    setRoundId
  } = useQualifier()
  

  return (
    <ModalWrapper title="Add Qualifier" onClose={() => setModelType(null)}>
      <form onSubmit={handleSubmit}>

        {/* Round Select */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-sm">
            Round <span className="text-red-500">*</span>
          </label>

          <select
            value={roundId}
            onChange={e => {
              setRoundId(e.target.value)
              setSelected([])
            }}
            required
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Round</option>
            {rounds?.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Players */}
        <MultiSelect
          label="Players"
          options={participants?.map(p => ({
            id: p.user_id,
            label: p.username
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
