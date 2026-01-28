interface FormFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  required?: boolean
  type?: string
}

export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text"
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}
