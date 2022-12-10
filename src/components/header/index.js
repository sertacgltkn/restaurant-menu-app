import React, { useRef, useState } from "react";
import { useShoppingCart } from "../../context/cart-context";
import Modal from "../modal";
import classes from "./style.module.css";
import Button from "../button";
import { Link } from "react-router-dom";

const sortingItems = [
  { value: "", title: "Önerilen" },
  { value: "price-asc", title: "Fiyata Göre Artan" },
  { value: "price-desc", title: "Fiyata Göre Azalan" },
  { value: "name-asc", title: "Ürün [a-z]" },
  { value: "name-desc", title: "Ürün [z-a]" },
];
export default function Header({
  onSubmit = () => null,
  value = "",
  onChange = () => null,
  selectedSorting = "price-asc",
  applySorting = () => null,
  onShortingChange = () => null,
  showSorting = false,
  setShowSorting = () => null,
}) {
  const { getCartCount } = useShoppingCart(); // sepete eklenmiş ürünlerin sayısını alıp gösterir.
  const ref = useRef();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light sticky-top ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            React Restaurant Menu App
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/anket">
                  Anket
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sepet">
                  Sepetim {`(${getCartCount()})`}
                </Link>
              </li>
            </ul>
            <form ref={ref} onSubmit={onSubmit} className={classes.searchForm}>
              {/* onSubmit, arama formunun gönderilmesi durumunda çağrılır */}
              <input
                value={value} // value değişkeni formda girilen arama değerini tutar
                onChange={(e) => onChange(e.target.value)} // onChange fonksiyonu, formda yapılan değişiklikleri dinler ve bu değişiklikleri value değişkenine uygular
                name="search"
                className={classes.input}
                placeholder="Ürün ara..."
                aria-label="Search"
              />
              {value && (
                <button
                  onClick={() => {
                    onChange("");
                  }}
                  className={classes.remove}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
              <button
                className={classes.search}
                onClick={() => setShowSorting(true)}
              >
                <span className="material-symbols-outlined"></span>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Modal
        show={showSorting}
        onClose={() => setShowSorting(false)}
        title="Sıralama"
      >
        <ul className={classes.ul}>
          {sortingItems.map((item) => (
            <li
              onClick={() => onShortingChange(item.value)}
              className={classes.li}
              key={item.value}
            >
              {item.title}
              {selectedSorting === item.value && ( // bileşende seçilen sıralama kriterini tutar
                <span className="material-symbols-outlined">done</span>
              )}
            </li>
          ))}
        </ul>
        <div className="d-grip gap-2 d-md-block">
          <Button
            type="button"
            className="btn btn-success w-100"
            onClick={applySorting}
          >
            Uygula
          </Button>
        </div>
      </Modal>
    </>
  );
}
