import React from 'react';
import { useRouter } from 'next/router';

const DecisionModal = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) return null;

    const handleContinueShopping = () => {
        onClose(); // Close the modal
        router.back(); // Go back to the previous page
    };

    const handleCheckout = () => {
        onClose(); // Close the modal
        router.push('/cart') // Navigate to the cart page
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-lg font-semibold">Added to Cart!</h2>
                <p>Would you like to check out or continue shopping?</p>
                <div className="flex justify-around mt-4">
                    <button onClick={handleContinueShopping} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-150">
                        Continue Shopping
                    </button>
                    <button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DecisionModal;
