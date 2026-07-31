import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const response = await axios.post(
      'http://localhost:3000/api/auth/user/login',
      {
        Email: formData.Email,
        password: formData.password
      },
      { withCredentials: true }
    );

    if (response?.data) {
      navigate('/home');
    }

    return {
      success: true,
      message: response.data.message || 'User logged in successfully'
    };
  };

  return (
    <AuthPage
      title="Welcome back"
      subtitle="Sign in to continue exploring food options"
      roleLabel="User Login"
      buttonText="Log in"
      footerText="New here?"
      footerLinkText="Create account"
      footerLinkTo="/user/register"
      fields={[
        { name: 'Email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' }
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default UserLogin;
