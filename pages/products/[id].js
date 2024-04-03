import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const ProductDetailsPage = () => {
    const productDetails = {
        name: "Sample Shoe",
        price: 99.99,
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["Black", "White", "Blue", "Red"],
        // Additional product images
        additionalImages: [
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          // Add more image URLs as needed
        ],
      };
      const [shoe, setShoes] = useState({});
      const [loading, setLoading] = useState(true);
      const router = useRouter();
      const { id } = router.query; // Get the product ID from the URL
      const [selectedSize, setSelectedSize] = useState(null);
      const [selectedColor, setSelectedColor] = useState(null);

      

      
  useEffect(() => {
    // Fetch products by category ID from the API
    if (id) {
      axios.get(`http://localhost:3001/products/${id}`)
        .then((res) => {
          setShoes(res.data.product);
          setLoading(false);
          
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
          setLoading(false);
        });
    }
  }, [id]); // Trigger the effect when the category ID changes

    if (loading) {
        return <div>Loading...</div>;
    }


  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  

  return (
    <>
    <h1 className="text-3xl font-bold mb-4 text-center mt-24">{shoe.category_name}</h1>
    <div className="max-w-6xl mx-auto px-4 py-64 flex pt-20 pb-8">
        
      {/* Reasons to Buy */}
      <div className="flex flex-col justify-between mr-8">
        <p className="text-gray-700 mb-4">Why Buy Eco-Friendly Shoes?</p>
        <div className="mb-2">
          <p className="font-medium">1. Sustainable Materials</p>
          <p className="text-gray-600">Reduce environmental impact with eco-conscious materials.</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">2. Ethical Production</p>
          <p className="text-gray-600">Support fair labor practices and humane working conditions.</p>
        </div>
        <div>
          <p className="font-medium">3. Reduce Waste</p>
          <p className="text-gray-600">Contribute to reducing landfill waste with biodegradable components.</p>
        </div>
      </div>

      {/* Other product images */}
      <div className="flex flex-col items-center mr-8">

        {productDetails.additionalImages.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index}`} className="rounded-lg mb-4" />
        ))}
      </div>

      {/* Main Product Image */}
      <div className="relative flex-shrink-0 mr-8">
        <img src="https://via.placeholder.com/400" alt="Main product" className="w-full rounded-lg mb-4" />
        {/* Left arrow */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8">
          <div className="bg-white rounded-full p-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        {/* Right arrow */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-8">
          <div className="bg-white rounded-full p-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{shoe.name}</h1>
          <p className="text-gray-700 mb-4">Price: ${shoe.price.toFixed(2)}</p>
        </div>
        {/* Size Options */}
        <div className="mb-4">
            <label className="font-medium">Select Size:</label>
            <div className="flex mt-2">
                {shoe.sizes.map((size) => (
                    <button
                        key={size}
                        className={`border border-gray-300 rounded-md py-2 px-4 mr-2 ${selectedSize === size ? 'bg-black text-white' : ''}`}
                        onClick={() => handleSizeClick(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
        {/* Color Options */}
        <div className="mb-8">
            <label className="font-medium">Select Color:</label>
            <div className="flex mt-2 flex-wrap mb-8">
                {shoe.colors?.map((color) => (
                    <button
                        key={color}
                        className={`border border-gray-300 rounded-md py-2 px-4 mr-2 mb-2 ${selectedColor === color ? 'border-black' : ''}`}
                        style={{ width: '100px', height: '40px' }}
                        onClick={() => handleColorClick(color)}
                    >
                        {color}
                    </button>
                ))}
            </div>
        </div>


        {/* Add to Cart Button */}
        <button className="bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800">Add to Cart</button>
      </div>
    </div>
    <div className="mb-4 text-center ">
        <p> {shoe.description}</p>
    </div>
    </>
  );
}

export default ProductDetailsPage;

