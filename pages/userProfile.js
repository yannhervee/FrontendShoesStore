import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


const ProfilePage = () => {

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
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [showModalPayment, setShowModalPayment] = useState(false);
  const [showModalShipping, setShowModalShipping] = useState(false);
  const [showModalBilling, setShowModalBilling] = useState(false);

  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalName, setShowModalName] = useState(false);
  const[bilId, setBillId] = useState(0)
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('user');
      if (!token || !userId) {
        alert('You are not logged in!');
        router.push('/login'); // Redirect to login page or home page
        return;
      }
      console.log("user id", userId)
      try {
        const response = await axios.get(`http://localhost:8080/user/userRegistration/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('User data fetched successfully:', response); // Log the response data
        const userData = response.data;
        

        setEmail(userData.email || '');
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setBillId(userData.billingAddress.id)

        // Check if shippingAddress is not null, otherwise set to default values
        setShippingInfo(userData.shippingAddress ? {
          firstName: userData.shippingAddress.firstName,
          lastName: userData.shippingAddress.lastName,
          address: userData.shippingAddress.address,
          city: userData.shippingAddress.city,
          state: userData.shippingAddress.state,
          zipCode: userData.shippingAddress.zipCode,
        } : {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zipCode: 0,
        });

        // Check if billingAddress is not null, otherwise set to default values
        setBillingInfo(userData.billingAddress ? {
          firstName: userData.billingAddress.firstName,
          lastName: userData.billingAddress.lastName,
          address: userData.billingAddress.address,
          city: userData.billingAddress.city,
          state: userData.billingAddress.state,
          zipCode: userData.billingAddress.zipCode,
        } : {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zipCode: 0,
        });

        // Check if paymentInformation is not null, otherwise set to default values
        setPaymentInfo(userData.paymentInformation ? {
          cardNumber: userData.paymentInformation.ccNumber,
          expMonth: userData.paymentInformation.expMonth,
          expYear: userData.paymentInformation.expYear,
          cvv: userData.paymentInformation.cvv,
        } : {
          cardNumber: '',
          expMonth: '',
          expYear: '',
          cvv: '',
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);


  if (loading) {
    return <div>Loading...</div>;
  }




  // Function to handle shipping input changes
  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };


  // Function to handle billing input changes
  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
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


  //submit name change to backend
  const handleNameChange = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    if (!token || !userId) {
        alert('Authentication error. Please log in again.');
        router.push('/login'); // Redirect to login page if the user is not authenticated
        return;
    }

    // Ensure the names are not empty before sending to the server
    if (!firstName.trim() || !lastName.trim()) {
        alert('First name and last name cannot be empty.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:8080/user/updateUserName/${userId}`, {
            firstName,
            lastName
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Name updated successfully:', response.data);
        alert('Name updated successfully!');
        setShowModalName(false); // Assuming you are using a modal and have a state to control its visibility
    } catch (error) {
        console.error('Failed to update name:', error);
        alert('Failed to update name. Please try again.');
    }
};


  // Function to handle the edit email change
  const handleEmailChange = async(e) => {

    e.preventDefault();
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    if (!token || !userId) {
        alert('Authentication error. Please log in again.');
        router.push('/login'); // Redirect to login page if the user is not authenticated
        return;
    }

    // Ensure the email is not empty before sending to the server
    if (!email) {
        alert('Email cannot be empty.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:8080/user/updateEmail/${userId}`, { email }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Email updated successfully:', response.data);
        alert('Email updated successfully!');
        setShowModalEmail(false); // Close the modal on success
    } catch (error) {
        console.error('Failed to update email:', error);
        alert('Failed to update email. Please try again.');
    }

    

  };

  // Function to handle the edit shiiping information action
  const handleEditPaymentInfo = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    if (!token || !userId) {
      alert('Authentication error. Please log in again.');
      router.push('/login');
      return;
    }
    console.log("exp month to send", paymentInfo)
    const paymentData = {
      ccNumber: paymentInfo.cardNumber,
      expYear: paymentInfo.expYear,
      expMonth: paymentInfo.expMonth,
      cvv: paymentInfo.cvv,
      billingAddress: {
        id: bilId,
        address: billingInfo.address,
        city: billingInfo.city,
        zipCode: billingInfo.zipCode,
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        state: billingInfo.state,
      }
    };
    // try {
    //   const response = await axios.post(`http://localhost:8080/user/userPaymentInformation/${userId}`, {
    //     paymentInformation: paymentData
    //   }, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    try {
      const response = await axios.post(`http://localhost:8080/user/userPaymentInformation/${userId}`, paymentData, {
          headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Payment information updated successfully:', response.data);
      alert('Payment information updated successfully!');
      setPaymentInfo(paymentInfo);
      setShowModalPayment(false);
  } catch (error) {
      console.error('Failed to update payment information:', error);
      alert('Failed to update payment information. Please try again.');
  }


  };

  // Function to handle the edit shiiping information action
  const handleEditShippingInfo = async (e) => {
    e.preventDefault();
    // Implement modal logic to edit billing information
    console.log('Edit shipping information');
    console.log("updated shipping is", shippingInfo)




    const userId = sessionStorage.getItem('user'); // Assuming userId is stored in sessionStorage
    const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage

    if (!token || !userId) {
      alert('Authentication error. Please log in again.');
      router.push('/login'); // Redirect to login page if authentication details are missing
      return;
    }

    const shippingData = {
      address: shippingInfo.address,
      city: shippingInfo.city,
      zipCode: shippingInfo.zipCode,
      firstName: shippingInfo.firstName,
      lastName: shippingInfo.lastName,
      state: shippingInfo.state,
    };

    try {
      const response = await axios.post(`http://localhost:8080/user/userShippingAddress/${userId}`, shippingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Shipping address updated successfully:', response.data);
      alert('Shipping address updated successfully!');
      setShippingInfo(shippingInfo);
      setShowModalShipping(false); // Close the modal on successful update

    } catch (error) {
      console.error('Failed to update shipping address:', error);
      alert('Failed to update shipping address. Please try again.');
    }

    // setShippingInfo(shippingInfo);

    // setShowModalShipping(false);

  };

  // Function to handle the edit shiiping information action
  const handleEditBillingInfo = async (e) => {
    e.preventDefault();
    // Implement modal logic to edit billing information
    console.log('Edit billing information');
    console.log("updated billing is", shippingInfo)




    const userId = sessionStorage.getItem('user'); // Assuming userId is stored in sessionStorage
    const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage

    if (!token || !userId) {
      alert('Authentication error. Please log in again.');
      router.push('/login'); // Redirect to login page if authentication details are missing
      return;
    }

    const billingData = {     
      address: billingInfo.address,
      city: billingInfo.city,
      zipCode: billingInfo.zipCode,
      firstName: billingInfo.firstName,
      lastName: billingInfo.lastName,
      state: billingInfo.state,
    };

    try {
      const response = await axios.post(`http://localhost:8080/user/userBillingAddress/${userId}`, billingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Billing address updated successfully:', response.data);
      alert('Billing address updated successfully!');
      setBillingInfo(billingInfo);
      setShowModalBilling(false); // Close the modal on successful update

    } catch (error) {
      console.error('Failed to update billing address:', error);
      alert('Failed to update Billing address. Please try again.');
    }


  };


  const handleCancelModalPayment = () => {
    // Implement modal logic to edit billing information



    // setBillingInfo({
    //   firstName: billing.firstName,
    //   lastName: billing.lastName,
    //   address: billing.address,
    //   city: billing.city,
    //   state: billing.state,
    //   zipCode: billing.zipCode,
    // });

    console.log("Billing info cancel", billingInfo);
    setShowModalPayment(false);

  };


  //cancel shipping modal
  const handleCancelModalShipping = () => {

    console.log("Handling cancellation of shipping info form");


    // setShippingInfo({
    //   firstName: shipping.firstName,
    //   lastName: shipping.lastName,
    //   address: shipping.address,
    //   city: shipping.city,
    //   state: shipping.state,
    //   zipCode: shipping.zipCode,
    // })

    console.log("Shipping info cancel", shippingInfo);
    setShowModalShipping(false);

  };

    //cancel shipping modal
    const handleCancelModalBilling = () => {

      console.log("Handling cancellation of billinh info form");
  
  
      // setShippingInfo({
      //   firstName: shipping.firstName,
      //   lastName: shipping.lastName,
      //   address: shipping.address,
      //   city: shipping.city,
      //   state: shipping.state,
      //   zipCode: shipping.zipCode,
      // })
  
      console.log("Shipping info cancel", shippingInfo);
      setShowModalBilling(false);
  
    };

  // cancel modal email
  const handleCancelModalEmail = () => {
    // Implement modal logic to edit billing information
    console.log('same email');

    console.log("Handling cancellation of email");
    // const em = localStorage.getItem('email');
    // if (em) {
    //   setEmail(em)
    // }
    // console.log("email", email);

    setShowModalEmail(false);

  };

  // cancel modal name
  const handleCancelModalName = () => {
    // Implement modal logic to edit billing information
    console.log('same email');

    console.log("Handling cancellation of name");
    // const em = localStorage.getItem('email');
    // if (em) {
    //   setEmail(em)
    // }
    // console.log("email", email);

    setShowModalName(false);

  };





  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div>
            <button className="px-4 py-2 rounded bg-black text-white" >Profile</button>
            <Link className="px-4 py-2 rounded border border-gray-300 mr-2" href={"/orderHistory/"} passHref>Orders</Link>
          </div>
        </div>

      <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden md:flex md:space-x-4 bg-gray-200">

        {/* Left Section with Welcome Message */}
        <div className="md:w-1/2 bg-green-500 p-8 text-white flex items-center mr-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome Back, {firstName}!</h2>
            <p>
              Thank you for joining us in our mission to redefine fashion and pave the way towards a more sustainable future. By choosing our eco-friendly lady shoes, you're not only making a style statement but also contributing to positive change for our planet. Together, we're stepping towards a greener tomorrow, one stylish stride at a time. Your support means the world to us as we continue to innovate, inspire, and lead the way in ethical fashion. Here's to walking hand in hand towards a brighter, more sustainable future. Thank you for being a part of our journey!
              {/* Full message here */}
            </p>
          </div>
        </div>

        {/* Right Section with User Information */}
        <div className="md:w-1/2 p-8 bg-white border-l border-black">
          { /* Each Subpart with Border and Edit Button at the Right End */}
          <div className="flex justify-between items-center border-b pb-4 ">
            <div>
              <h3 className="font-bold text-xl mb-2">About Me</h3>
              <p className="text-grey-800">{firstName} {lastName}</p>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModalName(true);
              }}>Edit</button>
          </div>

          <div className="flex justify-between items-center border-b py-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Contact</h3>
              <p className="text-grey-800 font-bold text-green-600 text-l">Email Address</p>
              <p className="text-grey-800 mb-2">{email}</p>


            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModalEmail(true);
              }}
            >Edit</button>
          </div>

          <div className="flex justify-between items-center border-b py-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Shipping Address</h3>
              {shippingInfo.address ? (
                <>
                  <p className="text-grey-800">{`${shippingInfo.firstName} ${shippingInfo.lastName}`}</p>
                  <p className="text-grey-800">{shippingInfo.address}</p>
                  <p className="text-grey-800">{`${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`}</p>
                </>
              ) : (
                <p className="text-grey-800 italic">Address not set up yet.</p>
              )}
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModalShipping(true);
              }}>
              Edit
            </button>
          </div>


          <div className="flex justify-between items-center pt-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Saved Card</h3>
              {paymentInfo.cardNumber ? (
                <>
                  <p className="text-grey-800">Card Number: ****-****-****-{paymentInfo.cardNumber.toString().slice(-2)}</p>
                
                </>
              ) : (
                <p className="text-grey-800 italic">No card saved.</p>
              )}
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModalPayment(true);
              }}>
              Edit
            </button>
          </div>

          <div className="flex justify-between items-center border-b py-4">
            <div>
              <h3 className="font-bold text-xl mb-2">Billing Address</h3>
              {billingInfo.address ? (
                <>
                  <p className="text-grey-800">{`${billingInfo.firstName} ${billingInfo.lastName}`}</p>
                  <p className="text-grey-800">{billingInfo.address}</p>
                  <p className="text-grey-800">{`${billingInfo.city}, ${billingInfo.state} ${billingInfo.zipCode}`}</p>
                </>
              ) : (
                <p className="text-grey-800 italic">Billing Address not set up yet.</p>
              )}
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModalBilling(true);
              }}>
              Edit
            </button>
          </div>

        </div>


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

        {/* Modal Billing Start  *******************************************/}
        {showModalBilling ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Billing Information</h1>
              <form className="space-y-4" onSubmit={handleEditBillingInfo}>
                <div className="flex space-x-4">

                  {/******************************  Billing part ****************************** */}
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

        {/* Modal Email Start  *******************************************/}
        {showModalEmail ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Contact</h1>
              <form onSubmit={handleEmailChange} className="space-y-4">

                <div className="flex flex-col">
                  <label htmlFor="address" className="text-sm font-semibold mb-1">email</label>
                  <input id="address" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter your address" onChange={(e) => setEmail(e.target.value)} name="email" required />
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

        {/* Modal Name Start  *******************************************/}
        {showModalName ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Contact</h1>
              <form onSubmit={handleNameChange} className="space-y-4">

                <div className="flex flex-col">
                  <label htmlFor="first" className="text-sm font-semibold mb-1">Firstname</label>
                  <input id="first" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter FirstName" onChange={(e) => setFirstName(e.target.value)} name="firstName" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="last" className="text-sm font-semibold mb-1">Lastname</label>
                  <input id="last" type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="Enter LastName" onChange={(e) => setLastName(e.target.value)} name="lastName" required />
                </div>

                {/* Add more form fields for shipping information as needed */}
                <div className="flex justify-end">
                  <button type='submit' className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 mr-4">Save Name</button>
                  <button onClick={handleCancelModalName} className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800">Cancel</button>
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
                  <input id="cvv" type="text" className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:border-blue-500" placeholder="Enter CVV"
                  name="cvv"
                    onChange={handlePaymentInputChange}
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





      </div>
    </div>
  );
};

export default ProfilePage;
