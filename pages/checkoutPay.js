import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const CheckoutPay = () => {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Running Shoes',
            price: 120.00,
            quantity: 1,
            color: 'Black',
            size: '10',

        },
        {
            id: 2,
            name: 'Sneakers',
            price: 85.00,
            quantity: 1,
            color: 'White',
            size: '9',

        }
    ];

    // Calculate total price
    const totalPrice = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    return (
        <div className="flex justify-center p-8 pl-2">
            <div className="flex max-w-6xl w-full">

                {/* Shipping Information Form */}
                <div className="flex flex-col flex-1 mr-16 w-48"> {/* Added mb-8 for margin-bottom */}
                    <h1 className="text-2xl font-bold">Payment Information</h1>
                    <p className='mb-4'>2 items</p>
                    <h2 className="flex justify-between font-bold mb-4">
                        <span>Balance due</span>
                        <span className="ml-4">$186</span>
                    </h2>
                    <form className="space-y-4">


                        <div className="flex flex-col">
                            <label htmlFor="credit_card" className="text-sm font-semibold mb-1">
                                Card Number
                                <FontAwesomeIcon icon={faLock} className='ml-1' />
                            </label>
                            <input id="credit_card" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" />
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="exp_month" className="text-sm font-semibold mb-1">Expiration Month</label>
                                <input id="exp_month" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="02" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="exp year" className="text-sm font-semibold mb-1">Expiration Year</label>
                                <input id="exp_year" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="2024" />
                            </div>


                        </div>
                        <div className="flex flex-col flex-1 mb-16">
                            <label htmlFor="cvv" className="text-sm font-semibold mb-1">CVV</label>
                            <input id="cvv" type="text" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" />
                        </div>

                        <h2 className="flex justify-between font-bold mb--4">
                            Billing Address
                        </h2>
                        <div className="flex items-center ">
                            <input type="checkbox" id="bil" name="billing_address" checked />
                            <label htmlFor="billing" className="ml-2">Same as Shipping Address</label>
                            <span className="flex-1"></span>
                            <button className="underline">Edit</button>
                        </div>


                        {/* Add more form fields for shipping information as needed */}
                    </form>
                    {/*shipping method*/}


                    <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mt-16">Continue to review</button>

                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 rounded-lg p-6 mb-32 flex flex-col items-center justify-between w-64">

                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between w-full mb-2">
                        <div>Subtotal</div>
                        <div>$350</div>
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
                        <div>$350</div>
                    </div>
                    <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Checkout</button>
                </div>

            </div>
        </div>
    );
}

export default CheckoutPay;
