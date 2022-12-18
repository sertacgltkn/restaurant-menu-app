import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";
import AddToBasket from "../add-to-basket";
import "./style.css";

export default function ProductCard({
	item,
	containerProps = {},
	cardProps = {},
}) {
	const navigate = useNavigate();

	if (!item) {
		return null  // Eğer "item" değişkeni null (yani, boş) değerine eşitse, koşul doğru olur ve "return null" ifadesi çalıştırılır.
	}
	return (
		<div
			onClick={() => {
				navigate(`/urunler/${item.id}`);    // fonksiyonun çağrılmasıyla birlikte, web sayfasının adresi /urunler/${item.id} şeklinde değiştirilir. Bu ifade, /urunler/ ön ekinin ardından "item.id" değişkeninin değerini içeren bir URL oluşturur. Bu, bir tıklama olayı gerçekleştiğinde bir web sayfasının adresini değiştirerek yeni bir sayfaya geçiş yapar.
			}}
			{...containerProps}  // "Spread" operatorü, bir dizi veya bir nesnenin elemanlarını tek tek ayrıştırır ve bunları bir başka dizi veya nesneye ekler.
		>
			<div className="card" {...cardProps}>
				<img src={item.image_url} className="card-img-top" alt={item.name} />
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<div className="custom-card-footer">
						<AddToBasket item={item} />
						<span>{formatPrice(item.price)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
