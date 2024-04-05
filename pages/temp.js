import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// import { selectUser } from "../features/userSlice";
import { cartItems, selectCart } from '@/globalRedux/features/cartSlice';
import { addToGuestCart } from '@/globalRedux/features/guestCartActions';
import guestCartReducer from '@/globalRedux/features/guestCartSlice';


const ShoppingCartPage = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Running Shoes',
      price: 120.00,
      quantity: 1,
      color: 'Black',
      size: '10',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Sneakers',
      price: 85.00,
      quantity: 1,
      color: 'White',
      size: '9',
      image: 'https://via.placeholder.com/150',
    }
  ];

  // Calculate total price
  const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    // Implement removal logic here
    console.log(`Remove product with id ${productId} from cart`);
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex max-w-6xl w-full">
        {/* Shopping Cart */}
        <div className="flex flex-col flex-1 mr-4 max-w-[806px]">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {products.map(product => (
            <div key={product.id} className="flex items-center border-b border-gray-300 py-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 mr-4"></div>
              <div className="flex flex-col flex-1">
                <div className="text-lg font-semibold">{product.name}</div>
                <div className="text-gray-600">Color: {product.color}</div>
                <div className="text-gray-600">
                  <label htmlFor={`size-${product.id}`}>Size:</label>
                  <select
                    id={`size-${product.id}`}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none ml-2"
                    defaultValue={product.size}
                  >
                    {[6, 7, 8, 9, 10, 11].map(size => (
                      <option key={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="text-gray-600">
                  <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                  <select
                    id={`quantity-${product.id}`}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none ml-2"
                    defaultValue={product.quantity}
                  >
                    {[1, 2, 3, 4, 5].map(quantity => (
                      <option key={quantity}>{quantity}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-lg font-semibold">${product.price}</div>
              <button className="text-gray-500 underline ml-4" onClick={() => removeFromCart(product.id)}>Remove</button>
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
          <div className="flex justify-between w-full mb-2">
            <div>Shipping</div>
            <div>Free</div>
          </div>
          <div className="flex justify-between w-full mb-2">
            <div>Tax</div>
            <div>$0.00</div>
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

export default ShoppingCartPage;

