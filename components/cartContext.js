import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = ()=>{
        
    }
    const loadCart = () => {
        const storedCart = localStorage.getItem('shopping_cart');
        try {
            const items = storedCart ? JSON.parse(storedCart) : [];
            console.log(">>>ITEMS", items)
            setCartItems(items);
        } catch (error) {
            console.error('Failed to load cart from local storage:', error);
            setCartItems([]); // Fallback to empty array if there's an error
        }
    };

    const updateCart = (newCart) => {
        localStorage.setItem('shopping_cart', JSON.stringify(newCart));
        setCartItems(newCart);
    };

    const fetchCartFromBackend = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('user');
        if (token && userId) {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
                const response = await axios.get(`http://localhost:8080/user/cart/${userId}`, { headers });
                if (response.data && response.data) {
                    updateCart(response.data);
                     console.log("response after login and fetch", response.data)
      const cartId = response.data[0].cartId; // Assuming the response includes the cartId

      // Update local storage with fetched cart items
      //localStorage.setItem('shopping_cart', JSON.stringify(cartItems));

      // Update session storage with the cartId
      sessionStorage.setItem('cartId', cartId);
                } else {
                    setCartItems([]);  // Handle cases where no items are returned
                }
            } catch (error) {
                console.error('Failed to fetch cart from backend:', error);
                setCartItems([]);  // Fallback to empty array on error
            }
        }
    };

    useEffect(() => {
        loadCart();
        const token = sessionStorage.getItem('token'); // Attempt to fetch cart if token exists
        if (token) {
            fetchCartFromBackend();
        }

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
