function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`h-screen w-64 fixed left-0 top-0 bg-[#f3f4f3] dark:bg-stone-900 z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-8 space-y-2">
          <div className="px-8 mb-10">
            <h1 className="text-xl font-semibold text-[#303333] tracking-tight">The Archive</h1>
            <p className="text-xs uppercase tracking-wider text-[#303333]/50 mt-1">Personal Sanctuary</p>
          </div>
          <nav className="flex-1">
            <div className="bg-[#ffffff] dark:bg-stone-800 text-[#286a56] font-bold rounded-l-xl ml-4 p-3 shadow-sm flex items-center space-x-3 cursor-pointer group transition-all">
              <span className="material-symbols-outlined">sticky_note_2</span>
              <span className="font-label text-sm uppercase tracking-wider">All Notes</span>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
