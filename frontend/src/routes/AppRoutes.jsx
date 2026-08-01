import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import UserRegister from '../components/userregister';
import UserLogin from '../components/userlogin';
import FoodPartnerRegister from '../components/foodpartnerregister';
import FoodPartnerLogin from '../components/foodpartnerlogin';
import FoodPartnerProfile from '../components/foodpartnerprofile';
import HomePage from '../components/HomePage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodPartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
        <Route path="/foodPartner/profile" element={<FoodPartnerProfile />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;