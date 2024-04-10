import React from 'react';

const CheckoutShip = () => {
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

    return (
        <div className="flex justify-center p-8">
            <div className="flex max-w-6xl w-full">

                {/* Shipping Information Form */}
                <div className="flex flex-col flex-1 mr-16"> {/* Added mb-8 for margin-bottom */}
                    <h1 className="text-2xl font-bold mb-4">Shipping Information</h1>
                    <form className="space-y-4">

                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="first_name" className="text-sm font-semibold mb-1">First Name</label>
                                <input id="first_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="last_name" className="text-sm font-semibold mb-1">Last Name</label>
                                <input id="last_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" />
                            </div>


                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-sm font-semibold mb-1">Address</label>
                            <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className="text-sm font-semibold mb-1">City</label>
                            <input id="city" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="state" className="text-sm font-semibold mb-1">State</label>
                                <input id="state" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="zip_code" className="text-sm font-semibold mb-1">Zip Code</label>
                                <input id="zip_code" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" />
                            </div>


                        </div>
                        <div className="flex flex-col flex-1 mb-16">
                            <label htmlFor="phone_number" className="text-sm font-semibold mb-1">Phone Number</label>
                            <input id="phone_number" type="text" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" />
                        </div>



                        {/* Add more form fields for shipping information as needed */}
                    </form>
                    {/*shipping method*/}


                    <div className="flex items-center">
                        <input type="checkbox" id="standardShipping" name="shippingMethod" checked />
                        <label htmlFor="standardShipping" className="ml-2">Standard Shipping</label>

                    </div>
                    <p className="text-sm text-gray-500 ml-4 mb-8">Arrives in 4 to 5 business days</p>
                    <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 ">Continue to Payment {'>'}</button>

                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 rounded-lg p-6 mb-32 flex flex-col items-center justify-between" style={{ maxHeight: '680px', overflowY: 'auto' }}>

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

export default CheckoutShip;
