import React from 'react';

const CheckoutReviewPage = () => {
  // Sample data
  const contactInfo = {
    email: 'yannhervee@gmail.com',
    phone: '(571) 294-3799',
  };

  const shippingItems = [
    {
      id: 1,
      name: 'Asher Slip-On Sneaker - Women\'s',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Mayari Sandal - Women\'s',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Drema Sandal',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const shippingAddress = {
    name: 'Yann Animan',
    address: '17 Thrush Rd',
    city: 'Sterling',
    state: 'VA',
    zip: '20164-1615',
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex max-w-6xl w-full">

       {/* Review Your Order */}
       <div className="flex flex-col flex-1 mr-4">
          <h1 className="text-2xl font-bold mb-4">Review Your Order</h1>

          {/* Contact */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-2">Contact</h2>
              <p>{contactInfo.email}</p>
              <p>{contactInfo.phone}</p>
            </div>
            <button className="text-blue-500 underline">Edit</button>
          </div>

          {/* Shipping */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-2">Shipping</h2>
            <div className="flex flex-wrap">
              {shippingItems.map(item => (
                <div key={item.id} className="w-1/3 flex justify-center mb-4">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Ship to */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-2">Ship to:</h2>
              <p>{shippingAddress.name}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
            </div>
            <button className="text-blue-500 underline">Edit</button>
          </div>

          <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mt-16">Place Order</button>
        </div>

        
        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-between">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          {/* Order summary details go here */}
        </div>

      </div>
    </div>
  );
}

export default CheckoutReviewPage;
