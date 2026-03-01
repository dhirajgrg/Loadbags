import React from "react";

function Overlay({ onConfirm, onCancel }) {
  return (
    // 1. Full-screen backdrop with blur
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm px-4">
      {/* 2. The actual Modal box */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full border border-zinc-200 transform transition-all scale-100">
        <h3 className="text-xl font-bold text-zinc-900 mb-2">
          Clear Everything?
        </h3>
        <p className="text-zinc-600 mb-6">
          Are you REALLY sure you want to wipe the slate clean? This can't be
          undone!
        </p>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700  hover:-translate-y-1 transition-all"
            onClick={onConfirm}
          >
            Zap it!
          </button>
          <button
            className="flex-1 bg-zinc-200 text-zinc-800 py-2 rounded-md font-bold hover:bg-zinc-300 hover:-translate-y-1 transition-all"
            onClick={onCancel}
          >
            Oops, No!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
