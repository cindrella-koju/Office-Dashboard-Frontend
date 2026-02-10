import type { Dispatch, SetStateAction } from "react";
import Button from "../ui/Button";
import type { ModelType } from "../../type/main.type";
import useFetch from "../../hooks/useFetch";
import { RETRIEVE_ROLE_ID_NAME } from "../../constants/urls";
import InputField from "../signup/InputField";
import SelectField from "../pages/shared/SelectField";
import type { Round } from "../../type/group.type";



interface CreateModelProps<T extends Record<string, any>> {
  modelType: ModelType;
  setModelType: Dispatch<SetStateAction<ModelType>>;
  title: string;

  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;

  setSubmit: Dispatch<SetStateAction<"create" | "edit" | null>>;

}

export default function CreateModel<T extends Record<string, any>>({
  modelType,
  setModelType,
  title,
  formData,
  setFormData,
  setSubmit
}: CreateModelProps<T>) {

  const {data : roles} = useFetch<Round[]>(RETRIEVE_ROLE_ID_NAME)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // setError("");
    };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modelType === "create" ? setSubmit("create") : setSubmit("edit");
  };

  return roles && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="
          bg-white rounded-2xl shadow-xl
          w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5
          max-h-[80vh] overflow-y-auto
          p-6
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {modelType === "edit" ? `Edit ${title}` : `Create ${title}`}
          </h2>
          <button
            onClick={() => {
              setModelType(null);
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <InputField
              label="Username"
              type="text"
              name="username"
              placeholder="Enter a username"
              value={formData.username}
              onChange={handleChange}
            />

            <InputField
              label="Full Name"
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              value={formData.fullname}
              onChange={handleChange}
            />

            <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
            />

              <SelectField
                label="Roles"
                value={formData.role_id}
                options={roles.map(r => ({
                  value : r.id,
                  label : r.name
                }))}
                name = "round_id"
                onChange={(value) => setFormData(prev => ({ ...prev, role_id: value }))}
                required
              />

          {/* Footer Button */}
          <div className="flex justify-end mt-6">
            <Button type="submit" fullWidth>
              {modelType === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}