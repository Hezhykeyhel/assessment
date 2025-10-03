/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from "lucide-react";

const DeleteModal = ({
  entry,
  onConfirm,
  onCancel,
}: {
  entry: any;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in">
      <div className="p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertCircle className="text-red-600" size={24} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Delete Entry?
        </h3>

        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete "
          <span className="font-semibold">{entry.title}</span>"? This action
          cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            data-testid="cancel-delete-button"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            data-testid="confirm-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteModal;
