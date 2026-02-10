import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  id: number;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const bgColors: Record<ToastType, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`w-80 max-w-lg ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300`}
    >
      {message}
    </div>
  );
};

export default Toast;
