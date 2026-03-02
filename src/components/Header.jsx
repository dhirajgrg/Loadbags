import React from "react";
import { GiSchoolBag } from "react-icons/gi";

function Header() {
 

  return (
    <header  className="w-full text-center">
      <h1 className="text-3xl py-6 bg-zinc-900 text-zinc-100 font-black flex justify-center items-center gap-2">
        <GiSchoolBag />
        Wacky Bag
      </h1>
    </header>
  );
}

export default Header;
