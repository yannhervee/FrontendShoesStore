import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";


const OrderDetailsPage = () => {

  const router = useRouter();
  const { orderNumber } = router.query;

  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({})

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:8080/singleOrderOfAUser/${orderNumber}`);
        const orderData = orderResponse.data.productWithImageDTO;

        console.log("order", orderResponse.data)
        console.log("products", orderData)
        setOrder(orderResponse.data)

        // Iterate through each productWithImageDTO to fetch product names
        const productsWithNames = await Promise.all(orderData.map(async (product) => {
          // Fetch product details for each productId
          const productResponse = await axios.get(`http://localhost:8080/product/${product.productId}`);
          const productData = productResponse.data;
          console.log("product data", productData)
          // Combine product details with the existing product object
          return { ...product, productInfo: productData };
        }));

        setProducts(productsWithNames);
        console.log("products with name", productsWithNames)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
       
      }
    };

    fetchOrderDetails();
  }, [orderNumber]);


  const isWithinCancellationPeriod = () => {
    // Calculate the date three business days from the order date
    const orderDate = new Date(order.orderDate);
    const cancellationDate = new Date(orderDate);
    cancellationDate.setDate(cancellationDate.getDate() + 1);

    // Check if the current date is within the cancellation period
    const currentDate = new Date();
    console.log("check date", currentDate <= cancellationDate)

    return currentDate <= cancellationDate;
  };

//cancel order
  const handleOrderCancellation = (e) => {
    e.preventDefault();
    
    axios.Delete(`http://localhost:8080/cancelOrder/${order.orderId}`)
    .then((res) => {
      router.push('/orderCancel')})
    .catch((error) => {
      console.error("Error fetching products:", error);
    
    });
  };


  if (loading) {
    return <div>Loading...</div>;
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
              {products.map((product, index) => (
                <Link href={`/products/${product.productId}`} passHref key={index}>
                  <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <div className="text-sm font-medium text-gray-500 sm:col-span-1">
                      {product.image.map((image) => {
                        // Filter images based on the selected color
                        if (image.url.toLowerCase().includes(product.color.toLowerCase())) {
                          return (
                            <img
                              key={image.id}
                              src={image.url}
                              alt={`Shoes ${product.color}`}
                              className="h-24 w-24 object-cover rounded-lg mb-4"
                            />
                          );
                        }
                        return null; // Return null if color doesn't match
                      }).find((image) => image)} {/* Select the first matching image */}
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="font-bold">{product.productInfo.product.name} - {product.productInfo.product.category.category}</div>
                      <div>Color: {product.color}</div>
                      <div>Size: {product.size}</div>
                      <div>Price: {product.price}</div>
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
