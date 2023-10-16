import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<div>About</div>} />
    </Routes>
  );
};

export default AppRoutes;
