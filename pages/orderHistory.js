import React from 'react';

const OrderHistoryPage = () => {
  const orders = [
    {
      id: '15vsf252',
      items: [
        {
          price: '$74.98',
          name: 'Stylish Stilettos',
          type: 'Heels',
          size: '7.5',
        },
      ],
    },
    {
      id: '98zkw834',
      items: [
        {
          price: '$59.99',
          name: 'Classic Sneakers',
          type: 'Sneakers',
          size: '9',
        },
        {
          price: '$84.99',
          name: 'Running Shoes',
          type: 'Sport',
          size: '10',
        },
      ],
    },
    // ... More orders can be added here
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold">Orders</h1>
          <div>
            <button className="px-4 py-2 rounded border border-gray-300 mr-2">Profile</button>
            <button className="px-4 py-2 rounded bg-black text-white">Orders</button>
          </div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="border-b py-6">
            <div className="font-bold mb-4">Order # {order.id}</div>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center mb-4 last:mb-0">
                <div className="bg-gray-300 w-24 h-24 mr-4"></div>
                <div className="flex-1">
                  <div className="text-lg font-bold">{item.price}</div>
                  <div className="text-gray-700">{item.name}</div>
                  <div className="text-gray-700">{item.type}</div>
                  <div className="text-gray-700">Size {item.size}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
