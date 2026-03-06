import { nanoid } from "nanoid";
import { useState } from "react";
import axios from "axios";

function Form({ onAddItem }) {
  // title state
  const [quantity, setQuantity] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  // handle Form submit
  function handleSubmit(e) {
    e.preventDefault();
    // validation with guard clauss
    if (!title.trim()) return;
    // creating new Item
    const numberQuantity = Number(quantity) || 1;
    const newItem = {
      id: nanoid(),
      title,
      quantity: numberQuantity,
      packed: false,
    };

    // lifting new item
    onAddItem(newItem);
    // reseting input
    setQuantity("");
    setTitle("");
    setError(null);
  }
  return (
    <form
      className="w-full bg-zinc-100 border border-zinc-300  px-4 py-6 flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center sm:gap-6"
      onSubmit={handleSubmit}
    >
      <select
        className="w-full  sm:w-auto border border-zinc-300 rounded-md px-3 py-2 text-zinc-600 bg-white cursor-pointer"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        className="w-full sm:flex-1 max-w-md border border-zinc-300 text-zinc-600 rounded-md px-4 py-2"
        type="text"
        id="title"
        placeholder="What's on your checklist?"
        required
        value={title}
          onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="w-full sm:w-auto bg-zinc-900 text-zinc-100 px-6 py-2 rounded-md font-medium hover:bg-zinc-700 hover:-translate-y-[1px] transition-all "
        type="submit"
      >
        Add Item!
      </button>
    </form>
  );
}

export default Form;
