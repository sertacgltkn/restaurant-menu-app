import React, { useRef, useState } from "react";
import { useShoppingCart } from "../../context/cart-context";
import Modal from "../modal";
import classes from "./style.module.css";
import Button from "../button";
import { Link, useLocation } from "react-router-dom"; // Link etiketi, bir a etiketi gibi çalışır, ancak bu etiketin tıklama olayından sonra sayfanın yeniden yüklenmesini önler. 

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
	selectedSorting = "",
	applySorting = () => null,
	onSortingChange = () => null,
	showSorting = false,
	setShowSorting = () => null,
	//showFilterArea = true,
}) {
	const { getCartCount } = useShoppingCart();  // Bu bileşen, useShoppingCart adlı bir fonksiyonu kullanır ve bu fonksiyon, bir alışveriş sepeti context'inin sağladığı verileri kullanır. Bu fonksiyon, sepete eklenen ürünlerin sayısını döndürür ve bu sayıyı bir bağlantıda gösterir. Bu bağlantı, sepet sayfasına gider.
	const ref = useRef(); // useRef fonksiyonu, React'ta bir DOM elementine veya bir JavaScript nesnesine atıfta bulunmak için kullanılır.bir DOM elementinin veya bir JavaScript nesnesinin özelliklerine erişmek ve bu özellikleri değiştirmek için kullanılır.

	const location = useLocation();
	const showFilterArea = location.pathname.startsWith("/urunler") ? false : true; // Eğer URL yolu "/urunler" ile başlıyorsa, "showFilterArea" değişkenine "false" değerini atıyoruz. Aksi halde "true" değerini atıyoruz.
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-warning sticky-top "> {/* "sticky-top" sınıfı navbarın sayfanın en üstünde yapışık bir şekilde durmasını sağlar */}
				<div className="container-fluid"> {/* div elementinin tam genişlikte olmasını ve ekranın tam genişliğine uyum sağlamasını belirtir. */}
					<Link className="navbar-brand" to="/">
						React Restaurant Menu App
					</Link>
					<div className="collapse navbar-collapse" id="navbarSupportedContent"> {/* navbarın genişliğine göre otomatik olarak gizlenip görüntülenmesi */}
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
							<form
								style={{
									visibility: showFilterArea ? "visible" : "hidden"
								}}
								ref={ref}
								onSubmit={(e) => {
									e.preventDefault();
									onSubmit(e); // bir formun gönderilmesi sırasında tetiklenir ve formun verilerinin sunucuya gönderilmesini sağlar.
								}}
								className={classes.searchForm}
							>
								<input
									value={value}
									onChange={(e) => onChange(e.target.value)} // elementin değeri değiştiğinde bir fonksiyon çağırılabilir veya elementin değeri değiştiğinde bir değişkenin değeri değiştirilebilir.
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
									<span className="material-symbols-outlined">filter_list</span>
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
							onClick={() => onSortingChange(item.value)}
							className={classes.li}
							key={item.value}
						>
							{item.title}
							{selectedSorting === item.value && (
								<span className="material-symbols-outlined">done</span>
							)}
						</li>
					))}
				</ul>
				<div className="d-grid gap-2 d-md-block">
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
