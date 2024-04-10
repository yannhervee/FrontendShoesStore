import React, { useEffect, useState } from "react";
import LeftMenu from "@/components/leftMenu";
import axios from "axios";
import Link from "next/link";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    priceRange: []
  });

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Initialize filtered products with all products
        console.log("products", res.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Function to handle filter changes
  const handleFilterChange = (filterType, values) => {
    const newFilters = { ...filters, [filterType]: values };
    setFilters(newFilters);

    let filtered = [...products];

    // Apply all active filters together
    if (Object.values(newFilters).flat().length > 0) {
      filtered = filtered.filter((product) => {
        return Object.entries(newFilters).every(([type, selectedValues]) => {
          if (type === "size" && selectedValues.length > 0) {
            return selectedValues.some((size) => product.sizes.includes(parseInt(size)));
          }
          if (type === "color" && selectedValues.length > 0) {
            return selectedValues.some((color) => product.color_names.includes(color));
          }
          if (type === "priceRange" && selectedValues.length > 0) {
            return selectedValues.some((priceRange) => {
              const [minStr, maxStr] = priceRange.split(" - ");
              const minPrice = parseInt(minStr.replace("$", ""));
              const maxPrice = parseInt(maxStr.replace("$", ""));
              return product.price >= minPrice && product.price <= maxPrice;
            });
          }
          return true;
        });
      });
    }

    setFilteredProducts(filtered);
  };


  return (
    <div className="container mx-auto mt-8 flex ml-0">
      <LeftMenu onFilterChange={handleFilterChange} />
      <div className="flex-1 ml-4 mr-4, ml-32">
        <h1 className="text-3xl font-bold mb-4">Women’s Eco Friendly Shoes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
             filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} passHref>
              <div key={product.id} className="bg-blue-500 p-4 rounded-md overflow-hidden block">
                <div className="h-32 w-full bg-blue-700 mb-4"></div>
                <p className="text-white font-bold text-lg">{product.name}</p>
                <p className="text-gray-300">{product.category_name}</p>
                <p className="text-green-400 font-bold">${product.price}</p>
              </div>
              </Link>
            ))

            
          )}
        
        </div>
      </div>
    </div>
  );
};

export default Products;
