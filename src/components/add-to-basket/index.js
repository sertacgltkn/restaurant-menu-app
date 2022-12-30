import React from "react";
import { useShoppingCart } from "../../context/cart-context";
import Button from "../button";

export default function AddToBasket({ item }) {
  const cart = useShoppingCart();
  return (
    <React.Fragment>
      {cart.hasShoppingCart(item) ? (
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            style={{
				border: "2px solid #FFB75E",
              background:
                "linear-gradient(to top, rgb(0, 0, 0), rgb(255, 0, 0))",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation(); // bir div içinde bir butonu tıklarsanız, tıklama olayı div içindeki butona, daha sonra div'e ve nihayetinde document'e yayılacaktır. Bu metot, olayın yayılmasını durdurur ve olay sadece tıklanan DOM öğesi için çalıştırılır.
              cart.updateFromCart(item, "minus"); // cart context nesnesinin bir metodudur ve bu metot, sepetten belirtilen öğeyi çıkarmaya yarar.
            }}
            className="btn btn-info"
          >
            -
          </button>
          <button
            style={{
				border: "2px solid #FFB75E",
              background:
                "linear-gradient(to top, rgb(0, 0, 0), rgb(255, 0, 0))",
              color: "white",
            }}
            type="button"
            className="btn btn-success"
          >
            {cart.state[item.id].quantity}{" "}
            {/* cart context nesnesinin state özelliğine erişir */}
          </button>
          <button
            style={{
				border: "2px solid #FFB75E",
              background:
                "linear-gradient(to top, rgb(0, 0, 0), rgb(255, 0, 0))",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              cart.updateFromCart(item, "plus"); // Bu kod parçacığı, cart context nesnesinin bir metodunu çağırır ve bu metot, sepete belirtilen öğeyi ekler veya sepetten belirtilen öğeyi çıkarmaya yarar.
            }}
            className="btn btn-danger"
          >
            +
          </button>
        </div>
      ) : (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            cart.addToCart(item);
          }}
          className="btn btn-primary"
        >
          Sepete Ekle
        </Button>
      )}
    </React.Fragment>
  );
}
