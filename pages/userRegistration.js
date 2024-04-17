// import { useState } from 'react';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));

//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: validateField(name, value)
//     }));
//   };

//   const validateField = (name, value) => {
//     let error = '';
    
//     switch (name) {
//       case 'firstName':
//         error = !value.trim() ? 'First name is required' : '';
//         break;
//       case 'lastName':
//         error = !value.trim() ? 'Last name is required' : '';
//         break;
//       case 'email':
//         error = !value.trim() ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
//         break;
//       case 'zipCode':
//         error = !value.trim() ? 'Zip code is required' : !/^\d{5}(-\d{4})?$/.test(value) ? 'Zip code is invalid' : '';
//         break;
//       case 'password':
//         error = !value ? 'Password is required' :
//           value.length < 8 ? 'Password must be at least 8 characters' :
//           !/[A-Z]/.test(value) ? 'Password must contain at least one uppercase letter' : '';
//         break;
//       case 'confirmPassword':
//         error = value !== formData.password ? 'Passwords do not match' : '';
//         break;
//       default:
//         break;
//     }
    
//     return error;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//     } else {
//       console.log('Form is valid! Submitting the form...');
//       console.log(formData);
//       // Additional form submission logic here
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-500 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Become a Member</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//             <input 
//               type="text"
//               name="firstName"
//               id="firstName"
//               placeholder="First name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
//           </div>
//           <div>
//             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//             <input 
//               type="text"
//               name="lastName"
//               id="lastName"
//               placeholder="Last name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input 
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
//           </div>
//           <div>
//             <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
//             <input 
//               type="text"
//               name="zipCode"
//               id="zipCode"
//               placeholder="Zip Code"
//               value={formData.zipCode}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.zipCode && <p className="text-red-500 mt-1">{errors.zipCode}</p>}
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input 
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//             <input 
//               type="password"
//               name="confirmPassword"
//               id="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
//           </div>
//           <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">Sign Up for Free</button>
//           <div className="text-center mt-4">
//             Already a member? <a href="/login" className="text-green-500">Sign in</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;
    if (name === 'zipCode') {
      // Allow only numbers, filter out any non-digit characters
      filteredValue = value.replace(/\D/g, '');
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: filteredValue
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, filteredValue)
    }));
    setFocused(prev => ({
      ...prev,
      [name]: filteredValue !== '' || prev[name]
    }));
  };

  const handleFocus = (name) => {
    setFocused(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (name) => {
    setFocused(prev => ({
      ...prev,
      [name]: formData[name] !== ''
    }));
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        error = !value.trim() ? 'First name is required' : '';
        break;
      case 'lastName':
        error = !value.trim() ? 'Last name is required' : '';
        break;
      case 'email':
        error = !value.trim() ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
        break;
      case 'zipCode':
        error = !value ? 'Zip code is required' : !/^\d{5}$/.test(value) ? 'Zip code is invalid (5 numeric digits required)' : '';
        break;
      case 'password':
        error = !value ? 'Password is required' :
          value.length < 8 ? 'Password must be at least 8 characters' :
          !/[A-Z]/.test(value) ? 'Password must contain at least one uppercase letter' : '';
        break;
      case 'confirmPassword':
        error = value !== formData.password ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).some(key => formErrors[key] !== '')) {
      setErrors(formErrors);
    } else {
      console.log('Form is valid! Submitting the form...');
      // Convert zip code to integer before logging
      const processedFormData = {
        ...formData,
        zipCode: parseInt(formData.zipCode, 10)  // Convert zip code to integer
      };
      console.log(processedFormData);
      // Additional form submission logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-500 px-4" style={{
      backgroundImage: 'url("pages/background.jpeg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Become a Member</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              {(focused[key] || value) && <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>}
              <input 
                type={key === 'password' || key === 'confirmPassword' ? 'password' : key.includes('email') ? 'email' : 'text'}
                name={key}
                id={key}
                placeholder={key === 'password' ? 'Enter password' : key === 'confirmPassword' ? 'Confirm password' : `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}`}
                value={value}
                onChange={handleChange}
                onFocus={() => handleFocus(key)}
                onBlur={() => handleBlur(key)}
                className={`w-full px-3 py-2 border rounded ${errors[key] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[key] && <p className="text-red-500 mt-1">{errors[key]}</p>}
            </div>
          ))}
          <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">Sign Up for Free</button>
          <div className="text-center mt-4">
            Already a member? <a href="/login" className="text-green-500">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}