import React, { useEffect, useState } from "react";
import Header from "../components/header";
import ProductList from "../components/product-list";

const API_BASE_URL = "http://localhost:4000/api/products";

export default function HomePage() {
	const [items, setItems] = useState([]); // önce boş bir array olarak dönecektir

	useEffect(() => {  // boş array döndükten sonra useEffect çalışır. useEffect içerisinde de loadItems çalşır.
		loadItems();
	}, []);

	const loadItems = () => {  // API'ye gelen istekle state güncellenir ve setItems'a atanır.
		fetch(API_BASE_URL)
			.then((resp) => resp.json())
			.then((data) => {
				setItems(data);
			})
			.catch((err) => {  // hata varsa catch metoduna düşecektir.
				console.log(err);
			});
	};

	return (
		<>
			<Header />
			<div className="container">
				<ProductList products={items} /> {/* state güncellenince product list yeniden render edildi.Yani ilk başta useState ile tanımladığımız array'in içerisi doldurulmuş oldu */}
			</div>
		</>
	);
}
