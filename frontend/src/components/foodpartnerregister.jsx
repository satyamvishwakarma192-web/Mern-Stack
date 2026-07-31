import axios from 'axios';
import AuthPage from './AuthPage';
import {Navigate, useNavigate} from 'react-router-dom';

const FoodPartnerRegister = () => {
  const handleSubmit = async (formData) => {
    const response = await axios.post(
      'http://localhost:3000/api/auth/foodPartner/register',
      {
        Name: formData.Name,
        OwnerName: formData.OwnerName,
        Email: formData.Email,
        password: formData.password,
        PhoneNumber: formData.PhoneNumber,
        Location: formData.Location
      },
      { withCredentials: true }
    );

    return {
      success: true,
      message: response.data.message || 'Food partner registered successfully'
    };
  };
  

  return (
    <AuthPage
      title="Register as a food partner"
      subtitle="Grow your business with simple food delivery access"
      roleLabel="Food Partner Register"
      buttonText="Register"
      footerText="Already partnered with us?"
      footerLinkText="Log in"
      footerLinkTo="/foodPartner/login"
      fields={[
        { name: 'Name', label: 'Restaurant / shop name', type: 'text', placeholder: 'Green Bites' },
        { name: 'OwnerName', label: 'Owner name', type: 'text', placeholder: 'Alicia James' },
        { name: 'PhoneNumber', label: 'Phone number', type: 'tel', placeholder: '+1 234 567 8900' },
        { name: 'Location', label: 'Location', type: 'text', placeholder: 'City, district' },
        { name: 'Email', label: 'Email', type: 'email', placeholder: 'partner@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' }
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default FoodPartnerRegister;
