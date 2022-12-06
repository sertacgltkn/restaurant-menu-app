import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>   {/* contextin içerisindeki state'den çağrıldı */}
    <App />
  </CartProvider>
);
