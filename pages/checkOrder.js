import React, { useState } from 'react';

const CheckOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleOrderLookup = (e) => {
    e.preventDefault();
    // Implement order lookup logic here
    console.log('Looking up order:', orderNumber);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Find Your Order
        </h2>
        <p className="text-center text-sm text-gray-600 mt-2">
          Enter your order number below to check the status of your order.
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleOrderLookup}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="order-number" className="sr-only">
                Order Number
              </label>
              <input
                id="order-number"
                name="order-number"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Check Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOrderPage;
