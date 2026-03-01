import React, { useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import Items from "./components/Items";
import { useState } from "react";

function App() {
  // states
  const [data, setData] = useState(() => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [sortBy, setSortBy] = useState("input");

  // sorted data
  let sortedData = [...data];
  if (data.length > 0) {
    if (sortBy === "alphabet") {
      sortedData.sort((a, b) => a.description.localeCompare(b.description));
    }
    if (sortBy === "packed")
      sortedData.sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  // handler functions
  function handleAddItem(newItem) {
    setData((prev) => [...prev, newItem]);
  }
  function handleToggleItem(id) {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }
  function handleDeleteItem(id) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  function handleConfirm() {
    setData([]);
    setShowOverlay(false);
  }
  function handleCancel() {
    setShowOverlay(false);
  }
  function handleClearList() {
    console.log("clicked");
    if (data.length === 0) return;
    setShowOverlay(true);
  }
  return (
    <div className="  relative  flex flex-col items-center  ">
      {showOverlay && data.length > 0 && (
        <Overlay
          showOverlay={showOverlay}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <Header />
      <Form onAddItem={handleAddItem} />
      {sortedData.length === 0 ? (
        <div className="w-full min-h-96 flex flex-col  items-center justify-center py-10 bg-zinc-100 text-zinc-400 ">
          <span className="text-4xl mb-2">🎈</span>
          <h1 className="italic font-medium">Your wacky list is empty!</h1>
          <p className="text-sm">Add an item above to get started.</p>
        </div>
      ) : (
        <List>
          {sortedData.map((item) => (
            <Items
              key={item.id}
              item={item}
              onToggleItem={handleToggleItem}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </List>
      )}

      <Footer
        data={data}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClearList={handleClearList}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;
