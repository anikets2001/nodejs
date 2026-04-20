import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteNoteMutation, useEditNoteMutation } from "../redux/services/notes";
import { setActiveNote } from "../redux/features/notesSlice";
import { formatDateTime } from "../../utils/helpers";


function EditorPane() {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notes.activeNote);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editNote, { isLoading: isSaving }] = useEditNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  const { date, time } = formatDateTime(activeNote?.updatedAt);

  useEffect(() => {
    setTitle(activeNote?.title ?? "");
    setContent(activeNote?.content ?? "");
  }, [activeNote]);

  const handleSave = async () => {
    if (!activeNote?._id) return;

    const payload = {
      id: activeNote._id,
      title: title.trim(),
      content: content.trim(),
    };

    try {
      const updatedNote = await editNote(payload).unwrap();
      dispatch(setActiveNote(updatedNote));
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleDelete = async () => {
    if (!activeNote?._id) return;

    try {
      await deleteNote(activeNote._id).unwrap();
      dispatch(setActiveNote(null));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="flex-1 bg-surface-container-lowest p-8 lg:p-16 overflow-y-auto relative">
      <div className="absolute top-8 right-8 flex items-center space-x-3">
        <button
          onClick={handleDelete}
          disabled={!activeNote?._id || isDeleting}
          className="p-3 text-error hover:bg-error-container/10 rounded-xl transition-all"
          title="Delete Note"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button
          onClick={handleSave}
          disabled={!activeNote?._id || isSaving}
          className="bg-primary px-8 py-3 rounded-full text-on-primary font-headline font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg filled-icon">
            check_circle
          </span>
          <span>{isSaving ? "Saving..." : "Save"}</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <input
          className="w-full bg-transparent border-none p-0 font-headline font-extrabold text-5xl text-on-background focus:ring-0 placeholder:text-surface-dim"
          placeholder="Untitled Entry"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex items-center space-x-6 mt-8 py-4 border-y border-outline-variant/10">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-lg text-outline">
              calendar_today
            </span>
            <span className="font-label text-xs text-outline font-medium">
              {date}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-lg text-outline">
              schedule
            </span>
            <span className="font-label text-xs text-outline font-medium">
              {time}  
            </span>
          </div>
        </div>

        <div>
          <textarea
            className="w-full min-h-[500px] bg-transparent border-none p-0 font-body text-lg leading-relaxed text-on-surface focus:ring-0 resize-none"
            placeholder="Begin your transcript here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorPane;
