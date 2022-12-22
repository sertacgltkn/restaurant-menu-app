import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function DailyMenu({ items = [] }) {
  const navigate = useNavigate(); // useNavigate fonksiyonu, bir React uygulamasında bir tarayıcı gezinme işlemini gerçekleştirmeye yarayan bir fonksiyondur.kullanıcı bir sayfada bir bağlantıya tıkladığında, navigate fonksiyonu kullanılarak kullanıcının tarayıcısının yeni bir URL'ye yönlendirilmesi sağlanabilir.
	return (
    <>
      {items.length > 0 && ( // items'ın uzunluğunun sıfırdan büyük olup olmadığını kontrol eder. Eğer items dizisi boş değilse (yani sıfırdan büyükse), bu kod satırı içinde bulunan bir h4 etiketi oluşturur. Bu etiket içinde, "Günün Menüsü" yazısı gösterilir.
        <h4>Günün Menüsü</h4>  
      )}
			<Carousel pause="hover" fade className="daily-product-wrapper">
				{items.map((product) => ( // items dizisi içindeki öğeler için bir döngü oluşturur.
					<Carousel.Item key={product.id}>
            <img
              onClick={() => navigate(`/urunler/${product.id}`)}
							className="d-block w-100 daily-product-img"
							src={product.image_url}
							alt={product.name}
						/>
						<Carousel.Caption>
							<h3>{product.name}</h3>
							{/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</>
	);
}
