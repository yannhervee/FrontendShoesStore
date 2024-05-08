import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";


const OrderDetailsPage = () => {

  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true);
  const [exist, setExist] = useState(false)

  useEffect(() => {
   

    const fetchOrderDetails = async () => {
       
        try {
            console.log("Fetching details for order number:", id);
            const orderResponse = await axios.get(`http://localhost:8080/singleOrderOfAUser/${id}`);
            setOrder(orderResponse.data)
            console.log("response order", orderResponse);
            // setOrder(orderResponse.data);
            // const productsWithDetails = await Promise.all(orderResponse.data.productWithImageDTO.map(async (product) => {
            //     const productResponse = await axios.get(`http://localhost:8080/product/${product.productId}`);
            //     return { ...product, productInfo: productResponse.data };
            // }));
            // setProducts(productsWithDetails);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setExist(true);
            
        } finally {
            setLoading(false);
        }
    };

    fetchOrderDetails();
}, [id]);


  const isWithinCancellationPeriod = () => {
    // Calculate the date three business days from the order date
    const orderDate = new Date(order.orderDate);
    const cancellationDate = new Date(orderDate);
    cancellationDate.setDate(cancellationDate.getDate() + 2);

    // Check if the current date is within the cancellation period
    const currentDate = new Date();
    console.log("check date", currentDate <= cancellationDate)

    return currentDate <= cancellationDate;
  };

//cancel order
  const handleOrderCancellation = (e) => {
    e.preventDefault();
    
    axios.delete(`http://localhost:8080/cancelOrder/${order.orderId}`)
    .then((res) => {
      router.push('/orderCancel')})
    .catch((error) => {
      console.error("Error fetching products:", error);
    
    });
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (exist) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">No order exists</p>
          <Link href="/productListing" className="text-blue-500 hover:underline">
            Return to Product Listing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Order ID: {order.orderId}
            </p>
            {isWithinCancellationPeriod() && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOrderCancellation}>
                Cancel Order
                
              </button>
            )}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Placed on
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.orderDate}
                </dd>

              </div>
              {order.productWithImageDTO.map((product, index) => (
              //  console.log("product struct", product)
                
                <Link href={`/products/${product.image.productId.id}`} passHref key={index}>
                  <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <div className="text-sm font-medium text-gray-500 sm:col-span-1">
                    <img
                              
                              src={product.image.url}
                              alt={`Shoes ${product.color}`}
                              className=" object-cover rounded-lg mb-4"
                            />
                     
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="font-bold">{product.image.productId.name} - {product.image.productId.category.category}</div>
                      <div>Color: {product.color}</div>
                      <div>Size: {product.size}</div>
                      <div>Price: {product.price}</div>
                      <div>Qty: {product.quantity}</div>
                    </div>
                  </div>
                </Link>
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
