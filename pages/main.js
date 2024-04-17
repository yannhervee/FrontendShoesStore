import Head from 'next/head';
import Image from 'next/image';

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Eco-Friendly Shoes Store</title>
        <meta name="description" content="Shop eco-friendly shoes for women with a conscience." />
      </Head>

      {/* Header */}
      <header className="bg-gray-100 py-4 text-center">
        {/* Add your navigation bar here */}
      </header>

      {/* Main content */}
      <main className="flex-grow px-4 grid grid-cols-2">
        {/* Hero section */}
        <section className="flex flex-row justify-between items-center my-8">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              
            </h1>
            <p className="text-gray-600 text-base mb-4">
            Eco-Friendly Materials and Reduced Waste
              We use materials that are sourced sustainably to create our green shoes, which lowers the carbon impact of every pair. By emphasizing environmentally friendly manufacturing techniques, we reduce waste production and work toward a more sustainable production cycle.
            </p>
            <p className="italic text-gray-600">
              "We're proud to offer green shoes that reduce waste throughout their lifecycle."
            </p>
          </div>
          
        </section>

        {/* Call to action section */}
        <section className="text-center p-6 bg-gray-200 rounded-lg mx-4">
        <div className="w-1/2 h-4/5 px-4"> 
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fashion with a conscience</h2>
          <p className="text-gray-600 mb-6">Eco-Friendly shoes for Women</p>
          <button className="bg-green-800 text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline">
            Shop Now
          </button>
          </div> 
          {/* Footer */}
      <footer className="bg-green-800 h-1/10 py-4 text-center">
        <p>Not a Member yet?</p> <p> Join our Sustainable Fashion Movement!</p>
      </footer>
        </section>  
      </main>

      
    </div>

  );
}