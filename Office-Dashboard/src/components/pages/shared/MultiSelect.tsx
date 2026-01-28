interface Option {
  id: string
  label: string
}

interface MultiSelectProps {
  label: string
  options: Option[] | undefined
  value: string[]
  onChange: (ids: string[]) => void
  required?: boolean
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  required
}: MultiSelectProps) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ids = Array.from(e.target.selectedOptions).map(o => o.value)
    onChange(ids)
  }

  return (
    <>
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <select
          multiple
          value={value}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 min-h-[150px]"
          required={required}
        >
          {options?.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {value.length > 0 && (
        <div className="mb-5">
          <p className="text-sm font-semibold mb-2">
            Selected ({value.length})
          </p>

          <div className="flex flex-wrap gap-2">
            {value.map(id => {
              const item = options?.find(o => o.id === id)

              return (
                <span
                  key={id}
                  className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-2"
                >
                  {item?.label}
                  <button
                    type="button"
                    className="font-bold"
                    onClick={() =>
                      onChange(value.filter(v => v !== id))
                    }
                  >
                    ×
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
