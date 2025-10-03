/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const EntryCard = ({
  entry,
  onEdit,
  onDelete,
}: {
  entry: any;
  onEdit: (entry: any) => void;
  onDelete: (id: any) => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
      onTouchStart={() => setShowActions(true)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      data-testid="entry-card"
    >
      {entry.image && (
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3
          className="font-semibold text-gray-900 mb-2 line-clamp-2"
          data-testid="entry-title"
        >
          {entry.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {entry.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
          <div
            className={`flex gap-2 transition-opacity ${
              showActions ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            <button
              onClick={() => onEdit(entry)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              data-testid="edit-button"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              data-testid="delete-button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
