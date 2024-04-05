import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const fetchCartItems = async () => {
      const updatedCart = [];
      for (const item of storedCart) {
        try {
          const response = await axios.get(`/api/product_info_cart/${item.shoeId}/${item.selectedColor}/${item.selectedSize}`);
          const productInfo = response.data.product;
          const updatedItem = { ...item, ...productInfo };
          updatedCart.push(updatedItem);
        } catch (error) {
          console.error(`Error fetching product with ID ${item.id}:`, error);
        }
      }
      setCartItems(updatedCart);
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
  const removeFromCart = (shoeId) => {
    const updatedCart = cartItems.filter(item => item.shoeId !== shoeId);
    setCartItems(updatedCart);
    const updatedLocalStorageCart = updatedCart.map(item => ({
      shoeId: item.shoeId,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      quantity: item.quantity
    }));
    localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
  };

  // Function to handle quantity change
  const handleQuantityChange = (shoeId, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.shoeId === shoeId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    const updatedLocalStorageCart = updatedCart.map(item => ({
      shoeId: item.shoeId,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      quantity: item.quantity
    }));
    localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
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
                <div className="text-lg font-semibold">{item.product_name}</div>
                <div className="text-gray-600">Color: {item.selectedColor}</div>
                <div className="text-gray-600">Size: {item.selectedSize}</div>
                <div className="text-gray-600">
                  Quantity:
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.shoeId, parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none ml-2"
                  >
                    {quantityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-lg font-semibold">${item.price}</div>
              <button className="text-gray-500 underline ml-4" onClick={() => removeFromCart(item.shoeId)}>Remove</button>
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
          <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
