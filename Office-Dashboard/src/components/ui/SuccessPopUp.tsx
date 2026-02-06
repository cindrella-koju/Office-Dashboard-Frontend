import React from "react";

interface SuccessPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
