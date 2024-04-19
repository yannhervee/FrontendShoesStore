import React from 'react';
import Link from "next/link";
const OrderCancelled = () => {


  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-white p-10 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600"> Order Cancelled!</h2>
          <p className="text-gray-600 mt-2 mb-24">
            Your order has been successfully cancelled.
          </p>
         
          <Link
            href={"/productListing"} passHref
            className="mt-16 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            Ok
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelled;
