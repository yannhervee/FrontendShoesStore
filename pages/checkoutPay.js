import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


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


    // Function to handle the edit billing information action
    const handleEditBillingInfo = () => {
        // Implement modal logic to edit billing information
        console.log('Edit billing information');
        console.log("updated billing is", billingInfo)
        localStorage.setItem('billing_info', JSON.stringify(billingInfo));
        setBillingInfo(billingInfo);
        setSameAddress(false);
        setShowModal(false);

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
        if (paymentInfo.expMonth < 1 || paymentInfo.expMonth > 12) {
            errors.push("Please enter a valid month (1-12).");
        }
    
        // Validate expiration year - check for reasonable expiration year
        const currentYear = new Date().getFullYear();
        if (paymentInfo.expYear < currentYear || paymentInfo.expYear > currentYear + 50) {
            errors.push("Please enter a valid expiration year.");
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
    }else{
        console.log("info to send pay", paymentInfo)
        console.log("info to send bil", billingInfo)
        // Implement checkout logic
        localStorage.setItem('billing_info', JSON.stringify(billingInfo));
        localStorage.setItem('payment_info', JSON.stringify(paymentInfo));

        router.push('/checkoutReview')
    }

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
          //  console.log("cartItems,", cartItems)
            const newTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
           
            const newTax = newTotal * TAX_RATE;
            const newSubtotal = newTotal + newTax;
        
            setTotal(newTotal);
            setTax(newTax);
            setSubtotal(newSubtotal);
          
            if (userData) { // Ensure userData is not undefined
                console.log("total check", total)
                setEmail(userData.email);
                setPaymentInfo({
                    cardNumber: userData.paymentInformation.ccNumber,
                    expMonth: userData.paymentInformation.expMonth,
                    expYear: userData.paymentInformation.expYear,
                    cvv: userData.paymentInformation.cvv,
                    
                });
                
                setBillingInfo({
                    firstName: userData.billingAdress.firstName,
                    lastName: userData.billingAdress.lastName,
                    address: userData.billingAdress.address,
                    city: userData.billingAdress.city,
                    state: userData.billingAdress.state,
                    zipCode: userData.billingAdress.zipCode,
                    
                });

                if(!userData.billingAdress == null){
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
            if(!hasBilling){
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

        // const shippingInfo = JSON.parse(localStorage.getItem('shipping_info'));
        // if (shippingInfo) {
        //     setBillingInfo({
        //         firstName: shippingInfo.firstName,
        //         lastName: shippingInfo.lastName,
        //         address: shippingInfo.address,
        //         city: shippingInfo.city,
        //         state: shippingInfo.state,
        //         zipCode: shippingInfo.zipCode,
        //     })
        // }
        // setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                required />
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="exp_month" className="text-sm font-semibold mb-1">Expiration Month</label>
                                <input id="exp_month" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="02"
                                    onChange={handlePaymentInputChange}
                                    name="expMonth"
                                    required />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="exp year" className="text-sm font-semibold mb-1">Expiration Year</label>
                                <input id="exp_year" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="2024"
                                    onChange={handlePaymentInputChange}
                                    name="expYear"
                                    required />
                            </div>


                        </div>
                        <div className="flex flex-col flex-1 mb-16">
                            <label htmlFor="cvv" className="text-sm font-semibold mb-1">CVV</label>
                            <input id="cvv" type="text" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter your last name"
                                onChange={handlePaymentInputChange}
                                name="cvv"
                                required/>
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
                                <form onSubmit={handleEditBillingInfo}  className="space-y-4">
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
                                            <input id="state" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your state" onChange={handleInputChange} name="state" required />
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
