import axios from 'axios';
import AuthPage from './AuthPage';

const FoodPartnerLogin = () => {
  const handleSubmit = async (formData) => {
    const response = await axios.post(
      '/api/auth/foodPartner/login',
      {
        Email: formData.Email,
        password: formData.password
      },
      { withCredentials: true }
    );

    return {
      success: true,
      message: response.data.message || 'Food partner logged in successfully'
    };
  };

  return (
    <AuthPage
      title="Partner portal"
      subtitle="Manage orders and reach more customers"
      roleLabel="Food Partner Login"
      buttonText="Log in"
      footerText="Need an account?"
      footerLinkText="Register now"
      footerLinkTo="/foodPartner/register"
      fields={[
        { name: 'Email', label: 'Email', type: 'email', placeholder: 'partner@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' }
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default FoodPartnerLogin;
