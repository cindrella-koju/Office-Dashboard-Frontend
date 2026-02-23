import type { RenderCheckBoxProps } from "../../../type/role.type";
import { extractPageInsert } from "../../../utils/role.utils";

export function RenderCheckBox({
  permission_name,
  label,
  todisplay,
  id,
  modeltype,
  handleBoolValue,
  permissionDetail,
}: RenderCheckBoxProps) {
  if (todisplay && id && todisplay !== id && modeltype === "edit") return null;
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-4 shadow-sm">
      <div className="bg-gray-50 px-4 py-3">
        <h3 className="text-base font-semibold text-gray-800">{permission_name}</h3>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {label.map((l) => {
          const lowerLabel = l.toLowerCase();
          const isChecked =
            id === "page"
              ? permissionDetail.roleaccessdetail[extractPageInsert(lowerLabel)] || false
              : id === "event" || id === "user" || id === "role"
              ? permissionDetail[`can_${lowerLabel}_${id}s`] || false
              : permissionDetail[`can_${lowerLabel}`] || false;

          return (
            <label
              key={lowerLabel}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                name={lowerLabel}
                checked={isChecked}
                onChange={(e) => handleBoolValue(id, e.target.name.toLowerCase(), e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{l}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}