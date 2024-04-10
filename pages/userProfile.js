import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden md:flex md:space-x-4 bg-gray-200">
        
        {/* Left Section with Welcome Message */}
        <div className="md:w-1/2 bg-green-500 p-8 text-white flex items-center mr-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome Back, Yann!</h2>
            <p>
            Thank you for joining us in our mission to redefine fashion and pave the way towards a more sustainable future. By choosing our eco-friendly lady shoes, you're not only making a style statement but also contributing to positive change for our planet. Together, we're stepping towards a greener tomorrow, one stylish stride at a time. Your support means the world to us as we continue to innovate, inspire, and lead the way in ethical fashion. Here's to walking hand in hand towards a brighter, more sustainable future. Thank you for being a part of our journey!
              {/* Full message here */}
            </p>
          </div>
        </div>

        {/* Right Section with User Information */}
        <div className="md:w-1/2 p-8 bg-white border-l border-black">
          { /* Each Subpart with Border and Edit Button at the Right End */ }
          <div className="flex justify-between items-center border-b pb-4 ">
            <div>
              <h3 className="font-bold text-xl mb-2">About Me</h3>
              <p className="text-grey-800">Yann Animan</p>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded">Edit</button>
          </div>
          
          <div className="flex justify-between items-center border-b py-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Contact</h3>
              <p className="text-grey-800 font-bold text-green-600 text-l">Email Address</p>
              <p className="text-grey-800 mb-2">Yann@email.com</p>
              <p className="text-grey-800 font-bold text-green-600 text-l">Phone</p>
              <p className="text-grey-800 mb-2">5287965847</p>
              <p className="text-grey-800 font-bold text-green-600 text-l">Mailing Address</p>
              <p className="text-grey-800">Yann Animan</p>
              
              <p className="text-grey-800">123 Street Dr Denver</p>
              <p className="text-grey-800 mb-2">VA 20001</p>
              
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded">Edit</button>
          </div>
          
          <div className="flex justify-between items-center border-b py-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Shipping Address</h3>
             
              <p className="text-grey-800">Yann Animan</p>
              
              <p className="text-grey-800">123 Street Dr Denver</p>
              <p className="text-grey-800">VA 20001</p>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded">Edit</button>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Saved Card</h3>
              <p className="text-grey-800">Card Number: ****-****-****-67</p>
              <p className="text-grey-800">Yann Animan</p>
              
              <p className="text-grey-800">123 Street Dr Denver</p>
              <p className="text-grey-800">VA 20001</p>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded">Edit</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
