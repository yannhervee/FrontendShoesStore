import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const router = useRouter();


    // Helper function to check if the password meets the criteria
    const isValidPassword = password => {
        return password.length >= 8 && /[A-Z]/.test(password);
    };

    // Check if all form fields meet the requirements for enabling the submit button
    const isFormValid = () => {
        return email && firstName && lastName && phone && isValidPassword(password) && password === confirmPassword && !emailExists;
    };

    const checkEmailExists = async (email) => {
        if (!email) return; // Optionally prevent checks if the email field is empty

        try {
            const response = await axios.get(`http://localhost:8080/checkEmailExists/${email}`);
            console.log("response from email check", response)
            if (response.status === 200) {
                setEmailExists(false);  // Email does not exist, OK to proceed
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailExists(true); // Email exists, prevent registration
                alert(error.response.data); // "The email is already Present, Failed to Create new User"
            } else {
                console.error('Error checking email:', error);
                // Handle other errors (e.g., network error, server error)
                alert('Failed to check email availability.');
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            alert('Please check your input fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/userRegistration', {
                email,
                password,
                firstName,
                lastName,
                mobile: phone
            });
            console.log('Registration response:', response);
            
            //     const userData = await response.json();
                
            //     // Store user information securely in session storage
              sessionStorage.setItem('user', response.data.userId);
                
            //     // Redirect to home page or user profile page
                router.push('login');
            
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
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 text-green-600">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please fill in the form to register.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-black">
                                First Name
                            </label>
                            <input
                                id="first-name"
                                name="firstName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mb-4"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="last-name" className="block text-sm font-medium text-black">
                                Last Name
                            </label>
                            <input
                                id="last-name"
                                name="lastName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-black">
                                Email Address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => checkEmailExists(email)}  // Check email when the user exits the email input
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-black">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                pattern="[0-9]{10}"
                                title="Phone number should be 10 digits"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-black">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isFormValid() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center mt-6">
            <a href="/login" className="font-medium text-green-600 hover:text-green-700">
              Already a member? Sign in!
            </a>
          </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
