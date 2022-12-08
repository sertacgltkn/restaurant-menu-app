import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({ // Bu SEPET METODLARI ve değerler, CartProvider bileşeninin içinde bulunan diğer bileşenlere aktarmak için kullanılır.
  state: {},
  updateFromCart: (item) => {},
  addToCart: (item) => {},
  hasShoppingCart: (item) => {},
  getCartCount: () => 0,
});

export const useShoppingCart = () => useContext(Context); /* değişkenin başında use kullanımı context kullanımında zorunluluktur */

export const CartProvider = ({ children, initialState = {} }) => {  // değerleri ve metotları uygulamanın diğer bileşenlerine aktarmak için
  const [state, setState] = useState(initialState);
  useEffect(() => { // useEffect hook'u, state değişkeninde bir değişiklik olduğunda window.localStorage.setItem() fonksiyonunu çağırarak sepet durumunu web tarayıcısının localStorage'ına kaydeder.
    window.localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {  //sepete bir öğe eklemek için
    setState((prev) => {
      return { ...prev, [item.id]: { quantity: 1 } };
    });
  };

  /// jsdoc : javascript içerisinde typescript yazmaya olanak tanır
  /**
   *
   * @param {any} item
   * @param {"minus" | "plus"} type
   * @returns
   */
  const updateFromCart = (item, type) => { // değerleri güncellemek için. Metod, bir öğe ve bu öğenin sepet içindeki miktarının artırılıp azaltılacağını belirtmek için type parametresini alır.
    if (type === "plus") {  // Eğer type değeri "plus" ise, setState() fonksiyonu kullanılarak item.id anahtarına ait öğenin miktarı bir arttırılır.
      setState((prev) => {
        prev[item.id].quantity++;
        return { ...prev };
      });
      return;
    }
    if (type === "minus") { // Eğer type değeri "minus" ise, item.id anahtarına ait öğenin miktarı 1'den büyükse bir azaltılır, değilse sepetten kaldırılır. 
      setState((prev) => {
        if (prev[item.id].quantity > 1) {
          prev[item.id].quantity--;
        } else {
          delete prev[item.id];
        }
        return { ...prev }; // değişikliğin yansıtılması için ...prev (spread) operatörü kullanılır.
      });
    }
  };

  const hasShoppingCart = (item) => { //sepet içinde bir öğe olup olmadığını kontrol etmek için
    return state[item.id] ? true : false;
  };

  const getCartCount = () => {  // sepet içinde kaç öğe olduğunu almak için
    let count = 0;
    Object.keys(state).forEach((id) => {   // Object.keys(state) state'in içindeki keyleri array olarak dönecektir.
      const item = state[id];
      count += item.quantity;
    });
    return count;
  };
  return (
    <Context.Provider
      value={{
        state,
        updateFromCart,
        addToCart,
        hasShoppingCart,
        getCartCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};
