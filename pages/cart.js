import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
    const fetchCartItems = async () => {
      const updatedCart = [];
      for (const item of storedCart) {
        try {                       ///productBySizeColor/{pid}/{sid}/{cid}
          const response = await axios.get(`http://localhost:8080/productBySizeColor/${item.productId}/${item.sizeId}/${item.colorId}`);
          const productInfo = response.data;
          console.log("info prod", response)
          const updatedItem = { ...item, ...productInfo, quantity: item.quantity, stockQuantity: productInfo.quantity };
          updatedCart.push(updatedItem);
        } catch (error) {
          console.error(`Error fetching product with ID ${item.id}:`, error);
        }
      }
      setCartItems(updatedCart);
      console.log("cart items", cartItems)
      setLoading(false);
    };
    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Function to remove an item from the cart
const removeFromCart = (productId, sizeId, colorId) => {
    console.log("remove")

    console.log("combination ");
    console.log("product", productId);
    console.log("sizeId", sizeId);
    console.log("colorId", colorId)
    const updatedCart = cartItems.filter(item => !(item.productId === productId && item.sizeId === sizeId && item.colorId === colorId));
    console.log('left items', updatedCart);
    setCartItems(updatedCart);
    const updatedLocalStorageCart = updatedCart.map(item => ({
      productId: item.productId,
      sizeId: item.sizeId,
      colorId: item.colorId,
      quantity: item.quantity
    }));
    localStorage.setItem('shopping_cart', JSON.stringify(updatedLocalStorageCart));
  };
  

  // Function to handle quantity change
  const handleQuantityChange = (productId, sizeId, colorId, newQuantity) => {
    // Find the item in the cart that matches the given combination of productId, sizeId, and colorId

    console.log("combination ");
    console.log("product", productId);
    console.log("sizeId", sizeId);
    console.log("colorId", colorId)
    const updatedCart = cartItems.map(item => {
      
      if (item.productId === productId && item.sizeId === sizeId && item.colorId === colorId) {
        console.log("item is ", item);
        // Calculate the adjusted quantity considering the available stock quantity
        const adjustedQuantity = Math.min(newQuantity, item.stockQuantity);
        if (adjustedQuantity !== newQuantity) {
          // Display a message informing the user about the limited stock
          alert(`Sorry, only ${item.stockQuantity} item(s) available in stock.`);
        }
        // Update the quantity for the matched item
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
  

const handleCheckout = () => {
    // Perform actions for checkout
    // For example, clear the cart
   // setCartItems([]);
   // localStorage.removeItem('shopping_cart');
  
    // Display a confirmation message
    alert('Thank you for your purchase! Your order has been placed.');
    router.push("/checkoutShip");
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
              <div className="flex-shrink-0 w-32 h-32 bg-gray-200 border-black mr-4"></div>
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
        </div>
      </div>
    </div>
  );
}

export default CartPage;
