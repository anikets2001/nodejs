import { useState } from "react";
import EditorPane from "./components/EditorPane";
import MobileFab from "./components/MobileFab";
import NewNoteModal from "./components/NewNoteModal";
import NoteList from "./components/NoteList";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function App() {
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="light bg-surface text-on-surface antialiased overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="md:ml-64 h-screen flex flex-col relative">
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onNewNoteClick={() => setIsNewNoteModalOpen(true)}
        />
        <section className="flex flex-1 overflow-hidden">
          <NoteList />
          <EditorPane />
        </section>
        <MobileFab onClick={() => setIsNewNoteModalOpen(true)} />
      </main>
      <NewNoteModal isOpen={isNewNoteModalOpen} onClose={() => setIsNewNoteModalOpen(false)} />
    </div>
  );
}

export default App;
