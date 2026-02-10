import React from "react";
import Button from "../ui/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: (id:string) => void;
  onCancel?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm ">

      <div
        className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-6 "
      >
        <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>

        <p className="text-gray-700 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

            <Button varient="danger" onClick={() => onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
