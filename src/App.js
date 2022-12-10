import React from "react";
import HomePage from "./pages/home";
import CartPage from "./pages/cart";
import ToastLoading from "./components/toast-loading";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route element={<HomePage />} path="/"></Route>
        <Route element={<CartPage />} path="/sepet"></Route>
        <Route element={<NotFound />} path="*"></Route>
      </BrowserRouter>
      <ToastLoading />
    </React.Fragment>
  );
}

export default App;
