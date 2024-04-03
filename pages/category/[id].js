import LeftMenu from "@/components/leftMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductByCategory = () => {
  const router = useRouter();
  const { id } = router.query; // Get the category ID from the URL
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products by category ID from the API
    if (id) {
      axios.get(`http://localhost:3001/products/category/${id}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
          console.log('data', res.data);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]); // Trigger the effect when the category ID changes

  return (
    <div className="container mx-auto mt-8 flex">
      <LeftMenu />
      <div className="flex-1 ml-4">
        <h1 className="text-3xl font-bold mb-4">Women’s Eco Friendly Shoes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((shoe) => (
            <div key={shoe.id} className="bg-blue-500 p-4 rounded-md overflow-hidden">
              {/* Replace this with an image once you have backend data */}
              <div className="h-32 w-full bg-blue-700 mb-4"></div>
              <p className="text-white font-bold text-lg">{shoe.name}</p>
              <p className="text-gray-300">{shoe.category_name}</p>
              <p className="text-green-400 font-bold">${shoe.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
