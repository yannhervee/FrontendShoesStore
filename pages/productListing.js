import React, { useEffect, useState } from "react";
import LeftMenu from "@/components/leftMenu";
import axios from "axios";
import Link from "next/link";
import SalesHighlight from "@/components/saleHilight";


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
    axios.get("http://localhost:8080/product")
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
            // console.log("Selected Colors:", selectedValues);
            // console.log("Product Colors:", product.color_names);
        
            return selectedValues.some((selectedColor) =>
                product.color_names.some((productColor) =>
                    productColor.toLowerCase() === selectedColor.toLowerCase()
                )
            );
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

  if (loading ) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <SalesHighlight/>
    <div className="container mx-auto mt-8 flex ml-0">
      <LeftMenu onFilterChange={handleFilterChange} />
      

      <div className="flex-1 ml-4 mr-4, ml-32">
        <h1 className="text-3xl font-bold mb-4">Women’s Eco Friendly Shoes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredProducts.map((product) => (
              <Link key={product.productId} href={`/products/${product.productId}`} passHref>
                <div key={product.productId} className="bg-white hover:bg-green-600 p-4 rounded-md overflow-hidden block transition-colors duration-300">
                  <div className="h-64 w-full mb-4">
                    <img src={product.image.url} alt={"shoes image"} className="w-full h-full object-contain rounded-lg mb-4" />
                  </div>
                  <p className="text-gray-900 font-bold text-lg">{product.name}</p>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-black font-bold">${product.price}</p>
                </div>
              </Link>
            
            
            ))

            
          )}
        
        </div>
      </div>
    </div>
    </>
  );
};

export default Products;
