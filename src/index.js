import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
const getInitialCart = () => {
  const value = window.localStorage.getItem("cart"); // "localStorage" özelliğinden "cart" anahtarına ait değer okunur ve bu değer bir "value" değişkenine atanır.
  if (value) {
    return JSON.parse(value);  // Eğer "value" değişkeni bir değer içeriyorsa, bu değer "JSON.parse" fonksiyonu ile bir JavaScript nesnesine dönüştürülür
  }  // bu nesne fonksiyonun döndürülmesi beklenen değer olarak döndürülür. 
  return {}  // Eğer "value" değişkeni bir değer içermiyorsa, fonksiyon bir boş bir nesne döndürür. 
}
root.render(
  <CartProvider initialState={getInitialCart()}>   {/* contextin içerisindeki state'den çağrıldı */}
    <App />
  </CartProvider>
);
