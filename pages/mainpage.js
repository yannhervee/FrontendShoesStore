import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Main() {
  return (
    
    <div className="flex flex-col min-h-screen">
   
     

      {/* Main content */}
      <main className="flex-grow grid grid-cols-2">
        {/* Hero section */}
        <section className="flex flex-row justify-between items-center my-8 bg-home-left mt-0">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              
            </h1>
            <div className="bg-white">
            <p className="text-gray-600 text-base mb-4">
            Eco-Friendly Materials and Reduced Waste: <br></br>
              We use materials that are sourced sustainably to create our green shoes, which lowers the carbon impact of every pair. By emphasizing environmentally friendly manufacturing techniques, we reduce waste production and work toward a more sustainable production cycle.
            </p>
            <p className="italic text-gray-600">
              "We're proud to offer green shoes that reduce waste throughout their lifecycle."
            </p>
            </div>
          </div>
          
        </section>

        {/* Call to action section */}
        <div className='flex flex-col flex-grow bg-home-right'>
          <div className='h-screen flex items-center justify-center p-6 rounded-lg'>
        <section className="flex items-center justify-center p-6 bg-gray-200 rounded-lg mx-4"
        style={{
          backgroundImage: 'url("C:\Users\admin\OneDrive\Pictures\Screenshots\Rectangle 4.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        
        }}
        >
          
          <div className="text-center w-full"> {/* Adjust width as necessary */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fashion with a conscience</h2>
          <p className="text-gray-600 mb-6">Eco-Friendly shoes for Women</p>
          <a href="/productListing">

        <button className="bg-green-800 text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline">
          Shop Now
        </button>
        </a>
        </div>
      
      
      </section>
      </div>
      <div >
         {/* Footer */}
      <footer className="bg-green-800 self-bottom text-center ">
        <div className="w-1/2 mx-auto text-center">
        <p className="text-white font-bold mb-0">Not a Member yet?</p> 
        <p className="text-white font-bold"> Join our Sustainable Fashion Movement!</p>
        </div>
      </footer>
      </div>
      </div>
    </main>     
      
    </div>

  );
}