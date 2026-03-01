import React from "react";

function List({ children }) {
  return (
    <div className=" bg-zinc-100 w-full min-h-96  ">
      <ul className="w-full   px-4 py-10 md:px-16  sm:grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-4   text-zinc-500">
        {children}
      </ul>
    </div>
  );
}

export default List;
