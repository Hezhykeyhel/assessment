/* eslint-disable @typescript-eslint/no-explicit-any */
import { X, Camera } from "lucide-react";
import React, { useState } from "react";

const FormModal = ({
  entry,
  onClose,
  onSubmit,
}: {
  entry: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    title: entry?.title || "",
    description: entry?.description || "",
    image: entry?.image || null,
  });
  const [imagePreview, setImagePreview] = useState(entry?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 border-b backdrop-blur-md z-40 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="w-full bg-opacity-10 border-2 border-gray-200 md:max-w-2xl md:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0  border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-400">
            {entry ? "Edit Entry" : "New Knowledge Entry"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} color="white" />
          </button>
        </div>

        <div className="p-6 space-y-6" data-testid="entry-form">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Machine calibration procedure"
              data-testid="title-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Detailed steps and observations..."
              data-testid="description-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Photo (Optional)
            </label>
            <div className="flex flex-col gap-4">
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-2 cursor-pointer right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <Camera size={20} className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  {imagePreview ? "Change Photo" : "Add Photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden text-white"
                  data-testid="image-input"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-400 cursor-pointer rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.description.trim()
              }
              className="flex-1 px-6 py-3 bg-blue-400 text-white rounded-lg cursor-pointer font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-button"
            >
              {isSubmitting ? "Saving..." : entry ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormModal;
