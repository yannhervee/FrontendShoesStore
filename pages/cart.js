import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCart } from '@/components/cartContext';
import AuthPromptModal from '@/components/guesModal';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { updateCart, updateItemQuantity, removeItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('user');
  
      if (token && userId) {
        // Fetch cart items from the database for logged-in users
        console.log("user logged in")
        try {
            const response = await axios.get(`http://localhost:8080/user/cart/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("response from server", response.data)
            const updatedCart = [];
        for (const item of response.data) {
          console.log("item in loop ", item)
          try {
           // const response = await axios.get(`http://localhost:8080/product/productBySizeColor/${item.productId}/${item.sizeId}/${item.colorId}`);
            //const productInfo = response.data;
           // console.log("productInfo", productInfo)
            const appropriateImage = item.images.find(img => img.url.toLowerCase().includes(item.colorName.toLowerCase()));
          //  const updatedItem = { ...item, ...productInfo, imageUrl: appropriateImage ? appropriateImage.url : 'path/to/default/image' };
            const updatedItem = { ...item, quantity: item.quantity, stockQuantity: item.stockAvailable, imageUrl: appropriateImage ? appropriateImage.url : 'path/to/default/image' };
          //  const updatedItem = { ...item, ...productInfo, quantity: item.quantity, stockQuantity: productInfo.quantity };
            updatedCart.push(updatedItem);
          //  updatedCart.push(updatedItem);
          } catch (error) {
            console.error(`Error fetching product details for cart item with ID ${item.productId}:`, error);
          }
        }
        setCartItems(updatedCart);
        console.log("Cart items loaded from local storage:", updatedCart);
        } catch (error) {
            console.error('Failed to fetch cart from server:', error);
            setLoading(false);
        }
    
    
      } else {
        // Load cart items from local storage for guests
        console.log("user not logged in")
        const storedCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        const updatedCart = [];
        for (const item of storedCart) {
          try {
            const response = await axios.get(`http://localhost:8080/product/productBySizeColor/${item.productId}/${item.sizeId}/${item.colorId}`);
            const productInfo = response.data;
            const appropriateImage = productInfo.images.find(img => img.url.toLowerCase().includes(productInfo.colorName.toLowerCase()));
           // const updatedItem = { ...item, ...productInfo, imageUrl: appropriateImage ? appropriateImage.url : 'path/to/default/image' };
            const updatedItem = { ...item, ...productInfo, quantity: item.quantity, stockQuantity: productInfo.quantity, imageUrl: appropriateImage ? appropriateImage.url : 'path/to/default/image' };
            updatedCart.push(updatedItem);
          } catch (error) {
            console.error(`Error fetching product details for cart item with ID ${item.productId}:`, error);
          }
        }
        setCartItems(updatedCart);
        console.log("Cart items loaded from local storage:", updatedCart);
      }
      setLoading(false);
    };
  
    fetchCartItems();
  }, []);


  if (loading || !cartItems) {
    return <div>Loading...</div>;
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Function to remove an item from the cart
const removeFromCart = (productId, sizeId, colorId) => {
    console.log("remove")
    console.log("this are the item", cartItems)
   
    removeItem(productId, sizeId, colorId)
    const updatedCart = cartItems.filter(item => !(item.productId === productId && item.sizeId === sizeId && item.colorId === colorId));
    console.log('left items', updatedCart);
    

      // Assuming each item in your cart uniquely identifies a "cartProductId" or similar identifier
      const item = cartItems.find(item => item.productId === productId && item.sizeId === sizeId && item.colorId === colorId);
      if (!item) {
          console.error('Item not found in cart');
          return;
      }
      else{
        console.log("item to remove from back", item)
        const token = sessionStorage.getItem('token');
                const userId = sessionStorage.getItem('user'); // Assuming userId is stored in sessionStorage
                const shopping_cart = sessionStorage.getItem('cartId'); 
                //user if loggedIn
                if(token && userId && shopping_cart){
                   
                
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
            
                axios.delete(`http://localhost:8080/user/cart/${item.cartProductSizeColorId}`, { headers })
                .then(response => {
                    console.log('Axios delete response: for deleting item', response.data);
                })
                .catch(error => {
                    console.error('Error posting to cart:', error);
                    alert('Failed to save item in the cart. Please try again.');
                });
            }

      }
    // const updatedLocalStorageCart = updatedCart.map(item => ({
    //   productId: item.productId,
    //   sizeId: item.sizeId,
    //   colorId: item.colorId,
    //   quantity: item.quantity
    // }));
    // localStorage.setItem('shopping_cart', JSON.stringify(updatedLocalStorageCart));
    // // Manually trigger an update to context if in the same tab
    // window.dispatchEvent(new Event('storage'));
    setCartItems(updatedCart);
  };
  

  // Function to handle quantity change
  const handleQuantityChange = (productId, sizeId, colorId, newQuantity) => {
    // Find the item in the cart that matches the given combination of productId, sizeId, and colorId
    console.log("cart items", cartItems)

    console.log("combination ");
    console.log("product", productId);
    console.log("sizeId", sizeId);
    console.log("colorId", colorId)
    const updatedCart = cartItems.map(item => {
      
      if (item.productId === productId && item.sizeId === sizeId && item.colorId === colorId) {
        console.log("item is ", item);
        // Calculate the adjusted quantity considering the available stock quantity
        let adjustedQuantity = newQuantity;
        if(newQuantity > item.stockQuantity){
          adjustedQuantity = item.stockQuantity;
       
          // Display a message informing the user about the limited stock
          alert(`Sorry, only ${item.stockQuantity} item(s) available in stock.`);
        }
        
        // Update the quantity for the matched item
        updateItemQuantity(productId, sizeId, colorId, adjustedQuantity)
        return { ...item, quantity: adjustedQuantity };
      }
      return item;
    });
  
    // Update the cartItems state with the updated cart
    setCartItems(updatedCart);
  
    // Update the local storage with the updated cart
    const updatedLocalStorageCart = updatedCart.map(item => ({
      productId: item.productId,
      sizeId: item.sizeId,
      colorId: item.colorId,
      quantity: item.quantity
    }));
    localStorage.setItem('shopping_cart', JSON.stringify(updatedLocalStorageCart));
  };
  

const handleCheckout = (e) => {
    // Perform actions for checkout
    // For example, clear the cart
   // setCartItems([]);
   // localStorage.removeItem('shopping_cart');
    e.preventDefault();
    // Display a confirmation message
   // alert('Thank you for your purchase! Your order has been placed.');
   const token = sessionStorage.getItem('token');
   const userId = sessionStorage.getItem('user');

   if (!token || !userId) {
    console.log("here")
      setShowModal(true); 
   }else{
    router.push("/checkoutShip");
   }
    // Optionally, redirect the user to the checkout page
    // router.push('/checkout'); // Assuming you're using Next.js router
  };


  // Generate options for quantity dropdown
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex justify-center p-8">
      <div className="flex max-w-6xl w-full">
        {/* Shopping Cart */}
        <div className="flex flex-col flex-1 mr-4 max-w-[806px]">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b border-gray-300 py-4">
              <div className="flex-shrink-0 w-32 h-32 bg-gray-200 border-black mr-4">
              <img src={item.imageUrl} alt={"shoes image"} className="w-full h-full object-contain rounded-lg mb-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-lg font-semibold">{item.productName}</div>
                <div className="text-gray-600">Color: {item.colorName}</div>
                <div className="text-gray-600">Size: {item.size}</div>
                <div className="text-gray-600">
                  Quantity:
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId, item.sizeId, item.colorId,  parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none ml-2"
                  >
                    {quantityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-lg font-semibold">${item.price}</div>
              <button className="text-gray-500 underline ml-4" onClick={() => removeFromCart(item.productId, item.sizeId, item.colorId)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-between">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between w-full mb-2">
            <div>Subtotal</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex justify-between w-full mb-4">
            <div>Total</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800" onClick={handleCheckout}>Checkout</button>
          <AuthPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
