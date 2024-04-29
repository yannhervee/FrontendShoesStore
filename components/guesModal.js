import React from 'react';
import { useRouter } from 'next/router';

const AuthPromptModal = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) return null;

    const handleLoginRedirect = () => {
        onClose();  // Close the modal
        localStorage.setItem("guest", "guest")
        router.push('/login');  // Use the router to navigate to the login page
    };

    const handleSignupRedirect = () => {
        onClose();  // Close the modal
        localStorage.setItem("guest", "guest")
        router.push('/register');  // Use the router to navigate to the signup page
    };

   const handleGuestCheckout = () =>{
        onClose();
        router.push('/checkoutShip')
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">Ready to Checkout?</h2>
            <p className="mb-2">Please log in or sign up to continue with your purchase.</p>
            <p className="mb-4 text-sm text-gray-600">
                <strong>Why create an account?</strong><br />
                - Track your orders easily<br />
                - Faster checkout with saved addresses<br />
                - Get exclusive offers and early access to sales
            </p>
            <div className="flex justify-around mb-4">
                <button
                    onClick={handleLoginRedirect}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Log In
                </button>
                <button
                    onClick={handleSignupRedirect}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign Up
                </button>
            </div>
            <button
                onClick={handleGuestCheckout}
                className="bg-black text-white w-full py-2 rounded focus:outline-none focus:shadow-outline"
            >
                Continue as Guest {'>'}
            </button>
            <button
                onClick={onClose}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
            >
                ×
            </button>
        </div>
    </div>

    );
};

export default AuthPromptModal;
