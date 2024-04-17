import { useState } from 'react';
import './Register.css'; 

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
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          return 'First name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          return 'Last name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Email is invalid';
        }
        break;
      case 'zipCode':
        if (!value.trim()) {
          return 'Zip code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
          return 'Zip code is invalid';
        }
        break;
      case 'password':
        if (!value) {
          return 'Password is required';
        } else if (value.length < 6) {
          return 'Password must be at least 6 characters';
        }
        break;
      default:
        return '';
    }
    return '';
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
    <div className="min-h-screen tems-center justify-center bg-green-500 pr-20">
    <div className="registration-container">
      <h1>Become a Member</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <input 
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <input 
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input 
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? 'input-error' : ''}
            />
            {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}
          </div>
          <div className="form-group">
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="register-button">Sign Up for Free</button>
          <div className="sign-in-link">
            Already a member? <a href="/signin">Sign in</a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
