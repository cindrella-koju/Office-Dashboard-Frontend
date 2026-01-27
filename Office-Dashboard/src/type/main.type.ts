export type FieldProps = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  options?: string[];
};

export type ModelType = "create" | "edit" | null;