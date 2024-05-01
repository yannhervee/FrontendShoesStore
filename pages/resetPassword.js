import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCart } from '../components/cartContext';
import { useDispatch } from 'react-redux';
import { setUser } from '@/globalRedux/features/userSlice';

const ResetPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const [emailExists, setEmailExists] = useState(false);

  const resetPassword = async (event) => {
    event.preventDefault();
    if (!emailExists) {
        alert('Please check the email entered, it does not match our records.');
        return;
    }
    try {
        const emailAsString = String(email);  // Convert email to string
        console.log("email", emailAsString);
        const response = await axios.put(`http://localhost:8080/resetPassword/${emailAsString}`);
        alert("we sent you a temporary password, please check your email")
        router.push("/login")
        console.log('Password reset email sent successfully:', response.data);
        return response.data;  // Handle the response appropriately
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;  // Handle the error appropriately
    }
}


const checkEmailExists = async (email) => {
    if (!email) return; // Optionally prevent checks if the email field is empty
    console.log("email", email);
    try {
        // This expects a 200 OK response to mean the email does not exist
        const response = await axios.get(`http://localhost:8080/checkEmailExists/${encodeURIComponent(email)}`);
        console.log("response from email check", response);
        if (response.status === 200) {
            setEmailExists(false); 
            // Email does not exist, OK to proceed
            alert('The email entered does not match our records, please enter the right email');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Email exists; handle accordingly
            setEmailExists(true);
            console.log('Email exists.');
        } else {
            // Other errors, could be network issue, server down, etc.
            console.error('An error occurred:', error.response ? error.response.data : error.message);
        }
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-my-image">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg ml-96">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-green-600">
            Reset your password!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your email address
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={resetPassword}>
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
                onBlur={() => checkEmailExists(email)} 
              />
            </div>
           
          </div>


          <div>
          <button
  type="submit"
  disabled={!emailExists}  // Change this to the opposite of emailExists
  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${emailExists ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
>
  Reset Password
</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ResetPage;
