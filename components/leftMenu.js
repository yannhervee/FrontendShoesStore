import React, { useState } from "react";

const LeftMenu = () => {
  const [expanded, setExpanded] = useState({
    size: false,
    gender: false,
    priceRange: false,
  });
  const filterOptions = {
    size: ["7", "8", "9"],
    gender: ["Women", "Men"],
    priceRange: ["$0 - $50", "$50 - $100"],
  };

  // Toggle function to handle expansion
  const toggleExpansion = (criterion) => {
    setExpanded((prev) => ({
      ...prev,
      [criterion]: !prev[criterion],
    }));
  };

  return (
    <nav className="bg-gray-300 text-gray-800 p-4">
      <div>
        <h2 className="text-lg font-bold mb-2">Filters</h2>

        {/* Size Filter */}
        <div className="mb-4">
          <div className="flex items-center">
            <button
              onClick={() => toggleExpansion("size")}
              className="text-blue-500 hover:underline mr-2"
            >
              {expanded.size ? "-" : "+"}
            </button>
            <h3 className="text-sm font-bold">Size</h3>
          </div>
          {expanded.size && (
            <ul>
              {filterOptions.size.map((option) => (
                <li key={option}>
                  <a href="#" className="hover:underline">
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Gender Filter */}
        <div className="mb-4">
          <div className="flex items-center">
            <button
              onClick={() => toggleExpansion("gender")}
              className="text-blue-500 hover:underline mr-2"
            >
              {expanded.gender ? "-" : "+"}
            </button>
            <h3 className="text-sm font-bold">Gender</h3>
          </div>
          {expanded.gender && (
            <ul>
              {filterOptions.gender.map((option) => (
                <li key={option}>
                  <a href="#" className="hover:underline">
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center">
            <button
              onClick={() => toggleExpansion("priceRange")}
              className="text-blue-500 hover:underline mr-2"
            >
              {expanded.priceRange ? "-" : "+"}
            </button>
            <h3 className="text-sm font-bold">Price Range</h3>
          </div>
          {expanded.priceRange && (
            <ul>
              {filterOptions.priceRange.map((option) => (
                <li key={option}>
                  <a href="#" className="hover:underline">
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LeftMenu;