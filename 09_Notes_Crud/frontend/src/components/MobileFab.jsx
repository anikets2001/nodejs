function MobileFab({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden glass-fab fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center text-primary-dim shadow-2xl z-50 active:scale-90 transition-transform"
    >
      <span className="material-symbols-outlined text-3xl">add</span>
    </button>
  );
}

export default MobileFab;
