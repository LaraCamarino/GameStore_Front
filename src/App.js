import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "./contexts/UserContext";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
