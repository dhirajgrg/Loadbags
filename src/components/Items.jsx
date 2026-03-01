import React from "react";

function Items({ item, onToggleItem, onDeleteItem }) {
  return (
    <li
      className={`flex items-center justify-between  md:w-full bg-zinc-200 px-4 py-2 mb-2 rounded-sm cursor-pointer ${item.packed ? "line-through" : ""}  `}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span className="text-zinc-600">
          {item.quantity} {item.description}
        </span>
      </div>
      <div className="">
        <button
          className="delete-btn hover:animate-bounce"
          title="Zap this item!"
          onClick={() => onDeleteItem(item.id)}
        >
          &#128465;
        </button>
      </div>
    </li>
  );
}

export default Items;
