import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
        sessionStorage.setItem('user', 1);
            
        //     // Redirect to home page or user profile page
         // router.push('productListing');
        
        // Navigate to another page or clear the form
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
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
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </a>
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
