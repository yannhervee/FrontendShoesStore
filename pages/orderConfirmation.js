import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
const OrderConfirmationPage = () => {
 
  const router = useRouter();
  // Retrieve the order confirmation number from the query parameters
  const { orderNumber } = router.query;
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
      const today = new Date();
      const oneWeekFromToday = new Date(today.setDate(today.getDate() + 7));
      setDeliveryDate(oneWeekFromToday.toDateString()); // Formats the date as a string
  }, []);

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-white p-10 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600">Thank you for your order!</h2>
          <p className="text-gray-600 mt-2">
            Your order number is <span className="text-green-800 font-bold">{orderNumber}</span>.
          </p>
          <p className="mt-3 mb-6">We've sent a confirmation email with your order details.</p>
          <div className="bg-green-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-green-800">Estimated Delivery Date</h3>
            <p className="text-sm">{deliveryDate}</p>
          </div>
          <Link
            href={`/order/${orderNumber}`} passHref
            className="mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
