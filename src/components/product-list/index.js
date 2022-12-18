import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";
import AddToBasket from "../add-to-basket";
import ProductCard from "../product-card";
import "./style.css";

export default function ProductList({
	products = [],
	showCategoryLink = true,
}) {
	const [items, setItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		handleProducts();
	}, [products]);

	const handleProducts = () => {  // "products" dizisinde gezinir ve bu dizinin elemanlarını işler. İşlevin amacı, "products" dizisindeki ürünleri kategorilere göre gruplamak ve bu grupları bir "state" dizisine eklemektir.
		const state = [];
		products.forEach((product) => {  // İşlev, "products" dizisindeki her bir ürün için "state" dizisinde bir dizi elemanı arar. Eğer bu eleman zaten "state" dizisinde varsa, ürünü bu elemanın "products" özelliğine ekler. Eğer bu eleman "state" dizisinde yoksa, yeni bir eleman oluşturur ve ürünü bu elemanın "products" özelliğine ekler. Bu şekilde, "products" dizisindeki ürünler kategorilere göre gruplandıktan sonra, "state" dizisine eklenir.
			const index = state.findIndex((x) => x.id === product.category_id);
			if (index === -1) {
				state.push({
					id: product.category_id,
					name: product.category,
					products: [product],
				});
			} else {
				state[index].products.push(product);
			}
		});
		setItems(state); // Son olarak, "setItems" işlevi çağrılır ve "state" dizisi bu işlevin parametresi olarak geçirilir. Bu işlev, bir "state" değişkenini güncelleyen ve bu değişkeni güncellediğinde sayfayı yenileyen bir "React" işlevidir. Bu sayede, "state" dizisinde yapılan değişiklikler sayfaya yansıtılır ve kullanıcı tarafından görülebilir hale gelir.
	};

	return (
		<>
			{items.map((item, index) => {
				return (
					<div className="row category-row" key={index}>
						<div className="col-10">
							<div className="category-title">{item.name}</div>
						</div>
						<div
							className="col-2 seeAll"
							style={{ visibility: showCategoryLink ? "visible" : "hidden" }}  // "visibility" özelliği, bir nesnenin görünürlüğünü ayarlamaya yarar. Bu özelliğin değeri "visible" ise, nesne görünür hale gelir ve "hidden" ise, görünmez hale gelir.
						>
							<Link className="link-text" to={`/kategoriler/${item.id}`}>Tümünü Gör</Link>
							<span className="material-symbols-outlined">chevron_right</span>
						</div>
						<div className="row product-row">
							{item.products.map((product, index) => (
								<ProductCard
									key={index}
									item={product}
									containerProps={{
										className: "col-3",
									}}
								/>
							))}
						</div>
					</div>
				);
			})}
		</>
	);
}
