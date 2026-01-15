import { useState } from "react";

interface SelectItem {
  id: string;
  [key: string]: string;
}

const CREATE_FORM_RESPONSE: Record<string, any> = {
  round: [
    { id: '6c91ce67-7194-4bb1-83a3-2a3ecaa42cc8', name: 'Round 1' },
    { id: 'b9a2e444-abf7-46a1-a389-bb386bc81e99', name: 'Round 2' },
    { id: 'a1caa99c-ece3-4184-9e5e-13184e3ee1a9', name: 'Semi Final' },
    { id: 'b03be42c-5335-4c6b-8a5c-f4b9d68c4d35', name: 'Final' },
  ],
  group_name: 'string',
  participants: [
    { id: 'cd3932de-cc16-4868-9c96-998c681d1a80', username: 'dummy' },
    { id: '26c4bbac-3673-467a-b089-c36839d77e96', username: 'changed username' },
    { id: 'c397aa12-2214-4796-9a1d-4d1dc8c28974', username: 'user 3' },
  ],
};


export default function CreateGroupForm({ formResponse = CREATE_FORM_RESPONSE }) {
  // Initialize form data
  const initialState = Object.fromEntries(
    Object.entries(formResponse).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key+"_id", key === "participants" ? [] : value[0]?.id || ""];
      }
      if (typeof value === "string") {
        return [key, value];
      }
      return [key, ""];
    })
  );

  const [formData, setFormData] = useState(initialState);
  console.log("Form data:", formData)
  // Handle input/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, options } = e.target as HTMLSelectElement;

    if (e.target.multiple) {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);

      setFormData(prev => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can send formData to an API
    // fetch('/api/groups', { method: 'POST', body: JSON.stringify(formData) });
  };

  // Helper to get label for select options
  const getLabel = (item: SelectItem) => {
    const { id, ...rest } = item;
    return Object.values(rest)[0];
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(formResponse).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                multiple={key === "participants"}
              >
                {value.map((item: SelectItem) => (
                  <option key={item.id} value={item.id}>
                    {getLabel(item)}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (typeof value === "string") {
          return (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                id={key}
                name={key}
                type="text"
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
              />
            </div>
          );
        }

        return null;
      })}

      <button type="submit">Create</button>
    </form>
  );
}