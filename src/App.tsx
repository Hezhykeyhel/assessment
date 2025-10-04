/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import "./App.css";
import { DeleteModal, EntryCard, FormModal, Toast } from "./component";

const API_BASE = "https://jsonplaceholder.typicode.com/posts";

const mockApiService = {
  async getAll() {
    const response = await fetch(API_BASE);
    const data = await response.json();
    return data
      .slice(0, 12)
      .map((item: { id: string; title: string; body: string }) => ({
        id: item.id,
        title: item.title.substring(0, 50),
        description: item.body.substring(0, 100),
        image: null,
        createdAt: new Date().toISOString(),
      }));
  },

  async create(entry: any) {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    return { ...entry, id: data.id, createdAt: new Date().toISOString() };
  },

  async update(id: any, entry: any) {
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    return { ...entry, id };
  },

  async delete(id: any) {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  },
};

// Main App Component
type Entry = {
  id: string | number;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
};

export default function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null
  );
  const [deleteConfirm, setDeleteConfirm] = useState<Entry | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    const filtered = entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEntries(filtered);
  }, [searchQuery, entries]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await mockApiService.getAll();
      setEntries(data);
    } catch (error) {
      showToast("Failed to load entries", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (formData: any) => {
    try {
      const newEntry = await mockApiService.create(formData);
      setEntries([newEntry, ...entries]);
      setShowForm(false);
      showToast("Entry created successfully!");
    } catch (error) {
      showToast("Failed to create entry", "error");
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!editingEntry) {
      showToast("No entry selected for editing", "error");
      return;
    }
    try {
      const updatedEntry = await mockApiService.update(
        editingEntry.id,
        formData
      );
      setEntries(
        entries.map((e) => (e.id === editingEntry.id ? updatedEntry : e))
      );
      setEditingEntry(null);
      setShowForm(false);
      showToast("Entry updated successfully!");
    } catch (error) {
      showToast("Failed to update entry", "error");
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await mockApiService.delete(id);
      setEntries(entries.filter((e) => e.id !== id));
      setDeleteConfirm(null);
      showToast("Entry deleted successfully!");
    } catch (error) {
      showToast("Failed to delete entry", "error");
    }
  };

  const handleEdit = (entry: any) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const initiateDelete = (entry: Entry) => {
    setDeleteConfirm(entry);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-opacity-10 backdrop-blur-sm sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white mb-4">Knowledge Base</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              size={20}
            />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-opacity-30"
              data-testid="search-input"
            />
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12" data-testid="empty-state">
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? "No entries found matching your search"
                : "No knowledge entries yet"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                Create your first entry
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onEdit={handleEdit}
                onDelete={() => initiateDelete(entry)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-30"
        data-testid="add-button"
      >
        <Plus size={24} />
      </button>

      {/* Form Modal */}
      {showForm && (
        <FormModal
          entry={editingEntry}
          onClose={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
          onSubmit={editingEntry ? handleUpdate : handleCreate}
        />
      )}

      {deleteConfirm && (
        <DeleteModal
          entry={deleteConfirm}
          onConfirm={() => handleDelete(deleteConfirm.id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type as "success" | "error"}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
