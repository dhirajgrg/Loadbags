import React from "react";
import { GiSchoolBag } from "react-icons/gi";
import { MdLogout } from "react-icons/md"; // Importing a logout icon
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("clicked logout");
    try {
      await axios.get("http://localhost:3000/api/auth/logout");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
    console.log("User logged out");
  };

  return (
    <header className="relative w-full text-center bg-zinc-900 text-zinc-100">
      <h1 className="text-3xl py-6 font-black flex justify-center items-center gap-2">
        <GiSchoolBag />
        jhola
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 md:bg-zinc-800 bg-red-600 md:hover:bg-red-600 transition-colors rounded-lg text-sm font-bold"
      >
        <MdLogout size={20} />
        <span className="hidden md:inline">Logout</span>
      </button>
    </header>
  );
}

export default Header;
