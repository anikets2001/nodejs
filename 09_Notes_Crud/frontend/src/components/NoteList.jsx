import { useEffect } from "react";
import { useGetNotesQuery } from "../redux/services/notes";
import { useSelector, useDispatch } from "react-redux";
import { setActiveNote } from "../redux/features/notesSlice";


function NoteList() {
  const activeNote = useSelector((state) => state.notes.activeNote);
  const dispatch = useDispatch();

  const { data: notes, isLoading, error } = useGetNotesQuery();
  const hasNotes = (notes?.length || 0) > 0;

  useEffect(() => {
    if (!hasNotes) return;

    const activeStillExists = notes.some((note) => note?._id === activeNote?._id);
    if (!activeNote || !activeStillExists) {
      dispatch(setActiveNote(notes[0]));
    }
  }, [activeNote, dispatch, hasNotes, notes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notes</div>;
  }

  return (
    <div className="w-full md:w-80 lg:w-[400px] flex-shrink-0 bg-surface-container-low flex flex-col overflow-hidden">
      <div className="p-6 pb-2">
        <h2 className="font-headline font-bold text-2xl tracking-tight">
          Latest Thoughts
        </h2>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-outline mt-1">
          {notes?.length || 0} NOTE{notes?.length !== 1 ? "S" : ""} COLLECTED
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {notes?.map((note) => (
          <article
            key={note?._id}
            className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm ${activeNote?._id === note?._id ? "border-l-4 border-primary" : "border-l-4 border-transparent"} transition-all cursor-pointer group`}
            onClick={() => dispatch(setActiveNote(note))}
          >
            <h3 className="font-headline font-bold text-lg text-on-surface leading-tight mb-2">
              {note?.title}
            </h3>
            <p className="text-on-surface-variant text-sm line-clamp-2 font-body leading-relaxed">
              {note?.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
