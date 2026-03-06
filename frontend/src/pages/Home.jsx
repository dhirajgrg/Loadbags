import React, { useEffect } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import List from "../components/List";
import Footer from "../components/Footer";
import Overlay from "../components/Overlay";
import Items from "../components/Items";
import { useState } from "react";
import axios from "axios";

function Home() {
  // states
  const [data, setData] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [sortBy, setSortBy] = useState("input");

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:3000/api/items", {
          withCredentials: true,
        });
        const items = response.data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setData(items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItems();
  }, []);

  // sorted data
  let sortedData = [...data];
  if (data.length > 0) {
    if (sortBy === "alphabet") {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "packed")
      sortedData.sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  // handler functions
  async function handleAddItem(newItem) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/items",
        {
          title: newItem.title,
          quantity: newItem.quantity,
          packed: newItem.packed,
        },
        { withCredentials: true },
      );
      const created = response.data;
      setData((prev) => [...prev, { ...created, id: created._id }]);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleToggleItem(id) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/items/${id}/toggle`,
        {},
        { withCredentials: true },
      );
      const updated = response.data;
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...updated, id: updated._id } : item)),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteItem(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/items/${id}`,
        { withCredentials: true },
      );
      console.log(response.data);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleConfirm() {
    try {
      const response = await axios.delete("http://localhost:3000/api/items", {
        withCredentials: true,
      });
      console.log(response.data);
      setData([]);
    } catch (error) {
      console.log(error);
      setData([]);
    }
    setShowOverlay(false);
  }
  function handleCancel() {
    setShowOverlay(false);
  }
  async function handleClearList() {
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
          <h1 className="italic font-medium">Your check list is empty!</h1>
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

export default Home;
