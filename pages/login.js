import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCart } from '../components/cartContext';
import { useDispatch } from 'react-redux';
import { setUser } from '@/globalRedux/features/userSlice';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { updateCart } = useCart();

  const dispatch = useDispatch()
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const secretKey = 'LoveShoeEco3799!'
    // console.log("secretKey", secretKey)
    // const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    // console.log("encrypted", encryptedPassword)
  
    try {
        const response = await axios.post('http://localhost:8080/generateToken', {
            username: email,
            password,
          
        });
        console.log('login response:', response);
        
        //     const userData = await response.json();
            
        //     // Store user information securely in session storage
        console.log("response from login", response)
        sessionStorage.setItem('token', response.data.token);
                    //     // Store user information securely in session storage
        sessionStorage.setItem('user', response.data.userId);
        sessionStorage.setItem('firstName', response.data.firstName);
        console.log("set cartId", response.data.cartId);
        sessionStorage.setItem('cartId', response.data.cartId);
        console.log("Set user", response.data.firstName)
        dispatch(setUser(response.data.firstName))

        // Fetch and update cart details immediately after login
        await fetchAndUpdateCart();
            
            // Redirect to home page or user profile page
          const guest = localStorage.getItem("guest");
          if(guest){
            router.push('/cart')
          }
          else{
         router.push('/productListing');
          }
        
        // Navigate to another page or clear the form
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
};
const fetchAndUpdateCart = async () => {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('user');
 const cartId = sessionStorage.getItem("cartId")

  if (token && userId) {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.get(`http://localhost:8080/user/cart/${userId}`, { headers });
      let cartItems = response.data; // Assuming the response contains an array of items
      //updateCart(response.data.items);
      console.log("response after login and fetch cart", response.data)
   
      if (response.data) {
        //console.log("check what backend returns", response.data)
        const cartFromStorage = localStorage.getItem("shopping_cart")
        if(cartFromStorage){
          const localCart=JSON.parse(cartFromStorage)
          cartItems= [...cartItems, ...localCart]
          for(const item of localCart)
          { 
            const body = {...item, userId: parseInt(userId) , cartId }
            axios.post('http://localhost:8080/user/cart', body, { headers })
          }

        }
      

        updateCart(cartItems); // Use the updateCart function to update the context and UI
       // Assuming the response includes the cartId
       
    } else {
        updateCart([]); // No items returned, clear the cart
    }

      // Update local storage with fetched cart items
      //localStorage.setItem('shopping_cart', JSON.stringify(cartItems));

      // Update session storage with the cartId
      

      // Update cart count in your state or UI, if applicable
    //  updateCartCount(cartItems.length); // Ensure you have a method to update the cart count in the UI
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-my-image">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg ml-96">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-green-600">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-black">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mb-4"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm "
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/resetPassword" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center mt-6">
            <a href="/register" className="font-medium text-green-600 hover:text-green-700">
              Not a member? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
