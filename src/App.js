import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "./contexts/UserContext";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
