import ModalWrapper from "../pages/shared/ModelWrapper";
import { RoleFields } from "../../constants/fields";
import type { RoleModelProps } from "../../type/role.type";
import { RenderCheckBox } from "../pages/role/CheckBox";


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
            disabled={
              modeltype === "edit" &&
              (permissionDetail.rolename === "member" ||
              permissionDetail.rolename === "superadmin")
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


