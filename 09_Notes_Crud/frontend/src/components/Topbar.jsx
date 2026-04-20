
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../redux/features/notesSlice";
import { useSearchNotesQuery } from "../redux/services/notes";

function Topbar({ onNewNoteClick, onMenuClick }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchText.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const shouldSearch = debouncedSearch.length > 0;
  const { data: suggestions = [], isFetching } = useSearchNotesQuery(debouncedSearch, {
    skip: !shouldSearch,
  });

  const handleSelectSuggestion = (note) => {
    dispatch(setActiveNote(note));
    setSearchText(note?.title ?? "");
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-[#faf9f8] dark:bg-stone-950 w-full sticky top-0 z-30">
      <div className="flex justify-between items-center w-full px-8 py-4 mx-auto">
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-1 rounded text-on-surface hover:bg-surface-container transition-colors"
            onClick={onMenuClick}
            aria-label="Open sidebar menu"
          >
            <span className="material-symbols-outlined text-on-surface">menu</span>
          </button>
          <span className="text-2xl font-bold tracking-tight text-[#303333] dark:text-stone-100">Archive</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden lg:block relative w-64">
            <div className="bg-surface-container-low px-4 py-2 rounded-full items-center space-x-2 flex">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm font-label w-full"
                placeholder="Search insights..."
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
            </div>

            {isDropdownOpen && shouldSearch && (
              <div className="absolute top-12 left-0 right-0 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden z-50">
                {isFetching ? (
                  <div className="px-4 py-3 text-sm text-on-surface-variant">Searching...</div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-on-surface-variant">No matching notes</div>
                ) : (
                  suggestions.map((note) => (
                    <button
                      key={note?._id}
                      className="w-full text-left px-4 py-3 hover:bg-surface-container transition-colors border-b last:border-b-0 border-outline-variant/20"
                      onClick={() => handleSelectSuggestion(note)}
                    >
                      <p className="text-sm font-semibold text-on-surface line-clamp-1">{note?.title}</p>
                      <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{note?.content}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onNewNoteClick}
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-headline font-medium text-sm hover:opacity-80 active:scale-95 transition-all"
            >
              New Note
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
