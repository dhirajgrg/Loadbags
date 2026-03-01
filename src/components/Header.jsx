import React from "react";

function Header() {
  const headerStyle = {
    backgroundColor: "#e5e5f7",
    opacity: 0.8,
    backgroundImage: `
      radial-gradient(circle, transparent 20%, #e5e5f7 20%, #e5e5f7 80%, transparent 80%, transparent), 
      radial-gradient(circle, transparent 20%, #e5e5f7 20%, #e5e5f7 80%, transparent 80%, transparent), 
      linear-gradient(#444cf7 2px, transparent 2px), 
      linear-gradient(90deg, #444cf7 2px, #e5e5f7 2px)
    `,
    backgroundPosition: "0 0, 25px 25px, 0 -1px, -1px 0",
    backgroundSize: "50px 50px, 50px 50px, 25px 25px, 25px 25px",
  };

  return (
    <header style={headerStyle} className="w-full text-center">
      <h1 className="text-3xl py-6 bg-zinc-900 text-zinc-100 font-black">
        Wacky Bag
      </h1>
    </header>
  );
}

export default Header;
