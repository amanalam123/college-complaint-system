import React from "react";

const Navbar = () => {
  const name = localStorage.getItem("name");
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary"
        />
        {/* <div className="w-8 h-8 bg-primary rounded-full"></div> */}

        <div className="flex items-center space-x-3">
  <span className="font-medium text-gray-700">
    {name ? `Hi, ${name}` : ""}
  </span>
  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
    {name ? name.charAt(0).toUpperCase() : ""}
  </div>
</div>

      </div>
    </div>
  );
};

export default Navbar;