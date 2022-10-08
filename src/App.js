import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import UserContext from "./contexts/UserContext";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";

export default function App() {
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [shoppingCart, setShoppingCart] = useState(cartLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return (
    <UserContext.Provider value={{ shoppingCart, setShoppingCart }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/search/:productName" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
