import React from "react";
import { useShoppingCart } from "../../context/cart-context";
import Button from "../button";

export default function AddToBasket({ item }) {
  const cart = useShoppingCart();
  return (
    <React.Fragment>
      {cart.hasShoppingCart(item) ? (
        <div className="btn-group" role="group" aria-label="Basic Example">
          <button
            onClick={() => cart.updateFromCart(item, "minus")}
            className="btn btn-primary"
          >
            -
          </button>
          <button className="btn btn-primary">
            {cart.state[item.id].quantity}
          </button>
          <button
            onClick={() => cart.updateFromCart(item, "plus")}
            className="btn btn-primary"
          >
            +
          </button>
        </div>
      ) : (
        <Button
          onClick={() => cart.addToCart(item)}
          className="btn btn-primary"
        >
          Sepete Ekle
        </Button>
      )}
    </React.Fragment>
  );
}
