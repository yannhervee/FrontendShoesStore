import LeftMenu from "@/components/leftMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SalesHighlight from "@/components/saleHilight";

const ProductByCategory = () => {
  const router = useRouter();
  const { id } = router.query; // Get the category ID from the URL
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    priceRange: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/productByCategory/${id}`);
        setProducts(response.data);
        console.log(response.data)
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

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
            <div key={product.productId} className="bg-green-500 p-4 rounded-md overflow-hidden block">
              <div className="h-250 w-full mb-4">
              <img src={product.image.url} alt={"shoes image"} className="w-full h-full object-contain rounded-lg mb-4" />
                
              </div>
              <p className="text-white font-bold text-lg">{product.name}</p>
              <p className="text-gray-300">{product.category}</p>
              <p className="text-green-400 font-bold">${product.price}</p>
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

export default ProductByCategory;
