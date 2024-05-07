import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const CheckoutShip = () => {
    // Sample product data
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const router = useRouter();
    const TAX_RATE = 0.053; // 5.3% expressed as a decimal

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: 0,
        phoneNumber: '',
        shippingMethod: 'standard' // You can set a default shipping method here
    });
   // const [userInfo, setUserInfo] = useState(null);
    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Assuming setEmail is your state updater function
    };
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        const userId = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');

        const fetchCartItems = async () => {
            const updatedCart = [];
            for (const item of storedCart) {
                 console.log("item ", item)
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
            //setCartItems(updatedCart);
            console.log("here in checkout", updatedCart)
            return updatedCart
          //  console.log("cart items", cartItems)
          //  setLoading(false);
        };
        const fetchUserData = async () => {
            if (userId && token) {
                try {
                    const response = await axios.get(`http://localhost:8080/user/userRegistration/${userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    return response.data;
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    throw error; // Rethrow to handle in Promise.all
                }
            }
        };

    

        //fetchCartItems();

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
                console.log("user info", userData)
                setEmail(userData.email);
                setShippingInfo({
                    firstName: userData.shippingAddress.firstName,
                    lastName: userData.shippingAddress.lastName,
                    address: userData.shippingAddress.address,
                    city: userData.shippingAddress.city,
                    state: userData.shippingAddress.state,
                    zipCode: userData.shippingAddress.zipCode,
                    phoneNumber: userData.mobile,
                    shippingMethod: 'standard'
                });
            }
        })
        .catch(error => {
            console.error("Error during data fetching:", error);
        })
        .finally(() => {
            setLoading(false); // Set loading to false when both operations are complete
        });

    }, []);



    // Function to handle form submission
    const handleShippingInfoSubmit = (e) => {
        e.preventDefault();
        console.log("ship", shippingInfo)
        // Save shipping information to local storage
        localStorage.setItem('shipping_info', JSON.stringify(shippingInfo));
        localStorage.setItem('email', email);
        // Redirect the user to the next step in the checkout process
        router.push('/checkoutPay');
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center p-8">
            <div className="flex max-w-6xl w-full">

                {/* Shipping Information Form */}
                <div className="flex flex-col flex-1 mr-16 "> {/* Added mb-8 for margin-bottom */}
                    <h1 className="text-2xl font-bold mb-4">Shipping Information</h1>
                    <form className="space-y-4">

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold mb-1">Email</label>
                            <input id="email" type="email" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Email"
                                onChange={handleEmailChange} // Linking to our change handler
                                name="email"
                                value={email}
                                required />
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="first_name" className="text-sm font-semibold mb-1">First Name</label>
                                <input id="first_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name"
                                    onChange={handleInputChange}
                                    value={shippingInfo.firstName}
                                    name="firstName"
                                    required
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="last_name" className="text-sm font-semibold mb-1">Last Name</label>
                                <input id="last_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name"
                                    onChange={handleInputChange}
                                    value={shippingInfo.lastName}
                                    name="lastName"
                                    required />
                            </div>


                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-sm font-semibold mb-1">Address</label>
                            <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name"
                                onChange={handleInputChange}
                                value={shippingInfo.address}
                                name="address"
                                required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className="text-sm font-semibold mb-1">City</label>
                            <input id="city" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name"
                                onChange={handleInputChange}
                                value={shippingInfo.city}
                                name="city"
                                required />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="state" className="text-sm font-semibold mb-1">State</label>
                                <input id="state" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name"
                                    value={shippingInfo.state}
                                    onChange={handleInputChange}
                                    name="state"
                                    required />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="zip_code" className="text-sm font-semibold mb-1">Zip Code</label>
                                <input id="zip_code" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name"
                                    type="number" // Changed to number
                                    value={shippingInfo.zipCode}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: parseInt(e.target.value) })}
                                    name="zipCode"
                                    required />
                            </div>


                        </div>
                        <div className="flex flex-col flex-1 mb-16">
                            <label htmlFor="phone_number" className="text-sm font-semibold mb-1">Phone Number</label>
                            <input id="phone_number" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter your phone number"
                                name="phoneNumber"
                                value={shippingInfo.phoneNumber}
                                type="text" // Changed to number
                                onChange={handleInputChange}

                            />
                        </div>


                        {/* Add more form fields for shipping information as needed */}
                    </form>
                    {/*shipping method*/}


                    <div className="flex items-center">
                        <input type="checkbox" id="standardShipping" name="shippingMethod" checked />
                        <label htmlFor="standardShipping" className="ml-2">Standard Shipping</label>

                    </div>
                    <p className="text-sm text-gray-500 ml-4 mb-8">Arrives in 4 to 5 business days</p>
                    <button onClick={handleShippingInfoSubmit} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 ">Continue to Payment {'>'}</button>


                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 rounded-lg p-6 mb-32 flex flex-col items-center justify-between w-64" style={{ maxHeight: '680px', overflowY: 'auto' }}>
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

export default CheckoutShip;
