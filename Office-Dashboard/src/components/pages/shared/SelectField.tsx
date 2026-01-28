interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  label: string
  options: SelectOption[] | undefined
  value: string
  onChange: (val: string) => void
  required?: boolean
}

export default function SelectField({
  label,
  options,
  value,
  onChange,
  required
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
      >
        <option value="">Select {label}</option>
        {options?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
