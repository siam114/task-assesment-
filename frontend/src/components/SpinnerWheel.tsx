"use client"

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SpinnerWheel = () => {
  const categories = [
    "Arts and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Arts and Craft");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Spin Wheel</h2>

        {/* Dropdown beside title */}
        <div className="relative w-full max-w-xs">
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Select Task Category
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border rounded-lg px-4 py-2 text-left bg-white shadow-sm flex items-center justify-between text-gray-700"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`px-4 py-2 hover:bg-green-50 cursor-pointer ${cat === selectedCategory ? "bg-green-100 font-medium" : ""
                    }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Wheel */}
        <div className="relative w-72 h-72 mb-6">
          <div className="w-full h-full rounded-full border-[12px] border-red-500 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 rotate-[30deg] text-white text-sm font-semibold text-center">
              <div className="bg-green-500 flex items-center justify-center">Friends</div>
              <div className="bg-blue-500 flex items-center justify-center">Sport</div>
              <div className="bg-sky-500 flex items-center justify-center">Family</div>
              <div className="bg-orange-500 flex items-center justify-center">Arts and Craft</div>
              <div className="bg-amber-500 flex items-center justify-center">Nature</div>
              <div className="bg-green-700 flex items-center justify-center">Meditation</div>
            </div>
            <div className="w-6 h-6 bg-white rounded-full z-10"></div>
          </div>

          {/* Pointer Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-3 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-green-500" />
        </div>

        {/* Label Below Wheel */}
        <p className="text-sm text-gray-500 mb-4">Spin Wheel to pick your task</p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow">
            Spin 🎲
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow">
            Go To Task
          </button>
        </div>
      </div>
    </>
  );
};

export default SpinnerWheel;
