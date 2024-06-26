import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';

const CheckoutPay = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: '',
    });

    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: 0,
    });

    const [hasBilling, setHasBilling] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [sameAddress, setSameAddress] = useState(true);
    const TAX_RATE = 0.053; // 5.3% expressed as a decimal
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [subtotal, setSubtotal] = useState(0);


    //Function to handle payment input change
    const handlePaymentInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the value is empty
        if (value.trim() === '') {
            // If the value is empty, update the state with an empty value
            setPaymentInfo({ ...paymentInfo, [name]: '' });
            return; // Exit the function early
        }

        // Check if the value is numeric
        if (!isNaN(value)) {
            // Convert the values to the correct type before updating the state
            const parsedValue = name === 'cardNumber' || name === 'expMonth' || name === 'expYear' || name === 'cvv' ? parseInt(value) : value;
            setPaymentInfo({ ...paymentInfo, [name]: parsedValue });
        } else {
            // Display an alert to the user
            alert('Please enter numeric values for card number, expiration month, expiration year, and CVV.');
            e.target.value = '';
        }
    };

    const validateBillingInfo = () => {
        const errors = [];
        // Regular expressions for zip code and phone number validation
        const zipCodeRegex = /^\d{5}$/;

        // Check if zip code is valid
        if (!zipCodeRegex.test(billingInfo.zipCode)) {
            errors.push("The zip code must be positive and have 5 digits.");
        }

        return errors;
    };

    // Function to handle the edit billing information action
    const handleEditBillingInfo = () => {
        // Implement modal logic to edit billing information
        console.log('Edit billing information');
        console.log("updated billing is", billingInfo)
        const validationErrors = validateBillingInfo();
        if (validationErrors.length > 0) {
            // Handle errors (e.g., display them to the user)
            alert(validationErrors.join("\n"));
        } else {
            localStorage.setItem('billing_info', JSON.stringify(billingInfo));
            setBillingInfo(billingInfo);
            setSameAddress(false);
            setShowModal(false);
        }
    };
    // Function to handle the edit billing information action
    const handleCancelModal = () => {
        // Implement modal logic to edit billing information
        console.log('same Billing');

        const shippingInfo = JSON.parse(localStorage.getItem('shipping_info'));
        if (shippingInfo) {
            setBillingInfo({
                firstName: shippingInfo.firstName,
                lastName: shippingInfo.lastName,
                address: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                zipCode: shippingInfo.zipCode,
            })
        }

        setShowModal(false)
        console.log("so billing should be", billingInfo)
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };


    const validatePaymentInfo = () => {
        const errors = [];

        // Convert number to string to check the length for cardNumber
        if (paymentInfo.cardNumber.toString().length !== 16) {
            errors.push("The card number must be exactly 16 digits.");
        }

        // Validate expiration month
        if (!paymentInfo.expMonth) {
            errors.push("Please enter the expiration month.");
        } else if (paymentInfo.expMonth < 1 || paymentInfo.expMonth > 12) {
            errors.push("Please enter a valid month (1-12).");
        }

        // Validate expiration year
        if (!paymentInfo.expYear) {
            errors.push("Please enter the expiration year.");
        } else {
            const currentYear = new Date().getFullYear();
            if (paymentInfo.expYear < currentYear || paymentInfo.expYear > currentYear + 50) {
                errors.push("Please enter a valid expiration year.");
            }
        }

        // Check if both month and year fields have values before validating the expiration date
        if (paymentInfo.expMonth && paymentInfo.expYear) {
            // Check if the provided expiration date is in the past
            const currentDate = new Date();
            const enteredDate = new Date(paymentInfo.expYear, paymentInfo.expMonth - 1, 1); // Subtract 1 from the month to match JavaScript's Date constructor
            if (enteredDate < currentDate) {
                errors.push("The expiration date must be in the future.");
            }
        }

        // Convert number to string to check the length for CVV
        if (paymentInfo.cvv.toString().length !== 3) {
            errors.push("The CVV must be exactly 3 digits.");
        }

        return errors;
    };


    // Function to handle form submission
    const handleCheckout = (e) => {
        e.preventDefault();


        const validationErrors = validatePaymentInfo();
        if (validationErrors.length > 0) {
            // Handle errors (e.g., display them to the user)
            alert(validationErrors.join("\n"));
        } else {
            console.log("info to send pay", paymentInfo)
            console.log("info to send bil", billingInfo)
            // Implement checkout logic
            const encryptedCardNumber = CryptoJS.AES.encrypt(paymentInfo.cardNumber.toString(), 'LoveShoeEco3799!').toString();
            const encryptedPaymentInfo = {
                ...paymentInfo,
                cardNumber: encryptedCardNumber,
            };

            localStorage.setItem('billing_info', JSON.stringify(billingInfo));
            localStorage.setItem('payment_info', JSON.stringify(encryptedPaymentInfo));

            router.push('/checkoutReview')
        }

    };
    const decryptAndConvertToInt = (encryptedCardNumber, secretKey) => {
        const bytes = CryptoJS.AES.decrypt(encryptedCardNumber, secretKey);
        const originalCardNumber = bytes.toString(CryptoJS.enc.Utf8);
        return parseInt(originalCardNumber);
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        const userId = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        const fetchCartItems = async () => {
            const updatedCart = [];
            for (const item of storedCart) {
                try {                       ///productBySizeColor/{pid}/{sid}/{cid}
                    const response = await axios.get(`http://localhost:8080/product/productBySizeColor/${item.productId}/${item.sizeId}/${item.colorId}`);
                    const productInfo = response.data;
                    console.log("info prod", response)
                    const updatedItem = { ...item, ...productInfo, quantity: item.quantity };
                    updatedCart.push(updatedItem);
                } catch (error) {
                    console.error(`Error fetching product with ID ${item.id}:`, error);
                }
            }
            // setCartItems(updatedCart);
            console.log("cart items", cartItems)
            return updatedCart

        };
        const fetchUserData = async () => {
            if (userId && token) {
                try {
                    const response = await axios.get(`http://localhost:8080/user/userRegistration/${userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    console.log("user info backend", response.data)
                    return response.data;
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    throw error; // Rethrow to handle in Promise.all
                }
            }
        };

        fetchCartItems();

        Promise.all([fetchCartItems(), fetchUserData()])
            .then(([cartItems, userData]) => {
                setCartItems(cartItems);

                const newTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

                const newTax = newTotal * TAX_RATE;
                const newSubtotal = newTotal + newTax;

                setTotal(newTotal);
                setTax(newTax);
                setSubtotal(newSubtotal);
                if (userData) { // Ensure userData is not undefined
                    console.log("total check", total)
                    //  setEmail(userData.email);
                    if (userData.paymentInformation) {
                        const decryptedCardNumber = decryptAndConvertToInt(userData.paymentInformation.creditCard, 'LoveShoeEco3799!');
                        console.log("decrypted val", decryptedCardNumber)
                        setPaymentInfo({
                            cardNumber: decryptedCardNumber,
                            expMonth: userData.paymentInformation.expMonth,
                            expYear: userData.paymentInformation.expYear,
                            cvv: userData.paymentInformation.cvv,

                        });
                    }
                    if (userData.billingAdress) {
                        setBillingInfo({
                            firstName: userData.billingAdress.firstName,
                            lastName: userData.billingAdress.lastName,
                            address: userData.billingAdress.address,
                            city: userData.billingAdress.city,
                            state: userData.billingAdress.state,
                            zipCode: userData.billingAdress.zipCode,

                        });
                    }

                    if (!userData.billingAdress == null) {
                        setHasBilling(true)
                    }
                }
            })
            .catch(error => {
                console.error("Error during data fetching:", error);
            })
            .finally(() => {
                console.log("what's the billing address?", billingInfo)
                console.log("has billing", hasBilling)
                if (!hasBilling) {
                    const shippingInfo = JSON.parse(localStorage.getItem('shipping_info'));
                    if (shippingInfo) {
                        setBillingInfo({
                            firstName: shippingInfo.firstName,
                            lastName: shippingInfo.lastName,
                            address: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            zipCode: shippingInfo.zipCode,
                        })
                    }

                }
                setLoading(false); // Set loading to false when both operations are complete
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    const usStates = [
        { abbreviation: 'AL', name: 'Alabama' },
        { abbreviation: 'AK', name: 'Alaska' },
        { abbreviation: 'AZ', name: 'Arizona' },
        { abbreviation: 'AR', name: 'Arkansas' },
        { abbreviation: 'CA', name: 'California' },
        { abbreviation: 'CO', name: 'Colorado' },
        { abbreviation: 'CT', name: 'Connecticut' },
        { abbreviation: 'DE', name: 'Delaware' },
        { abbreviation: 'FL', name: 'Florida' },
        { abbreviation: 'GA', name: 'Georgia' },
        { abbreviation: 'HI', name: 'Hawaii' },
        { abbreviation: 'ID', name: 'Idaho' },
        { abbreviation: 'IL', name: 'Illinois' },
        { abbreviation: 'IN', name: 'Indiana' },
        { abbreviation: 'IA', name: 'Iowa' },
        { abbreviation: 'KS', name: 'Kansas' },
        { abbreviation: 'KY', name: 'Kentucky' },
        { abbreviation: 'LA', name: 'Louisiana' },
        { abbreviation: 'ME', name: 'Maine' },
        { abbreviation: 'MD', name: 'Maryland' },
        { abbreviation: 'MA', name: 'Massachusetts' },
        { abbreviation: 'MI', name: 'Michigan' },
        { abbreviation: 'MN', name: 'Minnesota' },
        { abbreviation: 'MS', name: 'Mississippi' },
        { abbreviation: 'MO', name: 'Missouri' },
        { abbreviation: 'MT', name: 'Montana' },
        { abbreviation: 'NE', name: 'Nebraska' },
        { abbreviation: 'NV', name: 'Nevada' },
        { abbreviation: 'NH', name: 'New Hampshire' },
        { abbreviation: 'NJ', name: 'New Jersey' },
        { abbreviation: 'NM', name: 'New Mexico' },
        { abbreviation: 'NY', name: 'New York' },
        { abbreviation: 'NC', name: 'North Carolina' },
        { abbreviation: 'ND', name: 'North Dakota' },
        { abbreviation: 'OH', name: 'Ohio' },
        { abbreviation: 'OK', name: 'Oklahoma' },
        { abbreviation: 'OR', name: 'Oregon' },
        { abbreviation: 'PA', name: 'Pennsylvania' },
        { abbreviation: 'RI', name: 'Rhode Island' },
        { abbreviation: 'SC', name: 'South Carolina' },
        { abbreviation: 'SD', name: 'South Dakota' },
        { abbreviation: 'TN', name: 'Tennessee' },
        { abbreviation: 'TX', name: 'Texas' },
        { abbreviation: 'UT', name: 'Utah' },
        { abbreviation: 'VT', name: 'Vermont' },
        { abbreviation: 'VA', name: 'Virginia' },
        { abbreviation: 'WA', name: 'Washington' },
        { abbreviation: 'WV', name: 'West Virginia' },
        { abbreviation: 'WI', name: 'Wisconsin' },
        { abbreviation: 'WY', name: 'Wyoming' }
    ];

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    return (
        <div className="flex justify-center p-8 pl-2">
            <div className="flex max-w-6xl w-full">

                {/* Payment Information Form */}
                <div className="flex flex-col flex-1 mr-16 w-48"> {/* Added mb-8 for margin-bottom */}
                    <h1 className="text-2xl font-bold">Payment Information</h1>
                    <p className='mb-4'>{cartItems.length} items</p>
                    <h2 className="flex justify-between font-bold mb-4">
                        <span>Balance due</span>
                        <span className="ml-4">${totalPrice}</span>
                    </h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="credit_card" className="text-sm font-semibold mb-1">
                                Card Number
                                <FontAwesomeIcon icon={faLock} className='ml-1' />
                            </label>
                            <input id="credit_card" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your card number"
                                onChange={handlePaymentInputChange}
                                name="cardNumber"
                                value={paymentInfo.cardNumber}
                                required />
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="exp_month" className="text-sm font-semibold mb-1">Expiration Month</label>
                                <input id="exp_month" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="02"
                                    onChange={handlePaymentInputChange}
                                    name="expMonth"
                                    value={paymentInfo.expMonth}
                                    required />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="exp year" className="text-sm font-semibold mb-1">Expiration Year</label>
                                <input id="exp_year" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="2024"
                                    onChange={handlePaymentInputChange}
                                    name="expYear"
                                    value={paymentInfo.expYear}
                                    required />
                            </div>


                        </div>
                        <div className="flex flex-col flex-1 mb-16">
                            <label htmlFor="cvv" className="text-sm font-semibold mb-1">CVV</label>
                            <input id="cvv" type="text" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter security number"
                                onChange={handlePaymentInputChange}
                                name="cvv"
                                value={paymentInfo.cvv}
                                required />
                        </div>

                        <h2 className="flex justify-between font-bold mb--4">
                            Billing Address
                        </h2>
                        <div className="flex items-center ">
                            <input type="checkbox" id="bil" name="billing_address" checked />
                            <label htmlFor="billing" className="ml-2">
                                {sameAddress ? "Same as Shipping Address" : `${billingInfo.address}, ${billingInfo.state}, ${billingInfo.zipCode}`}
                            </label>
                            <span className="flex-1"></span>
                            <button className="underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowModal(true);
                                }}>
                                Edit
                            </button>
                        </div>




                        {/* Add more form fields for payment information as needed */}
                        <div className="flex flex-col">
                            <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mt-16" type='submit'>Continue to review</button>
                        </div>
                    </form>
                    {/*shipping method*/}

                    {/* Modal Start  *******************************************/}
                    {showModal ? (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            <div className="bg-white border border-gray-300 rounded-lg p-8">
                                <h1 className="text-2xl font-bold mb-4">Billing Information</h1>
                                <form onSubmit={handleEditBillingInfo} className="space-y-4">
                                    <div className="flex space-x-4">
                                        <div className="flex flex-col flex-1">
                                            <label htmlFor="first_name" className="text-sm font-semibold mb-1">First Name</label>
                                            <input id="first_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" onChange={handleInputChange} name="firstName" required />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <label htmlFor="last_name" className="text-sm font-semibold mb-1">Last Name</label>
                                            <input id="last_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" onChange={handleInputChange} name="lastName" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="address" className="text-sm font-semibold mb-1">Address</label>
                                        <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your address" onChange={handleInputChange} name="address" required />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="city" className="text-sm font-semibold mb-1">City</label>
                                        <input id="city" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your city" onChange={handleInputChange} name="city" required />
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="flex flex-col flex-1">
                                            <label htmlFor="state" className="text-sm font-semibold mb-1">State</label>

                                            <select
                                                id="state"
                                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                                value={billingInfo.state}
                                                onChange={handleInputChange}
                                                name="state"
                                                required
                                            >
                                                <option value="">Select State</option>
                                                {usStates.map((state) => (
                                                    <option key={state.abbreviation} value={state.abbreviation}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <label htmlFor="zip_code" className="text-sm font-semibold mb-1">Zip Code</label>
                                            <input id="zip_code" type="number" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your zip code" value={billingInfo.zipCode} onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: parseInt(e.target.value) })} name="zipCode" required />
                                        </div>
                                    </div>
                                    {/* Add more form fields for shipping information as needed */}
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mr-4">Save Billing Address</button>
                                        <button onClick={handleCancelModal} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : null}
                    {/* Modal end *************************************************** */}



                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 rounded-lg p-6 mb-32 flex flex-col items-center justify-between w-64">

                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between w-full mb-2">
                        <div>Subtotal({cartItems.length} items)</div>
                        <div>${total.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between w-full mb-2">
                        <div>Shipping</div>
                        <div>Free</div>
                    </div>
                    <div className="flex justify-between w-full mb-2">
                        <div>Tax</div>
                        <div>$0{tax.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between w-full mb-4">
                        <div>Total</div>
                        <div>${subtotal.toFixed(2)}</div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CheckoutPay;
