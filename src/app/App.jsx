import React, { useState } from "react";
import Header from "../features/Common/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "../features/Login/Login";
import Sidebar from "../features/Common/SideBar";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ProtectedRoute from "./PrivateRoute";
import { Home } from "../features/Common/Home";
import ProductSales from "../features/Charts/ProductSales";
import StationSales from "../features/Charts/StationSales";
import TotalSales from "../features/Charts/TotalSales";

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  return (
    <Router>
      {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}
      {isAuthenticated && (
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute children={<Home />} />} />
        <Route
          path="/product-sales"
          element={<ProtectedRoute children={<ProductSales />} />}
        />
        <Route
          path="/station-sales"
          element={<ProtectedRoute children={<StationSales />} />}
        />
        <Route
          path="/total-sales"
          element={<ProtectedRoute children={<TotalSales />} />}
        />
      </Routes>
    </Router>
  );
};
