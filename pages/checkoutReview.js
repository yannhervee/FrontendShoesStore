import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CheckoutReviewPage = () => {
  // Sample data

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: 0,
  });
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: 0,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [showModalShipping, setShowModalShipping] = useState(false);
  const [showModalBilling, setShowModalBilling] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const TAX_RATE = 0.053; // 5.3% expressed as a decimal
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);




  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
    const fetchCartItems = async () => {
      const updatedCart = [];
      for (const item of storedCart) {
        try {                       ///productBySizeColor/{pid}/{sid}/{cid}
          const response = await axios.get(`http://localhost:8080/product/productBySizeColor/${item.productId}/${item.sizeId}/${item.colorId}`);
          const productInfo = response.data;
          console.log("info prod", response)
          const updatedItem = { ...item, ...productInfo, quantity: item.quantity };
          updatedCart.push(updatedItem);
        } catch (error) {
          console.error(`Error fetching product with ID ${item.id}:`, error);
        }
      }
      setCartItems(updatedCart);
      const newTotal = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
           
      const newTax = newTotal * TAX_RATE;
      const newSubtotal = newTotal + newTax;
  
      setTotal(newTotal);
      setTax(newTax);
      setSubtotal(newSubtotal);

      console.log("cart items", cartItems)
     

    };
     fetchCartItems();
   

    const shipping = JSON.parse(localStorage.getItem('shipping_info'));
    if (shipping) {
      setShippingInfo({
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zipCode: shipping.zipCode,
      })
    }
    const billing = JSON.parse(localStorage.getItem('billing_info'));
    if (billing) {
      setBillingInfo({
        firstName: billing.firstName,
        lastName: billing.lastName,
        address: billing.address,
        city: billing.city,
        state: billing.state,
        zipCode: billing.zipCode,
      })
    }
    const payment = JSON.parse(localStorage.getItem('payment_info'));
    if (payment) {
      setPaymentInfo({
        cardNumber: payment.cardNumber,
        cvv: payment.cvv,
        expMonth: payment.expMonth,
        expYear: payment.expYear,
      })
    }
    setEmail(localStorage.getItem('email'));

    setLoading(false);
  }, []);

  // Function to handle the edit billing information action
  const handleEditBillingInfo = (e) => {
    // Implement modal logic to edit billing information
    e.preventDefault();
    console.log('Edit billing information');
    console.log("updated billing is", billingInfo)
    localStorage.setItem('billing_info', JSON.stringify(billingInfo));
    setBillingInfo(billingInfo);

    setShowModalBilling(false);

  };

  // Function to handle billing input changes
  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  // Function to handle the edit shiiping information action
  const handleEditShippingInfo = () => {
    // Implement modal logic to edit billing information
    console.log('Edit shipping information');
    console.log("updated shipping is", shippingInfo)
    localStorage.setItem('shipping_info', JSON.stringify(shippingInfo));
    setShippingInfo(shippingInfo);

    setShowModalShipping(false);

  };

  // Function to handle shipping input changes
  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };



  // Function to handle the edit shiiping information action
  const handleEditPaymentInfo = () => {
    // Implement modal logic to edit billing information
    console.log('Edit payment information');
    console.log("updated payment is", paymentInfo)
    localStorage.setItem('payment_info', JSON.stringify(paymentInfo));
    setPaymentInfo(paymentInfo);

    setShowModalPayment(false);

  };

  const handleEmailChange = (e) => {
    // Implement modal logic to edit billing information
    e.preventDefault();
    console.log('Edit email');
    console.log("modal", showModalEmail)
    console.log("updated email is", email)

    localStorage.setItem('email', email);

    setShowModalEmail(false);

  };

  // Function to handle shipping input changes
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is numeric
    if (!isNaN(value) && value.trim() !== "") {
      // Convert the values to the correct type before updating the state
      const parsedValue = name === 'cardNumber' || name === 'expMonth' || name === 'expYear' || name === 'cvv' ? parseInt(value) : value;
      setPaymentInfo({ ...paymentInfo, [name]: parsedValue });
    } else {
      // Display an alert to the user
      alert('Please enter numeric values for card number, expiration month, expiration year, and CVV.');
      e.target.value = '';
    }
  };

  const handleCancelModalBilling = () => {
    // Implement modal logic to edit billing information
    console.log('same Billing');
    console.log("cart items", cartItems);

    const billing = JSON.parse(localStorage.getItem('billing_info'));
    if (billing) {
      setBillingInfo({
        firstName: billing.firstName,
        lastName: billing.lastName,
        address: billing.address,
        city: billing.city,
        state: billing.state,
        zipCode: billing.zipCode,
      });
    }
    console.log("Billing info cancel", billingInfo);
    setShowModalBilling(false);

  };

  const handleCancelModalShipping = () => {
    // Implement modal logic to edit billing information

    console.log("Handling cancellation of shipping info form");
    const shipping = JSON.parse(localStorage.getItem('shipping_info'));
    if (shipping) {
      setShippingInfo({
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zipCode: shipping.zipCode,
      })
    }
    console.log("Shipping info cancel", shippingInfo);
    setShowModalShipping(false);

  };

  const handleCancelModalPayment = () => {
    // Implement modal logic to edit billing information
    console.log("Handling cancellation of payment info form");
    const payment = JSON.parse(localStorage.getItem('payment_info'));
    if (payment) {
      setPaymentInfo({
        cardNumber: payment.cardNumber,
        cvv: payment.cvv,
        expMonth: payment.expMonth,
        expYear: payment.expYear,
      })
    }
    console.log("payment info cancel", paymentInfo);
    setShowModalPayment(false);



  };

  const handleCancelModalEmail = () => {
    // Implement modal logic to edit billing information
    console.log('same email');

    console.log("Handling cancellation of email");
    const em = localStorage.getItem('email');
    if (em) {
      setEmail(em)
    }
    console.log("email", email);

    setShowModalEmail(false);

  };


  const handleEmailChangeInput = (event) => {
    setEmail(event.target.value); // Assuming setEmail is your state updater function
  };


  const handleCheckout = async () => {
    let orderData = {
     
      productWithImageDTO: cartItems.map(item => ({
        productId: item.productId,
        sizeId: item.sizeId,
        colorId: item.colorId,
        quantity: item.quantity,
        // image: {
        //   productId: item.productId, // Assuming you have access to this
        //   url: item.imageUrl, // Ensure you have this data in cartItems or fetch if necessary
        //   id: item.imageId // Assuming you have this data
        // }
      })),
      total: subtotal, // Ensure you calculate this correctly from the cart items
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        zipCode: shippingInfo.zipCode,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        state: shippingInfo.state
      },
      billingAddress: {
        address: billingInfo.address,
        city: billingInfo.city,
        zipCode: billingInfo.zipCode,
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        state: billingInfo.state
      },
      paymentInformation: {
        ccNumber: paymentInfo.cardNumber,
        expYear: parseInt(paymentInfo.expYear),
        expMonth: parseInt(paymentInfo.expMonth),
        cvv: parseInt(paymentInfo.cvv),
        billingAddress: {  
          address: billingInfo.address,
          city: billingInfo.city,
          zipCode: billingInfo.zipCode,
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          state: billingInfo.state
        }
      },

    };
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('user'); // Assuming userId is stored in sessionStorage
    const shopping_cart = sessionStorage.getItem('cartId'); 
    if (token && userId && shopping_cart) {
     // Ensures userId is always treated as an integer
     orderData.cartId = shopping_cart
     orderData.userId = userId
      };


    console.log("order data", orderData)

    try {
      const response = await axios.post('http://localhost:8080/order', orderData);
      console.log('Order submitted successfully:', response.data);
      localStorage.removeItem('shopping_cart');
      localStorage.removeItem('billing_info');
      localStorage.removeItem('shipping_info');
      localStorage.removeItem('payment_info');
      localStorage.removeItem('email');
      router.push({
        pathname: '/orderConfirmation',
        query: { orderNumber: response.data.orderId }, // Pass as a query param
      });
      // You might want to handle what happens next after a successful order,
      // like redirecting to a confirmation page or updating UI state
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle errors such as showing a user message
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  
  //calculate totalPrice
  //const totalPrice = cartItems.reduce((acc, product) => acc + (product.price * product.quantity), 0);
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
              <p>{email}</p>
            </div>
            <button className="text-blue-500 underline" onClick={(e) => {
              e.preventDefault();
              setShowModalEmail(true);
            }}>Edit</button>
          </div>

          {/* Shipping */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold ">Shipping </h2>
            <span className='text-base mb-8'>{cartItems.length} items</span>
            <div className="flex flex-col flex-wrap">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col p-4 border-b-2">
                  <h3 className="text-lg font-bold">{item.productName}</h3>
                  <p className="text-sm text-gray-600">Color: {item.colorName}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Ship to */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-2">Ship to:</h2>
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            </div>
            <button className="text-blue-500 underline" onClick={(e) => {
              e.preventDefault();
              setShowModalShipping(true);
            }}>Edit</button>
          </div>

          {/* Pay With to */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-2">Pay With:</h2>
              <p>Card ending in {paymentInfo.cardNumber.toString().slice(-4)}</p>
            </div>
            <button className="text-blue-500 underline" onClick={(e) => {
              e.preventDefault();
              setShowModalPayment(true);
            }}>Edit</button>
          </div>

          {/* Billing to */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-2">Billing:</h2>
              <p>{billingInfo.firstName} {billingInfo.lastName}</p>
              <p>{billingInfo.address}</p>
              <p>{billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}</p>
            </div>
            <button className="text-blue-500 underline" onClick={(e) => {
              e.preventDefault();
              setShowModalBilling(true);
            }}>Edit</button>
          </div>

          <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mt-16" onClick={handleCheckout}>Place Order</button>
        </div>



        {/* Modal Start  *******************************************/}
        {showModalBilling ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Billing Information</h1>
              <form className="space-y-4" onSubmit={handleEditBillingInfo}>
                <div className="flex space-x-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="first_name" className="text-sm font-semibold mb-1">First Name</label>
                    <input id="first_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" onChange={handleBillingInputChange} name="firstName" required />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="last_name" className="text-sm font-semibold mb-1">Last Name</label>
                    <input id="last_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" onChange={handleBillingInputChange} name="lastName" required />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-sm font-semibold mb-1">Address</label>
                  <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your address" onChange={handleBillingInputChange} name="address" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="text-sm font-semibold mb-1">City</label>
                  <input id="city" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your city" onChange={handleBillingInputChange} name="city" required />
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="state" className="text-sm font-semibold mb-1">State</label>
                    <input id="state" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your state" onChange={handleBillingInputChange} name="state" required />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="zip_code" className="text-sm font-semibold mb-1">Zip Code</label>
                    <input id="zip_code" type="number" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your zip code" value={billingInfo.zipCode} onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: parseInt(e.target.value) })} name="zipCode" required />
                  </div>
                </div>
                {/* Add more form fields for shipping information as needed */}
                <div className="flex justify-end">
                  <button type='submit' className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mr-4">Save Billing Address</button>
                  <button onClick={handleCancelModalBilling} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        {/* Modal end *************************************************** */}

        {/* Modal Shipping Start  *******************************************/}
        {showModalShipping ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Shipping Information</h1>
              <form className="space-y-4" onSubmit={handleEditShippingInfo}>
                <div className="flex space-x-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="first_name" className="text-sm font-semibold mb-1">First Name</label>
                    <input id="first_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your first name" onChange={handleShippingInputChange} name="firstName" required />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="last_name" className="text-sm font-semibold mb-1">Last Name</label>
                    <input id="last_name" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your last name" onChange={handleShippingInputChange} name="lastName" required />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-sm font-semibold mb-1">Address</label>
                  <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your address" onChange={handleShippingInputChange} name="address" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="text-sm font-semibold mb-1">City</label>
                  <input id="city" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your city" onChange={handleShippingInputChange} name="city" required />
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="state" className="text-sm font-semibold mb-1">State</label>
                    <input id="state" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your state" onChange={handleShippingInputChange} name="state" required />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="zip_code" className="text-sm font-semibold mb-1">Zip Code</label>
                    <input id="zip_code" type="number" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your zip code" value={shippingInfo.zipCode} onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: parseInt(e.target.value) })} name="zipCode" required />
                  </div>
                </div>
                {/* Add more form fields for shipping information as needed */}
                <div className="flex justify-end">
                  <button type='submit' className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mr-4">Save Shipping Address</button>
                  <button onClick={handleCancelModalShipping} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        {/* Modal end *************************************************** */}

        {/* Modal Payment Start  *******************************************/}
        {showModalPayment ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Payment Information</h1>
              <form onSubmit={handleEditPaymentInfo} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="credit_card" className="text-sm font-semibold mb-1">
                    Card Number
                    <FontAwesomeIcon icon={faLock} className='ml-1' />
                  </label>
                  <input id="credit_card" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your card number"
                    onChange={handlePaymentInputChange}
                    name="cardNumber"
                    required />
                </div>

                <div className="flex space-x-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="exp_month" className="text-sm font-semibold mb-1">Expiration Month</label>
                    <input id="exp_month" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="02"
                      onChange={handlePaymentInputChange}
                      name="expMonth"
                      required />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="exp year" className="text-sm font-semibold mb-1">Expiration Year</label>
                    <input id="exp_year" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="2024"
                      onChange={handlePaymentInputChange}
                      name="expYear"
                      required />
                  </div>


                </div>
                <div className="flex flex-col flex-1 mb-16">
                  <label htmlFor="cvv" className="text-sm font-semibold mb-1">CVV</label>
                  <input id="cvv" type="text" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter your last name"
                    onChange={handlePaymentInputChange}
                    name="cvv"
                    required />
                </div>
                {/* Add more form fields for shipping information as needed */}
                <div className="flex justify-end">
                  <button type='submit' className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mr-4">Save Changes</button>
                  <button onClick={handleCancelModalPayment} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        {/* Modal end *************************************************** */}

        {/* Modal Email Start  *******************************************/}
        {showModalEmail ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Contact</h1>
              <form onSubmit={handleEmailChange} className="space-y-4">

                <div className="flex flex-col">
                  <label htmlFor="address" className="text-sm font-semibold mb-1">email</label>
                  <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your address" onChange={handleEmailChangeInput} name="email" required />
                </div>

                {/* Add more form fields for shipping information as needed */}
                <div className="flex justify-end">
                  <button type='submit' className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mr-4">Save Shipping Address</button>
                  <button onClick={handleCancelModalEmail} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        {/* Modal end *************************************************** */}



        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-6 mb-32 flex flex-col items-center justify-between w-64" style={{ maxHeight: '680px', overflowY: 'auto' }}>

          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between w-full mb-2">
                        <div>Subtotal({cartItems.length} items)</div>
                        <div>${total.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between w-full mb-2">
                        <div>Shipping</div>
                        <div>Free</div>
                    </div>
                    <div className="flex justify-between w-full mb-2">
                        <div>Tax</div>
                        <div>$0{tax.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between w-full mb-4">
                        <div>Total</div>
                        <div>${subtotal.toFixed(2)}</div>
                    </div>

        </div>

      </div>
    </div>
  );
}
export default CheckoutReviewPage;
