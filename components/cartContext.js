import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Function to load cart from local storage
    const loadCart = () => {
        const storedCart = localStorage.getItem('shopping_cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    };

    // Function to update cart in both local storage and state
    const updateCart = (newCart) => {
        localStorage.setItem('shopping_cart', JSON.stringify(newCart));
        setCartItems(newCart);
    };

    useEffect(() => {
        loadCart();

        // Listen to local storage changes
        const handleStorageChange = () => {
            loadCart();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
