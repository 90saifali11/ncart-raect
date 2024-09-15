import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Products from './pages/Products';
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail"; // Ensure the file extension matches
import SignupForm from './pages/signup';
import SigninForm from './pages/Signin';
import Cart from './pages/cart';
import UserProfile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />      
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Products/>
    </BrowserRouter>
  );
}

export default App;

