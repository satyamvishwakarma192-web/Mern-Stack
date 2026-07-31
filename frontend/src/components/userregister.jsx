import axios from 'axios';
import AuthPage from './AuthPage';
import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
  const handleSubmit = async (formData) => {
    const response = await axios.post(
      'http://localhost:3000/api/auth/user/register',
      {
        FullName: formData.FullName,
        Email: formData.Email,
        password: formData.password,
        PhoneNumber: formData.PhoneNumber,
        Address: formData.Address
      },
      { withCredentials: true }
    );

    return {
      success: true,
      message: response.data.message || 'User registered successfully'
    };
 
  };

  return (
    <AuthPage
      title="Create your account"
      subtitle="Join us and discover nearby food deals"
      roleLabel="User Register"
      buttonText="Create account"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkTo="/user/login"
      fields={[
        { name: 'FullName', label: 'Full name', type: 'text', placeholder: 'John Doe' },
        { name: 'PhoneNumber', label: 'Phone number', type: 'tel', placeholder: '+1 234 567 8900' },
        { name: 'Address', label: 'Address', type: 'text', placeholder: 'Your city or area' },
        { name: 'Email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' }
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default UserRegister;
