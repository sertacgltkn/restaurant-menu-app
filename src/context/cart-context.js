import React, { createContext, useContext } from "react";
import { useState } from "react";

const Context = createContext({});

export const useShoppingCart /* değişkenin başında use kullanımı context kullanımında zorunluluktur */ =
  () => useContext(Context);

export const CartProvider = (props) => {
  const [state, setState] = useState({});

  return (
    <Context.Provider value={{ state }}>{props.children}</Context.Provider>
  );
};
