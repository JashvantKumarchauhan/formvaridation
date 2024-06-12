import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showNextFields, setShowNextFields] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one digit';
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one letter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showNextFields) {
      setShowNextFields(true);
    } else {
      if (validate()) {
        setSubmitted(true);
        navigate('/success', { state: { formData } });
      } else {
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 3000); // Hide warning after 3 seconds
      }
    }
  };

  return (
    <div className="container">
      <h1>Celebar Technology First Week Work and Password</h1>
      <hr />
      {showWarning && (
        <div className="warning-message">Please fill in all required fields and ensure password strength.</div>
      )}
      {submitted && Object.keys(errors).length === 0 && (
        <div className="success-message">Form submitted successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Password</label>
            <input type={passwordVisible ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>Show/Hide</button>
            {errors.password && <span>{errors.password}</span>}
          </div>
        </div>
        {showNextFields && (
          <div className="form-section">
            <div>
              <label>Phone Number</label>
              <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
            </div>
            <div>
              <label>Country</label>
              <select name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="nepal">Nepal</option>
                <option value="pakistan">Pakistan</option>
                <option value="chaina">Chaina</option>
                <option value="ban">Bangladesh</option>
              
              </select>
            </div>
            <div>
              <label>PAN No.</label>
              <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
            </div>
            <div>
              <label>Aadhar No.</label>
              <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} />
            </div>
            <div>
              <label>City</label>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                <option value="Areraj">Areraj</option>
                <option value="Motihari">Motihari</option>
                <option value="Patna">Patna</option>
                <option value="Siwan">Siwan</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Chhapra">Chhapra</option>
               
              </select>
            </div>
          </div>
        )}
        <button type="submit">{!showNextFields ? "Next" : "Submit"}</button>
      </form>
    </div>
  );
};

export default Form;

