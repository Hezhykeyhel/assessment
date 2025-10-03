import { AlertCircle, CheckCircle, X } from "lucide-react";

const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => (
  <div
    className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`}
  >
    {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-2">
      <X size={18} />
    </button>
  </div>
);

export default Toast;
