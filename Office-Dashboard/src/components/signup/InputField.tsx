import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
  required? : boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
  isPasswordVisible,
  togglePasswordVisibility,
  required
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPasswordToggle && isPasswordVisible ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-sm px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                     transition-all duration-200 placeholder:text-gray-400"
          required={required}
        />
        {showPasswordToggle && togglePasswordVisibility && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-violet-700 text-lg"
          >
            {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;