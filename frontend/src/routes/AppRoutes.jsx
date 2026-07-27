import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import AuthPage from '../components/AuthPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route
          path="/user/register"
          element={
            <AuthPage
              title="Create your account"
              subtitle="Join us and discover nearby food deals"
              roleLabel="User Register"
              buttonText="Create account"
              footerText="Already have an account?"
              footerLinkText="Log in"
              footerLinkTo="/user/login"
              extraFields={[
                { label: 'Full name', type: 'text', placeholder: 'John Doe' },
                { label: 'Phone number', type: 'tel', placeholder: '+1 234 567 8900' },
                { label: 'Address', type: 'text', placeholder: 'Your city or area' }
              ]}
            />
          }
        />
        <Route
          path="/user/login"
          element={
            <AuthPage
              title="Welcome back"
              subtitle="Sign in to continue exploring food options"
              roleLabel="User Login"
              buttonText="Log in"
              footerText="New here?"
              footerLinkText="Create account"
              footerLinkTo="/user/register"
            />
          }
        />
        <Route
          path="/foodPartner/register"
          element={
            <AuthPage
              title="Register as a food partner"
              subtitle="Grow your business with simple food delivery access"
              roleLabel="Food Partner Register"
              buttonText="Register"
              footerText="Already partnered with us?"
              footerLinkText="Log in"
              footerLinkTo="/foodPartner/login"
              extraFields={[
                { label: 'Restaurant / shop name', type: 'text', placeholder: 'Green Bites' },
                { label: 'Owner name', type: 'text', placeholder: 'Alicia James' },
                { label: 'Phone number', type: 'tel', placeholder: '+1 234 567 8900' },
                { label: 'Location', type: 'text', placeholder: 'City, district' }
              ]}
            />
          }
        />
        <Route
          path="/foodPartner/login"
          element={
            <AuthPage
              title="Partner portal"
              subtitle="Manage orders and reach more customers"
              roleLabel="Food Partner Login"
              buttonText="Log in"
              footerText="Need an account?"
              footerLinkText="Register now"
              footerLinkTo="/foodPartner/register"
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;