import React from "react";

function Footer({ data, sortBy, setSortBy, onClearList }) {
  const dataLength = data.length;
  const packedItemLength = data.filter((item) => item.packed).length;

  return (
    <footer className="w-full bg-zinc-100 px-6 py-8 mt-auto flex flex-col items-center gap-6 border-t border-zinc-200">
      {/* Stats Section */}
      <p className="text-zinc-600 text-center font-medium italic">
        Looks like you have {dataLength} goofy item{dataLength !== 1 ? "s" : ""}
        , {packedItemLength} of which is done!
      </p>

      {/* Actions Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <select
          className="w-full sm:w-auto border-[1px] border-zinc-300 rounded-md px-4 py-2 text-zinc-600 bg-white outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input</option>
          <option value="alphabet">Sort by alphabet</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button
         
          className={`w-full sm:w-auto bg-zinc-900 text-zinc-100 px-6 py-2 rounded-md font-medium transition-all 
            ${
              data.length===0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-red-700 active:scale-95 hover:-translate-y-1"
            }`}
          onClick={onClearList}
        >
          Wipe the Slate Clean!
        </button>
      </div>
    </footer>
  );
}

export default Footer;
