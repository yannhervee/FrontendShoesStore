import React from 'react';

const OrderDetailsPage = () => {
  const order = {
    id: '15vsf252',
    date: 'April 7, 2024',
    total: '$154.97',
    items: [
      {
        price: '$74.98',
        name: 'Stylish Stilettos',
        type: 'Heels',
        size: '7.5',
        imagePlaceholder: 'Shoes Image',
      },
      {
        price: '$79.99',
        name: 'Comfortable Sneakers',
        type: 'Sneakers',
        size: '8',
        imagePlaceholder: 'Shoes Image',
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Order ID: {order.id}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Placed on
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.date}
                </dd>
              </div>
              {order.items.map((item, index) => (
                <div key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                  <div className="text-sm font-medium text-gray-500 sm:col-span-1">
                    <div className="h-24 w-24 bg-gray-300 flex items-center justify-center">{item.imagePlaceholder}</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="font-bold">{item.name} - {item.type}</div>
                    <div>Size: {item.size}</div>
                    <div>Price: {item.price}</div>
                  </div>
                </div>
              ))}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Total amount
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.total}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
