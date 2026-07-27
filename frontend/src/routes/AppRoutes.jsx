import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/*export routers*/
        <Route path="/user/register" element={<h1>User Registration</h1>} />,
        <Route path="/user/login" element={<h1>User Login</h1>} />,
        <Route path="/user/foodPartner/register" element={<h1>Food Partner Registration</h1>} />,
        <Route path="/user/foodPartner/login" element={<h1>Food Partner Login</h1>} />
        }
      </Routes>
    </Router>
  );
};

export default Approutes;