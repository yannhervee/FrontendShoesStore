import LeftMenu from "@/components/leftMenu";
const Products = () => {
    
    const shoes = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Shoe ${index + 1}`,
      brand: `Brand ${index + 1}`,
      description: `Description for Shoe ${index + 1}`,
      price: `$${(index + 1) * 20}`, 
    }));
  
    return (
      <div className="container mx-auto mt-8 flex">
     
      <LeftMenu />

      <div className="flex-1 ml-4">
        <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shoes.map((shoe) => (
            <div key={shoe.id} className="bg-blue-500 p-4 rounded-md overflow-hidden">
              {/* Replace this with an image once you have backend data */}
              <div className="h-32 w-full bg-blue-700 mb-4"></div>
              <p className="text-white font-bold text-lg">{shoe.name}</p>
              <p className="text-gray-300">{shoe.description}</p>
              <p className="text-green-400 font-bold">{shoe.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  };
  
  export default Products;