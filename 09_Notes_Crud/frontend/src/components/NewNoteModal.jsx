import { useState } from "react";
import { useAddNewNoteMutation } from "../redux/services/notes";


function NewNoteModal({ isOpen, onClose }) {
  const [addNewNote] = useAddNewNoteMutation();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });


  const handleNewNote = async () => {
    try {
      await addNewNote({ title: formData.title, content: formData.content }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container-lowest p-6 md:p-8 shadow-2xl border border-outline-variant/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline text-2xl font-bold text-on-surface">
            Create New Note
          </h3>
          <button
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="Write your note..."
            className="w-full min-h-40 rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-outline-variant/50 text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNewNote}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewNoteModal;
