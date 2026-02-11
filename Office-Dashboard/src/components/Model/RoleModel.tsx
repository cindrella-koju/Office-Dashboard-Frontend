import { type Dispatch, type SetStateAction } from "react";
import ModalWrapper from "../pages/shared/ModelWrapper";
import type { ModelType } from "../../type/main.type";
import { RoleFields } from "../../constants/fields";
import type { RolePayload } from "../../services/role.service";



interface RoleModelProps {
  modeltype: ModelType;
  setModelType: Dispatch<SetStateAction<ModelType>>;
  todisplay: string;
  permissionDetail : RolePayload  
  setPermissionDetail : Dispatch<SetStateAction<RolePayload>>;
  handleSubmit : (e:React.FormEvent) => void;
  handleBoolValue: (id: string, boolFor: string, checked: boolean) => void; 
}

const extractPageInsert = (pagename: string) => {
  const str = pagename.replace(/ /g, "_");
  return `${str}_page`;
};

export default function RoleModel({ modeltype, setModelType, todisplay, setPermissionDetail, permissionDetail, handleSubmit, handleBoolValue }: RoleModelProps) {

  return (
    <ModalWrapper
      title={`${modeltype === "create" ? "Create" : "Edit"} Role`}
      onClose={() => setModelType(null)}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Role Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="rolename"
            value={permissionDetail.rolename}
            onChange={(e) =>
              setPermissionDetail({
                ...permissionDetail,
                rolename: e.target.value,
              })
            }
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
            placeholder="Enter role name"
          />
        </div>

        {/* Permissions */}
        {RoleFields.map((fr) => (
          <RenderCheckBox
            key={fr.permission_name}
            modeltype={modeltype}
            id={fr.id}
            permission_name={fr.permission_name}
            label={fr.permission_type}
            todisplay={todisplay}
            handleBoolValue={handleBoolValue}
            permissionDetail={permissionDetail}
          />
        ))}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          >
            {modeltype === "create" ? "Create Role" : "Update Role"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

interface RenderCheckBoxProps {
  modeltype: ModelType;
  id: string;
  permission_name: string;
  label: string[];
  todisplay?: string;
  handleBoolValue: (id: string, bool_for: string, checked_val: boolean) => void;
  permissionDetail: typeof RoleModel.prototype.permissionDetail;
}

function RenderCheckBox({
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
