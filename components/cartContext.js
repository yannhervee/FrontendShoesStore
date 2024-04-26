import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

   
    const updateItemQuantity = (productId, sizeId, colorId, newQuantity) => {
        const updatedCart = cartItems.map(item => {
            if (item.productId === productId && item.sizeId === sizeId && item.colorId === colorId) {
               // console.log("updating quanti item", item)
                // const adjustedQuantity = Math.min(newQuantity, item.stockQuantity);
                // if (adjustedQuantity !== newQuantity) {
                //     alert(`Sorry, only ${item.stockQuantity} item(s) available in stock.`);
                // }

                const token = sessionStorage.getItem('token');
                const userId = sessionStorage.getItem('user'); // Assuming userId is stored in sessionStorage
                const shopping_cart = sessionStorage.getItem('cartId'); 
                //user if loggedIn
                if(token && userId){
                    let body = {
                        ...item, // Assuming cartItem is defined elsewhere and should be included in every request
                        userId: parseInt(userId, 10), // Ensures userId is always treated as an integer
                        quantity: newQuantity
    
                    };
                    //if user has an active shoppingCart
                    if (shopping_cart) {
                        body.cartId = shopping_cart;
                    }
                
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
            
                axios.put('http://localhost:8080/user/cart', body, { headers })
                .then(response => {
                    console.log('Axios put response: for editing cart', response.data);
                })
                .catch(error => {
                    console.error('Error posting to cart:', error);
                    alert('Failed to save item in the cart. Please try again.');
                });
            }
                
                return { ...item, quantity: newQuantity };
            }
            console.log("item to be updated", item)
          
            return item;
        });
    
        updateCart(updatedCart); // Syncs with local storage or backend
    };

        // Function to remove an item from the cart
        const removeItem = (productId, sizeId, colorId) => {
            const updatedCart = cartItems.filter(item => !(item.productId === productId && item.sizeId === sizeId && item.colorId === colorId));
            updateCart(updatedCart);
            

            //find the item to remove. 
            
         
            
        };
    
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
        console.log("new cart ", newCart)
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
        <CartContext.Provider value={{ cartItems, updateCart, updateItemQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};
