import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const userId = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        const orderResponse = await axios.get(`http://localhost:8080/user/allOrdersOfAUser/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("order response", orderResponse)
        if (orderResponse.data) {
          setOrders(orderResponse.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold">Orders</h1>
          <div>
            <Link className="px-4 py-2 rounded border border-gray-300 mr-2" href={"/userProfile/"} passHref>Profile</Link>
            <button className="px-4 py-2 rounded bg-green-600 text-white" >Orders</button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600 mt-8 text-xl">No past orders</div>
        ) : (
          orders.map((order) => (
            <Link href={`/order/${order.orderId}`} passHref key={order.orderId}>
              <div className="border-b py-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold">Order # {order.orderId}</div>
                  <div className="text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</div>
                </div>
                {order.productWithImageDTO.map((item, index) => (
                  <div key={index} className="flex items-center mb-4 last:mb-0">
                    <div className="bg-gray-300 w-24 h-24 mr-4">
                      <img
                        src={item.image.url}
                        alt={"image of shoe"}
                        className="rounded-lg h-full cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold">${item.image.productId.price}</div>
                      <div className="text-gray-700">{item.color}</div>
                      <div className="text-gray-700">{item.image.productId.name}</div>
                      <div className="text-gray-700">{item.image.productId.category.category}</div>
                      <div className="text-gray-700">{item.size}</div>
                    </div>
                  </div>
                ))}
                <div className="text-right font-bold text-lg mt-2">
                  Subtotal: ${order.total}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
