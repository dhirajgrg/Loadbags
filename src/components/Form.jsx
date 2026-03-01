import { nanoid } from "nanoid";
import React from "react";
import { useState } from "react";

function Form({ onAddItem }) {
  // description state
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  // handle Form submit
  function handleSubmit(e) {
    e.preventDefault();
    // validation with guard clauss
    if (!description.trim()) return;
    // creating new Item
    const numberQuantity = Number(quantity) || 1;
    const newItem = {
      id: nanoid(),
      description,
      quantity: numberQuantity,
      packed: false,
    };

    // lifting new item
    onAddItem(newItem);
    // reseting input
    setQuantity("");
    setDescription("");
  }
  return (
    <form
      className="w-full bg-zinc-100 border-b-2  px-4 py-6 flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center sm:gap-6"
      onSubmit={handleSubmit}
    >
      <select
        className="w-full  sm:w-auto border-[1px] border-zinc-300 rounded-md px-3 py-2 text-zinc-600 bg-white cursor-pointer"
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
        className="w-full sm:flex-1 max-w-md border-[1px] border-zinc-300 text-zinc-600 rounded-md px-4 py-2"
        type="text"
        id="description"
        placeholder="What's on your wacky list?"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="w-full sm:w-auto bg-zinc-900 text-zinc-100 px-6 py-2 rounded-md font-medium hover:bg-zinc-700 hover:-translate-y-[1px] transition-all "
        type="submit"
      >
        Add Items!
      </button>
    </form>
  );
}

export default Form;
