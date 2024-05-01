import React, { useEffect, useState } from "react";
import Link from "next/link";

const Sales = () => {
    const [salesProducts, setSalesProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/product/getOnSaleProducts')
            .then(response => response.json())
            .then(data => {
                console.log("sales", data);
                setSalesProducts(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className="flex flex-col h-screen justify-between mt-16 "> {/* Ensures the container fills the height */}
            <div className="container mx-auto px-4"> {/* Removed unnecessary margins */}
                <h1 className="text-3xl font-bold mb-4">Today's deals</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {salesProducts.map((product) => (
                        <Link href={`/products/${product.onSaleProducts.productId.id}`} passHref>
                            <div className="bg-white hover:bg-teal-100 p-4 rounded-md overflow-hidden block transition-colors duration-300">
                                <div className="h-64 w-full mb-4"> {/* Standardized image container height */}
                                    <img src={product.images[0].url} alt={product.onSaleProducts.productId.name} className="w-full h-full object-contain rounded-lg mb-4" />
                                </div>
                                <p className="text-gray-900 font-bold text-lg">{product.onSaleProducts.productId.name}</p>
                                <p className="text-gray-500">{product.onSaleProducts.productId.category.category}</p>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-bold text-red-500">${product.onSaleProducts.salePrice.toFixed(2)}</span>
                                    <span className="text-sm line-through text-gray-400">${product.onSaleProducts.currentPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Optionally add footer or additional content here */}
        </div>
    );
};

export default Sales;
