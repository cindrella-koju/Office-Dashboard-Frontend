import { useState } from "react";

type AnyDict = Record<string, any>;

interface DynamicInserPopUpProps {
  eventPage: AnyDict;
  title: string;
}

const baseInputClasses =
  "w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200";

const baseLabelClasses = "block mb-2 text-gray-700 font-semibold text-sm";

const keyToLabel = (key: string) =>
  key
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

function parseOptions(value: string): string[] | null {
  try {
    if (value.startsWith("[")) {
      return JSON.parse(value.replace(/'/g, '"'));
    }
  } catch (e) {
    console.error("Failed to parse options:", e);
  }
  return null;
}

function FormField({
  fieldKey,
  value,
  setSelectedParticipants,
}: {
  fieldKey: string;
  value: any;
  setSelectedParticipants?: (v: any[]) => void;
}) {
  const label = keyToLabel(fieldKey);
  const isRequired = typeof value === "string" && !value.includes("None");

  // Handle string inputs
  if (value === "str" || value === "str or None") {
    return (
      <>
        <label className={baseLabelClasses}>
          {label}
          {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <input
          className={baseInputClasses}
          type="text"
          placeholder={`Enter ${label}`}
          required={isRequired}
        />
      </>
    );
  }

  // Handle date inputs
  if (value === "date" || value === "date or None") {
    return (
      <>
        <label className={baseLabelClasses}>
          {label}
          {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <input className={baseInputClasses} type="date" required={isRequired} />
      </>
    );
  }

  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return (
      <>
        <label className={baseLabelClasses}>
          {label}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select className={baseInputClasses}>
          <option value="">Select {label}</option>
          {value.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </>
    );
  }

  if (Array.isArray(value) && value.every((v) => typeof v === "object")) {
    return (
      <>
        <label className={baseLabelClasses}>
          {label}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select
          multiple
          className={baseInputClasses}
          onChange={(e) => {
            const selectedIds = Array.from(e.target.selectedOptions).map(
              (o) => o.value
            );
            const selectedObjects = value.filter((v) =>
              selectedIds.includes(String(v.id))
            );
            setSelectedParticipants?.(selectedObjects);
          }}
        >
          {value.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </>
    );
  }

  // Handle string enum pattern like "['draft','active'] or None"
  if (typeof value === "string") {
    const options = parseOptions(value);
    if (options) {
      return (
        <>
          <label className={baseLabelClasses}>{label}</label>
          <select className={baseInputClasses}>
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </>
      );
    }
  }

  return null;
}

export function DynamicInserPopUp({ eventPage, title }: DynamicInserPopUpProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<any[]>([]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

        {Object.entries(eventPage).map(([key, value]) => (
          <div key={key} className="mb-5">
            <FormField
              fieldKey={key}
              value={value}
              setSelectedParticipants={setSelectedParticipants}
            />
          </div>
        ))}

        {selectedParticipants.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Selected Participants</p>
            <div className="flex flex-wrap gap-2">
              {selectedParticipants.map((p) => (
                <span
                  key={p.id}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
