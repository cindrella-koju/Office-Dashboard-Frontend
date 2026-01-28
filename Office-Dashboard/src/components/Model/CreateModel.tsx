import type { Dispatch, SetStateAction } from "react";
import Button from "../ui/Button";
import type { ModelType } from "../../type/main.type";



interface CreateModelProps<T extends Record<string, any>> {
  modelType: ModelType;
  setModelType: Dispatch<SetStateAction<ModelType>>;
  title: string;

  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;

  setSubmit: Dispatch<SetStateAction<"create" | "edit" | null>>;

  fields: {
    label: string;
    name: keyof T;
    type: string;
    required?: boolean;
    options?: string[];
  }[];
}

export default function CreateModel<T extends Record<string, any>>({
  modelType,
  setModelType,
  title,
  formData,
  setFormData,
  fields,
  setSubmit
}: CreateModelProps<T>) {

  const resetFormData = () => {
    setFormData(
      fields.reduce((acc, field) => {
        if (field.type === "select" && field.options?.length) {
          (acc as any)[field.name] = field.options[0]; 
        } else {
          (acc as any)[field.name] = "";
        }
        return acc;
      }, {} as T)
    );
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modelType === "create" ? setSubmit("create") : setSubmit("edit");
  };

  return (
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
              resetFormData();  // Reset form data when closing the modal
              setModelType(null);
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field, index) => {
              if (modelType === "edit" && field.type === "password") return null;

              return (
                <div key={index}>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === "select" ? (
                    <select
                      name={String(field.name)}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      {field.options?.map(option => (
                        <option key={option} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={String(field.name)}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>

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