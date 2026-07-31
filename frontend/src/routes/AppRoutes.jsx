import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import UserRegister from '../components/userregister';
import UserLogin from '../components/userlogin';
import FoodPartnerRegister from '../components/foodpartnerregister';
import FoodPartnerLogin from '../components/foodpartnerlogin';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodPartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;