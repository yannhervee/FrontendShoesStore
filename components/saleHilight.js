import React, { useEffect, useState } from "react";
import Link from "next/link";

const SalesHighlight = () => {
    const [salesProducts, setSalesProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/product/getOnSaleProducts')
            .then(response => response.json())
            .then(data => {
                console.log("sales", data)
                setSalesProducts(data.slice(0, 3));  // Only display the first 3 items
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
        <div className="bg-teal-100 shadow-lg rounded-lg p-6 ml-4 mr-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {salesProducts.map(product => (
                    <Link href={`/products/${product.onSaleProducts.productId.id}`} passHref >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div style={{ width: '250px', height: '250px', overflow: 'hidden', margin: 'auto' }}>
                            {/* Image resized and centered within a fixed dimension container */}
                            <img src={product.images[0].url} alt={product.onSaleProducts.productId.name} style={{ height: '250px', width: '250px', objectFit: 'cover' }} />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold mb-1">{product.onSaleProducts.productId.name}</h3>
                            
                            <div className="flex justify-center items-baseline">
                                <span className="text-lg font-bold text-red-500 mr-2">${product.onSaleProducts.salePrice.toFixed(2)}</span>
                                <span className="text-sm line-through text-gray-400">${product.onSaleProducts.currentPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
            <div className="mt-6 text-center">
                <Link href="/sales" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                    Shop All Sales
                </Link>
            </div>
        </div>
    );
};

export default SalesHighlight;
