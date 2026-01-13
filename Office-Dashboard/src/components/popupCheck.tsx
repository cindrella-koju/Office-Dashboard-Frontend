import { useState, useMemo } from "react";

type AnyDict = Record<string, any>;

type Participant = {
  id: string | number;
  name: string;
};

const keyToLabel = (key: string) =>
  key
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const baseInputClasses =
  "w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

const baseLabelClasses =
  "block mb-2 text-gray-700 font-semibold text-sm";

const renderInput = (
  keyName: string,
  value: any,
  selectedMap: Record<string, Participant[]>,
  setSelectedMap: React.Dispatch<
    React.SetStateAction<Record<string, Participant[]>>
  >,
  globallySelectedIds: Set<string>
) => {

  if (
    Array.isArray(value) &&
    value.every((v) => typeof v === "object" && "id" in v)
  ) {
    const selected = selectedMap[keyName] ?? [];

    return (
      <>
        <select
          multiple
          className={baseInputClasses}
          onChange={(e) => {
            const selectedIds = Array.from(
              e.target.selectedOptions
            ).map((o) => o.value);

            const selectedObjects = value.filter((v: Participant) =>
              selectedIds.includes(String(v.id))
            );

            setSelectedMap((prev) => ({
              ...prev,
              [keyName]: selectedObjects,
            }));
          }}
        >
          {value.map((p: Participant) => {
            const isSelectedHere = selected.some(
              (s) => String(s.id) === String(p.id)
            );

            const isDisabled =
              globallySelectedIds.has(String(p.id)) &&
              !isSelectedHere;

            return (
              <option
                key={p.id}
                value={p.id}
                disabled={isDisabled}
              >
                {p.name}
                {isDisabled ? " (Already selected)" : ""}
              </option>
            );
          })}
        </select>

        {selected.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">
              Selected {keyToLabel(keyName)}
            </p>
            <div className="flex flex-wrap gap-2">
              {selected.map((p) => (
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
      </>
    );
  }

  return null;
};

export function DynamicInserPopUp({
  eventPage,
  title,
}: {
  eventPage: AnyDict;
  title: string;
}) {
  const [selectedParticipants, setSelectedParticipants] = useState<
    Record<string, Participant[]>
  >({});

//  GLOBAL LOCKED IDS
  const globallySelectedIds = useMemo(() => {
    const ids = new Set<string>();
    Object.values(selectedParticipants).forEach((arr) => {
      arr.forEach((p) => ids.add(String(p.id)));
    });
    return ids;
  }, [selectedParticipants]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white rounded-xl p-6 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>

        {Object.entries(eventPage).map(([key, value]) => (
          <div key={key} className="mb-6">
            <label className={baseLabelClasses}>
              {keyToLabel(key)}
            </label>

            {renderInput(
              key,
              value,
              selectedParticipants,
              setSelectedParticipants,
              globallySelectedIds
            )}
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
