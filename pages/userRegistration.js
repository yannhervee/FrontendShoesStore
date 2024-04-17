
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, value)
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
        error = !value.trim() ? 'Zip code is required' : !/^\d{5}(-\d{4})?$/.test(value) ? 'Zip code is invalid' : '';
        break;
      case 'password':
        error = !value ? 'Password is required' : value.length < 6 ? 'Password must be at least 6 characters' : '';
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    let newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Zip code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip code is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log('Form is valid! Submitting the form...');
      console.log(formData);
      // Additional form submission logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-500 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Become a Member</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <input 
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <input 
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zipCode && <p className="text-red-500 mt-1">{errors.zipCode}</p>}
          </div>
          <div>
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">Sign Up for Free</button>
          <div className="text-center mt-4">
            Already a member? <a href="/login" className="text-green-500">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}
